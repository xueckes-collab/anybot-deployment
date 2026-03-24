"""
RAG retrieval service: searches ChromaDB for relevant product knowledge.
Uses ChromaDB's built-in local embedding (same model used during indexing).
"""

from __future__ import annotations

from pathlib import Path
import chromadb

from config import get_settings


_chroma_client: chromadb.PersistentClient | None = None
_collection: chromadb.Collection | None = None


def _get_collection() -> chromadb.Collection:
    global _chroma_client, _collection
    if _collection is None:
        settings = get_settings()
        persist_dir = str(Path(__file__).resolve().parent.parent / "data" / "chroma_db")
        _chroma_client = chromadb.PersistentClient(path=persist_dir)
        _collection = _chroma_client.get_collection(name=settings.chroma_collection_name)
    return _collection


def retrieve(query: str, top_k: int | None = None) -> list[dict]:
    """
    Retrieve the most relevant knowledge chunks for a given query.
    Returns a list of dicts with keys: text, source, type, name, distance
    """
    settings = get_settings()
    if top_k is None:
        top_k = settings.rag_top_k

    collection = _get_collection()
    results = collection.query(
        query_texts=[query],
        n_results=top_k,
        include=["documents", "metadatas", "distances"],
    )

    chunks = []
    if results["documents"] and results["documents"][0]:
        for doc, meta, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        ):
            chunks.append({
                "text": doc,
                "source": meta.get("source", ""),
                "type": meta.get("type", ""),
                "name": meta.get("name", ""),
                "distance": dist,
            })

    return chunks


def format_context(chunks: list[dict]) -> str:
    """Format retrieved chunks into a context string for the LLM prompt."""
    if not chunks:
        return "No relevant product information found."

    parts = []
    for i, chunk in enumerate(chunks, 1):
        source_label = chunk["name"] or chunk["source"]
        parts.append(f"[Source {i}: {source_label}]\n{chunk['text']}")

    return "\n\n---\n\n".join(parts)
