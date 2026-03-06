# Tech Stack Decisions - Unit 1: Customer

> Unit 0 (Shared) tech stack을 상속하며, Customer 유닛 추가 기술을 정의합니다.

## Backend: Customer API

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| FastAPI | 0.115+ | Web Framework | async 지원, 자동 OpenAPI 문서, Pydantic 통합 |
| Pydantic | 2.0+ | 스키마 검증 | FastAPI 기본 통합, 타입 안전 |
| uvicorn | 0.30+ | ASGI Server | FastAPI 표준 서버 |
| shared models | - | DB 모델 | Unit 0에서 정의한 SQLAlchemy 모델 import |

## Frontend: Customer Web

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| React | 18+ | UI Framework | 컴포넌트 기반, 풍부한 생태계 |
| Vite | 5+ | Build Tool | 빠른 HMR, 간단한 설정 |
| Zustand | 4+ | State Management | 경량, 보일러플레이트 최소 |
| React Router | 6+ | Routing | SPA 라우팅 표준 |
| ESLint | 9+ | Linting | 코드 품질 |
| Prettier | 3+ | Formatting | 코드 스타일 일관성 |

## Infrastructure

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| Docker | 컨테이너화 | customer-api, customer-web 각각 Dockerfile |
| Docker Compose | 오케스트레이션 | Unit 0의 docker-compose.yml에 서비스 추가 |
