import time

CACHE = {}
CACHE_TTL = 600  # 10 minutes (600 seconds)

def get_from_cache(key):
    if key in CACHE:
        cached_data = CACHE[key]
        if time.time() - cached_data["timestamp"] < CACHE_TTL:
            return cached_data["data"]
        else:
            del CACHE[key]  # expired
    return None

def save_to_cache(key, data):
    CACHE[key] = {
        "data": data,
        "timestamp": time.time()
    }
