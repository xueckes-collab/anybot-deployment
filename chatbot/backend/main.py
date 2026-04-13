""" Anyway Flooring Chatbot - FastAPI Application """
import asyncio
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles

from config import get_settings
from routers.chat import router as chat_router
from services.session_manager import cleanup_expired


@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(_session_cleanup_loop())
    yield
    task.cancel()


async def _session_cleanup_loop():
    while True:
        await asyncio.sleep(300)
        cleanup_expired()


app = FastAPI(
    title="Anyway Flooring Chatbot API",
    version="1.0.0",
    lifespan=lifespan,
)

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 项目根目录（chatbot/backend -> chatbot -> 项目根）
_project_root = Path(__file__).resolve().parent.parent.parent
widget_dir = _project_root / "chatbot" / "widget"

# 主站静态资源
_html_dir = _project_root / "html"
_style_dir = _project_root / "style"
_img_dir = _project_root / "img"


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """Return 204 No Content for favicon to suppress browser 404 errors."""
    return Response(status_code=204)


@app.get("/")
async def serve_home():
    """主站首页"""
    index_path = _html_dir / "index.html"
    if index_path.exists():
        return FileResponse(str(index_path), media_type="text/html")
    return {"status": "ok", "message": "Anyway Flooring API", "docs": "/docs"}


@app.get("/health")
async def health_check():
    """根路径健康检查接口"""
    return {"status": "ok"}


@app.get("/widget/{filename}")
async def serve_widget(filename: str):
    """Serve widget files with no-cache headers."""
    fpath = widget_dir / filename
    if not fpath.exists() or not fpath.is_file():
        return Response(status_code=404)
    media = "text/css" if filename.endswith(".css") else "application/javascript"
    return FileResponse(
        str(fpath),
        media_type=media,
        headers={"Cache-Control": "no-cache, no-store, must-revalidate", "Pragma": "no-cache"},
    )


test_page = Path(__file__).resolve().parent / "test.html"
if test_page.exists():
    @app.get("/test")
    async def serve_test():
        return FileResponse(str(test_page), media_type="text/html")


# 挂载静态资源（必须在具体路由之后）
if _html_dir.exists():
    app.mount("/html", StaticFiles(directory=str(_html_dir), html=True), name="html")
if _style_dir.exists():
    app.mount("/style", StaticFiles(directory=str(_style_dir)), name="style")
if _img_dir.exists():
    app.mount("/img", StaticFiles(directory=str(_img_dir)), name="img")

# 最后包含 API 路由
app.include_router(chat_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
