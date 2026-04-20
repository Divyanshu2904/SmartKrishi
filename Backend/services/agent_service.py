# from services.market_service import get_market_rate

# # ── Supported values ─────────────────────────────────────────
# COMMODITIES = [
#     "rice", "wheat", "maize", "bajra", "jowar", "sugarcane",
#     "cotton", "soybean", "potato", "tomato", "onion", "garlic",
#     "mustard", "groundnut", "sunflower", "chana", "arhar", "moong"
# ]

# MARKETS = [
#     "nagpur", "delhi", "mumbai", "pune", "lucknow", "jaipur",
#     "hyderabad", "bangalore", "chennai", "kolkata", "bhopal",
#     "indore", "patna", "chandigarh", "ahmedabad"
# ]

# # Hindi/Hinglish crop synonyms → English key
# CROP_SYNONYMS = {
#     "gehu": "wheat", "gehun": "wheat", "गेहूं": "wheat",
#     "chawal": "rice", "dhan": "rice", "चावल": "rice",
#     "makka": "maize", "makkai": "maize", "मक्का": "maize",
#     "sarson": "mustard", "सरसों": "mustard",
#     "alu": "potato", "aloo": "potato", "आलू": "potato",
#     "tamatar": "tomato", "टमाटर": "tomato",
#     "pyaz": "onion", "प्याज": "onion",
#     "lasun": "garlic", "लहसुन": "garlic",
#     "moongfali": "groundnut", "मूंगफली": "groundnut",
#     "kapas": "cotton", "कपास": "cotton",
#     "ganna": "sugarcane", "ईख": "sugarcane",
# }

# # Intent keywords
# MARKET_KEYWORDS  = ["market", "rate", "price", "mandi", "bhav", "दाम", "भाव", "रेट", "mandie"]
# CROP_KEYWORDS    = ["crop", "fasal", "kheti", "suggest", "recommend", "फसल", "खेती"]
# DISEASE_KEYWORDS = ["disease", "bimari", "rog", "leaf", "patta", "बीमारी", "रोग", "pattiyon"]
# WEATHER_KEYWORDS = ["weather", "mausam", "barish", "temperature", "मौसम", "बारिश"]

# def _detect_intent(msg):
#     m = msg.lower()
#     if any(w in m for w in MARKET_KEYWORDS):  return "market"
#     if any(w in m for w in DISEASE_KEYWORDS): return "disease"
#     if any(w in m for w in CROP_KEYWORDS):    return "crop"
#     if any(w in m for w in WEATHER_KEYWORDS): return "weather"
#     return "unknown"

# def _extract_commodity(msg):
#     m = msg.lower()
#     for synonym, eng in CROP_SYNONYMS.items():
#         if synonym in m:
#             return eng
#     for crop in COMMODITIES:
#         if crop in m:
#             return crop
#     return None

# def _extract_market(msg):
#     m = msg.lower()
#     for mandi in MARKETS:
#         if mandi in m:
#             return mandi
#     return "nagpur"   # default

# def handle_message(message: str):
#     intent = _detect_intent(message)

#     if intent == "market":
#         commodity = _extract_commodity(message)
#         market    = _extract_market(message)

#         if not commodity:
#             return {
#                 "intent":   "market",
#                 "response": "Kaunsi fasal ka market rate dekhna hai? (Which crop rate do you want?)"
#             }
#         try:
#             data = get_market_rate(commodity, market)
#             return {
#                 "intent":   "market",
#                 "response": (
#                     f"{commodity.title()} ka rate {market.title()} mandi mein "
#                     f"₹{data['current_price']} hai. Trend: {data['trend']}."
#                 ),
#                 "details": data
#             }
#         except Exception as e:
#             return {"intent": "market", "response": str(e)}

#     if intent == "disease":
#         return {
#             "intent":   "disease",
#             "response": "Plant ki photo upload karein — main disease detect kar dunga. "
#                         "(Upload a photo of the plant leaf to detect disease.)"
#         }

#     if intent == "crop":
#         return {
#             "intent":   "crop",
#             "response": "Apni location aur soil type share karein — main best crop suggest karunga. "
#                         "(Share your location and soil type for crop recommendation.)"
#         }

