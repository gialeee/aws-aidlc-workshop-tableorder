# Deployment Architecture - Unit 2: Admin

## Architecture

```
                    +-------------------+
                    |   Admin Web       |
                    |   :3001 → :80     |
                    |   (nginx + React) |
                    +-------------------+
                            |
                            v
                    +-------------------+
                    |   Admin API       |
                    |   :8001 → :8000   |
                    |   (FastAPI)       |
                    +-------------------+
                            |
                            v
                    +-------------------+
                    |   PostgreSQL      |
                    |   :5432           |
                    |   (Unit 0)        |
                    +-------------------+
```

## Dockerfile - Admin API

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Dockerfile - Admin Web

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## Development Mode
개발 시에는 Docker 없이 직접 실행:
- Admin API: `uvicorn app.main:app --reload --port 8001`
- Admin Web: `npm run dev -- --port 3001`
