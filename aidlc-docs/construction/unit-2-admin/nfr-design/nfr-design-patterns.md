# NFR Design Patterns - Unit 2: Admin

## Unit 0 상속 패턴
- Repository Pattern (데이터 접근 추상화)
- Unit of Work / Transaction Pattern (세션 종료 등 복합 작업)
- Connection Pool Pattern (AsyncEngine, 5/15)
- Configuration Pattern (pydantic-settings, .env)
- Password Hashing Pattern (bcrypt, work factor 12)
- Logging Pattern (RotatingFileHandler, 10MB/5 backups)

---

## Unit 2 추가 패턴

### 1. JWT Authentication Middleware
- FastAPI Dependency로 구현
- `get_current_admin(token)` → JWT 검증 → AdminClaims 반환
- 실패 시 HTTPException(401)

### 2. SSE Polling Pattern
- AsyncGenerator로 SSE 스트림 구현
- 3초 간격 DB 폴링 (asyncio.sleep)
- last_checked 타임스탬프로 변경사항 감지
- sse-starlette의 EventSourceResponse 사용

### 3. Cursor-based Pagination
- 과거 주문 내역 무한스크롤용
- cursor = last_item_id, limit = 20
- ORDER BY archived_at DESC, id DESC

### 4. Protected Route Pattern (Frontend)
- React Router wrapper 컴포넌트
- JWT 유효성 체크 → 만료 시 /login 리다이렉트
- authStore.isAuthenticated() 활용

### 5. Optimistic UI Update
- 주문 상태 변경 시 UI 즉시 반영 → API 호출 → 실패 시 롤백
- 삭제 시에는 확인 후 API 호출 → 성공 시 UI 반영 (비관적)