#     if intent == "weather":
#         return {
#             "intent":   "weather",
#             "response": "Apni location (latitude, longitude) share karein — main weather check karunga. "
#                         "(Share your GPS location for weather info.)"
#         }

#     return {
#         "intent":   "unknown",
#         "response": (
#             "Main samajh nahi paya. Aap puch sakte hain:\n"
#             "• Fasal ka market rate (e.g. 'gehu ka bhav nagpur mein')\n"
#             "• Crop recommendation (e.g. 'meri fasal suggest karo')\n"
#             "• Disease detection (e.g. 'patte mein bimari hai')\n"
#             "• Weather (e.g. 'mausam kaisa hai')"
#         )
#     }







from services.market_service import get_market_rate

COMMODITIES = [
    "rice", "wheat", "maize", "bajra", "jowar", "sugarcane",
    "cotton", "soybean", "potato", "tomato", "onion", "garlic",
    "mustard", "groundnut", "sunflower", "chana", "arhar", "moong"
]

MARKETS = [
    "nagpur", "delhi", "mumbai", "pune", "lucknow", "jaipur",
    "hyderabad", "bangalore", "chennai", "kolkata", "bhopal",
    "indore", "patna", "chandigarh", "ahmedabad", "sambalpur",
    "bhubaneswar", "cuttack", "raipur", "jabalpur"
]

CROP_SYNONYMS = {
    "gehu": "wheat", "gehun": "wheat", "गेहूं": "wheat",
    "chawal": "rice", "dhan": "rice", "चावल": "rice", "paddy": "rice",
    "makka": "maize", "makkai": "maize", "मक्का": "maize", "corn": "maize",
    "sarson": "mustard", "सरसों": "mustard",
    "alu": "potato", "aloo": "potato", "आलू": "potato",
    "tamatar": "tomato", "टमाटर": "tomato",
    "pyaz": "onion", "प्याज": "onion",
    "lasun": "garlic", "लहसुन": "garlic",
    "moongfali": "groundnut", "मूंगफली": "groundnut",
    "kapas": "cotton", "कपास": "cotton",
    "ganna": "sugarcane", "ईख": "sugarcane",
    "soya": "soybean", "soyabean": "soybean",
    "arhar": "arhar", "tur": "arhar", "tuar": "arhar",
    "moong": "moong", "mung": "moong",
    "chana": "chana", "gram": "chana", "chickpea": "chana",
}

# Crop knowledge base
CROP_INFO = {
    "sandy": {
        "crops": ["Watermelon", "Muskmelon", "Groundnut", "Carrot", "Radish"],
        "reason": "Sandy soil has good drainage. Best crops are watermelon, muskmelon, groundnut, carrot and radish.",
        "avoid": "Avoid rice and heavy water crops in sandy soil."
    },
    "loamy": {
        "crops": ["Wheat", "Maize", "Cotton", "Soybean", "Vegetables"],
        "reason": "Loamy soil is the best soil for farming. You can grow wheat, maize, cotton, soybean and most vegetables.",
        "avoid": "Almost all crops grow well in loamy soil."
    },
    "clayey": {
        "crops": ["Cotton", "Soybean", "Rice", "Maize", "Sugarcane"],
        "reason": "Clayey soil retains water well. Best for cotton, soybean, rice and sugarcane.",
        "avoid": "Avoid root vegetables like carrot and radish in clayey soil."
    },
    "black": {
        "crops": ["Cotton", "Soybean", "Wheat", "Sorghum", "Pigeon Pea"],
        "reason": "Black cotton soil is excellent for cotton and soybean. Also good for wheat and sorghum.",
        "avoid": "Avoid waterlogging crops during monsoon in black soil."
    },
    "red": {
        "crops": ["Groundnut", "Ragi", "Pulses", "Sunflower", "Potato"],
        "reason": "Red soil is slightly acidic. Best for groundnut, ragi, pulses and sunflower.",
        "avoid": "Avoid crops that need alkaline soil conditions."
    },
    "odisha": {
        "crops": ["Rice", "Maize", "Groundnut", "Turmeric", "Ginger", "Vegetables"],
        "reason": "Odisha has good rainfall and fertile soil. Rice is the main crop. Also suitable for maize, groundnut, turmeric and ginger.",
        "seasons": "Kharif: Rice, Maize | Rabi: Wheat, Pulses | Summer: Vegetables, Watermelon"
    }
}

