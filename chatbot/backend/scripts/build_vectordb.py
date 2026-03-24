"""
Build the ChromaDB vector database from extracted Markdown documents.
Uses ChromaDB's built-in local embedding (no external API needed).
"""

import sys
import json
from pathlib import Path

import chromadb

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from config import get_settings


EXTRACTED_DIR = Path(__file__).resolve().parent.parent / "data" / "extracted"


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """Split text into overlapping chunks by character count, respecting word boundaries."""
    if len(text) <= chunk_size:
        return [text]

    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        if end < len(text):
            boundary = text.rfind(" ", start, end)
            if boundary > start:
                end = boundary
        chunks.append(text[start:end].strip())
        start = end - overlap
    return [c for c in chunks if c]


def main():
    settings = get_settings()

    catalog_path = EXTRACTED_DIR / "catalog.json"
    if not catalog_path.exists():
        print("ERROR: catalog.json not found. Run extract_products.py first.")
        sys.exit(1)

    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    print(f"Found {len(catalog)} documents in catalog")

    documents = []
    metadatas = []
    ids = []

    for idx, entry in enumerate(catalog):
        filepath = EXTRACTED_DIR / entry["file"]
        if not filepath.exists():
            continue

        content = filepath.read_text(encoding="utf-8")
        chunks = chunk_text(content, settings.rag_chunk_size, settings.rag_chunk_overlap)

        for chunk_idx, chunk in enumerate(chunks):
            doc_id = f"{idx}_{chunk_idx}"
            documents.append(chunk)
            metadatas.append({
                "source": entry["file"],
                "type": entry.get("type", "unknown"),
                "name": entry.get("name") or entry.get("title", ""),
                "chunk_index": chunk_idx,
            })
            ids.append(doc_id)

    print(f"Total chunks to embed: {len(documents)}")

    persist_dir = str(Path(__file__).resolve().parent.parent / "data" / "chroma_db")
    chroma_client = chromadb.PersistentClient(path=persist_dir)

    try:
        chroma_client.delete_collection(settings.chroma_collection_name)
    except Exception:
        pass

    collection = chroma_client.get_or_create_collection(
        name=settings.chroma_collection_name,
        metadata={"hnsw:space": "cosine"},
    )

    print("Embedding and inserting chunks (using local model, no API needed)...")
    batch_size = 200
    for i in range(0, len(documents), batch_size):
        end = min(i + batch_size, len(documents))
        collection.add(
            ids=ids[i:end],
            documents=documents[i:end],
            metadatas=metadatas[i:end],
        )
        print(f"  Inserted {end}/{len(documents)} chunks")

    print(f"\nVector database built successfully at: {persist_dir}")
    print(f"  Collection: {settings.chroma_collection_name}")
    print(f"  Total vectors: {collection.count()}")


if __name__ == "__main__":
    main()
