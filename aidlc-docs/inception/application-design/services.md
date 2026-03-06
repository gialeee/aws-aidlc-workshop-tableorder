# Service Layer Design

## Architecture Pattern
각 백엔드 API는 3-Layer Architecture를 따릅니다:

```
+-------------------+
|   Router Layer    |  HTTP 요청/응답 처리
+-------------------+
         |
         v
+-------------------+
|  Service Layer    |  비즈니스 로직 오케스트레이션
+-------------------+
         |
         v
+-------------------+
| Repository Layer  |  데이터 접근 (SQLAlchemy)
+-------------------+
         |
         v
+-------------------+
|    PostgreSQL     |
+-------------------+
```

---

## Customer API Services

### AuthService
- **책임**: 테이블 인증 및 세션 관리
- **주요 로직**:
  - 테이블 비밀번호 검증 (bcrypt)
  - 활성 세션 확인 또는 신규 세션 생성
  - 세션 토큰 발급

### MenuService
- **책임**: 메뉴 조회
- **주요 로직**:
  - 매장별 메뉴 목록 조회
  - 카테고리별 필터링

### OrderService
- **책임**: 주문 생성 및 조회
- **주요 로직**:
  - 주문 생성 (트랜잭션 내에서 Order + OrderItem 생성)
  - 세션별 주문 내역 조회
  - 첫 주문 시 테이블 세션 자동 시작

---

## Admin API Services

### AuthService
- **책임**: 관리자 인증 및 JWT 관리
- **주요 로직**:
  - 관리자 비밀번호 검증 (bcrypt)
  - JWT 토큰 발급 (16시간 만료)
  - JWT 토큰 검증

### OrderService
- **책임**: 주문 관리 및 실시간 스트림
- **주요 로직**:
  - 매장별 주문 목록 조회
  - 주문 상태 변경 (대기중/준비중/완료)
  - 주문 삭제 (트랜잭션)
  - SSE 스트림 (신규 주문 실시간 전송)

### TableService
- **책임**: 테이블 세션 관리
- **주요 로직**:
  - 테이블 세션 종료 (이용 완료)
  - 주문 내역 → 과거 이력 이동 (트랜잭션)
  - 테이블 상태 리셋
  - 과거 주문 내역 조회 (날짜 필터, 1년 보관)

### MenuService
- **책임**: 메뉴 CRUD
- **주요 로직**:
  - 메뉴 등록 (필수 필드 검증, 가격 범위 검증)
  - 메뉴 수정
  - 메뉴 삭제
  - 메뉴 노출 순서 조정

---

## Shared Components (Customer API / Admin API 공통)

### Database Models (SQLAlchemy)
- 두 API가 동일한 데이터베이스 모델을 공유
- 공통 모델 패키지로 분리 가능 (또는 각 API에서 동일 모델 정의)

### Password Utility
- bcrypt 해싱/검증 공통 유틸리티

---

## SSE (Server-Sent Events) 구현

### 구현 방식
- Admin API의 OrderService에서 SSE 스트림 제공
- 주문 생성 시 이벤트 발행 → SSE 클라이언트에 전송
- 인메모리 이벤트 큐 사용 (단일 서버 환경)

### 이벤트 흐름
```
Customer API                    Admin API
     |                              |
     | POST /api/orders             |
     |---> OrderService             |
     |     create_order()           |
     |     DB에 주문 저장            |
     |     이벤트 발행 ------------>|
     |                              | SSE 스트림으로 전송
     |                              |---> Admin Web
```

### 이벤트 전달 메커니즘
- Customer API에서 주문 생성 시 DB에 저장
- Admin API의 SSE 스트림은 DB 폴링 또는 공유 이벤트 채널로 신규 주문 감지
- MVP에서는 DB 폴링 방식 사용 (간단한 구현)
