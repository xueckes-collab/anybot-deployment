"""
LLM service: manages prompt construction and OpenAI API calls with streaming support.
Reads system prompt, temperature, max_tokens, model from admin config when available.
"""
from __future__ import annotations

from collections.abc import AsyncGenerator

from openai import AsyncOpenAI

from config import get_settings

DEFAULT_SYSTEM_PROMPT = """You are an intelligent product consultant for Anyway Flooring, \
a professional flooring and wall panel manufacturer. Your job is to help customers \
learn about products, compare options, and make informed decisions.

Rules:
- Answer based ONLY on the product knowledge provided below. Do not fabricate specs or claims.
- If the knowledge base doesn't have the answer, say so honestly and suggest contacting the sales team.
- Be professional yet friendly. Use tables for parameter comparisons when helpful.
- When recommending products, explain your reasoning.
- You can respond in the same language the customer uses (English, Chinese, etc.).

【Product Knowledge】
{context}"""

_async_client: AsyncOpenAI | None = None


def _get_async_client() -> AsyncOpenAI:
    global _async_client
    if _async_client is None:
        settings = get_settings()
        _async_client = AsyncOpenAI(api_key=settings.openai_api_key, base_url=settings.openai_base_url)
    return _async_client


def _get_system_prompt_template() -> str:
    try:
        from utils.admin_config import get_system_prompt
        prompt = get_system_prompt()
        if prompt:
            if "{context}" in prompt:
                return prompt
            return prompt.rstrip() + "\n\n【Product Knowledge】\n{context}"
    except Exception:
        pass
    return DEFAULT_SYSTEM_PROMPT


def build_messages(
    context: str,
    user_message: str,
    chat_history: list[dict],
) -> list[dict]:
    """Build the messages array for the OpenAI Chat API."""
    template = _get_system_prompt_template()
    system_content = template.format(context=context)
    system_msg = {"role": "system", "content": system_content}
    messages = [system_msg]
    settings = get_settings()
    max_turns = settings.max_history_turns
    if chat_history:
        messages.extend(chat_history[-max_turns * 2 :])
    messages.append({"role": "user", "content": user_message})
    return messages


def _get_llm_params():
    settings = get_settings()
    try:
        from utils.admin_config import get_temperature, get_max_tokens, get_model
        temp = get_temperature()
        max_tok = get_max_tokens()
        model = get_model() or settings.openai_model
        return model, temp, max_tok
    except Exception:
        return settings.openai_model, 0.7, 2048


async def chat_stream(
    context: str,
    user_message: str,
    chat_history: list[dict],
) -> AsyncGenerator[str, None]:
    """Stream chat response tokens from OpenAI."""
    model, temp, max_tok = _get_llm_params()
    client = _get_async_client()
    messages = build_messages(context, user_message, chat_history)
    stream = await client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
        temperature=temp,
        max_tokens=max_tok,
    )
    async for chunk in stream:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta
        if delta and delta.content:
            yield delta.content


async def chat_complete(
    context: str,
    user_message: str,
    chat_history: list[dict],
) -> str:
    """Non-streaming chat completion (collects tokens from streaming call)."""
    tokens: list[str] = []
    async for token in chat_stream(context, user_message, chat_history):
        tokens.append(token)
    return "".join(tokens)
