"""Shared test fixtures + service stubs.

We stub out ``services.rag_service`` and ``services.llm_service`` *once* at
module import time so that all test files share the same fake behaviour.
Otherwise re-stubbing per file would not rebind the names already imported by
``routers.chat`` (which captures ``llm_service`` at first import).
"""
from __future__ import annotations

import os
import sys
import types
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parent.parent
BACKEND = REPO / "chatbot" / "backend"
sys.path.insert(0, str(BACKEND))

# --- Stub heavy services BEFORE routers are imported anywhere ---
import services as services_pkg  # noqa: E402

fake_rag = types.ModuleType("services.rag_service")
fake_rag.retrieve = lambda q, top_k=None: [
    {"text": "stub knowledge", "source": "stub", "type": "doc", "name": "stub", "distance": 0.1}
]
fake_rag.format_context = lambda chunks: "stub-context"
sys.modules["services.rag_service"] = fake_rag
services_pkg.rag_service = fake_rag


async def _stub_chat_complete(ctx, msg, history):
    return "STUB_REPLY:" + msg


async def _stub_chat_stream(ctx, msg, history):
    """Yields tokens that begin with 'STUB_REPLY:' so all tests can assert it."""
    yield "STUB_REPLY:"
    yield msg


fake_llm = types.ModuleType("services.llm_service")
fake_llm.chat_complete = _stub_chat_complete
fake_llm.chat_stream = _stub_chat_stream
sys.modules["services.llm_service"] = fake_llm
services_pkg.llm_service = fake_llm

# Drop Supabase env so lead_persist no-ops (we don't have a real instance)
for k in ("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"):
    os.environ.pop(k, None)
os.environ.setdefault("OPENAI_API_KEY", "sk-test-dummy")


CONV = REPO / "chatbot" / "admin" / "admin-data" / "conversations.json"
CONV.parent.mkdir(parents=True, exist_ok=True)


@pytest.fixture(autouse=True)
def _reset_shared_state():
    """Wipe persistence file + in-memory sessions before every test."""
    if CONV.exists():
        CONV.unlink()
    from services import session_manager
    session_manager._sessions.clear()  # type: ignore[attr-defined]
    yield
