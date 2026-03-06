# Code Summary - Unit 2: Admin

## Admin API (admin-api/) - 17 files
- `requirements.txt` - Python 의존성
- `Dockerfile` - Python 3.12-slim
- `app/main.py` - FastAPI app, CORS, router 등록
- `app/dependencies.py` - DB session, JWT auth middleware
- `app/schemas/requests.py` - 6 request models
- `app/schemas/responses.py` - 7 response models
- `app/repositories/` - 6 repositories (admin, order, history, session, menu, category)
- `app/services/` - 5 services (auth, order+SSE, table, menu, category)
- `app/routers/` - 5 routers (auth, orders, tables, menus, categories)

## Admin Web (admin-web/) - 27 files
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- `index.html`, `nginx.conf`, `Dockerfile`
- `src/main.jsx`, `src/App.jsx`, `src/index.css`
- `src/utils/api.js` - fetch wrapper + SSE URL helper
- `src/services/` - 5 services (auth, order, table, menu, category)
- `src/stores/` - 2 stores (auth, order)
- `src/pages/` - 4 pages (Login, Dashboard, TableManagement, MenuManagement)
- `src/components/common/` - 5 components (NavBar, ProtectedRoute, ConfirmDialog, LoadingSpinner, Toast)
- `src/components/dashboard/` - 3 components (TableGrid, TableCard, OrderPreviewItem)
- `src/components/table/` - 5 components (OrderList, OrderCard, OrderStatusBadge, SessionEndButton, OrderHistoryModal)
- `src/components/menu/` - 5 components (CategoryList, CategoryForm, MenuList, MenuForm, MenuCard)

## API Endpoints (11개)
- POST /api/admin/login
- GET /api/admin/orders
- GET /api/admin/orders/stream (SSE)
- PUT /api/admin/orders/{id}/status
- DELETE /api/admin/orders/{id}
- POST /api/admin/tables/{id}/session/end
- GET /api/admin/tables/{id}/history
- GET/POST /api/admin/menus
- PUT/DELETE /api/admin/menus/{id}
- GET/POST /api/admin/categories
- PUT/DELETE /api/admin/categories/{id}

## Total: 44 files
