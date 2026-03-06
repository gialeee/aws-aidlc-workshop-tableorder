#!/bin/bash
# DB 재생성 스크립트

echo "🔄 Stopping services..."
docker-compose down

echo "🗑️  Removing old database volume..."
docker volume rm aws-aidlc-workshop-tableorder_postgres_data 2>/dev/null || true

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "📦 Running migrations..."
PYTHONPATH=. poetry run alembic -c shared/alembic.ini upgrade head

echo "✅ Database reset complete!"
