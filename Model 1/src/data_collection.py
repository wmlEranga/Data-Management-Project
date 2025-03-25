import psycopg2
import csv
from datetime import datetime
from dotenv import load_dotenv
import os

import logging  # Import logging module

# Create logs directory if it doesn't exist
log_directory = "logs/data_collection"
os.makedirs(log_directory, exist_ok=True)

# Configure logging
logging.basicConfig(
    filename=os.path.join(log_directory, "data_backup.log"),
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

# Load environment variables from .env file
load_dotenv()

# PostgreSQL connection details from environment variables
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")


# Query to fetch data from the relevant tables
QUERY = """
    SELECT DISTINCT
        c."CropId", 
        c."CropType", 
        c."Variety", 
        c."PlantingDate", 
        c."Season",
        f."FieldSize",
        f."SoilType",
        f."IrrigationType",
        y."YieldAmount"
    FROM "Crop" c
    JOIN "Field" f ON c."FieldId" = f."FieldId"  
    JOIN "YieldData" y ON c."CropId" = y."CropId";  
"""


# Function to fetch data from PostgreSQL
def fetch_data():
    connection = None
    try:
        # Connect to PostgreSQL database
        connection = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD
        )
        cursor = connection.cursor()

        # Execute the query
        cursor.execute(QUERY)
        data = cursor.fetchall()

        # Get column names
        column_names = [desc[0] for desc in cursor.description]

        # Generate a timestamped filename for the CSV
        timestamp = datetime.now().strftime("%Y%m%d%H%M")

        # Create directory if it doesn't exist
        data_dir = "Model 1/data/collected_data"
        os.makedirs(data_dir, exist_ok=True)

        # Use the correct relative path from the script's location
        filename = os.path.join(data_dir, f"data_backup_{timestamp}.csv")

        # Save data to CSV file
        with open(filename, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(column_names)  # Write column headers
            writer.writerows(data)  # Write data rows

        print(f"Data successfully collected and saved to {filename}")
        logging.info(f"Data successfully collected and saved to {filename}")

    except Exception as error:
        error_message = f"Error fetching data: {error}"
        print(error_message)
        logging.error(error_message)

    finally:
        # Ensure the connection is closed properly
        if connection:
            cursor.close()
            connection.close()


# Run the data collection function
if __name__ == "__main__":
    fetch_data()
