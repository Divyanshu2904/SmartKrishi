from flask import Blueprint, request
from services.image_service import save_image
from utils.response import success_response, error_response

image_bp = Blueprint("image", __name__)

@image_bp.route("/upload-image", methods=["POST"])
def upload_image():
    try:
        if "image" not in request.files:
            return error_response("Image file required")

        image = request.files["image"]

        if image.filename == "":
            return error_response("No image selected")

        result = save_image(image)

        return success_response(
            "Image uploaded successfully",
            {
                "image_name": result["filename"]
            }
        )

    except Exception as e:
        return error_response(str(e))
