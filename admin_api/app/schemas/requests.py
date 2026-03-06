from pydantic import BaseModel, Field


class AdminLoginRequest(BaseModel):
    store_id: int
    username: str
    password: str


class UpdateOrderStatusRequest(BaseModel):
    status: str = Field(..., pattern="^(PENDING|PREPARING|COMPLETED)$")


class CreateMenuRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: int = Field(..., gt=0, le=1_000_000)
    description: str | None = None
    image_url: str | None = None
    category_id: int
    sort_order: int = 0


class UpdateMenuRequest(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=100)
    price: int | None = Field(None, gt=0, le=1_000_000)
    description: str | None = None
    image_url: str | None = None
    category_id: int | None = None
    sort_order: int | None = None


class CreateCategoryRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    sort_order: int = 0


class UpdateCategoryRequest(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=50)
    sort_order: int | None = None
