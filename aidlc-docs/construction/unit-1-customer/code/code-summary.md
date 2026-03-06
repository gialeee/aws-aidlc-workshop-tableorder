# Code Summary - Unit 1: Customer

## Generated Files

### Customer API (Backend)
- `customer-api/app/main.py` - FastAPI 앱 설정, CORS, 라우터 등록
- `customer-api/app/dependencies.py` - DB 세션, 세션 인증 dependency
- `customer-api/app/schemas/requests.py` - TableLoginRequest, CreateOrderRequest
- `customer-api/app/schemas/responses.py` - SessionResponse, CategoryResponse, MenuResponse, OrderResponse
- `customer-api/app/repositories/` - store, table, session, menu, order (5개)
- `customer-api/app/services/` - auth, menu, order (3개)
- `customer-api/app/routers/` - auth, menus, orders (3개)
- `customer-api/requirements.txt` - Python 의존성
- `customer-api/Dockerfile` - Docker 빌드

### Customer Web (Frontend)
- `customer-web/src/App.jsx` - 라우팅 (Login, Menu, OrderHistory)
- `customer-web/src/pages/` - LoginPage, MenuPage, OrderHistoryPage (3개)
- `customer-web/src/components/menu/` - CategorySidebar, MenuGrid, MenuCard, FloatingCartButton (4개)
- `customer-web/src/components/cart/` - CartDrawer, CartItem, CartSummary (3개)
- `customer-web/src/components/order/` - OrderCard (1개)
- `customer-web/src/components/common/` - Toast, BottomNav (2개)
- `customer-web/src/stores/` - authStore, cartStore (2개)
- `customer-web/src/services/` - apiClient, authService, menuService, orderService (4개)
- `customer-web/nginx.conf` - Nginx SPA + API 프록시
- `customer-web/Dockerfile` - Docker 멀티스테이지 빌드

### Infrastructure
- `docker-compose.yml` - postgres + customer-api + customer-web
- `.env` - 환경변수

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/login | 테이블 로그인 |
| GET | /api/categories | 카테고리 목록 |
| GET | /api/menus | 메뉴 목록 |
| POST | /api/orders | 주문 생성 |
| GET | /api/orders | 주문 내역 |
| GET | /health | 헬스체크 |

## Story Coverage
US-1.1, US-1.2, US-2.1, US-2.2, US-3.1~3.6, US-4.1, US-4.2, US-5.1 (13/13 stories)
