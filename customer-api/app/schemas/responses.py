from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class SessionResponse(BaseModel):
    session_id: UUID
    store_id: int
    table_id: int
    table_number: int
    started_at: datetime

    model_config = {"from_attributes": True}


class CategoryResponse(BaseModel):
    id: int
    name: str
    sort_order: int

    model_config = {"from_attributes": True}


class MenuResponse(BaseModel):
    id: int
    name: str
    price: int
    description: str | None
    image_url: str | None
    category_id: int
    sort_order: int

    model_config = {"from_attributes": True}


class OrderItemResponse(BaseModel):
    id: int
    menu_id: int
    menu_name: str
    quantity: int
    unit_price: int
    subtotal: int

    model_config = {"from_attributes": True}


class OrderResponse(BaseModel):
    id: int
    order_number: str
    status: str
    total_amount: int
    created_at: datetime
    items: list[OrderItemResponse]

    model_config = {"from_attributes": True}
