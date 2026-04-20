/**
 * Master API Service for SmartKrishi Mobile (Native)
 */

// export const API_BASE_URL = "http://10.90.194.155:5000";
// export const API_BASE_URL = "http://10.0.2.2:5000";
export const API_BASE_URL = "http://10.123.213.155:5000";

/**
 * Fetches market rate for a specific crop and mandi
 */
export async function fetchMarketRate(crop: string, market: string, userId?: string) {
  try {
    const url = new URL(`${API_BASE_URL}/market-rate`);
    if (crop) url.searchParams.append("crop", crop);
    if (market) url.searchParams.append("market", market);
    if (userId) url.searchParams.append("user_id", userId);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch market data:`, error);
    return null;
  }
}

/**
 * Sends farmer input to ML Model for Crop Recommendation
 */
export async function fetchCropRecommendation(payload: { soil_type: string; water: string; previous_crop: string; lat: number; lon: number }) {
  try {
    const res = await fetch(`${API_BASE_URL}/farmer/recommend-crop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to recommend crop:", error);
    return null;
  }
}

/**
 * Uploads leaf image for Disease Detection API
 */
export async function detectPlantDisease(imageUri: string) {
  try {
    const formData = new FormData();
    // In React Native, we attach the file via URI
    // @ts-ignore
    formData.append("image", {
      uri: imageUri,
      name: "upload.jpg",
      type: "image/jpeg",
    });

    const res = await fetch(`${API_BASE_URL}/detect-disease`, {
      method: "POST",
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to detect disease:", error);
    return null;
  }
}

/**
 * Talks to the SmartKrishi AI Chat Agent
 */
export async function fetchChatResponse(message: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/agent/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to send agent message:", error);
    return null;
  }
}

// Fetch weather by coordinates
export async function fetchWeather(lat: number, lon: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/farmer/recommend-crop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        soil_type: 'loamy',
        water: 'medium',
        previous_crop: 'other',
        lat,
        lon,
      })
    });
    if (!res.ok) throw new Error('Weather fetch failed');
    return await res.json();
  } catch (error) {
    console.error('Weather error:', error);
    return null;
  }
}


/**
 * Register new user
 */
export async function registerUser(name: string, phone: string, password: string, language: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, password, language })
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Register error:', error);
    return null;
  }
}

/**
 * Login existing user
 */
export async function loginUser(phone: string, password: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}