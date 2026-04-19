import os
from flask import Blueprint, request
from services.disease_service import predict_disease
from services.image_service import save_image
from services.history_service import save_image_history
from utils.response import success_response, error_response

disease_bp = Blueprint("disease", __name__)

@disease_bp.route("/detect-disease", methods=["POST"])
def detect_disease():
    """
    Android multipart/form-data:
      image   : file
      user_id : int (optional)
    """
    try:
        if "image" not in request.files:
            return error_response("Image required hai")

        image   = request.files["image"]
        user_id = request.form.get("user_id")

        if image.filename == "":
            return error_response("Koi image select nahi ki")

        # 1. Save image
        saved   = save_image(image)

        # 2. Predict
        disease, confidence, solution = predict_disease(saved["path"])

        # 3. Save history (logged-in users only)
        if user_id:
            save_image_history(
                int(user_id),
                saved["filename"],
                saved["path"],
                disease,
                confidence,
                solution
            )

        return success_response("Disease detected", {
            "disease":    disease,
            "confidence": confidence,   # percentage
            "solution":   solution,
            "image_name": saved["filename"]
        })

    except Exception as e:
        return error_response(str(e))
