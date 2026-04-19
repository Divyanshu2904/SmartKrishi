from flask import Blueprint, request
from services.crop_service import recommend_crop
from utils.response import success_response, error_response

crop_bp = Blueprint("crop", __name__)

@crop_bp.route("/recommend-crop", methods=["POST"])
def recommend():
    """
    Direct NPK input (for testing / advanced use)
    Body: { N, P, K, ph, temperature, humidity, rainfall }
    Android app should use /farmer/recommend-crop instead.
    """
    try:
        data     = request.json or {}
        features = [
            data["N"], data["P"], data["K"], data["ph"],
            data["temperature"], data["humidity"], data["rainfall"]
        ]
        crop = recommend_crop(features)
        return success_response("Crop recommended", {"crop": crop})
    except KeyError as e:
        return error_response(f"Missing field: {e}")
    except Exception as e:
        return error_response(str(e))
