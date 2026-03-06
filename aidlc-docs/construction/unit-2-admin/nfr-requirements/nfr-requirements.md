# NFR Requirements - Unit 2: Admin

## 1. Performance

### Admin API
- API 응답시간: < 500ms (일반 CRUD)
- SSE 폴링 주기: 3초
- SSE 동시 연결: 최대 5개
- 동시 접속 관리자: 1~3명

### Admin Web
- 초기 로드: < 3초
- 페이지 전환: < 500ms
- SSE 이벤트 수신 후 UI 반영: < 1초

## 2. Security
- Unit 0 NFR 상속 (bcrypt, JWT HS256, .env 관리)
- 모든 API에 JWT 인증 필수 (login 제외)
- CORS: Admin Web 도메인만 허용

## 3. Reliability
- SSE 연결 끊김 시 자동 재연결 (EventSource 기본)
- API 에러 시 적절한 HTTP 상태 코드 + 에러 메시지

## 4. Maintainability
- Backend: Pylint, Python type hints
- Frontend: ESLint + Prettier
- 3-Layer Architecture (Router → Service → Repository)

## 5. Scalability
- MVP: 단일 매장, 단일 서버
- SSE는 인메모리 (수평 확장 시 Redis Pub/Sub 전환 가능)
