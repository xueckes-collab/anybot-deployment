"""
In-memory session manager for chat history.
Persists to admin SQLite for management backend.
"""

import time
import uuid
from threading import Lock

_sessions: dict[str, dict] = {}
_lock = Lock()

SESSION_TTL = 3600  # 1 hour
MAX_SESSIONS = 10000


def create_session() -> str:
    session_id = str(uuid.uuid4())
    with _lock:
        _sessions[session_id] = {
            "history": [],
            "created_at": time.time(),
            "last_active": time.time(),
        }
    return session_id


def get_history(session_id: str) -> list[dict]:
    with _lock:
        session = _sessions.get(session_id)
        if not session:
            return []
        session["last_active"] = time.time()
        return list(session["history"])


def add_message(session_id: str, role: str, content: str):
    with _lock:
        if session_id not in _sessions:
            _sessions[session_id] = {
                "history": [],
                "created_at": time.time(),
                "last_active": time.time(),
            }
        session = _sessions[session_id]
        session["history"].append({"role": role, "content": content})
        session["last_active"] = time.time()

    try:
        from utils.admin_persist import persist_conversation
        persist_conversation(session_id, role, content)
    except Exception:
        pass


def cleanup_expired():
    """Remove sessions older than TTL. Call periodically."""
    now = time.time()
    with _lock:
        expired = [
            sid for sid, s in _sessions.items()
            if now - s["last_active"] > SESSION_TTL
        ]
        for sid in expired:
            del _sessions[sid]

        if len(_sessions) > MAX_SESSIONS:
            sorted_sessions = sorted(_sessions.items(), key=lambda x: x[1]["last_active"])
            to_remove = len(_sessions) - MAX_SESSIONS
            for sid, _ in sorted_sessions[:to_remove]:
                del _sessions[sid]
