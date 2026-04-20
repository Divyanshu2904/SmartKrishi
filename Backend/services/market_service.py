# import requests
# from config import DATA_GOV_API_KEY, AGMARKNET_RESOURCE_ID
# from services.market_cache import get_from_cache, save_to_cache

# BASE_URL = f"https://api.data.gov.in/resource/{AGMARKNET_RESOURCE_ID}"

# def _fetch_records(commodity, market, limit=5):
#     params = {
#         "api-key":           DATA_GOV_API_KEY,
#         "format":            "json",
#         "limit":             limit,
#         "filters[commodity]": commodity.title(),
#         "filters[market]":    market.title()
#     }
#     r = requests.get(BASE_URL, params=params, timeout=6)
#     if r.status_code != 200:
#         raise Exception("Agmarknet API unavailable")
#     return r.json().get("records", [])

# def _clean_prices(records):
#     prices = []
#     for r in records:
#         try:
#             prices.append(int(r["modal_price"]))
#         except Exception:
#             continue
#     return prices[::-1]   # oldest → newest

# def _trend(prices):
#     if len(prices) < 2:
#         return "STABLE"
#     diff = prices[-1] - prices[-2]
#     if diff > 0:   return "UP"
#     if diff < 0:   return "DOWN"
#     return "STABLE"

# def get_market_rate(commodity, market):
#     key    = f"{commodity.lower()}_{market.lower()}"
#     cached = get_from_cache(key)
#     if cached:
#         cached["note"] = "cached"
#         return cached

#     try:
#         records = _fetch_records(commodity, market)
#         prices  = _clean_prices(records)
#         if not prices:
#             raise Exception("No records found for this commodity/market combination")

#         data = {
#             "commodity":     commodity,
#             "market":        market,
#             "current_price": prices[-1],
#             "trend":         _trend(prices),
#             "recent_prices": prices,
#             "note":          "live"
#         }
#         save_to_cache(key, data)
#         return data

#     except Exception:
#         stale = get_from_cache(key)
#         if stale:
#             stale["note"] = "stale_cache"
#             return stale
#         raise Exception(f"Market data unavailable for {commodity} at {market}")







import requests
from config import DATA_GOV_API_KEY, AGMARKNET_RESOURCE_ID
from services.market_cache import get_from_cache, save_to_cache

BASE_URL = f"https://api.data.gov.in/resource/{AGMARKNET_RESOURCE_ID}"

# Fallback prices (approximate mandi rates in INR/quintal)
FALLBACK_PRICES = {
    "wheat":     {"price": 22.75, "unit": "₹/kg"},
    "rice":      {"price": 23.00, "unit": "₹/kg"},
    "maize":     {"price": 19.62, "unit": "₹/kg"},
    "bajra":     {"price": 25.00, "unit": "₹/kg"},
    "jowar":     {"price": 31.80, "unit": "₹/kg"},
    "sugarcane": {"price": 3.40,  "unit": "₹/kg"},
    "cotton":    {"price": 66.20, "unit": "₹/kg"},
    "soybean":   {"price": 46.00, "unit": "₹/kg"},
    "potato":    {"price": 12.00, "unit": "₹/kg"},
    "tomato":    {"price": 8.00,  "unit": "₹/kg"},
    "onion":     {"price": 15.00, "unit": "₹/kg"},
    "garlic":    {"price": 80.00, "unit": "₹/kg"},
    "mustard":   {"price": 56.50, "unit": "₹/kg"},
    "groundnut": {"price": 63.77, "unit": "₹/kg"},
    "chana":     {"price": 54.40, "unit": "₹/kg"},
    "arhar":     {"price": 70.00, "unit": "₹/kg"},
    "moong":     {"price": 85.58, "unit": "₹/kg"},
}

def _fetch_records(commodity, market, limit=5):
    params = {
        "api-key":            DATA_GOV_API_KEY,
        "format":             "json",
        "limit":              limit,
        "filters[commodity]": commodity.title(),
        "filters[market]":    market.title()
    }
    r = requests.get(BASE_URL, params=params, timeout=6)
    if r.status_code != 200:
        raise Exception("Agmarknet API unavailable")
    return r.json().get("records", [])

def _clean_prices(records):
    prices = []
    for r in records:
        try:
            prices.append(int(r["modal_price"]))
        except Exception:
            continue
    return prices[::-1]

def _trend(prices):
    if len(prices) < 2:
        return "STABLE"
    diff = prices[-1] - prices[-2]
    if diff > 0:  return "UP"
    if diff < 0:  return "DOWN"
    return "STABLE"

def _get_fallback(commodity, market):
    key  = commodity.lower()
    info = FALLBACK_PRICES.get(key)
    if not info:
        raise Exception(f"'{commodity}' ka market data available nahi hai")
    return {
        "commodity":     commodity,
        "market":        market,
        "current_price": info["price"],
        "unit":          info["unit"],
        "trend":         "STABLE",
        "recent_prices": [info["price"]],
        "note":          "MSP/approximate rate (live API unavailable)"
    }

def get_market_rate(commodity, market):
    key    = f"{commodity.lower()}_{market.lower()}"
    cached = get_from_cache(key)
    if cached:
        cached["note"] = "cached"
        return cached

    try:
        records = _fetch_records(commodity, market)
        prices  = _clean_prices(records)
        if not prices:
            raise Exception("No records found")

        data = {
            "commodity":     commodity,
            "market":        market,
            "current_price": round(prices[-1] / 100, 2),  # quintal → quintal
            "unit":          "₹/kg",
            "trend":         _trend(prices),
            "recent_prices": prices,
            "note":          "live"
        }
        save_to_cache(key, data)
        return data

    except Exception:
        stale = get_from_cache(key)
        if stale:
            stale["note"] = "stale_cache"
            return stale
        return _get_fallback(commodity, market)