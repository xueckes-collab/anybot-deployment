# Anyway Flooring AI Chatbot

An intelligent product consultation chatbot for Anyway Flooring, powered by OpenAI GPT and RAG (Retrieval-Augmented Generation).

## Features

- **Smart Product Q&A** — Answers customer questions based on your actual product data
- **RAG Knowledge Base** — Automatically extracts product info from your website's HTML pages
- **Streaming Responses** — Real-time typewriter-style output via SSE
- **Session Memory** — Maintains conversation context across messages
- **Embeddable Widget** — One-line integration into any HTML page via Shadow DOM

## Architecture

```
Frontend (widget)          Backend (FastAPI)           Data
┌─────────────┐    HTTP    ┌──────────────────┐     ┌──────────┐
│ Chat Widget │───────────>│ /api/chat/stream │────>│ ChromaDB │
│ (vanilla JS)│<───────────│                  │     │ (vectors)│
│ Shadow DOM  │    SSE     │  RAG retrieval   │     └──────────┘
└─────────────┘            │  OpenAI GPT call │
                           └──────────────────┘
```

## Quick Start

### Prerequisites

- Python 3.11+
- OpenAI API key

### 1. Install Dependencies

```bash
cd chatbot/backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and set your OPENAI_API_KEY
```

### 3. Extract Product Data from Website

```bash
python scripts/extract_products.py
```

This parses all product pages and articles from `../html/` and outputs structured Markdown files to `data/extracted/`.

### 4. Build the Vector Database

```bash
python scripts/build_vectordb.py
```

This chunks the extracted documents, generates embeddings via OpenAI, and stores them in ChromaDB.

### 5. Start the Server

```bash
python main.py
# or
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API is now running at `http://localhost:8000`. You can test it:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What SPC flooring options do you have?"}'
```

### 6. Integrate Widget into Website

**Option A: Single page test**

Add this before `</body>` in any HTML file:

```html
<script src="http://localhost:8000/widget/chatbot-widget.js"
        data-api-url="http://localhost:8000" defer></script>
```

**Option B: All pages at once**

```bash
# Preview what will be changed
python scripts/integrate_widget.py --api-url https://your-domain.com --dry-run

# Apply to all HTML files
python scripts/integrate_widget.py --api-url https://your-domain.com
```

## Deployment

### Option 1: Railway (Recommended)

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy:

```bash
cd chatbot
railway up
```

4. Set environment variables in Railway dashboard:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (default: gpt-4o)

### Option 2: Docker

```bash
cd chatbot
docker build -t anyway-chatbot .
docker run -p 8000:8000 --env-file backend/.env anyway-chatbot
```

### Option 3: Render

1. Create a new Web Service on render.com
2. Connect your repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables in Render dashboard

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | (required) | Your OpenAI API key |
| `OPENAI_MODEL` | `gpt-4o` | Chat model to use |
| `OPENAI_EMBEDDING_MODEL` | `text-embedding-3-small` | Embedding model |
| `RAG_TOP_K` | `5` | Number of knowledge chunks to retrieve |
| `RAG_CHUNK_SIZE` | `500` | Characters per text chunk |
| `MAX_HISTORY_TURNS` | `10` | Max conversation turns to keep |
| `ALLOWED_ORIGINS` | `["*"]` | CORS allowed origins |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat/stream` | POST | Streaming chat (SSE) |
| `/api/chat` | POST | Non-streaming chat |
| `/api/health` | GET | Health check |
| `/widget/chatbot-widget.js` | GET | Chat widget JS |
| `/widget/chatbot-widget.css` | GET | Chat widget CSS |

## Project Structure

```
chatbot/
├── backend/
│   ├── main.py                     # FastAPI entry point
│   ├── config.py                   # Settings & env vars
│   ├── routers/
│   │   └── chat.py                 # Chat API endpoints
│   ├── services/
│   │   ├── llm_service.py          # OpenAI LLM wrapper
│   │   ├── rag_service.py          # RAG retrieval logic
│   │   └── session_manager.py      # In-memory session store
│   ├── scripts/
│   │   ├── extract_products.py     # HTML → Markdown extractor
│   │   ├── build_vectordb.py       # Markdown → ChromaDB builder
│   │   └── integrate_widget.py     # Inject widget into HTML pages
│   ├── data/
│   │   ├── extracted/              # Extracted product documents
│   │   └── chroma_db/              # ChromaDB persistent storage
│   ├── requirements.txt
│   └── .env.example
├── widget/
│   ├── chatbot-widget.js           # Embeddable chat component
│   └── chatbot-widget.css          # Widget styles
├── Dockerfile
└── README.md
```

## Updating the Knowledge Base

When product information changes, re-run the data pipeline:

```bash
cd chatbot/backend
python scripts/extract_products.py    # Re-extract from HTML
python scripts/build_vectordb.py      # Rebuild vector DB
```

The server will pick up the new data on the next query (no restart needed if using PersistentClient).
