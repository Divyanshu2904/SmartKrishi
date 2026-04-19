# “Model trained using Google Colab and exported for deployment.”

# NOTE:
# import pandas as pd
# import numpy as np
# import sklearn
# import joblib
# print("All libraries loaded successfully")


# data = pd.read_csv("Crop_recommendation dataset.csv")
# data.head()


# data.shape


# data.columns


# X = data.drop("label", axis=1)
# y = data["label"]
# print(X.shape)
# print(y.shape)


# from sklearn.model_selection import train_test_split

# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# print("Training data:", X_train.shape)
# print("Testing data:", X_test.shape)


# from sklearn.ensemble import RandomForestClassifier

# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X_train, y_train)

# print("Model training completed")


# from sklearn.metrics import accuracy_score
# y_pred = model.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)

# print("Model Accuracy:", accuracy)
# Model Accuracy: 0.9931818181818182


# joblib.dump(model, "crop_model.pkl")
# print("Model saved as crop_model.pkl")



import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Dataset load
data = pd.read_csv("Crop_recommendation dataset.csv")

# Input & output split
X = data.drop("label", axis=1)
y = data["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Accuracy
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "crop_model.pkl")

