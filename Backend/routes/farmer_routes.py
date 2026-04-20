# from flask import Blueprint, request
# from services.soil_mapper import map_soil_inputs
# from services.crop_service import recommend_crop
# from services.weather_service import get_weather
# from services.history_service import save_crop_history
# from utils.response import success_response, error_response

# farmer_bp = Blueprint("farmer", __name__)

# @farmer_bp.route("/farmer/recommend-crop", methods=["POST"])
# def farmer_recommend():
#     """
#     Android body (JSON):
#     {
#         "soil_type":       "loamy",       // loamy/clayey/sandy/black/red
#         "water":           "medium",      // high/medium/low
#         "previous_crop":   "legume",      // legume/cereal/other
#         "lat":             21.5,
#         "lon":             83.9,
#         "user_id":         1              // optional – for history
#     }
#     """
#     try:
#         data = request.json or {}

#         soil_type = data.get("soil_type", "loamy").lower().strip()
#         water          = data.get("water", "medium")
#         previous_crop  = data.get("previous_crop", "other")
#         lat            = data.get("lat")
#         lon            = data.get("lon")
#         user_id        = data.get("user_id")

#         if lat is None or lon is None:
#             return error_response("Location (lat, lon) required hai")

#         soil    = map_soil_inputs(soil_type, water, previous_crop)
#         weather = get_weather(lat, lon)

#         features = [
#             soil["N"],
#             soil["P"],
#             soil["K"],
#             weather["temperature"],
#             weather["humidity"],
#             soil["PH"],
#             weather["rainfall"]
#         ]

#         crop = recommend_crop(features)

#         if user_id:
#             save_crop_history(user_id, soil_type, crop, crop, weather)

#         return success_response("Crop recommended", {
#             "crop":             crop,
#             "soil_estimation":  soil,
#             "weather":          weather,
#             "note":             "Soil values are estimated from farmer inputs"
#         })

#     except Exception as e:
#         return error_response(str(e))


# # Direct NPK route (for advanced users / testing)
# @farmer_bp.route("/recommend-crop", methods=["POST"])
# def recommend_direct():
#     """
#     Body: { N, P, K, temperature, humidity, ph, rainfall }
#     """
#     try:
#         data     = request.json or {}

#         features = [
#             data.get("N"),
#             data.get("P"),
#             data.get("K"),
#             data.get("temperature"),
#             data.get("humidity"),
#             data.get("ph"),
#             data.get("rainfall")
#             ]
#         crop = recommend_crop(features)
#         return success_response("Crop recommended", {"crop": crop})
#     except KeyError as e:
#         return error_response(f"Missing field: {e}")
#     except Exception as e:
#         return error_response(str(e))



from flask import Blueprint, request
from services.soil_mapper import map_soil_inputs
from services.crop_service import recommend_crop
from services.weather_service import get_weather
from services.history_service import save_crop_history
from utils.response import success_response, error_response

farmer_bp = Blueprint("farmer", __name__)

@farmer_bp.route("/farmer/recommend-crop", methods=["POST"])
def farmer_recommend():
    try:
        data = request.json or {}

        # Validate required fields
        soil_type     = data.get("soil_type", "").strip()
        water         = data.get("water", "").strip()
        previous_crop = data.get("previous_crop", "").strip()
        lat           = data.get("lat")
        lon           = data.get("lon")
        user_id       = data.get("user_id")

        # All fields required
        if not soil_type:
            return error_response("Mitti ka prakar batao (soil_type required)")
        if not water:
            return error_response("Paani ki uplabdhta batao (water required)")
        if not previous_crop:
            return error_response("Pichli fasal batao (previous_crop required)")
        if lat is None or lon is None:
            return error_response("Location (lat, lon) required hai")

        # Soil mapping
        soil = map_soil_inputs(
            soil_type=soil_type.lower(),
            water_retention=water.lower(),
            previous_crop=previous_crop.lower()
        )

        # Weather
        weather = get_weather(lat, lon)

        # Feature vector — correct order matching training dataset
        # Dataset order: N, P, K, temperature, humidity, ph, rainfall
        features = [
            soil["N"],
            soil["P"],
            soil["K"],
            weather["temperature"],
            weather["humidity"],
            soil["PH"],
            weather["rainfall"]
        ]

        # Get multiple crop recommendations
        crops = recommend_crop(features)

        # Save history for logged-in users
        if user_id and isinstance(crops, list) and len(crops) > 0:
            save_crop_history(
                user_id,
                soil_type,
                crops[0]["name"],
                crops[0]["name"],
                weather
            )

        return success_response(
            "Crops recommended",
            {
                "crops":           crops,
                "soil_estimation": soil,
                "weather":         weather,
                "note":            "Based on current weather and soil"
            }
        )

    except KeyError as e:
        return error_response(f"Missing field: {str(e)}")
    except Exception as e:
        return error_response(str(e))


# Direct NPK route (testing only)
@farmer_bp.route("/recommend-crop", methods=["POST"])
def recommend_direct():
    try:
        data     = request.json or {}
        features = [
            data["N"], data["P"], data["K"],
            data["temperature"], data["humidity"],
            data["ph"], data["rainfall"]
        ]
        crops = recommend_crop(features)
        return success_response("Crops recommended", {"crops": crops})
    except KeyError as e:
        return error_response(f"Missing field: {e}")
    except Exception as e:
        return error_response(str(e))