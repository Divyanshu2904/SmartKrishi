from db import get_db_connection

def save_crop_history(user_id, crop, recommendation, weather):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO crop_history (user_id, crop_name, recommendation, weather)
        VALUES (%s, %s, %s, %s)
    """, (user_id, crop, recommendation, weather))

    conn.commit()
    cur.close()
    conn.close()

    def save_image_history(user_id, name, path):
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO image_history (user_id, image_name, image_path)
            VALUES (%s, %s, %s)
        """, (user_id, name, path))

        conn.commit()
        cur.close()
        conn.close()
