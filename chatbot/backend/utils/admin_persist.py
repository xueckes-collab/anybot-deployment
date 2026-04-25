"""
将对话记录持久化到管理后台的 conversations.json，供管理后台展示。
"""
from __future__ import annotations

import json
import threading
from pathlib import Path
from typing import Optional

_CONV_PATH = Path(__file__).resolve().parent.parent.parent / "admin" / "admin-data" / "conversations.json"
_LOCK = threading.Lock()


def persist_conversation(
    session_id: str,
    role: str,
    content: str,
    user: Optional[dict] = None,
):
    """在 add_message 后调用，将消息写入 admin conversations.json。

    ``user`` 是 widget 登录时收集的姓名 / 邮箱 / 电话信息（任意可缺）。
    第一次写入会被记到该会话上；后续如果带了更新的字段，也会合并进去，
    方便管理后台直接看到访客身份。
    """
    if not _CONV_PATH.parent.exists():
        return
    with _LOCK:
        try:
            if _CONV_PATH.exists():
                data = json.loads(_CONV_PATH.read_text(encoding="utf-8"))
            else:
                data = {"conversations": [], "messages": []}

            convs = data.get("conversations", [])
            msgs = data.get("messages", [])

            conv = next((c for c in convs if c.get("session_id") == session_id), None)
            if not conv:
                cid = max((c.get("id", 0) for c in convs), default=0) + 1
                conv = {"id": cid, "session_id": session_id, "created_at": __now()}
                convs.append(conv)
            cid = conv["id"]

            # 把访客信息合并到会话记录上（仅覆盖非空字段）
            if user:
                for key in ("name", "email", "phone"):
                    val = user.get(key)
                    if val:
                        conv[key] = val

            mid = max((m.get("id", 0) for m in msgs), default=0) + 1
            msgs.append({"id": mid, "conversation_id": cid, "role": role, "content": content, "created_at": __now()})

            data["conversations"] = convs
            data["messages"] = msgs
            _CONV_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception:
            pass


def __now():
    from datetime import datetime
    return datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
