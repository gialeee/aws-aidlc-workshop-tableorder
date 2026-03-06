from datetime import datetime
from pydantic import BaseModel


class AdminLoginResponse(BaseModel):
    token: str
    admin_id: int
    username: str
    store_id: int


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
    store_id: int
    table_id: int
    order_number: str
    status: str
    total_amount: int
    created_at: datetime
    items: list[OrderItemResponse] = []

    model_config = {"from_attributes": True}


class OrderHistoryResponse(BaseModel):
    id: int
    original_order_id: int
    order_number: str
    status: str
    total_amount: int
    items_json: list | dict
    ordered_at: datetime
    archived_at: datetime

    model_config = {"from_attributes": True}


class MenuResponse(BaseModel):
    id: int
    store_id: int
    category_id: int
    name: str
    price: int
    description: str | None
    image_url: str | None
    sort_order: int
    is_available: bool

    model_config = {"from_attributes": True}


class CategoryResponse(BaseModel):
    id: int
    store_id: int
    name: str
    sort_order: int

    model_config = {"from_attributes": True}


class MessageResponse(BaseModel):
    message: str
