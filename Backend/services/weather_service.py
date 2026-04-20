import requests
from config import WEATHER_API_KEY

def get_weather(lat, lon):
    url    = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat":   lat,
        "lon":   lon,
        "appid": WEATHER_API_KEY,
        "units": "metric"
    }
    response = requests.get(url, params=params, timeout=5)
    if response.status_code != 200:
        raise Exception("Weather API failed. Check API key or location.")

    data = response.json()
  
    import datetime

    sunrise_ts = data["sys"]["sunrise"]
    sunset_ts  = data["sys"]["sunset"]
    tz_offset  = data.get("timezone", 19800)  # seconds offset from UTC

    sunrise_str = datetime.datetime.utcfromtimestamp(sunrise_ts + tz_offset).strftime("%I:%M %p")
    sunset_str  = datetime.datetime.utcfromtimestamp(sunset_ts  + tz_offset).strftime("%I:%M %p")

    return {
        "temperature": round(data["main"]["temp"]),
        "humidity":    data["main"]["humidity"],
        "rainfall":    round(data.get("rain", {}).get("1h", 0), 2),
        "wind_speed":  round(data["wind"]["speed"] * 3.6, 1),
        "pressure":    data["main"]["pressure"],
        "city":        data.get("name", ""),
        "description": data["weather"][0]["description"].upper(),
        "sunrise":     sunrise_str,
        "sunset":      sunset_str
    }
