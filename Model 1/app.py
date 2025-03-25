from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the model, scaler, and label encoders
MODEL_PATH = "Model 1/models/versioned/current_model.pkl"
SCALER_PATH = "Model 1/models/versioned/current_scaler.pkl"
ENCODERS_PATH = "Model 1/models/versioned/current_label_encoders.pkl"

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
label_encoders = joblib.load(ENCODERS_PATH)


def prepare_input(input_data, scaler, label_encoders):
    input_df = pd.DataFrame([input_data])
    expected_features = [
        "CropType",
        "Variety",
        "Season",
        "FieldSize",
        "SoilType",
        "IrrigationType",
    ]
    for feature in expected_features:
        if feature not in input_df.columns:
            input_df[feature] = 0
    for column in label_encoders:
        if column in input_df.columns:
            input_df[column] = label_encoders[column].transform(input_df[column])
    input_df = input_df[expected_features]
    numeric_features = ["FieldSize"]
    for feature in numeric_features:
        input_df[feature] = pd.to_numeric(input_df[feature], errors="coerce")
    scaled_input = scaler.transform(input_df)
    return scaled_input


def make_prediction(model, input_data):
    return model.predict(input_data)


@app.route("/predict", methods=["POST"])
def predict():
    input_data = request.json
    prepared_input = prepare_input(input_data, scaler, label_encoders)
    predictions = make_prediction(model, prepared_input)
    predicted_yield = predictions[0]
    return jsonify({"predicted_yield": f"{predicted_yield:.2f} tons/ha"})


if __name__ == "__main__":
    app.run(debug=True)
