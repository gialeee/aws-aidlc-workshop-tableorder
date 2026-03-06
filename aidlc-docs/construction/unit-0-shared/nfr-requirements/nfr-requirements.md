# NFR Requirements - Unit 0: Shared

## 1. Performance

### Database
- Connection pool size: 5~20 (환경별 조정)
- Query timeout: 30초
- 인덱스 전략:
  - Store.store_id (로그인 조회)
  - Admin.(store_id, username) (관리자 로그인)
  - TableInfo.(store_id, table_number) (테이블 로그인)
  - TableSession.(table_id, is_active) (활성 세션 조회)
  - Order.session_id (세션별 주문 조회)
  - Order.store_id (매장별 주문 조회)
  - Menu.(store_id, category_id) (카테고리별 메뉴 조회)
  - OrderHistory.(table_id, archived_at) (과거 내역 조회)

### Password Hashing
- bcrypt work factor: 12 (해싱 ~250ms)
- 로그인 빈도가 낮으므로 성능 영향 미미

## 2. Security

### Data Protection
- 비밀번호: bcrypt 해싱 (work factor 12)
- JWT: HS256 서명, 16시간 만료
- JWT_SECRET_KEY: .env 파일에서 로드 (코드에 하드코딩 금지)
- DB 연결: 환경변수로 관리

### Database Security
- DB 접근: 애플리케이션 서버만 허용 (Docker network 격리)
- DB 비밀번호: .env 파일에서 관리

## 3. Reliability

### Data Integrity
- FK 제약조건으로 참조 무결성 보장
- 트랜잭션으로 원자성 보장 (주문 생성, 세션 종료)
- CASCADE DELETE: OrderItem은 Order 삭제 시 함께 삭제

### Migration Safety
- Alembic으로 스키마 버전 관리
- 마이그레이션 롤백 지원

## 4. Maintainability

### Code Quality
- Python: Pylint
- 타입 힌트 사용 (Python type hints)

### Database Schema
- Alembic 마이그레이션으로 스키마 변경 추적
- 마이그레이션 파일에 변경 설명 포함

## 5. Scalability

### MVP Scope
- 단일 매장, 단일 서버 환경
- 수평 확장은 MVP 범위 외
- DB connection pool로 동시 접속 처리

## 6. Logging
- Python logging 모듈 사용
- 파일 기반 로깅
- 로그 레벨: INFO (기본), DEBUG (개발)
- 로그 포맷: timestamp, level, module, message
