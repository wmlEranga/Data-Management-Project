import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler


def load_model(model_path):
    """Load the trained model from a file."""
    model = joblib.load(model_path)
    print("Model loaded successfully.")
    return model


def load_scaler(scaler_path):
    """Load the saved scaler used during model training."""
    scaler = joblib.load(scaler_path)
    print("Scaler loaded successfully.")
    return scaler


def load_label_encoders(encoders_path):
    """Load the saved label encoders used during model training."""
    label_encoders = joblib.load(encoders_path)
    print("Label encoders loaded successfully.")
    return label_encoders


def prepare_input(input_data, scaler, label_encoders):
    # Ensure input data is a DataFrame
    input_df = pd.DataFrame([input_data])

    # Create a list of expected features based on training
    expected_features = [
        "CropType",
        "Variety",
        "Season",
        "FieldSize",
        "SoilType",
        "IrrigationType",
    ]

    # Ensure all expected features are present in input DataFrame
    for feature in expected_features:
        if feature not in input_df.columns:
            input_df[feature] = 0  # or some default value

    # Transform categorical columns using the saved label encoders
    for column in label_encoders:
        if column in input_df.columns:
            input_df[column] = label_encoders[column].transform(input_df[column])

    # Ensure the DataFrame has the correct order of features
    input_df = input_df[expected_features]

    # Check for numeric types before scaling
    # Ensure all non-categorical features are numeric
    numeric_features = ["FieldSize"]
    for feature in numeric_features:
        input_df[feature] = pd.to_numeric(input_df[feature], errors="coerce")

    # Scale the features using the saved scaler
    scaled_input = scaler.transform(input_df)

    return scaled_input


def make_prediction(model, input_data):
    """Make predictions using the loaded model."""
    return model.predict(input_data)


if __name__ == "__main__":
    MODEL_PATH = "Model 1/models/versioned/current_model.pkl"
    SCALER_PATH = "Model 1/models/versioned/current_scaler.pkl"
    ENCODERS_PATH = (
        "Model 1/models/versioned/current_label_encoders.pkl"  # Load label encoders
    )

    # Load the model, scaler, and label encoders
    model = load_model(MODEL_PATH)
    scaler = load_scaler(SCALER_PATH)
    label_encoders = load_label_encoders(ENCODERS_PATH)

    # Example input data with all necessary features
    input_data = {
        "CropType": "Samba",
        "Variety": "Bg 358",
        "Season": "Yala",
        "FieldSize": 5.2,
        "SoilType": "Loam",
        "IrrigationType": "Sprinkler",
    }

    # Prepare input data (scaling and transformation)
    prepared_input = prepare_input(input_data, scaler, label_encoders)

    # Make prediction
    predictions = make_prediction(model, prepared_input)

    # Display predictions
    predicted_yield = predictions[0]
    print(f"Predicted Yield: {predicted_yield:.2f} tons/ha")
