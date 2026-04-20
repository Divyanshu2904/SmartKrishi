import joblib
from config import CROP_MODEL_PATH

_model = joblib.load(CROP_MODEL_PATH)

# April-June Indian crops with images (Unsplash)
SUMMER_CROPS = {
    "sandy": [
        {
            "name": "Watermelon",
            "hindi": "Tarbuz",
            "match": "97%",
            "reason": "Sandy soil with high temperature is ideal for watermelon cultivation",
            "water": "Low",
            "duration": "80-90 days",
            "image": "https://www.epicgardening.com/wp-content/uploads/2025/06/big-juicy-watermelons.jpg"
        },
        {
            "name": "Muskmelon",
            "hindi": "Kharbooja",
            "match": "94%",
            "reason": "Dry season sandy soil is perfect for muskmelon growth.",
            "water": "Low",
            "duration": "75-85 days",
            "image": "https://www.apnikheti.com/upload/crops/6086idea99muskmelons-387466_960_720.jpg"
        },
        {
            "name": "Groundnut",
            "hindi": "Moongfali",
            "match": "88%",
            "reason": "Sandy soil provides excellent drainage for groundnut yield.",
            "water": "Low-Medium",
            "duration": "100-120 days",
            "image": "https://t4.ftcdn.net/jpg/01/62/52/95/360_F_162529503_TMrcXIAPWttw5pdqZ8LYT3MqllFzaAXu.jpg"
        },
    ],
    "loamy": [
        {
            "name": "Moong Dal",
            "hindi": "Mungbean",
            "match": "96%",
            "reason": "Loamy soil with warm weather makes moong dal the best choice.",
            "water": "Medium",
            "duration": "60-75 days",
            "image": "https://www.agrifarming.in/wp-content/uploads/2020/10/pic2-2.jpg"
        },
        {
            "name": "Bitter Gourd",
            "hindi": "Karela",
            "match": "92%",
            "reason": "Bitter gourd thrives in loamy soil during summer season.",
            "water": "Medium",
            "duration": "55-70 days",
            "image": "https://www.asiafarming.com/wp-content/uploads/2015/09/Bitter-Gourd-Cultivation.jpg"
        },
        {
            "name": "Okra",
            "hindi": "Bhindi",
            "match": "90%",
            "reason": "Okra grows excellently in warm weather with loamy soil.",
            "water": "Medium",
            "duration": "45-60 days",
            "image": "https://mahaagrin.com/cdn/shop/articles/okra-ladies-finger-seeds_-_buy_online.webp?v=1751437604"
        },
        {
            "name": "Cotton",
            "hindi": "Kapas",
            "match": "85%",
            "reason": "High temperature loamy soil is suitable for cotton cultivation.",
            "water": "Medium-High",
            "duration": "150-180 days",
            "image": "https://t4.ftcdn.net/jpg/06/84/31/79/360_F_684317966_Pn9qU1DEfW5zpwoj25znJ1i0VdaOM2Px.jpg"
        },
    ],
    "clayey": [
        {
            "name": "Cotton",
            "hindi": "Kapas",
            "match": "97%",
            "reason": "Clayey soil with good moisture retention is ideal for cotton.",
            "water": "Medium",
            "duration": "150-180 days",
            "image": "https://t4.ftcdn.net/jpg/06/84/31/79/360_F_684317966_Pn9qU1DEfW5zpwoj25znJ1i0VdaOM2Px.jpg"
        },
        {
            "name": "Soybean",
            "hindi": "Soyabean",
            "match": "91%",
            "reason": "Clayey soil provides excellent nitrogen fixation for soybean.",
            "water": "Medium",
            "duration": "90-120 days",
            "image": "https://m.media-amazon.com/images/I/51eSM8s4r5L._AC_UF894,1000_QL80_.jpg"
        },
        {
            "name": "Maize",
            "hindi": "Makka",
            "match": "87%",
            "reason": "Maize grows well in clayey soil during summer season.",
            "water": "Medium-High",
            "duration": "80-95 days",
            "image": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500"
        },
    ],
    "black": [
        {
            "name": "Cotton",
            "hindi": "Kapas",
            "match": "98%",
            "reason": "Black cotton soil is the best soil in India for cotton cultivation.",
            "water": "Medium",
            "duration": "150-180 days",
            "image": "https://t4.ftcdn.net/jpg/06/84/31/79/360_F_684317966_Pn9qU1DEfW5zpwoj25znJ1i0VdaOM2Px.jpg"
        },
        {
            "name": "Soybean",
            "hindi": "Soyabean",
            "match": "93%",
            "reason": "Black soil provides excellent yield for soybean cultivation.",
            "water": "Medium",
            "duration": "90-120 days",
            "image": "https://m.media-amazon.com/images/I/51eSM8s4r5L._AC_UF894,1000_QL80_.jpg"
        },
        {
            "name": "Pigeon Pea",
            "hindi": "Arhar/Tur Dal",
            "match": "88%",
            "reason": "Pigeon pea is a drought tolerant crop perfect for black soil.",
            "water": "Low-Medium",
            "duration": "150-180 days",
            "image": "https://5.imimg.com/data5/TM/XO/MY-40086640/pigeon-peas-500x500.jpg"
        },
    ],
    "red": [
        {
            "name": "Groundnut",
            "hindi": "Moongfali",
            "match": "96%",
            "reason": "Red soil is naturally suitable for groundnut cultivation.",
            "water": "Low-Medium",
            "duration": "100-120 days",
            "image": "https://t4.ftcdn.net/jpg/01/62/52/95/360_F_162529503_TMrcXIAPWttw5pdqZ8LYT3MqllFzaAXu.jpg"
        },
        {
            "name": "Ragi",
            "hindi": "Finger Millet",
            "match": "91%",
            "reason": "Ragi is a drought resistant crop that grows well in red soil.",
            "water": "Low",
            "duration": "90-120 days",
            "image": "https://www.pepperhub.in/wp-content/uploads/2024/01/Ragi-1.webp"
        },
        {
            "name": "Sunflower",
            "hindi": "Surajmukhi",
            "match": "86%",
            "reason": "Sunflower grows well in red soil during warm weather.",
            "water": "Low-Medium",
            "duration": "85-95 days",
            "image": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500"
        },
    ],
}

