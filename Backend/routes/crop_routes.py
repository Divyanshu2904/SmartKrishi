from flask import Blueprint, request
from services.crop_service import recommend_crop
from utils.response import success_response, error_response

crop_bp = Blueprint("crop", __name__)

@crop_bp.route("/recommend-crop", methods=["POST"])
def recommend():
    try:
        data = request.json
        features = [
            data["N"],
            data["P"],
            data["K"],
            data["ph"],
            data["temperature"],
            data["humidity"],
            data["rainfall"]
        ]

        crop = recommend_crop(features)
        return success_response("Crop recommended", {"crop": crop})
    except Exception as e:
        return error_response(str(e))
