"""Admin-side endpoints: login page, dashboard page, and user list API.

Authentication model:
    - An environment variable ADMIN_EMAILS holds a comma-separated list of
      emails allowed to access the admin panel.
    - The admin logs in with a normal Supabase user account whose email is
      in that list.
    - The same Supabase access token is then used as a Bearer token on
      /api/admin/users.

That keeps the admin flow on the same auth backend — you don't have to
maintain a separate password store.
"""
import os
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import FileResponse

from services.supabase_client import get_supabase

router = APIRouter(tags=["admin"])

_TEMPLATES_DIR = Path(__file__).resolve().parent.parent / "templates"


def _is_admin_email(email: Optional[str]) -> bool:
    if not email:
        return False
    raw = os.environ.get("ADMIN_EMAILS", "")
    allowed = {e.strip().lower() for e in raw.split(",") if e.strip()}
    return email.lower() in allowed


def _require_admin(authorization: Optional[str]) -> dict:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="缺少管理员凭证")
    token = authorization.split(" ", 1)[1].strip()
    sb = get_supabase()
    try:
        result = sb.auth.get_user(token)
    except Exception as exc:
        raise HTTPException(status_code=401, detail=f"凭证无效: {exc}")
    if not result or not result.user:
        raise HTTPException(status_code=401, detail="凭证无效")
    email = result.user.email
    if not _is_admin_email(email):
        raise HTTPException(status_code=403, detail="该账号无管理员权限")
    return {"id": result.user.id, "email": email}


# ---------- Pages ----------

@router.get("/register", include_in_schema=False)
async def page_register():
    return FileResponse(str(_TEMPLATES_DIR / "register.html"), media_type="text/html")


@router.get("/login", include_in_schema=False)
async def page_login():
    return FileResponse(str(_TEMPLATES_DIR / "login.html"), media_type="text/html")


@router.get("/admin", include_in_schema=False)
async def page_admin():
    return FileResponse(str(_TEMPLATES_DIR / "admin.html"), media_type="text/html")


# ---------- Admin APIs ----------

@router.get("/api/admin/users")
async def list_users(
    authorization: Optional[str] = Header(default=None),
    limit: int = 200,
    offset: int = 0,
):
    _require_admin(authorization)
    sb = get_supabase()
    limit = max(1, min(limit, 1000))
    try:
        resp = (
            sb.table("profiles")
            .select("id, name, email, phone, created_at")
            .order("created_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"查询失败: {exc}")
    return {"ok": True, "users": resp.data or [], "count": len(resp.data or [])}


@router.get("/api/admin/whoami")
async def whoami(authorization: Optional[str] = Header(default=None)):
    admin = _require_admin(authorization)
    return {"ok": True, "admin": admin}
