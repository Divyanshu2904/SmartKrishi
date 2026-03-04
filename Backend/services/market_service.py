import requests
from config import DATA_GOV_API_KEY, AGMARKNET_RESOURCE_ID
from services.market_cache import get_from_cache, save_to_cache

BASE_URL = f"https://api.data.gov.in/resource/{AGMARKNET_RESOURCE_ID}"

def fetch_agmarknet_data(commodity, market, limit=5):
    params = {
        "api-key": DATA_GOV_API_KEY,
        "format": "json",
        "limit": limit,
        "filters[commodity]": commodity,
        "filters[market]": market
    }

    response = requests.get(BASE_URL, params=params, timeout=5)

    if response.status_code != 200:
        raise Exception("Agmarknet API failed")

    return response.json().get("records", [])


def clean_prices(records):
    prices = []
    for r in records:
        try:
            prices.append(int(r["modal_price"]))
        except:
            continue
    return prices[::-1]


def calculate_trend(prices):
    if len(prices) < 2:
        return "INSUFFICIENT_DATA"
    if prices[-1] > prices[-2]:
        return "UP"
    elif prices[-1] < prices[-2]:
        return "DOWN"
    return "STABLE"


def get_market_rate(commodity, market):
    cache_key = f"{commodity}_{market}"

    # 1️⃣ Try cache first
    cached_data = get_from_cache(cache_key)
    if cached_data:
        cached_data["note"] = "Showing cached market data"
        return cached_data

    try:
        # 2️⃣ Try live API
        records = fetch_agmarknet_data(commodity, market)
        prices = clean_prices(records)

        if not prices:
            raise Exception("No market data available")

        trend = calculate_trend(prices)

        data = {
            "commodity": commodity,
            "market": market,
            "current_price": prices[-1],
            "trend": trend,
            "recent_prices": prices
        }

        # 3️⃣ Save to cache
        save_to_cache(cache_key, data)

        return data

    except Exception:
        # 4️⃣ Fallback to stale cache (if available)
        cached_data = get_from_cache(cache_key)
        if cached_data:
            cached_data["note"] = "API unavailable, showing last known data"
            return cached_data

        raise Exception("Market data temporarily unavailable")
