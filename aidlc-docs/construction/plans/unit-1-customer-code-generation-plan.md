# Code Generation Plan - Unit 1: Customer

## Unit Context
- **Stories**: US-1.1, US-1.2, US-2.1, US-2.2, US-3.1~3.6, US-4.1, US-4.2, US-5.1 (13 stories)
- **Dependencies**: Unit 0 (shared models, database, utils)
- **Components**: Customer API (FastAPI) + Customer Web (React)

## Plan Steps

### Backend (Customer API)
- [x] Step 1: 프로젝트 구조 생성 (customer-api/ 디렉토리, requirements.txt, Dockerfile)
- [x] Step 2: Pydantic 스키마 (requests.py, responses.py)
- [x] Step 3: Repository 레이어 (store, table, session, menu, order)
- [x] Step 4: Service 레이어 (auth, menu, order)
- [x] Step 5: Dependencies (DB 세션, 세션 인증)
- [x] Step 6: Router 레이어 (auth, menus, orders)
- [x] Step 7: FastAPI main.py (앱 설정, 라우터 등록, CORS)

### Frontend (Customer Web)
- [x] Step 8: 프로젝트 초기화 (customer-web/, package.json, vite.config.js, index.html)
- [x] Step 9: API Client 및 Services (apiClient, authService, menuService, orderService)
- [x] Step 10: Zustand Stores (authStore, cartStore)
- [x] Step 11: Common 컴포넌트 (Toast, BottomNav)
- [x] Step 12: LoginPage
- [x] Step 13: MenuPage (CategorySidebar, MenuGrid, MenuCard, FloatingCartButton)
- [x] Step 14: CartDrawer (CartItem, CartSummary)
- [x] Step 15: OrderHistoryPage (OrderCard)
- [x] Step 16: App.jsx (라우팅), main.jsx, 글로벌 CSS

### Infrastructure
- [x] Step 17: docker-compose.yml 업데이트 + Nginx 설정 + .env 업데이트

### Documentation
- [x] Step 18: code-summary.md 생성
