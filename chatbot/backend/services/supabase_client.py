"""Supabase client singleton.

Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from environment variables.
The service role key bypasses Row Level Security, so it is only used server-side
and MUST never be exposed to the browser.
"""
import os
from functools import lru_cache

from supabase import create_client, Client


@lru_cache(maxsize=1)
def get_supabase() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        raise RuntimeError(
            "Supabase is not configured. Please set SUPABASE_URL and "
            "SUPABASE_SERVICE_ROLE_KEY environment variables."
        )
    return create_client(url, key)
