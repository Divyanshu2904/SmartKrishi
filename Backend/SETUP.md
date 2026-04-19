# SmartKrishi Backend — Setup Guide

## Step 1: Files copy karo

Ye files apne Backend folder mein copy karo:

```
ml/disease_model/plant_disease_model.h5   ← Plant-Disease project se
ml/disease_model/classes.json             ← Plant-Disease project se
ml/disease_model/disease_solution.csv     ← Plant-Disease project se
ml/crop_model.pkl                         ← pehle se hai
```

## Step 2: PostgreSQL database banao

```bash
psql -U postgres
CREATE DATABASE "SmartKrishi_DB";
\q
```

Tables banao:
```bash
psql -U postgres -d SmartKrishi_DB -f schema.sql
```

## Step 3: .env file banao

```bash
copy .env.template .env
```
Phir `.env` kholo aur apne values fill karo.

## Step 4: Virtual environment aur packages

```bash
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

## Step 5: Server start karo

```bash
python app.py
```

Server `http://localhost:5000` pe chalega.

## Step 6: Test karo

Browser mein kholo:
```
http://localhost:5000/test
```
Response aana chahiye:
```json
{"success": true, "message": "SmartKrishi API is working!"}
```

---

## All API Endpoints (Android ke liye)

### Auth
| Method | URL | Body |
|--------|-----|------|
| POST | /auth/register | name, phone, password, language |
| POST | /auth/login | phone, password |
| GET  | /auth/profile/1 | — |

### Crop
| Method | URL | Body |
|--------|-----|------|
| POST | /farmer/recommend-crop | soil_type, water, previous_crop, lat, lon, user_id |

### Disease
| Method | URL | Body |
|--------|-----|------|
| POST | /detect-disease | image (file), user_id (optional) |
| POST | /upload-image | image (file) |

### Market
| Method | URL | Params |
|--------|-----|--------|
| GET | /market-rate | crop, market, user_id |

### Agent (Chatbot)
| Method | URL | Body |
|--------|-----|------|
| POST | /agent/chat | message |

### History
| Method | URL | — |
|--------|-----|---|
| GET | /history/1 | user_id in URL |

---

## Android App mein Base URL

```
http://10.0.2.2:5000     ← Android Emulator ke liye
http://192.168.x.x:5000  ← Real device ke liye (apna IP daalo)
```

---

## Common Errors

| Error | Fix |
|-------|-----|
| `ModuleNotFoundError` | `pip install -r requirements.txt` dobara chalao |
| `psycopg2 error` | PostgreSQL chal raha hai check karo |
| `disease model load error` | `.h5` file sahi folder mein hai check karo |
| `Weather API failed` | `.env` mein WEATHER_API_KEY check karo |
