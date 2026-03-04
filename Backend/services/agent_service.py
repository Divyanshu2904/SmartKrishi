# import re
# from services.market_service import get_market_rate


# SUPPORTED_COMMODITIES = ["rice", "wheat", "maize"]
# SUPPORTED_MARKETS = ["nagpur", "delhi", "mumbai"]


# def detect_intent(message: str):
#     msg = message.lower()

#     if any(word in msg for word in ["market", "rate", "price", "mandi"]):
#         return "market"

#     return "unknown"


# def extract_commodity(message: str):
#     msg = message.lower()
#     for crop in SUPPORTED_COMMODITIES:
#         if crop in msg:
#             return crop
#     return None


# def extract_market(message: str):
#     msg = message.lower()
#     for mandi in SUPPORTED_MARKETS:
#         if mandi in msg:
#             return mandi

#     # Intelligent fallback
#     return "nagpur"  # default mandi (can later link to user location)


# def handle_message(message: str):

#     intent = detect_intent(message)

#     if intent == "market":

#         commodity = extract_commodity(message)
#         market = extract_market(message)

#         if not commodity:
#             return {
#                 "type": "market",
#                 "response": "Kaunsi fasal ka market rate dekhna hai?"
#             }

#         try:
#             data = get_market_rate(commodity, market)

#             return {
#                 "type": "market",
#                 "response": f"{commodity} ka rate {market} mandi me {data['current_price']} hai aur trend {data['trend']} hai.",
#                 "details": data
#             }

#         except Exception as e:
#             return {
#                 "type": "market",
#                 "response": str(e)
#             }

#     return {
#         "type": "unknown",
#         "response": "Maaf kijiye, main sirf market ya crop related sawalon ka jawab de sakta hoon."
#     }




import re
from services.market_service import get_market_rate


SUPPORTED_COMMODITIES = ["rice", "wheat", "maize"]
SUPPORTED_MARKETS = ["nagpur", "delhi", "mumbai"]


def detect_intent(message: str):
    msg = message.lower()

    if any(word in msg for word in ["market", "rate", "price", "mandi"]):
        return "market"

    return "unknown"


def extract_commodity(message: str):
    msg = message.lower()
    for crop in SUPPORTED_COMMODITIES:
        if crop in msg:
            return crop
    return None


def extract_market(message: str):
    msg = message.lower()
    for mandi in SUPPORTED_MARKETS:
        if mandi in msg:
            return mandi

    # Intelligent fallback
    return "nagpur"  # default mandi (can later link to user location)


def handle_message(message: str):

    intent = detect_intent(message)

    if intent == "market":

        commodity = extract_commodity(message)
        market = extract_market(message)

        if not commodity:
            return {
                "type": "market",
                "response": "Kaunsi fasal ka market rate dekhna hai?"
            }

        try:
            data = get_market_rate(commodity, market)

            return {
                "type": "market",
                "response": f"{commodity} ka rate {market} mandi me {data['current_price']} hai aur trend {data['trend']} hai.",
                "details": data
            }

        except Exception as e:
            return {
                "type": "market",
                "response": str(e)
            }

    return {
        "type": "unknown",
        "response": "Maaf kijiye, main sirf market ya crop related sawalon ka jawab de sakta hoon."
    }