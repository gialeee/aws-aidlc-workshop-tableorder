FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY customer-api/ /app/customer-api/
RUN pip install --no-cache-dir -r /app/shared/requirements.txt \
    && pip install --no-cache-dir -r /app/customer-api/requirements.txt
WORKDIR /app/customer-api
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
