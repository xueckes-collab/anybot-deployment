"""
Chat API router: handles conversation requests with RAG-augmented responses.
"""
from __future__ import annotations

import json
import asyncio
import logging
import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse
from services import rag_service, llm_service, session_manager

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api")


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    sources: list[dict] = []


def _check_quick_reply(message: str) -> str | None:
    try:
        from utils.admin_config import get_quick_reply
        return get_quick_reply(message)
    except Exception:
        return None


@router.post("/chat")
async def chat(req: ChatRequest) -> ChatResponse:
    """Non-streaming chat endpoint."""
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    quick = _check_quick_reply(req.message)
    if quick:
        session_id = req.session_id or session_manager.create_session()
        session_manager.add_message(session_id, "user", req.message)
        session_manager.add_message(session_id, "assistant", quick)
        return ChatResponse(reply=quick, session_id=session_id, sources=[])

    try:
        session_id = req.session_id or session_manager.create_session()
        history = session_manager.get_history(session_id)
        chunks = await asyncio.to_thread(rag_service.retrieve, req.message)
        context = rag_service.format_context(chunks)
        reply = await llm_service.chat_complete(context, req.message, history)
        session_manager.add_message(session_id, "user", req.message)
        session_manager.add_message(session_id, "assistant", reply)
        sources = [
            {"name": c["name"], "type": c["type"]}
            for c in chunks if c["name"]
        ]
        return ChatResponse(reply=reply, session_id=session_id, sources=sources)
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Chat error: %s\n%s", e, traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


@router.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    """Streaming chat endpoint via SSE."""
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    quick = _check_quick_reply(req.message)
    if quick:
        session_id = req.session_id or session_manager.create_session()
        session_manager.add_message(session_id, "user", req.message)
        session_manager.add_message(session_id, "assistant", quick)

        async def quick_gen():
            yield {"event": "meta", "data": json.dumps({"session_id": session_id, "sources": []})}
            yield {"event": "token", "data": quick}
            yield {"event": "done", "data": ""}
        return EventSourceResponse(quick_gen())

    session_id = req.session_id or session_manager.create_session()
    history = session_manager.get_history(session_id)
    chunks = await asyncio.to_thread(rag_service.retrieve, req.message)
    context = rag_service.format_context(chunks)
    sources = [
        {"name": c["name"], "type": c["type"]}
        for c in chunks if c["name"]
    ]

    async def event_generator():
        try:
            yield {"event": "meta", "data": json.dumps({
                "session_id": session_id,
                "sources": sources,
            })}
            full_reply = []
            async for token in llm_service.chat_stream(context, req.message, history):
                full_reply.append(token)
                yield {"event": "token", "data": token}
            complete_reply = "".join(full_reply)
            session_manager.add_message(session_id, "user", req.message)
            session_manager.add_message(session_id, "assistant", complete_reply)
            yield {"event": "done", "data": ""}
        except Exception as e:
            logger.error("SSE stream error: %s\n%s", e, traceback.format_exc())
            yield {"event": "error", "data": json.dumps({"error": str(e)})}

    return EventSourceResponse(event_generator())


@router.get("/health")
async def health():
    return {"status": "ok"}
