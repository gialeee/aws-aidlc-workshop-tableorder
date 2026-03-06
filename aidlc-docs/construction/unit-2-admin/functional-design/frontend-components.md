# Frontend Components - Unit 2: Admin Web

## Page Structure (React Router)
- `/login` - LoginPage
- `/dashboard` - DashboardPage (메인)
- `/tables/:id` - TableManagementPage
- `/menus` - MenuManagementPage

## Pages

### LoginPage
- 매장 식별자, 사용자명, 비밀번호 입력 폼
- 로그인 성공 → `/dashboard` 이동
- JWT를 LocalStorage에 저장

### DashboardPage
- 테이블 그리드 레이아웃
- SSE 연결로 실시간 업데이트
- 네비게이션: 대시보드 / 메뉴관리 링크

### TableManagementPage
- 테이블 카드 클릭 시 진입
- 해당 테이블의 전체 주문 목록
- 주문 상태 변경, 삭제 기능
- 이용 완료 (세션 종료) 버튼
- 과거 내역 조회 (무한스크롤)

### MenuManagementPage
- 카테고리별 메뉴 목록
- 메뉴 등록/수정/삭제
- 카테고리 등록/수정/삭제
- 드래그앤드롭 순서 조정

## Key Components

### DashboardPage Components
- `TableGrid` - 테이블 카드 그리드 컨테이너
- `TableCard` - 개별 테이블 카드 (테이블번호, 총액, 최신주문 5개 미리보기)
- `OrderPreviewItem` - 미리보기 주문 항목

### TableManagementPage Components
- `OrderList` - 주문 목록
- `OrderCard` - 주문 카드 (상세정보, 상태변경, 삭제)
- `OrderStatusBadge` - 상태 뱃지 (PENDING/PREPARING/COMPLETED)
- `SessionEndButton` - 이용 완료 버튼
- `OrderHistoryModal` - 과거 내역 모달 (무한스크롤)
- `ConfirmDialog` - 삭제/종료 확인 팝업

### MenuManagementPage Components
- `CategoryList` - 카테고리 목록 (사이드바)
- `CategoryForm` - 카테고리 등록/수정 폼
- `MenuList` - 메뉴 목록 (드래그앤드롭)
- `MenuForm` - 메뉴 등록/수정 폼 (모달)
- `MenuCard` - 메뉴 카드 (이름, 가격, 수정/삭제)

### Common Components
- `NavBar` - 상단 네비게이션 (대시보드, 메뉴관리, 로그아웃)
- `ProtectedRoute` - JWT 인증 체크 래퍼
- `LoadingSpinner` - 로딩 표시
- `Toast` - 성공/실패 알림

## Zustand Stores

### authStore
- `token: string | null`
- `login(storeId, username, password) -> void`
- `logout() -> void`
- `isAuthenticated() -> boolean`

### orderStore
- `orders: Map<tableId, Order[]>`
- `subscribeToOrders(storeId) -> void`
- `unsubscribe() -> void`
- `updateOrderStatus(orderId, status) -> void`
- `deleteOrder(orderId) -> void`

## API Integration
- `authService.login()` → `POST /api/admin/login`
- `orderService.getOrders()` → `GET /api/admin/orders`
- `orderService.streamOrders()` → `GET /api/admin/orders/stream` (SSE)
- `orderService.updateStatus()` → `PUT /api/admin/orders/{id}/status`
- `orderService.deleteOrder()` → `DELETE /api/admin/orders/{id}`
- `tableService.endSession()` → `POST /api/admin/tables/{id}/session/end`
- `tableService.getHistory()` → `GET /api/admin/tables/{id}/history`
- `menuService.*` → `GET/POST/PUT/DELETE /api/admin/menus`
- `categoryService.*` → `GET/POST/PUT/DELETE /api/admin/categories`
