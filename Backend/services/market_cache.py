import time

_CACHE     = {}
_CACHE_TTL = 600   # 10 minutes

def get_from_cache(key):
    if key in _CACHE:
        entry = _CACHE[key]
        if time.time() - entry["timestamp"] < _CACHE_TTL:
            return entry["data"]
        del _CACHE[key]
    return None

def save_to_cache(key, data):
    _CACHE[key] = {"data": data, "timestamp": time.time()}
