"""End-to-end browser tests for chatbot-widget.html.

Uses Playwright (Chromium) + route interception to mock /api/chat/stream
without spinning up a backend.  Verifies:

* login form renders
* invalid input shows field errors
* valid input switches to chat
* chat request body contains user info + headers
* sessionStorage persists login
* logout clears state and shows form again

Run::

    cd anybot-deployment && python3 -m pytest tests/test_widget_e2e.py -v
"""
from __future__ import annotations

import json
import re
import socket
import sys
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

import pytest
from playwright.sync_api import Page, expect, sync_playwright

REPO = Path(__file__).resolve().parent.parent
WIDGET_HTML = (REPO / "chatbot-widget.html").read_text(encoding="utf-8")

# Embed widget into a host page.  The widget's CONFIG.apiUrl is
# http://localhost:8000 by default — Playwright route() will catch any host.
HOST_PAGE = (
    "<!doctype html><html><head><meta charset='utf-8'><title>widget host</title>"
    "</head><body><h1>host page</h1>"
    + WIDGET_HTML
    + "</body></html>"
).encode("utf-8")


# --------------------------------------------------------------------------- #
# Minimal HTTP server (so the page has a real origin → sessionStorage works) #
# --------------------------------------------------------------------------- #
class _Handler(BaseHTTPRequestHandler):
    def do_GET(self):  # noqa: N802
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(HOST_PAGE)))
        self.end_headers()
        self.wfile.write(HOST_PAGE)

    def log_message(self, format, *args):  # silence
        pass


def _free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


@pytest.fixture(scope="module")
def host_url():
    port = _free_port()
    server = HTTPServer(("127.0.0.1", port), _Handler)
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    yield f"http://127.0.0.1:{port}/"
    server.shutdown()


def _sse(events: list[dict]) -> bytes:
    """Encode list of {event, data} into SSE wire format."""
    out = []
    for e in events:
        out.append(f"event: {e['event']}\ndata: {e['data']}\n\n")
    return "".join(out).encode("utf-8")


@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        yield b
        b.close()


@pytest.fixture
def page(browser):
    ctx = browser.new_context()
    page = ctx.new_page()
    yield page
    ctx.close()


# State captured by the mock so tests can assert on it
captured: dict = {}


def _install_routes(page: Page):
    captured.clear()

    def handler(route, request):
        captured["url"] = request.url
        captured["method"] = request.method
        captured["headers"] = {k.lower(): v for k, v in request.headers.items()}
        try:
            captured["body"] = json.loads(request.post_data or "{}")
        except Exception:
            captured["body"] = request.post_data
        body = _sse([
            {"event": "meta", "data": json.dumps({"session_id": "test-sid-123", "sources": []})},
            {"event": "token", "data": "Hello "},
            {"event": "token", "data": "from "},
            {"event": "token", "data": "stub!"},
            {"event": "done", "data": ""},
        ])
        route.fulfill(
            status=200,
            headers={"Content-Type": "text/event-stream"},
            body=body,
        )

    # The widget posts to ${apiUrl}/api/chat/stream where apiUrl is
    # http://localhost:8000 by default. Route both to be safe.
    page.route("**/api/chat/stream", handler)


def _open_widget(page: Page, host_url: str):
    _install_routes(page)
    page.goto(host_url, wait_until="load")
    page.wait_for_selector("#chatbot-widget")


# --------------------------------------------------------------------------- #
# Tests
# --------------------------------------------------------------------------- #
def test_login_form_renders_on_first_open(page: Page, host_url):
    _open_widget(page, host_url)
    expect(page.locator("#chatbot-login")).to_be_visible()
    expect(page.locator("#chatbot-chat")).to_be_hidden()
    expect(page.locator("#chatbot-login-name")).to_be_visible()
    expect(page.locator("#chatbot-login-email")).to_be_visible()
    expect(page.locator("#chatbot-login-phone")).to_be_visible()
    expect(page.locator("#chatbot-logout-btn")).to_be_hidden()


