"""End-to-end tests for /api/chat and /api/chat/stream with widget user info.

Run from repo root::

    python3 -m pytest tests/test_chat_e2e.py -v
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

REPO = Path(__file__).resolve().parent.parent
CONV = REPO / "chatbot" / "admin" / "admin-data" / "conversations.json"

# conftest.py already stubbed services & added backend to sys.path
from routers.chat import router as chat_router  # noqa: E402
from services import session_manager  # noqa: E402


@pytest.fixture(scope="module")
def client():
    app = FastAPI()
    app.include_router(chat_router)
    return TestClient(app)


def _read_convs():
    if not CONV.exists():
        return None
    return json.loads(CONV.read_text(encoding="utf-8"))


# --------------------------------------------------------------------------- #
def test_chat_with_valid_user_persists_lead(client):
    payload = {
        "message": "你好",
        "user": {"name": "张三", "email": "Foo@Bar.COM", "phone": "13812345678"},
    }
    r = client.post("/api/chat", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["reply"] == "STUB_REPLY:你好"
    sid = body["session_id"]

    info = session_manager.get_user_info(sid)
    assert info == {"name": "张三", "email": "foo@bar.com", "phone": "13812345678"}, info

    data = _read_convs()
    assert data is not None
    convs = data["conversations"]
    assert len(convs) == 1
    c = convs[0]
    assert c["session_id"] == sid
    assert c["name"] == "张三"
    assert c["email"] == "foo@bar.com"
    assert c["phone"] == "13812345678"
    msgs = data["messages"]
    assert [m["role"] for m in msgs] == ["user", "assistant"]


def test_chat_with_invalid_email_returns_400(client):
    r = client.post(
        "/api/chat",
        json={"message": "hi", "user": {"name": "张三", "email": "noatsign", "phone": "13812345678"}},
    )
    assert r.status_code == 400
    assert "邮箱" in r.json()["detail"]


def test_chat_with_invalid_phone_returns_400(client):
    r = client.post(
        "/api/chat",
        json={"message": "hi", "user": {"name": "Z", "email": "a@b.co", "phone": "13812345678"}},
    )
    assert r.status_code == 400
    assert "姓名" in r.json()["detail"]

    r = client.post(
        "/api/chat",
        json={"message": "hi", "user": {"name": "张三", "email": "a@b.co", "phone": "12812345678"}},
    )
    assert r.status_code == 400
    assert "电话" in r.json()["detail"]


def test_chat_without_user_field_still_works(client):
    """Backwards-compat: old widget without user field should still chat."""
    r = client.post("/api/chat", json={"message": "hello"})
    assert r.status_code == 200
    sid = r.json()["session_id"]
    assert session_manager.get_user_info(sid) is None
    data = _read_convs()
    assert "name" not in data["conversations"][0]


def test_chat_stream_persists_lead_and_streams(client):
    with client.stream(
        "POST",
        "/api/chat/stream",
        json={
            "message": "stream-test",
            "user": {"name": "李四", "email": "li@si.com", "phone": "+86 138 1234 5678"},
        },
    ) as resp:
        assert resp.status_code == 200
        assert resp.headers["content-type"].startswith("text/event-stream")
        body_text = "".join(resp.iter_text())

    assert "event: meta" in body_text
    assert "event: token" in body_text
    assert "event: done" in body_text
    assert "STUB_REPLY:" in body_text
    assert "stream-test" in body_text

    sids = list(session_manager._sessions.keys())  # type: ignore[attr-defined]
    assert len(sids) == 1
    info = session_manager.get_user_info(sids[0])
    assert info == {"name": "李四", "email": "li@si.com", "phone": "+86 138 1234 5678"}

    data = _read_convs()
    c = data["conversations"][0]
    assert c["name"] == "李四" and c["email"] == "li@si.com" and c["phone"] == "+86 138 1234 5678"
    roles = [m["role"] for m in data["messages"]]
    assert roles == ["user", "assistant"]
    assert "STUB_REPLY:stream-test" in data["messages"][1]["content"]


def test_session_continuity_across_two_messages(client):
    r1 = client.post(
        "/api/chat",
        json={
            "message": "first",
            "user": {"name": "张三", "email": "a@b.co", "phone": "13812345678"},
        },
    )
    sid = r1.json()["session_id"]

    r2 = client.post("/api/chat", json={"message": "second", "session_id": sid})
    assert r2.status_code == 200
    assert r2.json()["session_id"] == sid

    assert session_manager.get_user_info(sid)["name"] == "张三"

    data = _read_convs()
    assert len(data["conversations"]) == 1
    assert len(data["messages"]) == 4


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-v"]))
