def map_soil_inputs(soil_type, water_retention, previous_crop):
    # Base approximate values
    N, P, K = 60, 40, 40

    # Default pH
    PH = 6.5

    # Soil type effect
    if soil_type == "clayey":
        N += 10
        PH = 7.0
    elif soil_type == "sandy":
        N -= 10
        PH = 6.0
    elif soil_type == "loamy":
        PH = 6.5

    # Water retention effect
    if water_retention == "high":
        K += 5
    elif water_retention == "low":
        K -= 5

    # Previous crop effect
    if previous_crop == "legume":
        N += 15

    return {
        "N": max(N, 10),
        "P": max(P, 10),
        "K": max(K, 10),
        "PH": round(PH, 1)   # ✅ pH realistic range me rahega
    }
