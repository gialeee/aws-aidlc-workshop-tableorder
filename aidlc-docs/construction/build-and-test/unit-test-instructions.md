# Unit Test Execution

## Run Unit Tests

Standard 코드 생성 방식 사용 (non-TDD). 전체 unit test suite 실행 필요.

### 1. Execute All Unit Tests
프로젝트 루트에서:
```bash
PYTHONPATH=. pytest shared/tests/ -v
```

### 2. Expected Results
- **test_password.py**: 4 tests (hash, verify correct, verify incorrect, unique salts)
- **test_models.py**: 7 tests (import check, tablename checks)
- **Total**: 11 tests, 0 failures

### 3. Fix Failing Tests
테스트 실패 시:
1. 에러 메시지 확인
2. import 경로 문제면 `PYTHONPATH=.` 확인
3. bcrypt 관련이면 `pip install bcrypt` 확인
