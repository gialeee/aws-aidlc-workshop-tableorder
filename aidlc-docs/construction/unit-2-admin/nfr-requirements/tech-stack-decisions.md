# Tech Stack Decisions - Unit 2: Admin

## Admin API (Backend)
- **Runtime**: Python 3.12+
- **Framework**: FastAPI
- **ORM**: SQLAlchemy 2.0+ (async, shared 모델 import)
- **Auth**: PyJWT (HS256)
- **Password**: bcrypt (shared/utils)
- **SSE**: sse-starlette
- **Logging**: Python logging (shared/utils)
- **Code Quality**: Pylint

## Admin Web (Frontend)
- **Framework**: React 18+
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable
- **HTTP Client**: fetch API (내장)
- **SSE Client**: EventSource (내장)
- **Routing**: React Router v6
- **Code Quality**: ESLint + Prettier

## Infrastructure
- **Container**: Docker + Dockerfile
- **DB**: PostgreSQL 16 (shared docker-compose)
