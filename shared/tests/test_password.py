from shared.utils.password import hash_password, verify_password


def test_hash_password_returns_string():
    result = hash_password("test123")
    assert isinstance(result, str)
    assert result != "test123"


def test_verify_password_correct():
    hashed = hash_password("mypassword")
    assert verify_password("mypassword", hashed) is True


def test_verify_password_incorrect():
    hashed = hash_password("mypassword")
    assert verify_password("wrongpassword", hashed) is False


def test_hash_password_unique():
    hash1 = hash_password("same")
    hash2 = hash_password("same")
    assert hash1 != hash2  # bcrypt generates different salts
