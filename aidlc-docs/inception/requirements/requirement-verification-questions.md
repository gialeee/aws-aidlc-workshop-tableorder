# Requirements Verification Questions

이 질문들은 테이블오더 서비스의 요구사항을 명확히 하고 구현 방향을 결정하기 위한 것입니다. 각 질문에 대해 제공된 선택지 중 하나를 선택하여 [Answer]: 태그 뒤에 알파벳을 입력해주세요. 제공된 옵션이 맞지 않으면 마지막 옵션(Other)을 선택하고 설명을 추가해주세요.

---

## Question 1
고객용 인터페이스의 기술 스택은 무엇인가요?

A) React (SPA - Single Page Application)
B) Vue.js (SPA)
C) Next.js (React with SSR)
D) Vanilla JavaScript (No framework)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 2
관리자용 인터페이스의 기술 스택은 무엇인가요?

A) 고객용과 동일한 기술 스택 사용
B) React (고객용과 별도)
C) Vue.js (고객용과 별도)
D) Next.js (고객용과 별도)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 3
백엔드 서버의 기술 스택은 무엇인가요?

A) Node.js (Express/Fastify)
B) Python (FastAPI/Django/Flask)
C) Java (Spring Boot)
D) Go
E) Other (please describe after [Answer]: tag below)

[Answer]: B, FastAPI

---

## Question 4
데이터베이스는 어떤 종류를 사용하나요?

A) Relational Database (PostgreSQL, MySQL)
B) NoSQL Document DB (MongoDB, DynamoDB)
C) NoSQL Key-Value (Redis, DynamoDB)
D) 여러 데이터베이스 조합 (Relational + NoSQL)
E) Other (please describe after [Answer]: tag below)

[Answer]: A, Postgresql

---

## Question 5
실시간 주문 모니터링을 위한 Server-Sent Events (SSE) 구현 시, 연결 관리는 어떻게 하나요?

A) 단순 SSE 연결 (재연결 로직 포함)
B) SSE + Redis Pub/Sub (다중 서버 환경 지원)
C) WebSocket으로 대체
D) Polling 방식으로 대체
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 6
테이블 태블릿의 자동 로그인 정보는 어디에 저장하나요?

A) Browser LocalStorage
B) Browser SessionStorage
C) Browser Cookies
D) IndexedDB
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 7
관리자 인증의 JWT 토큰은 어디에 저장하나요?

A) Browser LocalStorage
B) Browser SessionStorage
C) HTTP-only Cookies
D) Memory only (no persistence)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 8
메뉴 이미지는 어떻게 관리하나요?

A) 이미지 URL만 저장 (외부 호스팅)
B) 서버에 이미지 파일 업로드 및 저장
C) AWS S3 또는 클라우드 스토리지 사용
D) Base64 인코딩하여 DB에 저장
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 9
배포 환경은 어디인가요?

A) AWS (EC2, ECS, Lambda 등)
B) On-premises 서버
C) Docker 컨테이너 (로컬 또는 클라우드)
D) Serverless (AWS Lambda, API Gateway 등)
E) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 10
주문 상태 변경 (대기중/준비중/완료)은 누가 수행하나요?

A) 관리자가 수동으로 변경
B) 시스템이 자동으로 변경 (타이머 기반)
C) 주방 시스템과 연동하여 자동 변경
D) 주문 생성 시 자동 완료 처리 (상태 관리 불필요)
E) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 11
장바구니 데이터의 로컬 저장 시, 페이지 새로고침 후에도 유지되어야 하나요?

A) Yes - LocalStorage 사용하여 영구 보존
B) Yes - SessionStorage 사용하여 브라우저 세션 동안 보존
C) No - 메모리에만 저장 (새로고침 시 초기화)
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 12
테이블 세션 ID는 어떻게 생성하나요?

A) 서버에서 UUID 생성
B) 클라이언트에서 UUID 생성
C) 타임스탬프 기반 ID 생성
D) 테이블 번호 + 타임스탬프 조합
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 13
과거 주문 내역 조회 시, 데이터 보관 기간은 얼마나 되나요?

A) 무제한 (모든 과거 주문 보관)
B) 최근 30일
C) 최근 90일
D) 최근 1년
E) Other (please describe after [Answer]: tag below)

[Answer]: D

---

## Question 14
API 에러 처리 및 로깅은 어떻게 하나요?

A) 콘솔 로그만 사용
B) 파일 기반 로깅 (Winston, Pino 등)
C) 클라우드 로깅 서비스 (CloudWatch, Datadog 등)
D) 에러 추적 서비스 (Sentry, Rollbar 등)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 15
테이블 비밀번호는 어떻게 관리하나요?

A) 평문으로 저장 (간단한 4자리 PIN)
B) bcrypt 해싱하여 저장
C) 비밀번호 없이 테이블 번호만 사용
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 16
동시 주문 처리 시, 데이터 일관성은 어떻게 보장하나요?

A) 데이터베이스 트랜잭션 사용
B) Optimistic Locking (낙관적 잠금)
C) Pessimistic Locking (비관적 잠금)
D) 단순 처리 (동시성 제어 없음)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 17
프론트엔드와 백엔드는 어떻게 배포하나요?

A) 단일 서버에 함께 배포
B) 프론트엔드와 백엔드 별도 서버에 배포
C) 프론트엔드는 CDN, 백엔드는 서버
D) 모두 컨테이너로 배포 (Docker/Kubernetes)
E) Other (please describe after [Answer]: tag below)

[Answer]: D

---

## Question 18
개발 환경 설정은 어떻게 관리하나요?

A) .env 파일 사용
B) 환경변수 직접 설정
C) 설정 파일 (config.json, config.yaml)
D) 클라우드 설정 서비스 (AWS Systems Manager, Azure Key Vault)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 19
코드 품질 및 스타일 가이드는 어떻게 관리하나요?

A) ESLint + Prettier (JavaScript/TypeScript)
B) 언어별 린터 사용 (Pylint, Checkstyle 등)
C) 코드 리뷰만 수행
D) 품질 관리 불필요
E) Other (please describe after [Answer]: tag below)

[Answer]: A - FE , B - BE

---

## Question 20
테스트 전략은 무엇인가요?

A) Unit tests + Integration tests
B) Unit tests만
C) Integration tests만
D) E2E tests만
E) Other (please describe after [Answer]: tag below)

[Answer]: B

---

**모든 질문에 답변을 완료하신 후, "완료했습니다" 또는 "done"이라고 알려주세요.**
