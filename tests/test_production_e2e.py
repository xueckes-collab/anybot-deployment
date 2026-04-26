"""End-to-end test against the LIVE production backend.

Hosts the widget locally, points it at https://anybot-api.onrender.com,
drives login + chat in a real browser, and verifies error handling.

Note: with the current invalid OPENAI_API_KEY in production, the chat
itself will return a 500 error.  That's intentional — the test verifies
the widget handles the error gracefully (system message + button re-enabled)
rather than crashing.
"""
from __future__ import annotations

import json
import socket
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

import pytest
from playwright.sync_api import expect, sync_playwright

REPO = Path(__file__).resolve().parent.parent
PROD_API = "https://anybot-api.onrender.com"


def _free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


@pytest.fixture(scope="module")
def widget_url():
    """Serve a host page that embeds my chatbot-widget.html and points it
    at the production backend."""
    widget_html = (REPO / "chatbot-widget.html").read_text(encoding="utf-8")
    page_html = (
        "<!doctype html><html><head><meta charset='utf-8'>"
        f"<script>window.ANYBOT_API_URL = {PROD_API!r};</script>"
        "<title>prod e2e host</title></head><body>"
        "<h1>Production E2E Test Host</h1>"
        + widget_html
        + "</body></html>"
    ).encode("utf-8")

    class H(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(page_html)))
            self.end_headers()
            self.wfile.write(page_html)

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
    page = ctx.new_page()
    yield page
    ctx.close()


# --------------------------------------------------------------------------- #
def test_widget_loads_and_login_works_against_prod(page, widget_url):
    page.goto(widget_url, wait_until="load")
    page.wait_for_selector("#chatbot-widget")
    expect(page.locator("#chatbot-login")).to_be_visible()

    page.fill("#chatbot-login-name", "测试用户")
    page.fill("#chatbot-login-email", "test@example.com")
    page.fill("#chatbot-login-phone", "13800000000")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()


def test_widget_handles_backend_500_gracefully(page, widget_url):
    """OpenAI key in prod is currently invalid → backend returns 500.
    Widget should show a system error message and re-enable the send button
    (not crash, not infinite spinner)."""
    page.goto(widget_url, wait_until="load")
    page.fill("#chatbot-login-name", "测试用户")
    page.fill("#chatbot-login-email", "test@example.com")
    page.fill("#chatbot-login-phone", "13800000000")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    page.fill("#chatbot-input", "hello prod")
    page.locator("#chatbot-send-btn").click()

    # Wait for either an assistant reply OR a system error message
    page.wait_for_selector(
        ".chatbot-message.system, .chatbot-message.assistant + .chatbot-message.assistant",
        timeout=30000,
    )
    # Send button should be re-enabled
    expect(page.locator("#chatbot-send-btn")).to_be_enabled()


def test_widget_validation_blocks_bad_input(page, widget_url):
    """Bad input should be rejected by the widget BEFORE hitting backend."""
    page.goto(widget_url, wait_until="load")
    page.fill("#chatbot-login-name", "X")  # too short
    page.fill("#chatbot-login-email", "noatsign")
    page.fill("#chatbot-login-phone", "12345")
    page.locator("#chatbot-login-submit").click()
    # Should still be on login screen with all 3 fields invalid
    import re
    expect(page.locator('.chatbot-field[data-field="name"]')).to_have_class(re.compile(r"\binvalid\b"))
    expect(page.locator('.chatbot-field[data-field="email"]')).to_have_class(re.compile(r"\binvalid\b"))
    expect(page.locator('.chatbot-field[data-field="phone"]')).to_have_class(re.compile(r"\binvalid\b"))
    expect(page.locator("#chatbot-chat")).to_be_hidden()


def _can_reach_prod() -> bool:
    """Some sandboxed CI environments block egress to *.onrender.com.
    Probe before running tests that depend on a live LLM round-trip."""
    import urllib.request, urllib.error
    try:
        urllib.request.urlopen(PROD_API + "/api/health", timeout=5).read()
        return True
    except (urllib.error.URLError, OSError, TimeoutError):
        return False


@pytest.mark.skipif(not _can_reach_prod(), reason="Sandbox egress blocks anybot-api.onrender.com")
def test_widget_gets_real_llm_reply_from_production(page, widget_url):
    """Production end-to-end: widget asks a question, real DeepSeek answers,
    streamed tokens get displayed in the chat panel.

    Skipped automatically when the test environment can't reach prod
    (e.g. sandbox network egress is restricted)."""
    page.goto(widget_url, wait_until="load")
    page.fill("#chatbot-login-name", "测试用户")
    page.fill("#chatbot-login-email", "test@example.com")
    page.fill("#chatbot-login-phone", "13800000000")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    page.fill("#chatbot-input", "Tell me about SPC flooring in one short sentence.")
    page.locator("#chatbot-send-btn").click()

    page.wait_for_function(
        """() => {
            const msgs = document.querySelectorAll('.chatbot-message.assistant .chatbot-message-content');
            if (msgs.length < 2) return false;
            const reply = msgs[1].textContent || '';
            return reply.length > 20 && !reply.includes('抱歉');
        }""",
        timeout=30000,
    )
    reply = page.locator(".chatbot-message.assistant .chatbot-message-content").nth(1).text_content()
    assert reply and len(reply) > 20
    assert "抱歉" not in reply and "Chat error" not in reply


def test_widget_send_includes_user_in_request(page, widget_url):
    """When the widget sends a message to prod, the user info should be in the body."""
    captured_requests = []

    def on_request(req):
        if "/api/chat" in req.url:
            captured_requests.append({
                "url": req.url,
                "method": req.method,
                "body": req.post_data,
                "headers": dict(req.headers),
            })

    page.on("request", on_request)

    page.goto(widget_url, wait_until="load")
    page.fill("#chatbot-login-name", "李四")
    page.fill("#chatbot-login-email", "li@si.com")
    page.fill("#chatbot-login-phone", "13900001234")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    page.fill("#chatbot-input", "test")
    page.locator("#chatbot-send-btn").click()

    # Wait for the request
    page.wait_for_function(
        "performance.getEntriesByType('resource').some(r => r.name.includes('/api/chat'))",
        timeout=15000,
    )
    page.wait_for_timeout(500)  # let request capture finish

    chat_reqs = [r for r in captured_requests if "/api/chat" in r["url"]]
    assert chat_reqs, f"no /api/chat request captured. all: {captured_requests}"
    last = chat_reqs[-1]
    assert last["method"] == "POST"
    body = json.loads(last["body"])
    assert body["message"] == "test"
    assert body["user"] == {"name": "李四", "email": "li@si.com", "phone": "13900001234"}
    # X-User-* headers
    h = {k.lower(): v for k, v in last["headers"].items()}
    assert h.get("x-user-email") == "li@si.com"
    assert h.get("x-user-phone") == "13900001234"


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-v", "-s"]))
