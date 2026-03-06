from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sse_starlette.sse import EventSourceResponse

from admin_api.app.dependencies import get_db, get_current_admin
from admin_api.app.schemas.requests import UpdateOrderStatusRequest
from admin_api.app.schemas.responses import OrderResponse, OrderItemResponse, MessageResponse
from admin_api.app.services.order_service import OrderService

router = APIRouter(prefix="/api/admin/orders", tags=["orders"])


@router.get("")
async def get_orders(admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = OrderService(db)
    orders = await service.get_orders_by_store(admin["store_id"])
    return [
        OrderResponse(
            id=o.id, store_id=o.store_id, table_id=o.table_id, order_number=o.order_number,
            status=o.status, total_amount=o.total_amount, created_at=o.created_at,
            session_started_at=o.session.started_at if o.session else None,
            items=[OrderItemResponse.model_validate(i) for i in o.items],
        ) for o in orders
    ]


@router.get("/stream")
async def order_stream(token: str, db: AsyncSession = Depends(get_db)):
    from admin_api.app.services.auth_service import AuthService
    admin = AuthService.verify_token(token)
    service = OrderService(db)
    return EventSourceResponse(service.stream_orders(admin["store_id"]))


@router.put("/{order_id}/status", response_model=OrderResponse)
async def update_order_status(
    order_id: int, request: UpdateOrderStatusRequest, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)
):
    service = OrderService(db)
    return await service.update_status(order_id, request.status)


@router.delete("/{order_id}", response_model=MessageResponse)
async def delete_order(order_id: int, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = OrderService(db)
    await service.delete_order(order_id)
    return MessageResponse(message="Order deleted")
