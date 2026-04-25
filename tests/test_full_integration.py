"""Fully integrated test: real FastAPI backend + real browser widget.

Uses the conftest stubs (chat_stream returns 'STUB_REPLY:' + message) so we
verify the entire pipeline:

1. Real uvicorn backend on a random port
2. Real host page serving the widget pointing CONFIG.apiUrl at the backend
3. Playwright drives login + chat
4. Verify the widget shows the streamed assistant reply
5. Verify the backend persisted lead info to conversations.json
"""
from __future__ import annotations

import json
import re
import socket
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

import pytest
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from playwright.sync_api import expect, sync_playwright

REPO = Path(__file__).resolve().parent.parent
CONV = REPO / "chatbot" / "admin" / "admin-data" / "conversations.json"

# conftest.py already stubbed services & added backend to sys.path
from routers.chat import router as chat_router  # noqa: E402


# --------------------------------------------------------------------------- #
def _free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


def _wait_for(url: str, timeout: float = 10.0):
    import urllib.request

    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            urllib.request.urlopen(url, timeout=0.5)
            return
        except Exception:
            time.sleep(0.1)
    raise RuntimeError(f"server at {url} did not become ready in {timeout}s")


@pytest.fixture(scope="module")
def backend_url():
    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(chat_router)

    port = _free_port()
    config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="warning")
    server = uvicorn.Server(config)
    t = threading.Thread(target=server.run, daemon=True)
    t.start()
    _wait_for(f"http://127.0.0.1:{port}/api/health")
    yield f"http://127.0.0.1:{port}"
    server.should_exit = True
    t.join(timeout=5)


@pytest.fixture(scope="module")
def host_url(backend_url):
    """Serve a page embedding the widget, with apiUrl pointing at the backend."""
    widget_html = (REPO / "chatbot-widget.html").read_text(encoding="utf-8")
    patched = re.sub(
        r"apiUrl: 'http://localhost:8000'",
        f"apiUrl: '{backend_url}'",
        widget_html,
        count=1,
    )
    page_html = (
        "<!doctype html><html><head><meta charset='utf-8'></head><body>"
        + patched
        + "</body></html>"
    ).encode("utf-8")

    class H(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(page_html)))
            self.end_headers()
            self.wfile.write(page_html)

        def log_message(self, *args):
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
def test_full_pipeline_login_chat_persist(page, host_url):
    page.goto(host_url, wait_until="load")
    page.wait_for_selector("#chatbot-widget")
    expect(page.locator("#chatbot-login")).to_be_visible()

    page.fill("#chatbot-login-name", "王五")
    page.fill("#chatbot-login-email", "wang@example.com")
    page.fill("#chatbot-login-phone", "13900001234")
    page.locator("#chatbot-login-submit").click()
    expect(page.locator("#chatbot-chat")).to_be_visible()

    page.fill("#chatbot-input", "测试一下")
    page.locator("#chatbot-send-btn").click()

    # Stub yields 'STUB_REPLY:' + message — wait for that exact reply
    page.wait_for_function(
        """() => {
            const els = document.querySelectorAll('.chatbot-message.assistant .chatbot-message-content');
            return els.length >= 2 && els[1].textContent.includes('STUB_REPLY:测试一下');
        }""",
        timeout=15000,
    )
    last = page.locator(".chatbot-message.assistant .chatbot-message-content").last
    expect(last).to_have_text("STUB_REPLY:测试一下")

    # Backend should have persisted the lead + conversation
    deadline = time.time() + 5.0
    data = None
    while time.time() < deadline:
        if CONV.exists():
            try:
                data = json.loads(CONV.read_text(encoding="utf-8"))
                if data["conversations"] and data["messages"]:
                    break
            except Exception:
                pass
        time.sleep(0.1)
    assert data, "conversations.json was never written"

    convs = data["conversations"]
    assert len(convs) == 1, convs
    c = convs[0]
    assert c["name"] == "王五"
    assert c["email"] == "wang@example.com"
    assert c["phone"] == "13900001234"

    msgs = data["messages"]
    assert [m["role"] for m in msgs] == ["user", "assistant"]
    assert msgs[0]["content"] == "测试一下"
    assert "STUB_REPLY:测试一下" in msgs[1]["content"]


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-v", "-s"]))
