# Infrastructure Design - Unit 1: Customer

> Unit 0 (Shared)의 인프라를 확장하여 Customer API와 Customer Web 서비스를 추가합니다.

## Docker Compose 추가 서비스

### customer-api
- **Build Context**: 프로젝트 루트 (shared 접근 필요)
- **Dockerfile**: `customer-api/Dockerfile`
- **Port**: 8001:8000
- **Depends On**: postgres (healthy)
- **Environment**: DATABASE_URL, LOG_LEVEL
- **Network**: tableorder-network

### customer-web
- **Build Context**: `customer-web/`
- **Port**: 3001:80
- **Depends On**: customer-api
- **Environment**: VITE_API_URL=http://localhost:8001
- **Network**: tableorder-network

---

## Dockerfile - Customer API

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY customer-api/ /app/customer-api/
RUN pip install --no-cache-dir -r /app/shared/requirements.txt \
    && pip install --no-cache-dir -r /app/customer-api/requirements.txt
WORKDIR /app/customer-api
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Dockerfile - Customer Web

```dockerfile
FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## Nginx Configuration (Customer Web)

- SPA 라우팅: 모든 경로를 index.html로 폴백
- API 프록시: `/api/*` → `http://customer-api:8000`

---

## Environment Variables 추가 (.env)

```
# Customer API
CUSTOMER_API_PORT=8001

# Customer Web
CUSTOMER_WEB_PORT=3001
VITE_API_URL=http://localhost:8001
```
