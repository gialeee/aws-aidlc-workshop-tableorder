# Logical Components - Unit 1: Customer

## Component Diagram

```
+------------------------------------------------------------------+
|                        Customer API                               |
|                                                                   |
|  +------------------------------------------------------------+  |
|  |  Router Layer                                               |  |
|  |  - auth_router (POST /api/auth/login)                      |  |
|  |  - menu_router (GET /api/categories, /api/menus)           |  |
|  |  - order_router (POST /api/orders, GET /api/orders)        |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Dependencies                                               |  |
|  |  - get_current_session (X-Session-Id 검증)                  |  |
|  |  - get_db (DB 세션 주입)                                     |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Service Layer                                              |  |
|  |  - AuthService (로그인, 세션 관리)                            |  |
|  |  - MenuService (카테고리/메뉴 조회)                           |  |
|  |  - OrderService (주문 생성, 내역 조회)                        |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Repository Layer                                           |  |
|  |  - StoreRepository                                          |  |
|  |  - TableRepository                                          |  |
|  |  - SessionRepository                                        |  |
|  |  - MenuRepository                                           |  |
|  |  - OrderRepository                                          |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Schemas (Pydantic)                                         |  |
|  |  - requests.py (LoginRequest, CreateOrderRequest)           |  |
|  |  - responses.py (SessionResponse, MenuResponse, etc.)       |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
+------------------------------------------------------------------+
           |                                    |
    [shared models]                      [PostgreSQL]


+------------------------------------------------------------------+
|                       Customer Web                                |
|                                                                   |
|  +------------------------------------------------------------+  |
|  |  Pages                                                      |  |
|  |  - LoginPage, MenuPage, OrderHistoryPage                   |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Components                                                 |  |
|  |  - CategorySidebar, MenuGrid, MenuCard                     |  |
|  |  - CartDrawer, CartItem, CartSummary                        |  |
|  |  - FloatingCartButton, OrderCard, Toast, BottomNav          |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Stores (Zustand)                                           |  |
|  |  - authStore (LocalStorage 동기화)                           |  |
|  |  - cartStore (SessionStorage 동기화)                         |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
|  +------------------------------------------------------------+  |
|  |  Services (API Client)                                      |  |
|  |  - apiClient (공통 fetch + 헤더)                             |  |
|  |  - authService, menuService, orderService                   |  |
|  +------------------------------------------------------------+  |
|                          |                                        |
+------------------------------------------------------------------+
           |
    [Customer API]
```

---

## Docker Services

```yaml
customer-api:
  build: ./customer-api
  ports: "8001:8000"
  depends_on: postgres
  environment: DATABASE_URL, LOG_LEVEL

customer-web:
  build: ./customer-web
  ports: "3001:80"
  depends_on: customer-api
  environment: VITE_API_URL
```
