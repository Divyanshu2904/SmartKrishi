from flask import Blueprint, request
from services.soil_mapper import map_soil_inputs
from services.crop_service import recommend_crop
from services.weather_service import get_weather
from utils.response import success_response, error_response

farmer_bp = Blueprint("farmer", __name__)

@farmer_bp.route("/farmer/recommend-crop", methods=["POST"])
def farmer_recommend():
    try:
        data = request.json
        if not data:
            return error_response("Request body missing")

        # 1️⃣ Farmer-friendly inputs
        soil_type = data.get("soil_type")          # clayey / sandy / loamy
        water_retention = data.get("water")        # high / medium / low
        previous_crop = data.get("previous_crop") # legume / other

        # 2️⃣ Location (mandatory)
        lat = data.get("lat")
        lon = data.get("lon")

        if lat is None or lon is None:
            return error_response("Location (lat, lon) required")

        # 3️⃣ Soil abstraction (N, P, K, PH)
        soil = map_soil_inputs(
            soil_type=soil_type,
            water_retention=water_retention,
            previous_crop=previous_crop
        )

        # 4️⃣ Real-time weather
        weather = get_weather(lat, lon)

        # 5️⃣ FINAL feature vector (order must match ML training)
        features = [
            soil["N"],
            soil["P"],
            soil["K"],
            soil["PH"],
            weather["temperature"],
            weather["humidity"],
            weather["rainfall"]
        ]

        # 6️⃣ Crop recommendation
        crop = recommend_crop(features)

        # 7️⃣ Response
        return success_response(
            "Crop recommended successfully",
            {
                "crop": crop,
                "soil_estimation": soil,
                "weather": weather,
                "note": "Soil pH is system-estimated based on soil type"
            }
        )

    except KeyError as e:
        return error_response(f"Missing required field: {str(e)}")

    except Exception as e:
        return error_response(str(e))
