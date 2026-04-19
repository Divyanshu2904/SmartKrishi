import psycopg2
from psycopg2.extras import RealDictCursor
from config import DB_CONFIG

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_CONFIG["host"],
        database=DB_CONFIG["database"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        cursor_factory=RealDictCursor
    )
    return conn
