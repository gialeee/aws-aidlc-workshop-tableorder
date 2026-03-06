# Component Methods

## Customer Web - Key Components

### AuthStore (Zustand)
- `login(storeId, tableNumber, password) -> void` - 테이블 로그인
- `autoLogin() -> void` - LocalStorage 기반 자동 로그인
- `getSession() -> TableSession` - 현재 세션 정보 반환
- `isAuthenticated() -> boolean` - 인증 상태 확인

### CartStore (Zustand)
- `addItem(menuItem) -> void` - 장바구니에 메뉴 추가
- `removeItem(menuId) -> void` - 장바구니에서 메뉴 삭제
- `updateQuantity(menuId, quantity) -> void` - 수량 변경
- `clearCart() -> void` - 장바구니 비우기
- `getTotalPrice() -> number` - 총 금액 계산
- `syncToStorage() -> void` - SessionStorage에 동기화
- `loadFromStorage() -> void` - SessionStorage에서 복원

### MenuService
- `fetchMenus(storeId) -> Menu[]` - 메뉴 목록 조회
- `fetchMenusByCategory(storeId, categoryId) -> Menu[]` - 카테고리별 메뉴 조회

### OrderService
- `createOrder(orderData) -> Order` - 주문 생성
- `fetchOrders(sessionId) -> Order[]` - 현재 세션 주문 내역 조회

---

## Admin Web - Key Components

### AuthStore (Zustand)
- `login(storeId, username, password) -> void` - 관리자 로그인
- `logout() -> void` - 로그아웃
- `isAuthenticated() -> boolean` - JWT 유효성 확인
- `getToken() -> string` - JWT 토큰 반환

### OrderStore (Zustand)
- `subscribeToOrders(storeId) -> void` - SSE 연결 시작
- `unsubscribe() -> void` - SSE 연결 종료
- `updateOrderStatus(orderId, status) -> void` - 주문 상태 변경
- `deleteOrder(orderId) -> void` - 주문 삭제

### TableService
- `endSession(tableId) -> void` - 테이블 세션 종료
- `fetchHistory(tableId, dateFilter) -> OrderHistory[]` - 과거 주문 내역 조회

### MenuService
- `fetchMenus(storeId) -> Menu[]` - 메뉴 목록 조회
- `createMenu(menuData) -> Menu` - 메뉴 등록
- `updateMenu(menuId, menuData) -> Menu` - 메뉴 수정
- `deleteMenu(menuId) -> void` - 메뉴 삭제

---

## Customer API - Layers

### Router Layer (customer_router.py)
- `POST /api/table/login` - table_login(request: TableLoginRequest) -> TableLoginResponse
- `GET /api/menus` - get_menus(store_id: str) -> List[MenuResponse]
- `GET /api/menus/{id}` - get_menu(menu_id: int) -> MenuResponse
- `POST /api/orders` - create_order(request: CreateOrderRequest) -> OrderResponse
- `GET /api/orders` - get_orders(session_id: str) -> List[OrderResponse]

### Service Layer
- `AuthService.authenticate_table(store_id, table_number, password) -> TableSession`
- `MenuService.get_menus(store_id) -> List[Menu]`
- `MenuService.get_menu_by_id(menu_id) -> Menu`
- `OrderService.create_order(order_data) -> Order`
- `OrderService.get_orders_by_session(session_id) -> List[Order]`

### Repository Layer
- `TableRepository.find_by_store_and_number(store_id, table_number) -> Table`
- `SessionRepository.find_active_session(table_id) -> TableSession`
- `SessionRepository.create_session(table_id) -> TableSession`
- `MenuRepository.find_by_store(store_id) -> List[Menu]`
- `OrderRepository.create(order) -> Order`
- `OrderRepository.find_by_session(session_id) -> List[Order]`

---

## Admin API - Layers

### Router Layer (admin_router.py)
- `POST /api/admin/login` - admin_login(request: AdminLoginRequest) -> AdminLoginResponse
- `GET /api/admin/orders/stream` - order_stream(store_id: str) -> EventSourceResponse
- `GET /api/admin/orders` - get_orders(store_id: str) -> List[OrderResponse]
- `PUT /api/admin/orders/{id}/status` - update_order_status(order_id: int, request: UpdateStatusRequest) -> OrderResponse
- `DELETE /api/admin/orders/{id}` - delete_order(order_id: int) -> void
- `POST /api/admin/tables/{id}/session/end` - end_table_session(table_id: int) -> void
- `GET /api/admin/tables/{id}/history` - get_table_history(table_id: int, date_from, date_to) -> List[OrderHistoryResponse]
- `GET /api/admin/menus` - get_menus(store_id: str) -> List[MenuResponse]
- `POST /api/admin/menus` - create_menu(request: CreateMenuRequest) -> MenuResponse
- `PUT /api/admin/menus/{id}` - update_menu(menu_id: int, request: UpdateMenuRequest) -> MenuResponse
- `DELETE /api/admin/menus/{id}` - delete_menu(menu_id: int) -> void

### Service Layer
- `AuthService.authenticate_admin(store_id, username, password) -> JWT`
- `AuthService.verify_token(token) -> AdminClaims`
- `OrderService.get_orders_by_store(store_id) -> List[Order]`
- `OrderService.update_status(order_id, status) -> Order`
- `OrderService.delete_order(order_id) -> void`
- `OrderService.stream_orders(store_id) -> AsyncGenerator`
- `TableService.end_session(table_id) -> void`
- `TableService.get_history(table_id, date_from, date_to) -> List[OrderHistory]`
- `MenuService.get_menus(store_id) -> List[Menu]`
- `MenuService.create_menu(menu_data) -> Menu`
- `MenuService.update_menu(menu_id, menu_data) -> Menu`
- `MenuService.delete_menu(menu_id) -> void`

### Repository Layer
- `AdminRepository.find_by_store_and_username(store_id, username) -> Admin`
- `OrderRepository.find_by_store(store_id) -> List[Order]`
- `OrderRepository.update_status(order_id, status) -> Order`
- `OrderRepository.delete(order_id) -> void`
- `SessionRepository.end_session(table_id) -> void`
- `OrderHistoryRepository.find_by_table(table_id, date_from, date_to) -> List[OrderHistory]`
- `MenuRepository.create(menu) -> Menu`
- `MenuRepository.update(menu_id, menu_data) -> Menu`
- `MenuRepository.delete(menu_id) -> void`

---

**Note**: 상세 비즈니스 로직 및 데이터 모델은 Functional Design (CONSTRUCTION phase)에서 정의됩니다.
