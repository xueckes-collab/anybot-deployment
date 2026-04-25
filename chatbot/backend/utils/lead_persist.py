"""
Persist widget visitor info (姓名 / 邮箱 / 电话) collected by the chatbot
login form into Supabase ``profiles`` table.

This is a "best-effort" persister:

* If Supabase is not configured (``SUPABASE_URL`` / ``SUPABASE_SERVICE_ROLE_KEY``
  unset), every call is a no-op — the widget keeps working, only the admin
  dashboard won't see the lead.
* If the ``profiles`` table doesn't exist yet, the call also silently fails.
  Run ``supabase_schema.sql`` (see SETUP_AUTH.md) to create it.
* Any unexpected exception is swallowed and logged — chat must not break
  because lead capture failed.
"""
from __future__ import annotations

import logging
import os
import re
import uuid
from datetime import datetime
from typing import Optional

logger = logging.getLogger(__name__)

# Mirror the regexes used in chatbot-widget.html so that anything the widget
# rejected won't slip through here either.  These are intentionally lenient.
_NAME_RE = re.compile(r"^[\u4e00-\u9fa5A-Za-z][\u4e00-\u9fa5A-Za-z\s.\-·']{1,29}$")
_EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$")
_PHONE_RE = re.compile(r"^(?:1[3-9]\d{9}|\+\d[\d\s\-]{6,14}\d)$")


def validate_user_info(name: str, email: str, phone: str) -> Optional[str]:
    """Return None if valid, otherwise a human-readable error message (zh-CN)."""
    name = (name or "").strip()
    email = (email or "").strip()
    phone = (phone or "").strip()

    if not _NAME_RE.match(name):
        return "姓名格式不正确"
    if not _EMAIL_RE.match(email):
        return "邮箱格式不正确"
    if not _PHONE_RE.match(phone):
        return "电话号码格式不正确"
    # The phone regex's "international" branch tolerates separators; reject
    # anything that's still too short after stripping them.
    stripped = re.sub(r"[\s\-]", "", phone).lstrip("+")
    if len(stripped) < 8:
        return "电话号码格式不正确"
    return None


def upsert_lead(name: str, email: str, phone: str) -> bool:
    """Upsert the visitor into Supabase ``profiles`` keyed by email.

    Returns ``True`` on success, ``False`` otherwise.  Never raises.
    """
    name = (name or "").strip()
    email = (email or "").strip().lower()
    phone = (phone or "").strip()

    if not (name and email and phone):
        return False

    if not (os.environ.get("SUPABASE_URL") and os.environ.get("SUPABASE_SERVICE_ROLE_KEY")):
        # Not configured → silently skip.  This keeps the widget usable for
        # deployments that don't want the admin dashboard.
        return False

    try:
        # Imported lazily so missing supabase pkg doesn't break import-time.
        from services.supabase_client import get_supabase

        sb = get_supabase()
        payload = {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, email)),
            "name": name,
            "email": email,
            "phone": phone,
            "source": "widget",
            "updated_at": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        }
        # ``profiles.id`` is uuid PK; we use a deterministic uuid5 from the
        # email so re-submissions update the same row instead of inserting
        # duplicates.  ``on_conflict='email'`` lets the DB-side unique
        # constraint also collapse rows when present.
        sb.table("profiles").upsert(payload, on_conflict="email").execute()
        return True
    except Exception as exc:  # noqa: BLE001 - persistence must never break chat
        logger.warning("Lead upsert failed (silently ignored): %s", exc)
        return False
