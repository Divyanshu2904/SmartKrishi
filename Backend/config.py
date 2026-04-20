import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "localhost"),
    "database": os.getenv("DB_NAME", "SmartKrishi_DB"),
    "user":     os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "")
}

WEATHER_API_KEY       = os.getenv("WEATHER_API_KEY")
DATA_GOV_API_KEY      = os.getenv("DATA_GOV_API_KEY")
AGMARKNET_RESOURCE_ID = os.getenv("AGMARKNET_RESOURCE_ID")

BASE_DIR            = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER       = os.path.join(BASE_DIR, "uploads", "plants")
ALLOWED_EXTENSIONS  = {"png", "jpg", "jpeg"}
MAX_CONTENT_LENGTH  = 16 * 1024 * 1024   # 16 MB (model is 12.9 MB so 5MB was too small)

# DISEASE_MODEL_PATH  = os.path.join(BASE_DIR, "ml", "disease_model", "plant_disease_model.h5")
DISEASE_MODEL_PATH = os.path.join(BASE_DIR, "ml", "disease_model", "plant_disease_model_new.keras")
CLASSES_JSON_PATH   = os.path.join(BASE_DIR, "ml", "disease_model", "classes.json")
DISEASE_CSV_PATH    = os.path.join(BASE_DIR, "ml", "disease_model", "disease_solution.csv")
CROP_MODEL_PATH     = os.path.join(BASE_DIR, "ml", "crop_model.pkl")
