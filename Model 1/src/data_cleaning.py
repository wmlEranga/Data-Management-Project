import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# Load the data from the CSV file
filename = "data/collected_data/data_backup_202310171200.csv"  # Update this with the correct path
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

# Option 1: Impute missing values (e.g., filling with the mean for numerical columns)
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