def test_submit_empty_form_shows_three_errors(page: Page, host_url):
    _open_widget(page, host_url)
    page.locator("#chatbot-login-submit").click()
    fields = ["name", "email", "phone"]
    for f in fields:
        sel = f'.chatbot-field[data-field="{f}"]'
        expect(page.locator(sel)).to_have_class(re.compile(r"\binvalid\b"))
        err_text = page.locator(f"{sel} .chatbot-field-error").text_content()
        assert err_text and "请输入" in err_text, f"field {f} error: {err_text!r}"
    # First invalid input should be focused
    assert page.evaluate("document.activeElement.id") == "chatbot-login-name"
    # Still on login screen
    expect(page.locator("#chatbot-chat")).to_be_hidden()


def test_invalid_email_and_phone_caught(page: Page, host_url):
    _open_widget(page, host_url)
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "noatsign")
    page.fill("#chatbot-login-phone", "12812345678")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator('.chatbot-field[data-field="email"]')).to_have_class(re.compile(r"\binvalid\b"))
    expect(page.locator('.chatbot-field[data-field="phone"]')).to_have_class(re.compile(r"\binvalid\b"))
    # Name should be valid
    expect(page.locator('.chatbot-field[data-field="name"]')).not_to_have_class(re.compile(r"\binvalid\b"))


def test_valid_login_shows_chat_and_persists_session_storage(page: Page, host_url):
    _open_widget(page, host_url)
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "zhang@example.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()

    expect(page.locator("#chatbot-chat")).to_be_visible()
    expect(page.locator("#chatbot-login")).to_be_hidden()
    expect(page.locator("#chatbot-logout-btn")).to_be_visible()

    # Welcome message starts with the user's name
    welcome = page.locator(".chatbot-message.assistant .chatbot-message-content").first
    expect(welcome).to_contain_text("张三")

    # sessionStorage carries the login info
    raw = page.evaluate("sessionStorage.getItem('anybot_user_info')")
    assert raw, "sessionStorage should be set after login"
    saved = json.loads(raw)
    assert saved["name"] == "张三"
    assert saved["email"] == "zhang@example.com"
    assert saved["phone"] == "13812345678"


def test_send_message_includes_user_info_in_request(page: Page, host_url):
    _open_widget(page, host_url)
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "zhang@example.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    # Send a message
    page.fill("#chatbot-input", "你好")
    page.locator("#chatbot-send-btn").click()

    # Wait for assistant response to land
    page.wait_for_function(
        "document.querySelectorAll('.chatbot-message.assistant').length >= 2"
    )

    # The mock captured the request body & headers
    assert captured.get("method") == "POST"
    body = captured["body"]
    assert body["message"] == "你好"
    assert body["user"] == {"name": "张三", "email": "zhang@example.com", "phone": "13812345678"}
    h = captured["headers"]
    assert h.get("x-user-email") == "zhang@example.com"
    assert h.get("x-user-phone") == "13812345678"
    # Name is URL-encoded in the header to handle non-ASCII safely
    from urllib.parse import unquote
    assert unquote(h.get("x-user-name", "")) == "张三"

    # The assistant rendered the streamed reply
    last_assistant = page.locator(".chatbot-message.assistant .chatbot-message-content").last
    expect(last_assistant).to_have_text("Hello from stub!")


def test_logout_clears_session_and_returns_to_form(page: Page, host_url):
    _open_widget(page, host_url)
    page.fill("#chatbot-login-name", "张三")
    page.fill("#chatbot-login-email", "z@e.com")
    page.fill("#chatbot-login-phone", "13812345678")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    page.locator("#chatbot-logout-btn").click()
    expect(page.locator("#chatbot-login")).to_be_visible()
    expect(page.locator("#chatbot-chat")).to_be_hidden()

    raw = page.evaluate("sessionStorage.getItem('anybot_user_info')")
    assert raw is None, f"sessionStorage should be cleared: {raw!r}"

    # Form should be reset and clean
    assert page.locator("#chatbot-login-name").input_value() == ""


def test_existing_session_skips_login(page: Page, host_url):
    _open_widget(page, host_url)
    # Pre-seed sessionStorage and re-mount widget
    page.evaluate("""
      sessionStorage.setItem('anybot_user_info', JSON.stringify({
        name:'已登录', email:'x@y.com', phone:'13812345678'
      }));
    """)
    page.goto(host_url, wait_until="load")
    page.wait_for_selector("#chatbot-widget")
    expect(page.locator("#chatbot-chat")).to_be_visible()
    expect(page.locator("#chatbot-login")).to_be_hidden()


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-v", "-s"]))
