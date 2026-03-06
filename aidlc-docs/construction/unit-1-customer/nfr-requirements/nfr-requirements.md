# NFR Requirements - Unit 1: Customer

> Unit 0 (Shared)의 NFR을 상속하며, Customer 유닛 고유 요구사항을 추가 정의합니다.

## 1. Performance

### API Response Time
- 테이블 로그인: < 500ms (bcrypt 검증 포함)
- 메뉴 목록 조회: < 200ms
- 주문 생성: < 500ms
- 주문 내역 조회: < 200ms

### Frontend
- 초기 로드 (LCP): < 2초
- 카테고리 전환: < 100ms (클라이언트 필터링)
- 장바구니 드로어 애니메이션: 300ms
- 토스트 알림 표시: 3초 후 자동 사라짐

## 2. Security

### Session Authentication
- X-Session-Id 헤더로 API 인증
- 세션 ID: UUID v4 (서버 생성, 추측 불가)
- 비활성 세션으로 요청 시 401 반환
- 로그인 정보 LocalStorage 저장 (태블릿 전용 환경)

### Input Validation
- 모든 API 입력: Pydantic 스키마로 검증
- SQL Injection: SQLAlchemy ORM 사용으로 방지
- XSS: React 기본 이스케이핑

## 3. Reliability

### Error Handling
- API 에러: 일관된 JSON 응답 형식 `{ detail: string }`
- 네트워크 에러: 프론트엔드에서 토스트 알림
- 주문 생성 실패: 장바구니 데이터 유지

### Data Consistency
- 주문 생성: 단일 트랜잭션 (Order + OrderItem)
- 메뉴 스냅샷: 주문 시점 가격/이름 보존

## 4. Usability

### Touch-Friendly
- 최소 터치 타겟: 44x44px
- 메뉴 카드: 충분한 간격 (gap 12px)
- 장바구니 수량 버튼: 쉽게 탭 가능한 크기

### Responsive
- 기본 타겟: 태블릿 (768px~1024px)
- 3열 그리드 → 좁은 화면 시 2열 폴백

## 5. Maintainability

### Frontend Code Quality
- ESLint + Prettier 적용
- 컴포넌트 단위 분리 (pages, components, stores, services)
- Zustand store로 상태 관리 일원화

### Backend Code Quality
- 3-Layer Architecture (Router → Service → Repository)
- Pydantic 스키마로 요청/응답 타입 정의
- Python type hints 전체 적용
