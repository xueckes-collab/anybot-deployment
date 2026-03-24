"""
从管理后台同步的 config.json 读取配置，供 LLM 使用。
"""
from __future__ import annotations

import json
from pathlib import Path

_CONFIG_PATH = Path(__file__).resolve().parent.parent.parent / "admin" / "admin-data" / "config.json"
_CONFIG_CACHE: dict | None = None


def get_admin_config() -> dict:
    """读取管理后台配置，每次请求时重新读取以支持热更新"""
    global _CONFIG_CACHE
    if not _CONFIG_PATH.exists():
        return {}
    try:
        with open(_CONFIG_PATH, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def get_system_prompt() -> str | None:
    cfg = get_admin_config()
    return cfg.get("system_prompt") or None


def get_temperature() -> float:
    cfg = get_admin_config()
    try:
        return float(cfg.get("temperature", 0.7))
    except (TypeError, ValueError):
        return 0.7


def get_max_tokens() -> int:
    cfg = get_admin_config()
    try:
        return int(cfg.get("max_tokens", 2048))
    except (TypeError, ValueError):
        return 2048


def get_model() -> str | None:
    cfg = get_admin_config()
    return cfg.get("model") or None


def get_quick_reply(user_message: str) -> str | None:
    """若用户消息匹配快捷回复规则，返回预设内容；否则返回 None"""
    cfg = get_admin_config()
    rules = cfg.get("quick_replies") or []
    msg_lower = user_message.strip().lower()
    for r in rules:
        kw = (r.get("keyword") or "").strip().lower()
        if kw and kw in msg_lower:
            return (r.get("reply") or "").strip()
    return None