# Water retention effect on crops order
def get_water_adjusted_crops(crops, water_retention):
    if water_retention == "high":
        # Prefer water-loving crops
        order = ["high", "medium-high", "medium", "low-medium", "low"]
    elif water_retention == "low":
        # Prefer drought tolerant
        order = ["low", "low-medium", "medium", "medium-high", "high"]
    else:
        order = ["medium", "low-medium", "medium-high", "low", "high"]
    return crops  # Return as is for now, order by match %


def recommend_crop(features):
    N, P, K, temperature, humidity, ph, rainfall = features

    # Determine soil type from PH
    if ph <= 5.9:
        if N < 25:
            soil_key = "red"
        else:
            soil_key = "sandy"
    elif ph >= 7.4:
        if N > 85:
            soil_key = "black"
        else:
            soil_key = "clayey"
    else:
        soil_key = "loamy"

    crops = SUMMER_CROPS.get(soil_key, SUMMER_CROPS["loamy"])

    # Adjust based on water
    if humidity > 50 or rainfall > 0:
        # Normal/wet condition - use ML model for primary
        try:
            ml_pred = _model.predict([features])[0]
            # Add ML prediction as first if not already in list
            ml_in_list = any(c["name"].lower() == ml_pred.lower() for c in crops)
            if not ml_in_list:
                crops = [{
                    "name": ml_pred.capitalize(),
                    "hindi": ml_pred,
                    "match": "99%",
                    "reason": f"AI model ne {ml_pred} suggest kiya hai current conditions ke liye.",
                    "water": "Medium",
                    "duration": "90-120 days",
                    "image": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500"
                }] + crops
        except:
            pass

    print(f"Features: {features}")
    print(f"Soil key: {soil_key}, Crops: {[c['name'] for c in crops]}")
    return crops[:3]  # Return top 3 crops