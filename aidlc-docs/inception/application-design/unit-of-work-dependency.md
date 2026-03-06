# Unit of Work Dependencies

## Dependency Matrix

| Unit | Depends On | Dependency Type |
|------|-----------|-----------------|
| Unit 0: Shared | - | None (독립) |
| Unit 1: Customer API | Unit 0: Shared | 모델 import, DB 연결 |
| Unit 1: Customer Web | Unit 1: Customer API | HTTP REST |
| Unit 2: Admin API | Unit 0: Shared | 모델 import, DB 연결 |
| Unit 2: Admin Web | Unit 2: Admin API | HTTP REST + SSE |

---

## Implementation Order

```
+-------------------+
|  Unit 0: Shared   |  <-- 1st: DB 모델, 스키마, 유틸리티
|  (DB + Common)    |
+-------------------+
         |
         +------------------+------------------+
         |                                     |
         v                                     v
+-------------------+               +-------------------+
|  Unit 1: Customer |  <-- 2nd     |  Unit 2: Admin    |  <-- 3rd
|  (API + Web)      |               |  (API + Web)      |
+-------------------+               +-------------------+
```

### Phase 1: Unit 0 - Shared (선행 필수)
- DB 모델 및 스키마 정의
- Alembic 마이그레이션 실행
- 공통 유틸리티 구현
- Docker Compose (PostgreSQL) 설정

### Phase 2: Unit 1 - Customer (Unit 0 완료 후)
- Customer API 구현 (shared 모델 import)
- Customer Web 구현
- Customer API ↔ Customer Web 통합 테스트

### Phase 3: Unit 2 - Admin (Unit 0 완료 후, Unit 1과 독립 가능)
- Admin API 구현 (shared 모델 import)
- Admin Web 구현
- Admin API ↔ Admin Web 통합 테스트
- SSE 실시간 주문 모니터링 테스트 (Customer API로 주문 생성 필요)

---

## Cross-Unit Integration Points

### Customer API → Admin API (간접)
- 공유 DB를 통한 데이터 공유
- Customer API에서 주문 생성 → Admin API SSE에서 감지
- 직접 API 호출 없음

### Shared → Customer API / Admin API
- SQLAlchemy 모델 import
- 공통 유틸리티 (password hashing, config) import
- DB 연결 설정 공유

---

## Notes
- Unit 1과 Unit 2는 Unit 0 완료 후 병렬 개발 가능
- 단, SSE 통합 테스트는 Customer API가 필요하므로 Unit 1 → Unit 2 순서 권장