SEASON_CROPS = {
    "kharif": "Kharif season (June-October) crops: Rice, Maize, Cotton, Soybean, Groundnut, Sugarcane, Bajra, Jowar",
    "rabi": "Rabi season (October-March) crops: Wheat, Mustard, Chickpea, Barley, Peas, Lentils",
    "zaid": "Zaid/Summer season (March-June) crops: Watermelon, Muskmelon, Cucumber, Bitter Gourd, Okra, Moong Dal",
    "summer": "Summer season (March-June) crops: Watermelon, Muskmelon, Cucumber, Bitter Gourd, Okra, Moong Dal",
    "winter": "Winter/Rabi season crops: Wheat, Mustard, Chickpea, Barley, Peas, Potato",
    "monsoon": "Monsoon/Kharif season crops: Rice, Maize, Cotton, Soybean, Groundnut, Sugarcane"
}

MARKET_KEYWORDS  = ["market", "rate", "price", "mandi", "bhav", "दाम", "भाव", "रेट", "cost", "sell", "selling", "becho", "bikri"]
CROP_KEYWORDS    = ["crop", "fasal", "kheti", "suggest", "recommend", "फसल", "खेती", "grow", "plant", "soil", "mitti", "ugao", "kya ugaun", "kya lagaun", "which crop", "best crop", "sandy", "loamy", "clayey", "black", "red", "kharif", "rabi", "zaid", "summer", "winter", "monsoon", "season", "odisha", "fertilizer", "khad", "irrigation", "sinchai", "yield", "production", "harvest", "katai"]
DISEASE_KEYWORDS = ["disease", "bimari", "rog", "leaf", "patta", "बीमारी", "रोग", "pattiyon", "infected", "yellow", "brown", "spot", "wilt", "fungus", "pest", "keeda"]
WEATHER_KEYWORDS = ["weather", "mausam", "barish", "temperature", "मौसम", "बारिश", "rain", "humidity", "forecast"]

def _detect_intent(msg: str) -> str:
    m = msg.lower()
    if any(w in m for w in MARKET_KEYWORDS):  return "market"
    if any(w in m for w in DISEASE_KEYWORDS): return "disease"
    if any(w in m for w in CROP_KEYWORDS):    return "crop"
    if any(w in m for w in WEATHER_KEYWORDS): return "weather"
    return "unknown"

def _extract_commodity(msg: str):
    m = msg.lower()
    for synonym, eng in CROP_SYNONYMS.items():
        if synonym in m:
            return eng
    for crop in COMMODITIES:
        if crop in m:
            return crop
    return None

def _extract_market(msg: str):
    m = msg.lower()
    for mandi in MARKETS:
        if mandi in m:
            return mandi
    return "nagpur"

def _get_crop_response(msg: str) -> str:
    m = msg.lower()

    # Season based
    for season, info in SEASON_CROPS.items():
        if season in m:
            return info

    # Location based - Odisha
    if "odisha" in m or "orissa" in m or "odia" in m:
        info = CROP_INFO["odisha"]
        return (
            f"In Odisha, the best crops are: {', '.join(info['crops'])}.\n\n"
            f"{info['reason']}\n\n"
            f"Season-wise: {info['seasons']}"
        )

    # Soil based
    for soil_key, soil_info in CROP_INFO.items():
        if soil_key in m:
            crops_list = ', '.join(soil_info['crops'])
            return (
                f"For {soil_key} soil, recommended crops are:\n\n"
                f"✅ {crops_list}\n\n"
                f"📋 {soil_info['reason']}\n\n"
                f"⚠️ {soil_info.get('avoid', '')}"
            )

    # Fertilizer
    if "fertilizer" in m or "khad" in m or "urea" in m:
        return (
            "Fertilizer recommendations:\n\n"
            "• NPK 10-26-26 for most crops at sowing\n"
            "• Urea (46% N) for top dressing after 20-25 days\n"
            "• DAP for phosphorus-deficient soil\n"
            "• Organic compost improves soil health\n\n"
            "Always do soil testing before applying fertilizers for best results."
        )

    # Irrigation
    if "irrigation" in m or "sinchai" in m or "water" in m or "paani" in m:
        return (
            "Irrigation tips for better yield:\n\n"
            "• Drip irrigation saves 40-50% water\n"
            "• Rice needs 1200-1500mm water\n"
            "• Wheat needs 400-500mm water\n"
            "• Cotton needs 500-700mm water\n"
            "• Water in early morning or evening to reduce evaporation"
        )

    # General crop suggestion
    return (
        "For best crop recommendation, please tell me:\n\n"
        "1. Your soil type (Sandy / Loamy / Clayey / Black / Red)\n"
        "2. Season (Kharif / Rabi / Summer)\n"
        "3. Your location / state\n\n"
        "Or use the 'Crop Advisor' section for detailed AI-based recommendations with your field information!"
    )

