# src/model_usage.py

import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler


def load_model(model_path):
    model = joblib.load(model_path)
    print("Model loaded successfully.")
    return model


def prepare_input(data):
    input_df = pd.DataFrame(data)

    # Scale the input data if required
    scaler = StandardScaler()
    # scaler.fit(training_data)  # Fit scaler on training data if not done previously
    scaled_input = scaler.transform(input_df)  # Scale input data
    return scaled_input


def make_prediction(model, input_data):
    return model.predict(input_data)


if __name__ == "__main__":
    MODEL_PATH = "models/versioned/current_model.pkl"
    model = load_model(MODEL_PATH)

    # Example input data
    input_data = {
        "WaterLevel": [50],
        "Temperature": [30],
        "Humidity": [60],
        "Rainfall": [10],
        # Add more features as necessary
    }

    # Prepare and make prediction
    prepared_input = prepare_input(input_data)
    predictions = make_prediction(model, prepared_input)

    # Display predictions
    predicted_yield = predictions[0]
    print(f"Predicted Yield: {predicted_yield} tons/ha")
