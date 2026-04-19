from flask import Blueprint, request
from models.user import create_user, verify_user, get_user_by_id
from utils.response import success_response, error_response

auth_bp = Blueprint("auth", __name__)

# ── Register ─────────────────────────────────────────────────
@auth_bp.route("/auth/register", methods=["POST"])
def register():
    try:
        data     = request.json or {}
        name     = data.get("name", "").strip()
        phone    = data.get("phone", "").strip()
        password = data.get("password", "").strip()
        language = data.get("language", "hi")

        if not name or not phone or not password:
            return error_response("Name, phone aur password required hai")
        if len(phone) < 10:
            return error_response("Valid phone number dena")
        if len(password) < 6:
            return error_response("Password kam se kam 6 characters ka hona chahiye")

        user = create_user(name, phone, password, language)
        return success_response("Registration successful", {"user": user}, 201)

    except Exception as e:
        msg = str(e)
        if "unique" in msg.lower():
            return error_response("Ye phone number already registered hai")
        return error_response(msg)

# ── Login ─────────────────────────────────────────────────────
@auth_bp.route("/auth/login", methods=["POST"])
def login():
    try:
        data     = request.json or {}
        phone    = data.get("phone", "").strip()
        password = data.get("password", "").strip()

        if not phone or not password:
            return error_response("Phone aur password required hai")

        user = verify_user(phone, password)
        if not user:
            return error_response("Phone ya password galat hai", 401)

        return success_response("Login successful", {"user": user})

    except Exception as e:
        return error_response(str(e))

# ── Get profile ───────────────────────────────────────────────
@auth_bp.route("/auth/profile/<int:user_id>", methods=["GET"])
def profile(user_id):
    try:
        user = get_user_by_id(user_id)
        if not user:
            return error_response("User nahi mila", 404)
        return success_response("Profile fetched", {"user": user})
    except Exception as e:
        return error_response(str(e))
