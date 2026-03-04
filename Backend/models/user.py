from psycopg2.extras import RealDictCursor
from db import get_db_connection
import bcrypt

def create_user(name, phone, password):
    conn = get_db_connection()
    cur = conn.cursor()

    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    cur.execute("""
        INSERT INTO users (name, phone, password)
        VALUES (%s, %s, %s)
        RETURNING id
    """, (name, phone, hashed_pw))

    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return user_id
