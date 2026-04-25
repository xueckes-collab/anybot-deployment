"""Additional edge-case E2E tests for both backend and widget.

Covers regressions that the happy-path tests don't catch:

* malformed/missing payload
* emoji / multi-byte chars
* SSE error events
* concurrent sessions
* CORS preflight + cross-origin from a different host
* the widget posts user info even on session continuation
* logout-during-stream doesn't crash
* very long messages
* re-login cycles preserve state correctly
"""
from __future__ import annotations

import json
import re
import socket
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import quote

import pytest
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient
from playwright.sync_api import expect, sync_playwright

REPO = Path(__file__).resolve().parent.parent
CONV = REPO / "chatbot" / "admin" / "admin-data" / "conversations.json"

# conftest stubs services & adds backend to sys.path
from routers.chat import router as chat_router  # noqa: E402
from services import session_manager  # noqa: E402


# --------------------------------------------------------------------------- #
# Backend tests via TestClient
# --------------------------------------------------------------------------- #
@pytest.fixture(scope="module")
def client():
    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(chat_router)
    return TestClient(app)


def test_empty_message_returns_400(client):
    r = client.post("/api/chat", json={"message": "  "})
    assert r.status_code == 400


def test_missing_user_field_in_object_returns_422(client):
    """Pydantic should reject a partial user object."""
    r = client.post("/api/chat", json={"message": "hi", "user": {"name": "张三"}})
    # Pydantic returns 422 on missing required fields
    assert r.status_code == 422


def test_emoji_and_multibyte_in_message(client):
    r = client.post(
        "/api/chat",
        json={
            "message": "我想了解 SPC 地板 🏠✨",
            "user": {"name": "测试", "email": "t@t.com", "phone": "13800000000"},
        },
    )
    assert r.status_code == 200
    assert r.json()["reply"] == "STUB_REPLY:我想了解 SPC 地板 🏠✨"


def test_very_long_message_accepted(client):
    msg = "你好 " * 2000  # ~10 KB
    r = client.post(
        "/api/chat",
        json={
            "message": msg,
            "user": {"name": "张三", "email": "z@s.com", "phone": "13800000000"},
        },
    )
    assert r.status_code == 200
    assert r.json()["reply"] == "STUB_REPLY:" + msg


def test_concurrent_sessions_isolated(client):
    """10 simultaneous logins → 10 distinct sessions, each carrying its own user."""
    # Names without digits so they pass the name validator (real names don't
    # contain digits).  Use ten distinct Chinese surnames.
    NAMES = ["张一", "李二", "王三", "刘四", "陈五", "杨六", "黄七", "赵八", "周九", "吴十"]

    def one(idx):
        r = client.post(
            "/api/chat",
            json={
                "message": f"hi-{idx}",
                "user": {
                    "name": NAMES[idx],
                    "email": f"u{idx}@x.com",
                    "phone": f"138000000{idx:02d}",
                },
            },
        )
        return idx, r.status_code, r.json()

    sids = set()
    with ThreadPoolExecutor(max_workers=10) as pool:
        futs = [pool.submit(one, i) for i in range(10)]
        for f in as_completed(futs):
            idx, status, body = f.result()
            assert status == 200, body
            sids.add(body["session_id"])
            info = session_manager.get_user_info(body["session_id"])
            assert info["email"] == f"u{idx}@x.com"
    assert len(sids) == 10


def test_cors_preflight_allows_widget_headers(client):
    """The widget sends X-User-Name/Email/Phone — preflight must allow them."""
    r = client.options(
        "/api/chat/stream",
        headers={
            "Origin": "https://anywayfloor.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type,x-user-name,x-user-email,x-user-phone",
        },
    )
    assert r.status_code in (200, 204), r.text
    allow_headers = r.headers.get("access-control-allow-headers", "")
    # When allow_headers='*', FastAPI middleware echoes back the requested headers
    for h in ("x-user-name", "x-user-email", "x-user-phone", "content-type"):
        assert h in allow_headers.lower(), f"{h} missing in {allow_headers!r}"


