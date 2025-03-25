import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
from datetime import datetime

# Load preprocessed data
data = pd.read_csv("Model 1/data/cleaned_data/cleaned_data_backup.csv")

# Drop the CropId column as it's not needed for prediction
if "CropId" in data.columns:
    data = data.drop(columns=["CropId"])

# Convert categorical columns to numeric using LabelEncoder
label_encoders = {}
categorical_columns = ["CropType", "Variety", "Season", "SoilType", "IrrigationType"]

for column in categorical_columns:
    if column in data.columns:
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

# Get feature importance for insight
feature_importance = {
    name: importance for name, importance in zip(X.columns, model.feature_importances_)
}
print("Feature Importance:")
for feature, importance in sorted(
    feature_importance.items(), key=lambda x: x[1], reverse=True
):
    print(f"{feature}: {importance:.4f}")

# Generate a version number based on timestamp
version_number = datetime.now().strftime("%Y%m%d_%H%M")
model_filename = f"Model 1/models/random_forest_regressor_v{version_number}.pkl"
scaler_filename = f"Model 1/models/scaler_v{version_number}.pkl"

# Save the updated model and scaler to versioned files
joblib.dump(model, model_filename)
print(f"Model saved to {model_filename}")

joblib.dump(scaler, scaler_filename)
print(f"Scaler saved to {scaler_filename}")

# Overwrite the 'current_model.pkl' and 'current_scaler.pkl' with the latest versions
current_model_path = "Model 1/models/versioned/current_model.pkl"
current_scaler_path = "Model 1/models/versioned/current_scaler.pkl"

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
    f"Changes: Updated model to predict yield based only on CropType, Variety, Season, FieldSize, SoilType, and IrrigationType.\n"
    + "-" * 40
    + "\n"
)

# Append to the log file
with open(log_filename, "a") as log_file:
    log_file.write(log_entry)

print(f"Model versioning log updated in {log_filename}")

# Optional: Save the LabelEncoders and any other preprocessing information
label_encoders_path = f"Model 1/models/versioned/label_encoders_v{version_number}.pkl"
joblib.dump(label_encoders, label_encoders_path)
print(f"Label encoders saved to {label_encoders_path}")

# Overwrite the current label encoders
current_label_encoders_path = "Model 1/models/versioned/current_label_encoders.pkl"
joblib.dump(label_encoders, current_label_encoders_path)
print(f"Current label encoders overwritten at {current_label_encoders_path}")
