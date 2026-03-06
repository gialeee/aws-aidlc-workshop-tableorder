# Frontend Components - Unit 1: Customer Web

## Design Decisions (from Q&A)
- 매장 식별자: store_code (문자열, 예: "STORE001")
- 카테고리 탭: 좌측 세로 사이드바
- 장바구니: 사이드 드로어 (우측 슬라이드)
- 주문 성공: 즉시 리다이렉트 + 토스트 알림
- 메뉴 레이아웃: 3열 그리드

---

## Page Structure

```
App
├── LoginPage          (로그인/초기 설정)
├── MenuPage           (메뉴 조회 + 장바구니 드로어)
│   ├── CategorySidebar    (좌측 카테고리)
│   ├── MenuGrid           (3열 메뉴 그리드)
│   │   └── MenuCard       (개별 메뉴 카드)
│   ├── CartDrawer         (우측 사이드 드로어)
│   │   ├── CartItem       (장바구니 항목)
│   │   └── CartSummary    (총액 + 주문 버튼)
│   └── FloatingCartButton (장바구니 열기 버튼)
├── OrderHistoryPage   (주문 내역)
│   └── OrderCard      (개별 주문)
└── Common
    ├── Toast          (알림 토스트)
    └── BottomNav      (하단 네비게이션)
```

---

## Pages

### LoginPage
- 역할: 매장 식별자, 테이블 번호, 비밀번호 입력
- State: store_code, table_number, password, error, isLoading
- 동작:
  - 앱 로드 시 autoLogin() 시도
  - 로그인 성공 → MenuPage 이동
  - 실패 → error 메시지 표시
- API: POST /api/auth/login

### MenuPage
- 역할: 카테고리 사이드바 + 3열 메뉴 그리드 + 장바구니 드로어
- State: categories, menus, selectedCategoryId, isCartOpen
- 레이아웃: `[CategorySidebar(좌측 고정)] [MenuGrid(메인 영역)]`
- API: GET /api/categories, GET /api/menus

### OrderHistoryPage
- 역할: 현재 세션 주문 내역 표시
- State: orders, isLoading
- API: GET /api/orders

---

## Components

### CategorySidebar
- Props: categories, selectedId, onSelect
- 스타일: 좌측 고정, 세로 스크롤, 선택된 카테고리 하이라이트
- 첫 번째 카테고리 기본 선택

### MenuGrid
- Props: menus
- 스타일: 3열 CSS Grid, gap: 12px, 반응형 (좁은 화면 시 2열)

### MenuCard
- Props: menu, onAdd
- 표시: 이미지(상단), 메뉴명, 가격
- 동작: "담기" 버튼 클릭 → cartStore.addItem(menu)
- 이미지 없을 시 placeholder 표시

### FloatingCartButton
- Props: totalCount, onClick
- 스타일: 우측 하단 고정, 뱃지로 아이템 수 표시
- 동작: 클릭 → CartDrawer 열기
- totalCount === 0이면 숨김

### CartDrawer
- Props: isOpen, onClose
- State: cartStore.items 구독
- 스타일: 우측에서 슬라이드 인, 오버레이 배경
- 구성: CartItem 목록 + CartSummary

### CartItem
- Props: item, onUpdateQuantity, onRemove
- 표시: 메뉴명, 단가, 수량 (+/- 버튼), 소계
- 동작: 수량 변경, 삭제

### CartSummary
- Props: totalPrice, totalCount, onOrder, onClear
- 표시: 총 N개, 총 금액
- 버튼: "주문하기", "비우기"
- 장바구니 비어있으면 주문 버튼 비활성화

### OrderCard
- Props: order
- 표시: 주문 번호, 시각, 상태 뱃지, 항목 목록, 총액
- 상태 뱃지 색상: PENDING(노랑), PREPARING(파랑), COMPLETED(초록)

### Toast
- Props: message, type (success/error), duration
- 동작: 상단에 표시, duration 후 자동 사라짐

### BottomNav
- 역할: 메뉴/주문내역 탭 전환
- 항목: 메뉴(MenuPage), 주문내역(OrderHistoryPage)

---

## Stores (Zustand)

### authStore
```
State:
  sessionId: string | null
  storeId: number | null
  storeCode: string | null
  tableNumber: number | null
  isAuthenticated: boolean

Actions:
  login(storeCode, tableNumber, password) -> void
  autoLogin() -> void
  logout() -> void
```

### cartStore
```
State:
  items: Map<menuId, CartItem>

Actions:
  addItem(menu) -> void
  updateQuantity(menuId, quantity) -> void
  removeItem(menuId) -> void
  clearCart() -> void

Getters:
  getTotalPrice() -> number
  getTotalCount() -> number
  getItems() -> CartItem[]
```

---

## API Integration

| Component | API Call | Trigger |
|-----------|---------|---------|
| LoginPage | POST /api/auth/login | 로그인 버튼 / autoLogin |
| MenuPage | GET /api/categories | 페이지 로드 |
| MenuPage | GET /api/menus?category_id= | 카테고리 선택 |
| CartSummary | POST /api/orders | 주문하기 버튼 |
| OrderHistoryPage | GET /api/orders | 페이지 로드 |
