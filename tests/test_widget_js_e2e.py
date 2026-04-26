"""E2E for the bubble-style chatbot-widget.js (Shadow DOM widget served at /widget/).

Loads the widget script in a local host page, mocks /api/chat/stream, drives:
- bubble click → login screen
- 3-field form validation (name / email / phone)
- valid submit → chat panel + welcome
- send message → user info goes in body + headers
- logout → returns to login
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
from playwright.sync_api import expect, sync_playwright

REPO = Path(__file__).resolve().parent.parent
WIDGET_JS = (REPO / "chatbot/widget/chatbot-widget.js").read_text(encoding="utf-8")
WIDGET_CSS = (REPO / "chatbot/widget/chatbot-widget.css").read_text(encoding="utf-8")


def _free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


@pytest.fixture(scope="module")
def host_url():
    """Serve a host page that embeds the widget JS inline (no network needed)."""
    page_html = (
        "<!doctype html><html><head><meta charset='utf-8'><title>widget host</title>"
        # Override API URL so widget doesn't try to load CSS from the network
        f"<script>window._ANYBOT_API_URL = '';</script>"
        # Inline the CSS so widget's loadCSS XHR isn't needed
        f"<style id='inlined-css'>{WIDGET_CSS}</style>"
        "</head><body><h1>host page</h1>"
        f"<script>{WIDGET_JS}</script>"
        "</body></html>"
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


def _sse(events):
    return "".join(f"event: {e['event']}\ndata: {e['data']}\n\n" for e in events).encode("utf-8")


def _open_widget(page, host_url, mock_chat=True):
    captured = {"requests": []}

    if mock_chat:
        def handler(route, request):
            captured["requests"].append({
                "url": request.url,
                "headers": {k.lower(): v for k, v in request.headers.items()},
                "body": json.loads(request.post_data or "{}"),
            })
            body = _sse([
                {"event": "meta", "data": json.dumps({"session_id": "test-sid", "sources": []})},
                {"event": "token", "data": "Hello "},
                {"event": "token", "data": "from "},
                {"event": "token", "data": "stub!"},
                {"event": "done", "data": ""},
            ])
            route.fulfill(status=200, headers={"Content-Type": "text/event-stream"}, body=body)

        page.route("**/api/chat/stream", handler)

    page.goto(host_url, wait_until="load")
    # Wait for widget script to finish creating the shadow DOM
    page.wait_for_function("document.getElementById('anyway-chatbot') && document.getElementById('anyway-chatbot').shadowRoot")
    return captured


# Helper: query inside the shadow DOM
def _shadow(page, selector):
    return page.evaluate_handle(
        f"() => document.getElementById('anyway-chatbot').shadowRoot.querySelector({selector!r})"
    ).as_element()


def _shadow_click(page, selector):
    page.evaluate(
        f"() => document.getElementById('anyway-chatbot').shadowRoot.querySelector({selector!r}).click()"
    )


def _shadow_fill(page, selector, value):
    page.evaluate(
        """([sel, val]) => {
            const el = document.getElementById('anyway-chatbot').shadowRoot.querySelector(sel);
            el.value = val;
            el.dispatchEvent(new Event('input', {bubbles:true}));
            el.dispatchEvent(new Event('change', {bubbles:true}));
        }""",
        [selector, value]
    )


def _shadow_text(page, selector):
    return page.evaluate(
        f"() => {{ const el = document.getElementById('anyway-chatbot').shadowRoot.querySelector({selector!r}); return el ? el.textContent : null; }}"
    )


def _shadow_class(page, selector):
    return page.evaluate(
        f"() => {{ const el = document.getElementById('anyway-chatbot').shadowRoot.querySelector({selector!r}); return el ? el.className : null; }}"
    )


# --------------------------------------------------------------------------- #
# Tests
# --------------------------------------------------------------------------- #
def test_bubble_visible_and_login_appears_on_click(page, host_url):
    _open_widget(page, host_url)
    # Bubble should be in shadow DOM
    cls = _shadow_class(page, ".aw-chat-toggle")
    assert cls and "aw-chat-toggle" in cls

    # Click bubble → panel opens with login screen visible (no user yet)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    # Three fields present
    for f in ["name", "email", "phone"]:
        sel = f'.aw-field[data-field="{f}"] input'
        assert page.evaluate(
            f"() => !!document.getElementById('anyway-chatbot').shadowRoot.querySelector({sel!r})"
        ), f"missing field {f}"


def test_submit_empty_form_shows_three_errors(page, host_url):
    _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    # Submit empty form
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    # All 3 fields should now be marked invalid
    for f in ["name", "email", "phone"]:
        cls = _shadow_class(page, f'.aw-field[data-field="{f}"]')
        assert cls and "invalid" in cls, f"{f} should be invalid: {cls}"
        err = _shadow_text(page, f'.aw-field[data-field="{f}"] .aw-field-error')
        assert err and ("请输入" in err or "Please" in err), f"{f} error missing: {err!r}"


def test_invalid_email_and_phone_caught(page, host_url):
    _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    _shadow_fill(page, '.aw-field[data-field="name"] input', "张三")
    _shadow_fill(page, '.aw-field[data-field="email"] input', "noatsign")
    _shadow_fill(page, '.aw-field[data-field="phone"] input[name="phone"]', "12812345678")  # bad: 2nd digit not 3-9
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    assert "invalid" not in (_shadow_class(page, '.aw-field[data-field="name"]') or "")
    assert "invalid" in (_shadow_class(page, '.aw-field[data-field="email"]') or "")
    assert "invalid" in (_shadow_class(page, '.aw-field[data-field="phone"]') or "")


def test_valid_submit_shows_personalized_welcome(page, host_url):
    _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    _shadow_fill(page, '.aw-field[data-field="name"] input', "张三")
    _shadow_fill(page, '.aw-field[data-field="email"] input', "z@s.com")
    _shadow_fill(page, '.aw-field[data-field="phone"] input[name="phone"]', "13812345678")
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    # Login screen should hide; welcome bubble should show user's name
    page.wait_for_function(
        "!document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    welcome_text = _shadow_text(page, ".aw-welcome h4")
    assert welcome_text and "张三" in welcome_text, f"welcome should mention 张三, got: {welcome_text!r}"

    # sessionStorage should hold user info
    raw = page.evaluate("sessionStorage.getItem('aw_user_info')")
    assert raw
    saved = json.loads(raw)
    assert saved["name"] == "张三" and saved["email"] == "z@s.com" and saved["phone"] == "+86 13812345678"


def test_send_message_includes_user_in_body_and_headers(page, host_url):
    captured = _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    _shadow_fill(page, '.aw-field[data-field="name"] input', "李四")
    _shadow_fill(page, '.aw-field[data-field="email"] input', "li@si.com")
    _shadow_fill(page, '.aw-field[data-field="phone"] input[name="phone"]', "13900001234")
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    page.wait_for_function(
        "!document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    # Send a message
    _shadow_fill(page, ".aw-chat-input", "你好")
    _shadow_click(page, ".aw-chat-send")

    # Wait for the streamed reply to land
    page.wait_for_function(
        "[...document.getElementById('anyway-chatbot').shadowRoot.querySelectorAll('.aw-msg-bot')].some(b => b.textContent.includes('Hello'))",
        timeout=10000,
    )

    # Verify request body + headers
    assert len(captured["requests"]) == 1
    req = captured["requests"][0]
    assert req["body"]["message"] == "你好"
    # Phone is now stored as "<dialCode> <localNumber>" — default dial code is +86
    assert req["body"]["user"] == {"name": "李四", "email": "li@si.com", "phone": "+86 13900001234"}
    h = req["headers"]
    assert h.get("x-user-email") == "li@si.com"
    assert h.get("x-user-phone") == "+86 13900001234"
    from urllib.parse import unquote
    assert unquote(h.get("x-user-name", "")) == "李四"
    # No Authorization header (no bearer token)
    assert "authorization" not in h


def test_logout_clears_session_and_returns_to_login(page, host_url):
    _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    _shadow_fill(page, '.aw-field[data-field="name"] input', "张三")
    _shadow_fill(page, '.aw-field[data-field="email"] input', "z@s.com")
    _shadow_fill(page, '.aw-field[data-field="phone"] input[name="phone"]', "13812345678")
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    page.wait_for_function(
        "!document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    # Click logout button (header)
    _shadow_click(page, ".aw-chat-logout")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    raw = page.evaluate("sessionStorage.getItem('aw_user_info')")
    assert raw is None


def test_dial_code_select_present_with_china_default(page, host_url):
    _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    # Dial select should exist
    selected = page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-dial-select').value"
    )
    assert selected == "+86", f"default dial code should be +86, got {selected!r}"
    # Should have many country options
    n_options = page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelectorAll('.aw-dial-select option').length"
    )
    assert n_options >= 20, f"should have at least 20 country options, got {n_options}"


def test_dial_code_us_then_local_number(page, host_url):
    """Switch to +1 USA, type a local US number, verify final phone is '+1 4155551234'."""
    captured = _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    _shadow_fill(page, '.aw-field[data-field="name"] input[name="name"]', "John Smith")
    _shadow_fill(page, '.aw-field[data-field="email"] input[name="email"]', "john@example.com")
    # Select +1 (first US entry)
    page.evaluate(
        """() => {
            const sel = document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-dial-select');
            sel.value = '+1';
            sel.dispatchEvent(new Event('change', {bubbles:true}));
        }"""
    )
    _shadow_fill(page, '.aw-field[data-field="phone"] input[name="phone"]', "4155551234")
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    page.wait_for_function(
        "!document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    raw = page.evaluate("sessionStorage.getItem('aw_user_info')")
    saved = json.loads(raw)
    assert saved["phone"] == "+1 4155551234", f"unexpected phone: {saved['phone']!r}"

    # Send a message and verify backend gets the combined phone
    _shadow_fill(page, ".aw-chat-input", "hi from US")
    _shadow_click(page, ".aw-chat-send")
    page.wait_for_function(
        "[...document.getElementById('anyway-chatbot').shadowRoot.querySelectorAll('.aw-msg-bot')].some(b => b.textContent.includes('Hello'))",
        timeout=10000,
    )
    assert captured["requests"][-1]["body"]["user"]["phone"] == "+1 4155551234"


def test_dial_code_china_strict_validation(page, host_url):
    """When dial code is +86, phone must be 11 digits 1[3-9]xx — short numbers rejected."""
    _open_widget(page, host_url)
    _shadow_click(page, ".aw-chat-toggle")
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    _shadow_fill(page, '.aw-field[data-field="name"] input[name="name"]', "张三")
    _shadow_fill(page, '.aw-field[data-field="email"] input[name="email"]', "z@s.com")
    # +86 is the default; type a non-Chinese-mobile local number — should be rejected
    _shadow_fill(page, '.aw-field[data-field="phone"] input[name="phone"]', "12812345678")
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    cls = _shadow_class(page, '.aw-field[data-field="phone"]')
    assert cls and "invalid" in cls

    # Switch to +1 USA — same number should now be accepted (5-15 digits)
    page.evaluate(
        """() => {
            const sel = document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-dial-select');
            sel.value = '+1';
            sel.dispatchEvent(new Event('change', {bubbles:true}));
        }"""
    )
    page.evaluate(
        "() => document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-simple-form').requestSubmit()"
    )
    page.wait_for_function(
        "!document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )


def test_existing_session_skips_login(page, host_url):
    _open_widget(page, host_url)
    # Pre-seed sessionStorage and reload
    page.evaluate("""sessionStorage.setItem('aw_user_info', JSON.stringify({
        name: '老用户', email: 'old@user.com', phone: '13812345678'
    }))""")
    page.reload(wait_until="load")
    page.wait_for_function("document.getElementById('anyway-chatbot') && document.getElementById('anyway-chatbot').shadowRoot")
    _shadow_click(page, ".aw-chat-toggle")
    # Login screen should NOT be visible
    page.wait_for_function(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-chat-panel').classList.contains('open')"
    )
    visible = page.evaluate(
        "document.getElementById('anyway-chatbot').shadowRoot.querySelector('.aw-login-screen').classList.contains('visible')"
    )
    assert not visible, "login screen should not appear when sessionStorage has valid user"


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-v", "-s"]))
