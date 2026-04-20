# def map_soil_inputs(soil_type, water_retention, previous_crop):
#     """
#     Farmer-friendly inputs → approximate NPK + pH
#     soil_type       : clayey / sandy / loamy / black / red
#     water_retention : high / medium / low
#     previous_crop   : legume / cereal / other
#     """
#     N, P, K = 60, 40, 40
#     PH      = 6.5

#     soil_map = {
#         "clayey": (10,  0,  0, 7.0),
#         "black":  (10,  5,  5, 7.2),
#         "sandy":  (-10, -5, -5, 6.0),
#         "red":    (-5,  0, -5, 5.8),
#         "loamy":  (0,   0,  0, 6.5),
#     }
#     if soil_type in soil_map:
#         dn, dp, dk, ph = soil_map[soil_type]
#         N += dn; P += dp; K += dk; PH = ph

#     if water_retention == "high":   K += 5
#     elif water_retention == "low":  K -= 5

#     if previous_crop == "legume":   N += 15
#     elif previous_crop == "cereal": N -= 5

#     return {
#         "N":  max(N, 10),
#         "P":  max(P, 10),
#         "K":  max(K, 10),
#         "PH": round(PH, 1)
#     }



def map_soil_inputs(soil_type, water_retention, previous_crop):
    soil_type = soil_type.lower().strip()

    soil_map = {
        "sandy":  {"N": 15,  "P": 10, "K": 15,  "PH": 5.5},
        "loamy":  {"N": 60,  "P": 40, "K": 40,  "PH": 6.5},
        "clayey": {"N": 90,  "P": 60, "K": 70,  "PH": 7.5},
        "black":  {"N": 100, "P": 50, "K": 55,  "PH": 7.8},
        "red":    {"N": 30,  "P": 18, "K": 22,  "PH": 5.8},
    }

    soil = soil_map.get(soil_type, soil_map["loamy"])
    N  = soil["N"]
    P  = soil["P"]
    K  = soil["K"]
    PH = soil["PH"]

    if water_retention == "high":
        K += 20
        N += 15
    elif water_retention == "low":
        K -= 20
        N -= 15
        P -= 10

    if previous_crop == "legume":
        N += 30
    elif previous_crop == "cereal":
        N -= 15
        P += 8

    return {
        "N":  max(N, 5),
        "P":  max(P, 5),
        "K":  max(K, 5),
        "PH": round(PH, 1)
    }