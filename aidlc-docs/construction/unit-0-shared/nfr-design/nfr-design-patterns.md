# NFR Design Patterns - Unit 0: Shared

## 1. Repository Pattern

### Purpose
데이터 접근 로직을 비즈니스 로직에서 분리

### Implementation
- 각 엔티티별 Repository 클래스
- SQLAlchemy AsyncSession 주입
- CRUD 기본 메서드 제공

```
BaseRepository (Generic)
  - get_by_id(id) -> Model
  - create(model) -> Model
  - update(model) -> Model
  - delete(id) -> None
  - list(filters) -> List[Model]
```

---

## 2. Unit of Work Pattern (Transaction)

### Purpose
여러 Repository 작업을 단일 트랜잭션으로 묶기

### Implementation
- SQLAlchemy AsyncSession이 트랜잭션 경계 역할
- FastAPI dependency injection으로 세션 관리
- `async with session.begin()` 으로 트랜잭션 제어

### 적용 대상
- 주문 생성 (Order + OrderItem)
- 세션 종료 (OrderHistory 이동 + Order 삭제 + Session 비활성화)
- 주문 삭제 (Order + OrderItem CASCADE)

---

## 3. Connection Pool Pattern

### Purpose
DB 연결 재사용으로 성능 최적화

### Implementation
- SQLAlchemy create_async_engine의 pool 설정
- pool_size: 5 (기본 연결 수)
- max_overflow: 15 (최대 추가 연결)
- pool_timeout: 30초
- pool_recycle: 1800초 (30분마다 연결 갱신)

---

## 4. Configuration Pattern (Settings)

### Purpose
환경별 설정 분리 및 타입 안전한 관리

### Implementation
- pydantic-settings의 BaseSettings 사용
- .env 파일에서 자동 로드
- 타입 검증 및 기본값 제공

### 설정 항목
```
DATABASE_URL: str
JWT_SECRET_KEY: str
JWT_EXPIRATION_HOURS: int = 16
BCRYPT_ROUNDS: int = 12
LOG_LEVEL: str = "INFO"
LOG_FILE: str = "app.log"
```

---

## 5. Password Hashing Strategy

### Purpose
안전한 비밀번호 저장 및 검증

### Implementation
- bcrypt 라이브러리 사용
- work factor: 12
- 단방향 해싱 (복호화 불가)
- 유틸리티 함수로 캡슐화 (hash_password, verify_password)

---

## 6. Logging Pattern

### Purpose
파일 기반 구조화된 로깅

### Implementation
- Python logging 모듈
- RotatingFileHandler (파일 크기 제한)
- 포맷: `%(asctime)s - %(name)s - %(levelname)s - %(message)s`
- 로그 파일: `app.log`
- 최대 파일 크기: 10MB, 백업 5개