def handle_message(message: str) -> dict:
    intent = _detect_intent(message)

    # ── MARKET ──────────────────────────────────────────────
    if intent == "market":
        commodity = _extract_commodity(message)
        market    = _extract_market(message)

        if not commodity:
            return {
                "intent":   "market",
                "response": "Which crop's market rate do you want to check?\n\nExample: 'wheat price in nagpur' or 'tomato rate'"
            }
        try:
            data = get_market_rate(commodity, market)
            trend_emoji = "📈" if data['trend'] == 'UP' else "📉" if data['trend'] == 'DOWN' else "➡️"
            return {
                "intent":   "market",
                "response": (
                    f"{trend_emoji} {commodity.title()} Market Rate\n\n"
                    f"📍 Market: {market.title()}\n"
                    f"💰 Price: ₹{data['current_price']}/kg\n"
                    f"📊 Trend: {data['trend']}\n"
                    f"📝 Source: {data.get('note', 'Live data')}"
                ),
                "details": data
            }
        except Exception as e:
            return {"intent": "market", "response": f"Market data unavailable for {commodity} at {market}. Please try again later."}

    # ── CROP ────────────────────────────────────────────────
    if intent == "crop":
        response = _get_crop_response(message)
        return {
            "intent":   "crop",
            "response": response
        }

    # ── DISEASE ─────────────────────────────────────────────
    if intent == "disease":
        return {
            "intent":   "disease",
            "response": (
                "🔬 For plant disease detection:\n\n"
                "1. Go to the 'Scan' section in the app\n"
                "2. Take a clear photo of the infected leaf\n"
                "3. Our AI will detect the disease and suggest treatment\n\n"
                "Common diseases:\n"
                "• Yellow leaves → Nitrogen deficiency or viral infection\n"
                "• Brown spots → Fungal disease (Early/Late blight)\n"
                "• White powder → Powdery mildew\n"
                "• Wilting → Root rot or water stress"
            )
        }

    # ── WEATHER ─────────────────────────────────────────────
    if intent == "weather":
        return {
            "intent":   "weather",
            "response": (
                "🌤️ For real-time weather information:\n\n"
                "Go to the Home screen — it shows your current location's weather including temperature, humidity and rainfall.\n\n"
                "Weather tips for farming:\n"
                "• Temperature > 35°C: Increase irrigation frequency\n"
                "• Humidity > 80%: Watch for fungal diseases\n"
                "• Rain forecast: Delay pesticide spraying"
            )
        }

    # ── UNKNOWN ─────────────────────────────────────────────
    return {
        "intent":   "unknown",
        "response": (
            "Hello! I am SmartKrishi AI Assistant. I can help you with:\n\n"
            "🌾 Crop Recommendation\n"
            "   → 'Best crop for black soil'\n"
            "   → 'Which crop in kharif season'\n\n"
            "💰 Market Rates\n"
            "   → 'Wheat price in nagpur'\n"
            "   → 'Tomato rate today'\n\n"
            "🔬 Disease Detection\n"
            "   → 'Yellow spots on tomato leaves'\n\n"
            "🌤️ Weather & Irrigation\n"
            "   → 'When to irrigate wheat'\n\n"
            "Ask me anything about farming!"
        )
    }