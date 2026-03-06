from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://tableorder_user:password@localhost:5432/tableorder"
    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_EXPIRATION_HOURS: int = 16
    BCRYPT_ROUNDS: int = 12
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "app.log"

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore"}


settings = Settings()
