import sys
from pathlib import Path

# shared 패키지 경로 추가
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, menus, orders

app = FastAPI(title="Customer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(menus.router)
app.include_router(orders.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
