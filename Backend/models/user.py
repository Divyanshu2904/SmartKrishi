import bcrypt
from db import get_db_connection

# ── Create new user ──────────────────────────────────────────
def create_user(name, phone, password, language="hi"):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        cur.execute("""
            INSERT INTO users (name, phone, password, language)
            VALUES (%s, %s, %s, %s)
            RETURNING id, name, phone, language, created_at
        """, (name, phone, hashed_pw, language))
        user = dict(cur.fetchone())
        conn.commit()
        return user
    finally:
        cur.close()
        conn.close()

# ── Get user by phone ────────────────────────────────────────
def get_user_by_phone(phone):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        cur.execute("SELECT * FROM users WHERE phone = %s", (phone,))
        row = cur.fetchone()
        return dict(row) if row else None
    finally:
        cur.close()
        conn.close()

# ── Verify password ──────────────────────────────────────────
def verify_user(phone, password):
    user = get_user_by_phone(phone)
    if not user:
        return None
    if bcrypt.checkpw(password.encode(), user["password"].encode()):
        user.pop("password", None)   # never send password to client
        return user
    return None

# ── Get user by id ───────────────────────────────────────────
def get_user_by_id(user_id):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        cur.execute(
            "SELECT id, name, phone, language, created_at FROM users WHERE id = %s",
            (user_id,)
        )
        row = cur.fetchone()
        return dict(row) if row else None
    finally:
        cur.close()
        conn.close()