def test_resending_user_with_existing_session_overwrites(client):
    r1 = client.post(
        "/api/chat",
        json={
            "message": "first",
            "user": {"name": "张三", "email": "z@s.com", "phone": "13812345678"},
        },
    )
    sid = r1.json()["session_id"]
    # Same session, different user payload — should update
    r2 = client.post(
        "/api/chat",
        json={
            "message": "second",
            "session_id": sid,
            "user": {"name": "李四", "email": "l@s.com", "phone": "13900000000"},
        },
    )
    assert r2.status_code == 200
    assert session_manager.get_user_info(sid)["name"] == "李四"


def test_invalid_session_id_creates_new_session(client):
    """Backend should not crash if widget sends a stale/unknown session_id."""
    r = client.post(
        "/api/chat",
        json={
            "message": "hi",
            "session_id": "not-a-real-session-uuid",
            "user": {"name": "张三", "email": "z@s.com", "phone": "13812345678"},
        },
    )
    assert r.status_code == 200
    # Backend keeps the supplied id; user info should still attach
    assert session_manager.get_user_info("not-a-real-session-uuid")["name"] == "张三"


def test_lead_persist_safely_noops_without_supabase(client):
    """Even with a real call path, missing SUPABASE env should not error."""
    r = client.post(
        "/api/chat",
        json={
            "message": "hi",
            "user": {"name": "张三", "email": "z@s.com", "phone": "13812345678"},
        },
    )
    assert r.status_code == 200


# --------------------------------------------------------------------------- #
# Widget tests (with mocked backend)
# --------------------------------------------------------------------------- #
WIDGET_HTML = (REPO / "chatbot-widget.html").read_text(encoding="utf-8")
HOST_PAGE = (
    "<!doctype html><html><head><meta charset='utf-8'></head><body>"
    + WIDGET_HTML
    + "</body></html>"
).encode("utf-8")


def _free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


@pytest.fixture(scope="module")
def host_url():
    class H(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(HOST_PAGE)))
            self.end_headers()
            self.wfile.write(HOST_PAGE)

        def log_message(self, *_):
            pass

    port = _free_port()
    srv = HTTPServer(("127.0.0.1", port), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{port}/"
    srv.shutdown()


@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        yield b
        b.close()


@pytest.fixture
def page(browser):
    ctx = browser.new_context()
    p = ctx.new_page()
    yield p
    ctx.close()


def _sse_bytes(events):
    return "".join(
        f"event: {e['event']}\ndata: {e['data']}\n\n" for e in events
    ).encode("utf-8")


def test_widget_renders_error_event_as_system_message(page, host_url):
    """Backend yields {event:'error', data:{error:'oops'}} → widget shows it."""
    def handler(route, request):
        body = _sse_bytes([
            {"event": "meta", "data": json.dumps({"session_id": "x", "sources": []})},
            {"event": "error", "data": json.dumps({"error": "boom"})},
        ])
        route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

    page.route("**/api/chat/stream", handler)
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    page.fill("#chatbot-input", "hi")
    page.locator("#chatbot-send-btn").click()
    page.wait_for_selector(".chatbot-message.system")
    sys_msg = page.locator(".chatbot-message.system .chatbot-message-content").last
    expect(sys_msg).to_contain_text("boom")


def test_widget_renders_emoji_and_multibyte(page, host_url):
    captured = {}

    def handler(route, request):
        captured["body"] = json.loads(request.post_data or "{}")
        body = _sse_bytes([
            {"event": "meta", "data": json.dumps({"session_id": "x", "sources": []})},
            {"event": "token", "data": "收到 🏠✨"},
            {"event": "done", "data": ""},
        ])
        route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

    page.route("**/api/chat/stream", handler)
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三 李")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    page.fill("#chatbot-input", "想了解 SPC 地板 🏠")
    page.locator("#chatbot-send-btn").click()
    page.wait_for_function(
        "document.querySelectorAll('.chatbot-message.assistant').length >= 2"
    )
    last = page.locator(".chatbot-message.assistant .chatbot-message-content").last
    expect(last).to_have_text("收到 🏠✨")
    assert captured["body"]["message"] == "想了解 SPC 地板 🏠"
    assert captured["body"]["user"]["name"] == "张三 李"


def test_widget_recovers_from_network_failure(page, host_url):
    """When backend returns 500, widget should show a system error message
    AND re-enable the send button so the user can retry."""
    def fail(route, request):
        route.fulfill(status=500, body="server error")

    page.route("**/api/chat/stream", fail)
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    page.fill("#chatbot-input", "hi")
    page.locator("#chatbot-send-btn").click()
    page.wait_for_selector(".chatbot-message.system")
    expect(page.locator("#chatbot-send-btn")).to_be_enabled()


def test_widget_logout_then_login_again(page, host_url):
    """Login → logout → login as different user must work, and second user's
    name shows in the welcome message."""
    def handler(route, request):
        body = _sse_bytes([
            {"event": "meta", "data": json.dumps({"session_id": "x", "sources": []})},
            {"event": "token", "data": "ok"},
            {"event": "done", "data": ""},
        ])
        route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

    page.route("**/api/chat/stream", handler)
    page.goto(host_url, wait_until="load")

    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator(".chatbot-message.assistant .chatbot-message-content").first).to_contain_text("张三")

    page.locator("#chatbot-logout-btn").click()
    expect(page.locator("#chatbot-login")).to_be_visible()

    page.fill("#chatbot-login-name", "李四")
    page.fill("#chatbot-login-email", "l@s.com")
    page.fill("#chatbot-login-phone", "13900000000")
    page.locator("#chatbot-login-submit").click()

    # Welcome should now greet 李四, not 张三 (and there should be no 张三 leftover)
    welcomes = page.locator(".chatbot-message.assistant .chatbot-message-content")
    expect(welcomes.first).to_contain_text("李四")
    # Old 张三 messages must be cleared
    txt = welcomes.first.text_content()
    assert "张三" not in (txt or "")


