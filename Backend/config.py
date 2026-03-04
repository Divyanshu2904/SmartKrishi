import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD")
}

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads", "plants")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5MB

DATA_GOV_API_KEY = os.getenv("DATA_GOV_API_KEY")
AGMARKNET_RESOURCE_ID = os.getenv("AGMARKNET_RESOURCE_ID")
