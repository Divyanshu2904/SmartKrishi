import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "crop_model.pkl")

model = joblib.load(MODEL_PATH)

def recommend_crop(input_data):
    prediction = model.predict([input_data])
    return prediction[0]
