# Business Logic Model - Unit 1: Customer

## Overview
고객용 테이블 주문 시스템의 비즈니스 로직. 테이블 인증, 메뉴 조회, 장바구니 관리, 주문 생성, 주문 내역 조회를 포함합니다.

---

## 1. 테이블 인증 (AuthService)

### 1.1 테이블 초기 설정 및 로그인
```
authenticate_table(store_code: str, table_number: int, password: str) -> TableSession:
  1. Store 조회: store_code로 Store 검색 → 없으면 404
  2. TableInfo 조회: (store.id, table_number) → 없으면 404
  3. 비밀번호 검증: verify_password(password, table.password_hash) → 실패 시 401
  4. 활성 세션 확인: table_id로 is_active=True 세션 조회
     - 있으면: 기존 세션 반환
     - 없으면: 새 세션 생성 (UUID v4, is_active=True)
  5. 반환: { session_id, store_id, table_id, table_number }
```

### 1.2 자동 로그인 (Frontend)
```
autoLogin():
  1. LocalStorage에서 store_code, table_number, password 읽기
  2. 값이 있으면 authenticate_table() 호출
  3. 성공 → 메뉴 화면 이동
  4. 실패 → LocalStorage 클리어, 로그인 화면 표시
```

---

## 2. 메뉴 조회 (MenuService)

### 2.1 카테고리 목록 조회
```
get_categories(store_id: int) -> List[Category]:
  1. store_id로 Category 조회
  2. sort_order ASC, id ASC 정렬
  3. 반환: 카테고리 목록
```

### 2.2 메뉴 목록 조회
```
get_menus(store_id: int, category_id: int | None) -> List[Menu]:
  1. store_id로 Menu 조회, is_available=True 필터
  2. category_id 있으면 해당 카테고리만 필터
  3. sort_order ASC, id ASC 정렬
  4. 반환: 메뉴 목록 (id, name, price, description, image_url, category_id)
```

---

## 3. 장바구니 관리 (Frontend - CartStore)

### 3.1 장바구니 상태 구조
```
CartState:
  items: Map<menu_id, CartItem>
  CartItem: { menu_id, name, price, quantity, image_url }
```

### 3.2 장바구니 조작
```
addItem(menu: Menu):
  - items에 menu_id 존재 → quantity + 1
  - 없으면 → quantity: 1로 추가
  - syncToStorage()

updateQuantity(menu_id: int, quantity: int):
  - quantity <= 0 → 해당 아이템 삭제
  - quantity > 0 → 수량 업데이트
  - syncToStorage()

removeItem(menu_id: int):
  - items에서 삭제
  - syncToStorage()

clearCart():
  - items 전체 초기화
  - syncToStorage()

getTotalPrice() -> int:
  - sum(item.price * item.quantity for item in items)

getTotalCount() -> int:
  - sum(item.quantity for item in items)
```

### 3.3 SessionStorage 동기화
```
syncToStorage():
  - SessionStorage에 'cart' 키로 JSON 직렬화 저장

loadFromStorage():
  - SessionStorage에서 'cart' 키 읽기
  - JSON 파싱하여 items 복원
  - 키 없으면 빈 장바구니
```

---

## 4. 주문 생성 (OrderService)

### 4.1 주문 생성
```
create_order(session_id: UUID, items: List[OrderItemInput]) -> Order:
  1. TableSession 조회: session_id → is_active=True 확인, 아니면 400
  2. 메뉴 검증: 각 item의 menu_id로 Menu 조회
     - 존재하지 않거나 is_available=False → 400
  3. 주문 번호 생성: generate_order_number(store_id)
  4. 트랜잭션 시작:
     a. Order 생성 (store_id, table_id, session_id, order_number, status='PENDING')
     b. 각 item에 대해 OrderItem 생성:
        - menu_name = menu.name (스냅샷)
        - unit_price = menu.price (스냅샷)
        - subtotal = unit_price * quantity
     c. total_amount = sum(모든 OrderItem.subtotal)
     d. Order.total_amount 업데이트
  5. 트랜잭션 커밋
  6. 반환: Order (order_number, total_amount, status, items, created_at)
```

### 4.2 주문 번호 생성
```
generate_order_number(store_id: int) -> str:
  1. 오늘 날짜: YYYYMMDD
  2. 해당 매장의 오늘 주문 수 카운트
  3. 형식: "ORD-{YYYYMMDD}-{순번:04d}"
  4. 예: "ORD-20260306-0001"
```

---

## 5. 주문 내역 조회 (OrderService)

### 5.1 세션별 주문 조회
```
get_orders_by_session(session_id: UUID) -> List[Order]:
  1. session_id로 Order 조회
  2. created_at DESC 정렬 (최신순)
  3. 각 Order에 OrderItem 목록 포함 (eager load)
  4. 반환: 주문 목록 (order_number, status, total_amount, items, created_at)
```

---

## API Endpoints Summary

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | /api/auth/login | 테이블 로그인 | None |
| GET | /api/categories | 카테고리 목록 | session_id |
| GET | /api/menus | 메뉴 목록 (category_id 선택) | session_id |
| POST | /api/orders | 주문 생성 | session_id |
| GET | /api/orders | 세션 주문 내역 | session_id |