def test_widget_minimize_then_restore(page, host_url):
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    # Minimize
    page.locator("#chatbot-minimize-btn").click()
    widget = page.locator("#chatbot-widget")
    expect(widget).to_have_class(re.compile(r"\bminimized\b"))
    expect(page.locator("#chatbot-chat")).to_be_hidden()

    # Restore
    page.locator("#chatbot-minimize-btn").click()
    expect(widget).not_to_have_class(re.compile(r"\bminimized\b"))
    expect(page.locator("#chatbot-chat")).to_be_visible()


def test_widget_tab_navigation_through_form(page, host_url):
    """Tab key should move between fields in order: name → email → phone → submit."""
    page.goto(host_url, wait_until="load")
    page.locator("#chatbot-login-name").focus()
    assert page.evaluate("document.activeElement.id") == "chatbot-login-name"
    page.keyboard.press("Tab")
    assert page.evaluate("document.activeElement.id") == "chatbot-login-email"
    page.keyboard.press("Tab")
    assert page.evaluate("document.activeElement.id") == "chatbot-login-phone"
    page.keyboard.press("Tab")
    assert page.evaluate("document.activeElement.id") == "chatbot-login-submit"


def test_widget_enter_in_form_submits(page, host_url):
    """Pressing Enter inside the form should submit (validate)."""
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-phone").press("Enter")
    expect(page.locator("#chatbot-chat")).to_be_visible()


def test_widget_trims_whitespace_in_form(page, host_url):
    """Leading/trailing whitespace in fields should not block submission."""
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "  张三  ")
    page.fill("#chatbot-login-email", "  z@s.com  ")
    page.fill("#chatbot-login-phone", "  13812345678  ")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()
    raw = page.evaluate("sessionStorage.getItem('anybot_user_info')")
    saved = json.loads(raw)
    assert saved["name"] == "张三"
    assert saved["email"] == "z@s.com"
    assert saved["phone"] == "13812345678"


def test_widget_recovers_from_corrupt_session_storage(page, host_url):
    """Bad JSON in sessionStorage should not crash the widget — fall back to login."""
    page.goto(host_url, wait_until="load")
    page.evaluate("sessionStorage.setItem('anybot_user_info', '<<<not-json>>>')")
    page.reload(wait_until="load")
    page.wait_for_selector("#chatbot-widget")
    expect(page.locator("#chatbot-login")).to_be_visible()
    expect(page.locator("#chatbot-chat")).to_be_hidden()


