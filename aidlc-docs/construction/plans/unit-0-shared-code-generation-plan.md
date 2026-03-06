# Code Generation Plan - Unit 0: Shared

## Unit Context
- **Unit**: Unit 0 - Shared (DB Models + Common Utilities)
- **Approach**: Standard (non-TDD)
- **Workspace Root**: /Users/gia/aidlc/aws-aidlc-workshop-tableorder
- **Code Location**: `shared/` directory at workspace root
- **Stories**: Infrastructure unit (no user stories, foundation for Unit 1 & 2)

## Dependencies
- None (this is the foundation unit)

## Generation Steps

### Step 1: Project Structure Setup
- [ ] Create `shared/` directory structure
- [x] Create `shared/requirements.txt`
- [x] Create `shared/__init__.py`

### Step 2: Configuration (Settings)
- [x] Create `shared/config.py` (pydantic-settings BaseSettings)
- [x] Create `.env` file at workspace root

### Step 3: Database Connection
- [x] Create `shared/database.py` (AsyncEngine, session factory, get_db_session)

### Step 4: SQLAlchemy Models
- [x] Create `shared/models/__init__.py`
- [x] Create `shared/models/store.py` (Store)
- [x] Create `shared/models/admin.py` (Admin)
- [x] Create `shared/models/table.py` (TableInfo)
- [x] Create `shared/models/table_session.py` (TableSession)
- [x] Create `shared/models/category.py` (Category)
- [x] Create `shared/models/menu.py` (Menu)
- [x] Create `shared/models/order.py` (Order, OrderItem)
- [x] Create `shared/models/order_history.py` (OrderHistory)

### Step 5: Utilities
- [x] Create `shared/utils/__init__.py`
- [x] Create `shared/utils/password.py` (hash_password, verify_password)
- [x] Create `shared/utils/logging.py` (file-based logging setup)

### Step 6: Alembic Setup
- [x] Create `shared/alembic.ini`
- [x] Create `shared/alembic/env.py`
- [x] Create initial migration script

### Step 7: Docker Compose (PostgreSQL)
- [x] Create `docker-compose.yml` at workspace root

### Step 8: Unit Tests
- [x] Create `shared/tests/__init__.py`
- [x] Create `shared/tests/test_password.py`
- [x] Create `shared/tests/test_models.py`

### Step 9: Documentation
- [x] Create `aidlc-docs/construction/unit-0-shared/code/code-summary.md`
