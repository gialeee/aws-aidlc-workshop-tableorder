from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import TableSession
from app.dependencies import get_db, get_current_session
from app.schemas.requests import CreateOrderRequest
from app.schemas.responses import OrderResponse
from app.services.order_service import OrderService

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("", response_model=OrderResponse)
async def create_order(
    request: CreateOrderRequest,
    session: TableSession = Depends(get_current_session),
    db: AsyncSession = Depends(get_db),
):
    service = OrderService(db)
    return await service.create_order(session.id, request.items)


@router.get("", response_model=list[OrderResponse])
async def get_orders(
    session: TableSession = Depends(get_current_session),
    db: AsyncSession = Depends(get_db),
):
    service = OrderService(db)
    return await service.get_orders_by_session(session.id)
