# NFR Design Patterns - Unit 1: Customer

> Unit 0 (Shared)의 패턴을 상속하며, Customer 유닛 고유 패턴을 추가 정의합니다.

## 1. Session Authentication Pattern

### Purpose
테이블 세션 기반 API 인증

### Implementation
- FastAPI Dependency로 세션 검증 미들웨어 구현
- `X-Session-Id` 헤더에서 session_id 추출
- DB에서 활성 세션 확인 (is_active=True)
- 실패 시 HTTPException(401)

```
get_current_session(x_session_id: str = Header()) -> TableSession:
  1. 헤더에서 session_id 추출
  2. SessionRepository.find_active(session_id)
  3. 없으면 401
  4. 반환: TableSession (store_id, table_id 포함)
```

---

## 2. Service Layer Pattern

### Purpose
비즈니스 로직을 Router와 Repository 사이에서 오케스트레이션

### Implementation
- 각 도메인별 Service 클래스 (AuthService, MenuService, OrderService)
- DB 세션을 생성자 주입
- 트랜잭션 경계는 Service 레벨에서 관리

```
Router → Service → Repository → DB
  (HTTP)   (Logic)   (Data)    (SQL)
```

---

## 3. DTO Pattern (Pydantic Schemas)

### Purpose
API 요청/응답 데이터 검증 및 직렬화

### Implementation
- Request 스키마: 입력 검증 (필수 필드, 타입, 범위)
- Response 스키마: 출력 직렬화 (민감 정보 제외)
- SQLAlchemy 모델과 분리

---

## 4. Frontend State Management Pattern

### Purpose
클라이언트 상태를 예측 가능하게 관리

### Implementation
- Zustand store로 전역 상태 관리
- authStore: 인증 상태 + LocalStorage 동기화
- cartStore: 장바구니 상태 + SessionStorage 동기화
- 각 store는 독립적, 필요한 컴포넌트에서만 구독

---

## 5. API Client Pattern

### Purpose
백엔드 API 호출 로직 캡슐화

### Implementation
- services/ 디렉토리에 도메인별 API 클라이언트
- fetch 기반, 공통 헤더 (X-Session-Id) 자동 첨부
- 에러 처리 일원화 (HTTP 상태 코드 → 사용자 메시지)

```
apiClient(endpoint, options):
  1. base URL + endpoint 조합
  2. X-Session-Id 헤더 자동 추가
  3. fetch 실행
  4. 에러 시 throw (detail 메시지 추출)
```

---

## 6. Drawer UI Pattern

### Purpose
장바구니를 사이드 드로어로 표시

### Implementation
- 오버레이 배경 + 우측 슬라이드 패널
- CSS transition 300ms
- 오버레이 클릭 또는 닫기 버튼으로 닫기
- 스크롤 잠금 (드로어 열린 동안 body 스크롤 방지)
