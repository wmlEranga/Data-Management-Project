import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
from datetime import datetime

# Load preprocessed data
data = pd.read_csv("data/cleaned_data/cleaned_data_backup.csv")

# Convert datetime columns to a numeric format (e.g., days between dates)
data["PlantingDate"] = pd.to_datetime(data["PlantingDate"])
data["DateRecorded"] = pd.to_datetime(data["DateRecorded"])
data["HarvestDate"] = pd.to_datetime(data["HarvestDate"])

# Create new features: days between DateRecorded and PlantingDate, and days to harvest
data["DaysSincePlanting"] = (data["DateRecorded"] - data["PlantingDate"]).dt.days
data["DaysToHarvest"] = (data["HarvestDate"] - data["DateRecorded"]).dt.days

# Drop original datetime columns if not needed
data = data.drop(
    columns=[
        "PlantingDate",
        "DateRecorded",
        "HarvestDate",
        "GrainQuality",
        "DaysToHarvest",
        "DaysToHarvest",
        "DaysSincePlanting",
        "CropId",
    ]
)

# Convert categorical columns to numeric using LabelEncoder
label_encoders = {}
categorical_columns = ["CropType", "Variety", "Season", "GrowthStage", "FertilizerUsed"]

for column in categorical_columns:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le  # Save encoders for future use in predictions

# Prepare features and target
X = data.drop(columns=["YieldAmount"])
y = data["YieldAmount"]

# Split the data into training, validation, and test sets
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42
)

# Scale the features using StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)

# Train the model using RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Validate the model
y_val_pred = model.predict(X_val_scaled)
val_mse = mean_squared_error(y_val, y_val_pred)
val_rmse = val_mse**0.5
print(f"Validation RMSE: {val_rmse:.2f}")

# Generate a version number based on timestamp
version_number = datetime.now().strftime("%Y%m%d_%H%M")
model_filename = f"models/random_forest_regressor_v{version_number}.pkl"
scaler_filename = f"models/scaler_v{version_number}.pkl"

# Save the updated model and scaler to versioned files
joblib.dump(model, model_filename)
print(f"Model saved to {model_filename}")

joblib.dump(scaler, scaler_filename)
print(f"Scaler saved to {scaler_filename}")

# Overwrite the 'current_model.pkl' and 'current_scaler.pkl' with the latest versions
current_model_path = "models/versioned/current_model.pkl"
current_scaler_path = "models/versioned/current_scaler.pkl"

joblib.dump(model, current_model_path)
print(f"Current model overwritten at {current_model_path}")

joblib.dump(scaler, current_scaler_path)
print(f"Current scaler overwritten at {current_scaler_path}")

# Log the versioning information
log_filename = "model_versioning_log.txt"
log_entry = (
    f"Model Version: v{version_number}\n"
    f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
    f"Validation RMSE: {val_rmse:.2f}\n"
    f"Changes: Updated model and scaler with latest data.\n" + "-" * 40 + "\n"
)

# Append to the log file
with open(log_filename, "a") as log_file:
    log_file.write(log_entry)

print(f"Model versioning log updated in {log_filename}")

# Optional: Save the LabelEncoders and any other preprocessing information
label_encoders_path = f"models/versioned/label_encoders_v{version_number}.pkl"
joblib.dump(label_encoders, label_encoders_path)
print(f"Label encoders saved to {label_encoders_path}")

# Overwrite the current label encoders
current_label_encoders_path = "models/versioned/current_label_encoders.pkl"
joblib.dump(label_encoders, current_label_encoders_path)
print(f"Current label encoders overwritten at {current_label_encoders_path}")
