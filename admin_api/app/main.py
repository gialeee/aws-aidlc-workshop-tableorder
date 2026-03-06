from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from admin_api.app.routers import auth, orders, tables, menus, categories

app = FastAPI(title="Admin API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(orders.router)
app.include_router(tables.router)
app.include_router(menus.router)
app.include_router(categories.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
