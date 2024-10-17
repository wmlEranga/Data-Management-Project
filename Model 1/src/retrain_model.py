import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os
from datetime import datetime

# Load preprocessed data
data = pd.read_csv("data/cleaned_data/cleaned_data_backup.csv")

# Prepare features and target
X = data.drop(columns=["YieldAmount"])
y = data["YieldAmount"]

# Split the data
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42
)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Validate the model
y_val_pred = model.predict(X_val)
val_accuracy = accuracy_score(y_val, y_val_pred)
print(f"Validation Accuracy: {val_accuracy:.2f}")

# Generate a version number (e.g., based on timestamp)
version_number = datetime.now().strftime("%Y%m%d_%H%M")
model_filename = f"models/random_forest_model_v{version_number}.pkl"

# Save the updated model
joblib.dump(model, model_filename)
print(f"Model saved to {model_filename}")

# Log the versioning information
with open("model_versioning_log.txt", "a") as log_file:
    log_file.write(f"Model Version: v{version_number}\n")
    log_file.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
    log_file.write(f"Validation Accuracy: {val_accuracy:.2f}\n")
    log_file.write("Changes: Updated model with latest data.\n")
    log_file.write("-" * 40 + "\n")
