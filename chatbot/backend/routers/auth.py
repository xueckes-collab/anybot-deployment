"""User authentication endpoints backed by Supabase Auth.

Endpoints:
    POST /api/auth/register    Create a new user (sends verification email)
    POST /api/auth/login       Sign in with email + password
    GET  /api/auth/me          Return current user's profile (requires Bearer token)
    POST /api/auth/resend      Resend verification email

The actual email delivery is handled by Supabase for free — you don't need
to configure SMTP yourself.
"""
import re
from typing import Optional

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel, EmailStr, Field

from services.supabase_client import get_supabase

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ---------- Request / Response models ----------

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=30)
    password: str = Field(..., min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ResendRequest(BaseModel):
    email: EmailStr


class AuthResponse(BaseModel):
    ok: bool
    message: str
    user: Optional[dict] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None


# ---------- Helpers ----------

_PHONE_RE = re.compile(r"^[\d+\-\s()]{5,30}$")


def _normalize_phone(phone: str) -> str:
    phone = phone.strip()
    if not _PHONE_RE.match(phone):
        raise HTTPException(status_code=400, detail="电话号码格式不正确")
    return phone


def _extract_bearer(authorization: Optional[str]) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="缺少登录凭证")
    return authorization.split(" ", 1)[1].strip()


# ---------- Endpoints ----------

@router.post("/register", response_model=AuthResponse)
async def register(payload: RegisterRequest):
    """Register a new user.

    Creates an entry in Supabase auth.users and a matching row in
    public.profiles. Supabase will automatically send the verification email
    if "Confirm email" is enabled in the Supabase dashboard.
    """
    phone = _normalize_phone(payload.phone)
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="姓名不能为空")

    sb = get_supabase()

    try:
        # sign_up triggers the confirmation email automatically.
        result = sb.auth.sign_up(
            {
                "email": payload.email,
                "password": payload.password,
                "options": {
                    "data": {"name": name, "phone": phone},
                },
            }
        )
    except Exception as exc:  # Supabase raises a variety of exceptions
        msg = str(exc)
        if "already registered" in msg.lower() or "already" in msg.lower():
            raise HTTPException(status_code=409, detail="该邮箱已被注册")
        raise HTTPException(status_code=400, detail=f"注册失败: {msg}")

    if not result or not getattr(result, "user", None):
        raise HTTPException(status_code=400, detail="注册失败，请稍后重试")

    user_id = result.user.id

    # Insert matching profile row. Uses service-role key so RLS is bypassed.
    try:
        sb.table("profiles").upsert(
            {
                "id": user_id,
                "name": name,
                "email": payload.email,
                "phone": phone,
            }
        ).execute()
    except Exception as exc:
        # If the profile insert fails we still want the auth user to exist,
        # but we should surface the error to the caller.
        raise HTTPException(
            status_code=500,
            detail=f"资料保存失败: {exc}",
        )

    return AuthResponse(
        ok=True,
        message="注册成功，请检查邮箱并点击验证链接完成邮箱验证。",
        user={"id": user_id, "email": payload.email, "name": name, "phone": phone},
    )


@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest):
    sb = get_supabase()
    try:
        result = sb.auth.sign_in_with_password(
            {"email": payload.email, "password": payload.password}
        )
    except Exception as exc:
        msg = str(exc).lower()
        if "invalid" in msg or "credentials" in msg:
            raise HTTPException(status_code=401, detail="邮箱或密码错误")
        if "not confirmed" in msg or "email not confirmed" in msg:
            raise HTTPException(status_code=403, detail="邮箱尚未验证，请先点击验证邮件中的链接")
        raise HTTPException(status_code=400, detail=f"登录失败: {exc}")

    if not result or not result.session:
        raise HTTPException(status_code=401, detail="邮箱或密码错误")

    user = result.user
    meta = (user.user_metadata or {}) if user else {}
    return AuthResponse(
        ok=True,
        message="登录成功",
        user={
            "id": user.id,
            "email": user.email,
            "name": meta.get("name", ""),
            "phone": meta.get("phone", ""),
        },
        access_token=result.session.access_token,
        refresh_token=result.session.refresh_token,
    )


@router.get("/me", response_model=AuthResponse)
async def me(authorization: Optional[str] = Header(default=None)):
    token = _extract_bearer(authorization)
    sb = get_supabase()
    try:
        result = sb.auth.get_user(token)
    except Exception as exc:
        raise HTTPException(status_code=401, detail=f"凭证无效: {exc}")

    if not result or not result.user:
        raise HTTPException(status_code=401, detail="凭证无效")

    user = result.user
    meta = user.user_metadata or {}

    # Prefer the profiles table as source of truth; fall back to metadata.
    profile_row = None
    try:
        resp = sb.table("profiles").select("*").eq("id", user.id).single().execute()
        profile_row = resp.data
    except Exception:
        pass

    return AuthResponse(
        ok=True,
        message="ok",
        user={
            "id": user.id,
            "email": user.email,
            "name": (profile_row or {}).get("name") or meta.get("name", ""),
            "phone": (profile_row or {}).get("phone") or meta.get("phone", ""),
            "email_verified": bool(user.email_confirmed_at),
        },
    )


@router.post("/resend", response_model=AuthResponse)
async def resend(payload: ResendRequest):
    sb = get_supabase()
    try:
        sb.auth.resend({"type": "signup", "email": payload.email})
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"重发失败: {exc}")
    return AuthResponse(ok=True, message="验证邮件已重新发送，请查收。")
