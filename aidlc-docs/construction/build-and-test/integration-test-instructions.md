# Integration Test Instructions

## Purpose
Unit 0 (Shared)는 DB 모델과 유틸리티 패키지로, 단독 integration test 대상은 제한적입니다.
Unit 1 (Customer), Unit 2 (Admin) 완료 후 전체 integration test를 수행합니다.

## Unit 0 Integration Verification

### Scenario 1: Database Schema Creation
- **Description**: Alembic migration으로 전체 스키마가 정상 생성되는지 확인
- **Setup**: PostgreSQL 컨테이너 실행
- **Test Steps**:
```bash
docker compose up -d
cd shared
PYTHONPATH=.. alembic upgrade head
```
- **Expected**: 9개 테이블 생성, FK 관계 정상, 인덱스 생성

### Scenario 2: Model Relationship Verification
- **Description**: SQLAlchemy relationship이 정상 동작하는지 확인
- **Test**: Python shell에서 모델 import 및 relationship 확인
```bash
PYTHONPATH=. python -c "from shared.models import *; print('All models loaded')"
```

## Full Integration Tests
Unit 1, Unit 2 완료 후 추가 예정:
- Customer API → DB 연동
- Admin API → DB 연동
- SSE 실시간 통신
