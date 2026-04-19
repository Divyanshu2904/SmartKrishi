import json
from db import get_db_connection

def save_crop_history(user_id, soil_type, crop_name, recommendation, weather):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO crop_history (user_id, soil_type, crop_name, recommendation, weather)
            VALUES (%s, %s, %s, %s, %s)
        """, (user_id, soil_type, crop_name, recommendation, json.dumps(weather)))
        conn.commit()
    finally:
        cur.close()
        conn.close()

def save_image_history(user_id, image_name, image_path, disease, confidence, solution):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO image_history (user_id, image_name, image_path, disease, confidence, solution)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user_id, image_name, image_path, disease, confidence, json.dumps(solution)))
        conn.commit()
    finally:
        cur.close()
        conn.close()

def save_market_history(user_id, crop_name, market, price, trend):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO market_history (user_id, crop_name, market, price, trend)
            VALUES (%s, %s, %s, %s, %s)
        """, (user_id, crop_name, market, price, trend))
        conn.commit()
    finally:
        cur.close()
        conn.close()

def get_user_history(user_id):
    conn = get_db_connection()
    cur  = conn.cursor()
    try:
        cur.execute(
            "SELECT * FROM crop_history   WHERE user_id=%s ORDER BY created_at DESC LIMIT 10",
            (user_id,)
        )
        crops = [dict(r) for r in cur.fetchall()]

        cur.execute(
            "SELECT * FROM image_history  WHERE user_id=%s ORDER BY created_at DESC LIMIT 10",
            (user_id,)
        )
        images = [dict(r) for r in cur.fetchall()]

        cur.execute(
            "SELECT * FROM market_history WHERE user_id=%s ORDER BY created_at DESC LIMIT 10",
            (user_id,)
        )
        markets = [dict(r) for r in cur.fetchall()]

        return {"crops": crops, "images": images, "markets": markets}
    finally:
        cur.close()
        conn.close()
