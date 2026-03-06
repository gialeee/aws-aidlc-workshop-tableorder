# Business Logic Model - Unit 2: Admin

## Admin API Services

### 1. AuthService
- `authenticate_admin(store_id, username, password) -> JWT`
  - Admin 테이블에서 store_id + username으로 조회
  - bcrypt로 비밀번호 검증
  - 성공 시 JWT 발급 (HS256, 16시간 만료)
  - Payload: {store_id, admin_id, username, exp}
- `verify_token(token) -> AdminClaims`
  - JWT 서명 및 만료 검증
  - 유효하면 claims 반환, 아니면 401

### 2. OrderService
- `get_orders_by_store(store_id) -> List[Order]`
  - 해당 매장의 활성 주문 조회 (OrderItem 포함)
  - 생성시간 역순 정렬
- `update_status(order_id, new_status) -> Order`
  - 상태 전이 검증: PENDING→PREPARING→COMPLETED만 허용
  - 유효하지 않은 전이 시 400 에러
- `delete_order(order_id) -> void`
  - Order + OrderItem CASCADE 삭제
  - 삭제 후 SSE 이벤트 발행
- `stream_orders(store_id) -> AsyncGenerator`
  - 3초 간격 DB 폴링
  - 마지막 확인 이후 신규/변경/삭제된 주문 감지
  - SSE 이벤트 타입: `new_order`, `status_changed`, `order_deleted`

### 3. TableService
- `end_session(table_id) -> void`
  - 단일 트랜잭션:
    1. 활성 세션의 모든 Order 조회
    2. 각 Order → OrderHistory 변환 (items를 JSON으로)
    3. 원본 Order + OrderItem 삭제
    4. TableSession.is_active = False, ended_at = now()
- `get_history(table_id, date_from, date_to, cursor) -> List[OrderHistory]`
  - 날짜 필터링, 시간 역순
  - 커서 기반 무한스크롤 (20건 단위)
  - 최근 1년 데이터만

### 4. MenuService
- `get_menus(store_id) -> List[Menu]`
  - 카테고리별 그룹, sort_order 순 정렬
- `create_menu(data) -> Menu`
  - 필수: name, price, category_id
  - 가격: 0 < price <= 1,000,000, 이름: 1~100자
- `update_menu(menu_id, data) -> Menu`
  - 동일 검증 규칙 적용
- `delete_menu(menu_id) -> void`
- `update_sort_order(menu_id, new_sort_order) -> void`
  - 드래그앤드롭 결과 반영

### 5. CategoryService
- `get_categories(store_id) -> List[Category]`
- `create_category(store_id, name, sort_order) -> Category`
- `update_category(category_id, name, sort_order) -> Category`
- `delete_category(category_id) -> void`
  - 해당 카테고리에 메뉴가 있으면 삭제 불가 (400 에러)

## SSE Event Schema

```json
// new_order
{"event": "new_order", "data": {"order_id": 1, "table_number": 3, "order_number": "ORD-20260306-0001", "total_amount": 25000, "items": [...]}}

// status_changed
{"event": "status_changed", "data": {"order_id": 1, "status": "PREPARING"}}

// order_deleted
{"event": "order_deleted", "data": {"order_id": 1, "table_id": 3}}
```
