# Tech Stack Decisions - Unit 0: Shared

## Core Technologies

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| Python | 3.12+ | Runtime | FastAPI 호환, async 지원 |
| SQLAlchemy | 2.0+ | ORM | 가장 널리 사용, async 지원, 풍부한 생태계 |
| Alembic | 1.13+ | DB Migration | SQLAlchemy 공식 마이그레이션 도구 |
| asyncpg | 0.29+ | DB Driver | PostgreSQL async 드라이버 (최고 성능) |
| bcrypt | 4.1+ | Password Hashing | 업계 표준, 안전한 해싱 |
| PostgreSQL | 16+ | Database | 안정성, ACID, JSON 지원 |

## Configuration

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| python-dotenv | .env 파일 로드 | 환경별 설정 분리 |
| pydantic-settings | 설정 검증 | 타입 안전한 설정 관리 |

## Development Tools

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| Pylint | 코드 품질 | Python 표준 린터 |
| pytest | 테스트 | Python 표준 테스트 프레임워크 |

## Infrastructure

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| Docker | 컨테이너화 | 환경 일관성, 배포 편의 |
| Docker Compose | 서비스 오케스트레이션 | 로컬 개발 및 배포 |