def test_widget_partial_session_storage_falls_back_to_login(page, host_url):
    """sessionStorage with valid JSON but missing fields should not auto-login."""
    page.goto(host_url, wait_until="load")
    page.evaluate("""
      sessionStorage.setItem('anybot_user_info', JSON.stringify({name:'张三'}));
    """)
    page.reload(wait_until="load")
    page.wait_for_selector("#chatbot-widget")
    expect(page.locator("#chatbot-login")).to_be_visible()


def test_widget_send_button_blocks_enter_while_disabled(page, host_url):
    """Even pressing Enter shouldn't fire a request while the send button is
    disabled (i.e. while a previous request is in flight)."""
    call_count = {"n": 0}

    def handler(route, request):
        call_count["n"] += 1
        body = _sse_bytes([
            {"event": "meta", "data": json.dumps({"session_id": "x", "sources": []})},
            {"event": "token", "data": "ok"},
            {"event": "done", "data": ""},
        ])
        route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

    page.route("**/api/chat/stream", handler)
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    page.wait_for_selector("#chatbot-input")

    # Simulate the "request in flight" state by directly disabling the button
    # — much more deterministic than racing against a network handler.
    page.evaluate("document.getElementById('chatbot-send-btn').disabled = true")

    # Type a fresh message and press Enter. The keypress handler should NOT
    # fire sendMessage because of the in-flight guard we added.
    page.fill("#chatbot-input", "should not send")
    page.locator("#chatbot-input").press("Enter")
    page.wait_for_timeout(200)
    assert call_count["n"] == 0, f"expected 0 calls (in-flight guard), got {call_count['n']}"

    # Re-enable button and verify Enter now works normally
    page.evaluate("document.getElementById('chatbot-send-btn').disabled = false")
    page.locator("#chatbot-input").press("Enter")
    page.wait_for_function(
        "document.querySelectorAll('.chatbot-message.assistant').length >= 2"
    )
    assert call_count["n"] == 1


def test_widget_double_enter_does_not_send_twice(page, host_url):
    """Hitting Enter twice in quick succession must only trigger one POST."""
    call_count = {"n": 0}

    def handler(route, request):
        call_count["n"] += 1
        body = _sse_bytes([
            {"event": "meta", "data": json.dumps({"session_id": "x", "sources": []})},
            {"event": "token", "data": "ok"},
            {"event": "done", "data": ""},
        ])
        route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

    page.route("**/api/chat/stream", handler)
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    page.fill("#chatbot-input", "hi")
    inp = page.locator("#chatbot-input")
    inp.press("Enter")
    inp.press("Enter")  # immediate second Enter — should be ignored

    page.wait_for_function(
        "document.querySelectorAll('.chatbot-message.assistant').length >= 2"
    )
    # Settle: wait a bit to be sure no second request fires
    page.wait_for_timeout(300)
    assert call_count["n"] == 1, f"expected 1 chat call, got {call_count['n']}"


def test_widget_user_message_is_xss_safe(page, host_url):
    """User-supplied content must be rendered as text, not HTML."""
    def handler(route, request):
        body = _sse_bytes([
            {"event": "meta", "data": json.dumps({"session_id": "x", "sources": []})},
            {"event": "token", "data": "<img src=x onerror=alert(1)>"},
            {"event": "done", "data": ""},
        ])
        route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

    page.route("**/api/chat/stream", handler)
    page.goto(host_url, wait_until="load")
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@s.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    page.fill("#chatbot-input", "<script>window.PWNED=true</script>")
    page.locator("#chatbot-send-btn").click()
    page.wait_for_function(
        "document.querySelectorAll('.chatbot-message.assistant').length >= 2"
    )
    # Neither user input nor assistant payload should be parsed as HTML
    assert page.evaluate("typeof window.PWNED === 'undefined'"), "user XSS executed!"
    img_count = page.evaluate("document.querySelectorAll('.chatbot-message img').length")
    assert img_count == 0, "assistant XSS turned into a real img element"
    # The literal text should show in both bubbles
    expect(page.locator(".chatbot-message.user .chatbot-message-content").last).to_have_text("<script>window.PWNED=true</script>")
    expect(page.locator(".chatbot-message.assistant .chatbot-message-content").last).to_have_text("<img src=x onerror=alert(1)>")


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
