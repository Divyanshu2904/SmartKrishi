import os
import csv
import json
import numpy as np
import tensorflow as tf
from PIL import Image
from config import DISEASE_MODEL_PATH, CLASSES_JSON_PATH, DISEASE_CSV_PATH

# ── Load model & classes once at startup ────────────────────
_model = tf.keras.models.load_model(DISEASE_MODEL_PATH)

# _model = tf.keras.models.load_model(DISEASE_MODEL_PATH, compile=False)

with open(CLASSES_JSON_PATH, "r") as f:
    _class_indices = json.load(f)

# index → class name
_class_names = {v: k for k, v in _class_indices.items()}

# ── Load disease solutions from CSV ─────────────────────────
_DEFAULT_SOLUTION = {
    "common_name": "Unknown",
    "cause":       "Information not available",
    "symptoms":    "No data",
    "treatment":   "No data",
    "prevention":  "No data"
}

def _normalize(key):
    if not isinstance(key, str):
        return ""
    return "_".join(
        p for p in
        key.strip().lower()
           .replace(" ", "_")
           .replace("-", "_")
           .replace(".", "")
           .replace("___", "_")
           .split("_")
        if p
    )

def _load_solutions():
    solutions = {}
    if not os.path.exists(DISEASE_CSV_PATH):
        return solutions
    with open(DISEASE_CSV_PATH, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            key = (row.get("class_name") or "").strip()
            if not key:
                continue
            entry = {
                "common_name": row.get("common_name", "").strip(),
                "cause":       row.get("cause",       "").strip(),
                "symptoms":    row.get("symptoms",    "").strip(),
                "treatment":   row.get("treatment",   "").strip(),
                "prevention":  row.get("prevention",  "").strip(),
            }
            solutions[key]             = entry
            solutions[_normalize(key)] = entry
    return solutions

_solutions = _load_solutions()

def _get_solution(class_name):
    for candidate in [
        class_name,
        _normalize(class_name),
        class_name.replace("___", "_"),
        class_name.replace("_", "___")
    ]:
        if candidate in _solutions:
            return _solutions[candidate]
        norm = _normalize(candidate)
        if norm in _solutions:
            return _solutions[norm]
    # partial match fallback
    norm_target = _normalize(class_name)
    for k, v in _solutions.items():
        if norm_target and norm_target in _normalize(k):
            return v
    return _DEFAULT_SOLUTION

# ── Prediction ───────────────────────────────────────────────
def predict_disease(image_path):
    """
    Returns (disease_label, confidence_float, solution_dict)
    """
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))

    arr = np.array(img, dtype=np.float32)
    arr = tf.keras.applications.imagenet_utils.preprocess_input(arr)
    arr = np.expand_dims(arr, axis=0)

    preds      = _model.predict(arr)
    idx        = int(np.argmax(preds))
    confidence = float(preds[0][idx])
    label      = _class_names.get(idx, "Unknown")
    solution   = _get_solution(label)

    return label, round(confidence * 100, 2), solution
