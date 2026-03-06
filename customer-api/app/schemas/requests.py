from pydantic import BaseModel, Field


class TableLoginRequest(BaseModel):
    store_code: str = Field(..., min_length=1, max_length=50)
    table_number: int = Field(..., gt=0)
    password: str = Field(..., min_length=1, max_length=100)


class OrderItemInput(BaseModel):
    menu_id: int
    quantity: int = Field(..., gt=0, le=99)


class CreateOrderRequest(BaseModel):
    items: list[OrderItemInput] = Field(..., min_length=1)
