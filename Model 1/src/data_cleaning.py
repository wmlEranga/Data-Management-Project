import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import os

# Load the data from the CSV file
# Get the latest file in the directory
directory = "data/collected_data/"
files = [
    f
    for f in os.listdir(directory)
    if f.startswith("data_backup") and f.endswith(".csv")
]
files.sort(reverse=True)
filename = os.path.join(directory, files[0]) if files else None

if filename is None:
    raise FileNotFoundError("No data_backup files found in the directory.")
data = pd.read_csv(filename)

# Display the initial data
print("Initial Data:")
print(data.head())

# Step 1: Remove Duplicates
data = data.drop_duplicates()
print(f"Data after removing duplicates: {data.shape[0]} rows")

# Step 2: Handle Missing Values
# Check for missing values
missing_values = data.isnull().sum()
print("Missing Values Before Cleaning:")
print(missing_values)

# Convert 'WaterLevel' from categorical to numerical (e.g., 'High' = 3, 'Moderate' = 2, 'Low' = 1)
water_level_mapping = {"High": 3, "Moderate": 2, "Low": 1}
data["WaterLevel"] = data["WaterLevel"].map(water_level_mapping)

# Handle any missing or unmapped values after mapping
data["WaterLevel"].fillna(data["WaterLevel"].mean(), inplace=True)
data["Temperature"].fillna(data["Temperature"].mean(), inplace=True)
data["Humidity"].fillna(data["Humidity"].mean(), inplace=True)
data["YieldAmount"].fillna(data["YieldAmount"].mean(), inplace=True)

# Option 2: Discard rows with too many missing values (if applicable)
# Example: Discard rows where more than 3 values are missing
data = data.dropna(thresh=len(data.columns) - 3)
print(f"Data after handling missing values: {data.shape[0]} rows")

# Step 3: Normalize and Scale Numerical Values
scaler = MinMaxScaler()

# Normalize numerical columns
data[["WaterLevel", "Temperature", "Humidity", "YieldAmount"]] = scaler.fit_transform(
    data[["WaterLevel", "Temperature", "Humidity", "YieldAmount"]]
)

# Display the cleaned data
print("Cleaned Data:")
print(data.head())

# Step 4: Data Quality Checks
# Check for any remaining missing values
remaining_missing = data.isnull().sum()
if remaining_missing.sum() > 0:
    print("Data Quality Issue: Remaining Missing Values:")
    print(remaining_missing[remaining_missing > 0])
else:
    print("Data Quality Check: No remaining missing values.")

# Save the cleaned data to a new CSV file
cleaned_filename = "data/cleaned_data/cleaned_data_backup.csv"
data.to_csv(cleaned_filename, index=False)
print(f"Cleaned data saved to {cleaned_filename}")
