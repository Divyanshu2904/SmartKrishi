<div align="center">



# 🌾 SmartKrishi
###  (*Har Kisan ka Digital Saathi*)

**An AI-Powered Smart Agriculture System for Indian Farmers**

[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0.3-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.21-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://tensorflow.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

> **SmartKrishi** is a full-stack AI-powered Android application that helps Indian farmers make smarter decisions — from choosing the right crop to detecting plant diseases, checking live mandi prices, and getting agricultural advice in Hindi, English, and Odia.

<br/>

---

</div>

## 📱 App Screenshots

<div align="center">

| Splash Screen | Dashboard | Crop Advisor |
|:---:|:---:|:---:|
| ![Splash](images/splash.jpg) | ![Dashboard](images/dashboard.jpg) | ![Crop](images/crop.jpg) |

| Disease Scan | Market Trends | AI Chatbot |
|:---:|:---:|:---:|
| ![Scan](images/disease.jpg) | ![Market](images/market.jpg) | ![Chat](images/chatbot.jpg) |

</div>
---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🌱 Crop Recommendation Engine
- AI-powered crop suggestions based on soil type & weather
- Farmer-friendly input (no NPK lab test required)
- Soil Mapper converts simple inputs to NPK values
- **Random Forest model — 99.3% accuracy**
- Real-time weather integration via OpenWeatherMap

</td>
<td width="50%">

### 🔬 Plant Disease Detection
- CNN-based leaf disease detection from photos
- **MobileNetV2 Transfer Learning** architecture
- **15 disease classes** across Pepper, Potato & Tomato
- Complete treatment & prevention guidance
- Works with camera capture or gallery upload

</td>
</tr>
<tr>
<td width="50%">

### 📊 Market Intelligence
- Live mandi prices from **Agmarknet (data.gov.in)**
- Price trend analysis (UP / DOWN / STABLE)
- Pull-to-refresh for latest rates
- **17 major commodity crops** supported
- MSP fallback when API is unavailable

</td>
<td width="50%">

### 🤖 AI Chatbot Agent
- Multilingual support: **Hindi, English & Odia**
- Intent-based NLP for farming queries
- Crop recommendations by soil type & season
- Market rate queries in natural language
- Disease guidance and farming tips

</td>
</tr>
</table>

**Additional Features:**
- 🔐 Secure user authentication with **bcrypt** password hashing
- 📍 GPS-based real-time location & weather detection
- 📋 Complete query history for registered users
- 🌐 3-language UI (Hindi / English / Odia)
- 👤 Guest mode — no registration required
- 📱 Native Android feel with React Native + NativeWind

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Android App (React Native + TypeScript)         │
│  Splash → Language → Login → Dashboard → Crop/Scan/Market   │
└─────────────────────┬───────────────────────────────────────┘
                       │  HTTP REST API (JSON)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Flask Backend (Python 3.13)                │
│         auth | farmer | disease | market | agent             │
└──────┬──────────────┬──────────────────┬────────────────────┘
       │              │                  │
       ▼              ▼                  ▼
┌──────────┐  ┌───────────────┐  ┌──────────────────┐
│ Random   │  │  MobileNetV2  │  │  Agmarknet API   │
│ Forest   │  │  CNN Model    │  │  OpenWeatherMap  │
│ (Crops)  │  │  (Diseases)   │  │  expo-location   │
└──────────┘  └───────────────┘  └──────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database (SmartKrishi_DB)            │
│         users | crop_history | image_history | market_history│
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend (Android App)
| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.74 | Android app framework |
| TypeScript | 5.x | Type-safe development |
| NativeWind | 4.x | Tailwind CSS for mobile |
| Expo SDK | 51 | Camera, GPS, Image picker |
| lucide-react-native | 0.383 | Icon library |
| expo-linear-gradient | — | UI gradients |
| expo-location | — | GPS coordinates |
| expo-image-picker | — | Camera & gallery access |

### Backend (Python/Flask)
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.13.1 | Primary language |
| Flask | 3.0.3 | REST API framework |
| flask-cors | 4.0.1 | Cross-origin requests |
| psycopg2-binary | 2.9.9 | PostgreSQL adapter |
| bcrypt | 4.1.3 | Password hashing |
| requests | 2.32.3 | External API calls |
| joblib | 1.4.2 | ML model loading |

### Machine Learning
| Technology | Version | Purpose |
|---|---|---|
| scikit-learn | 1.5.1 | Random Forest (crops) |
| TensorFlow | 2.21.0 | CNN disease detection |
| MobileNetV2 | — | Transfer learning base |
| NumPy | 1.26.4 | Numerical computing |
| Pandas | 2.2.2 | Data manipulation |
| Pillow | 10.3.0 | Image preprocessing |

### Database & Tools
| Technology | Version | Purpose |
|---|---|---|
| PostgreSQL | 18 | Relational database |
| pgAdmin | 4 | DB administration |
| Postman | — | API testing |

---

## 🤖 ML Models

### 1. Crop Recommendation — Random Forest
```
Dataset  : Crop Recommendation Dataset (2200 records)
Features : N, P, K, Temperature, Humidity, pH, Rainfall
Labels   : 22 crop varieties
Algorithm: Random Forest (100 estimators)
Accuracy : 99.3% on test set (80/20 split)
File     : Backend/ml/crop_model.pkl
```

### 2. Plant Disease Detection — MobileNetV2 CNN
```
Base Model : MobileNetV2 (ImageNet pretrained, frozen)
Dataset    : PlantVillage Dataset
Classes    : 15 disease classes
Plants     : Pepper, Potato, Tomato
Input Size : 224 × 224 × 3 (RGB)
File       : Backend/ml/disease_model/plant_disease_model_new.keras
```

**Supported Disease Classes:**

| Plant | Disease Classes |
|---|---|
| 🫑 Pepper | Bacterial Spot, Healthy |
| 🥔 Potato | Early Blight, Late Blight, Healthy |
| 🍅 Tomato | Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy |

---

## 📁 Project Structure

```
SmartKrishi/
├── Backend/
│   ├── app.py                      # Flask app factory
│   ├── config.py                   # Environment config
│   ├── db.py                       # PostgreSQL connection
│   ├── schema.sql                  # Database schema
│   ├── requirements.txt
│   ├── routes/
│   │   ├── auth_routes.py          # Register, Login, Profile
│   │   ├── farmer_routes.py        # Crop recommendation
│   │   ├── disease_routes.py       # Disease detection
│   │   ├── market_routes.py        # Market prices
│   │   ├── agent_routes.py         # AI chatbot
│   │   ├── image_routes.py         # Image upload
│   │   └── history_routes.py       # User history
│   ├── services/
│   │   ├── crop_service.py         # ML inference
│   │   ├── soil_mapper.py          # NPK estimation
│   │   ├── weather_service.py      # OpenWeatherMap
│   │   ├── market_service.py       # Agmarknet API
│   │   ├── market_cache.py         # 10-min cache
│   │   ├── disease_service.py      # CNN inference
│   │   ├── image_service.py        # File handling
│   │   ├── agent_service.py        # NLP intent
│   │   └── history_service.py      # DB operations
│   ├── models/
│   │   └── user.py                 # User CRUD
│   ├── ml/
│   │   ├── crop_model.pkl          # Trained RF model
│   │   └── disease_model/
│   │       ├── plant_disease_model_new.keras
│   │       ├── classes.json
│   │       └── disease_solution.csv
│   └── uploads/plants/             # Uploaded images
│
└── Frontend/
    └── smartkrishi-mobile/
        ├── App.tsx                  # Navigation + bottom bar
        ├── app.json                 # Expo config
        └── src/
            ├── screens/
            │   ├── SplashScreen.tsx
            │   ├── LanguageSelection.tsx
            │   ├── Login.tsx
            │   ├── Signup.tsx
            │   ├── Dashboard.tsx
            │   ├── CropRecommendation.tsx
            │   ├── PlantScan.tsx
            │   ├── MarketTrends.tsx
            │   ├── Chat.tsx
            │   ├── History.tsx
            │   ├── Profile.tsx
            │   └── ExploreFeatures.tsx
            ├── lib/
            │   └── api.ts           # All backend API calls
            └── constants/
                └── translations.ts  # Hindi/English/Odia
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.13+
- Node.js 18+
- PostgreSQL 14+
- Expo Go app (on Android phone)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Divyanshu2904/SmartKrishi.git
cd SmartKrishi
```

### 2. Backend Setup
```bash
cd Backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
copy .env.template .env        # Windows
# cp .env.template .env        # Linux/Mac
# Edit .env and fill in your API keys
```

### 3. Database Setup
```bash
# Create database in PostgreSQL
psql -U postgres -c "CREATE DATABASE \"SmartKrishi_DB\";"

# Run schema
psql -U postgres -d SmartKrishi_DB -f schema.sql
```

### 4. ML Models Setup
```
Copy these files to Backend/ml/disease_model/:
  - plant_disease_model_new.keras
  - classes.json
  - disease_solution.csv

Copy to Backend/ml/:
  - crop_model.pkl
```

### 5. Start Backend Server
```bash
cd Backend
python app.py
```
Server runs at: `http://localhost:5000`

Test it: `http://localhost:5000/test`

### 6. Frontend Setup
```bash
cd Frontend/smartkrishi-mobile

# Install dependencies
npm install

# Install Expo packages
npx expo install expo-location expo-av expo-speech
```

### 7. Configure API URL
Edit `src/lib/api.ts`:
```typescript
// For Android Emulator:
export const API_BASE_URL = "http://10.0.2.2:5000";

// For Real Device (replace with your PC's IP):
export const API_BASE_URL = "http://192.168.x.x:5000";
```

Find your IP: Run `ipconfig` (Windows) → look for `Wi-Fi IPv4 Address`

### 8. Run the App
```bash
npx expo start
```
Scan the QR code with **Expo Go** app on your Android phone.

> ⚠️ Your phone and PC must be on the **same WiFi network**

---

## 🔑 Environment Variables

Create `.env` file in `Backend/` folder:

```env
DB_HOST=localhost
DB_NAME=SmartKrishi_DB
DB_USER=postgres
DB_PASSWORD=your_postgresql_password

WEATHER_API_KEY=your_openweathermap_api_key
DATA_GOV_API_KEY=your_data_gov_api_key
AGMARKNET_RESOURCE_ID=9ef84268-d588-465a-a308-a864a43d0070
```

**Get API Keys:**
- OpenWeatherMap: [openweathermap.org/api](https://openweathermap.org/api) (Free tier available)
- data.gov.in: [data.gov.in](https://data.gov.in) (Free registration)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/test` | Server health check |
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | User login |
| `GET` | `/auth/profile/:id` | Get user profile |
| `POST` | `/farmer/recommend-crop` | AI crop recommendation |
| `POST` | `/detect-disease` | Plant disease detection |
| `POST` | `/upload-image` | Upload image |
| `GET` | `/market-rate` | Live mandi prices |
| `POST` | `/agent/chat` | AI chatbot |
| `GET` | `/history/:user_id` | User activity history |

### Example: Crop Recommendation
```bash
curl -X POST http://localhost:5000/farmer/recommend-crop \
  -H "Content-Type: application/json" \
  -d '{
    "soil_type": "loamy",
    "water": "medium",
    "previous_crop": "legume",
    "lat": 21.5,
    "lon": 83.9
  }'
```

### Example: AI Chat
```bash
curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "wheat price in nagpur"}'
```

---

## 🌍 Multilingual Support

| Language | Code | Coverage |
|---|---|---|
| हिंदी (Hindi) | `hi` | Full UI + Chatbot |
| English | `en` | Full UI + Chatbot |
| ଓଡ଼ିଆ (Odia) | `or` | Full UI + Chatbot |

---

## 📊 Project Stats

```
Backend   : Python 3.13 | Flask | 11 REST APIs | 30+ files
Frontend  : React Native | TypeScript | 12 Screens
ML Models : 2 trained models | 99.3% crop accuracy | 15 disease classes
Database  : PostgreSQL | 4 tables | JSONB support
Languages : Hindi + English + Odia
```

---

## 🗺️ Roadmap

- [x] Crop Recommendation (Random Forest)
- [x] Disease Detection (MobileNetV2 CNN)
- [x] Market Intelligence (Agmarknet API)
- [x] Multilingual AI Chatbot
- [x] User Authentication
- [x] Activity History
- [ ] Dual soil input mode (Simple + Expert NPK)
- [ ] 7-day weather forecast
- [ ] Government scheme notifications
- [ ] Farming schedule & advisory
- [ ] Profit/Loss analysis
- [ ] Offline mode (TensorFlow Lite)
- [ ] Voice-to-text in all 3 languages
- [ ] Analytics dashboard

---

## 👨‍💻 Team

| Name | Role | GitHub |
|---|---|---|
| **Divyanshu Kumar** | Backend + ML | [@Divyanshu2904](https://github.com/Divyanshu2904) |
| Team Member 2 | Frontend Android | — |
| Team Member 3 | API Integration | — |
| Team Member 4 | Testing + Docs | — |

**Institution:** Silicon Institute of Technology, Sambalpur, Odisha
**Program:** B.Tech CSE (2023–2027)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [PlantVillage Dataset](https://github.com/spMohanty/PlantVillage-Dataset) — Disease detection training data
- [OpenWeatherMap](https://openweathermap.org) — Real-time weather data
- [data.gov.in](https://data.gov.in) — Agmarknet commodity prices
- [MobileNetV2](https://arxiv.org/abs/1801.04381) — Transfer learning backbone
- [scikit-learn](https://scikit-learn.org) — Random Forest implementation

---

<div align="center">

**Made with ❤️ for Indian Farmers**

*SmartKrishi — Empowering every farmer with AI*

⭐ **Star this repo if you found it helpful!**

</div>
