import bcrypt

from shared.config import settings


def hash_password(plain_text: str) -> str:
    return bcrypt.hashpw(plain_text.encode("utf-8"), bcrypt.gensalt(rounds=settings.BCRYPT_ROUNDS)).decode("utf-8")


def verify_password(plain_text: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain_text.encode("utf-8"), hashed.encode("utf-8"))
