FROM python:3.12-slim
WORKDIR /app
COPY admin_api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY shared/ /app/shared/
COPY admin_api/ /app/admin_api/
CMD ["uvicorn", "admin_api.app.main:app", "--host", "0.0.0.0", "--port", "8001"]
