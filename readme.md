# Data Management Project

## Overview

This project is a comprehensive agricultural data management system consisting of multiple components including a .NET Core backend service, React client application, Flask-based disease detection microservice, and a crop yield prediction model. The system is designed to efficiently manage and analyze agricultural data.

## Architecture

The project follows a microservices architecture with the following main components:

- Backend API Service (.NET Core)
- Client Application (React)
- Disease Detection Microservice (Flask/TensorFlow)
- Crop Yield Prediction Model (Flask/scikit-learn)

## Components

### Backend (agrysync-backend)

The backend provides RESTful API services built with .NET Core 8.0 and PostgreSQL database.

#### Technologies

- .NET Core 8.0
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI

#### Setup

```bash
cd agrysync-backend
dotnet restore
```

#### Configuration

Create an `appsettings.json` file in the backend directory with the following variables:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=agrysync;Username=postgres;Password=yourpassword"
  },
  "JwtSettings": {
    "Secret": "your-secret-key-with-at-least-32-characters",
    "ExpiryHours": 24,
    "Issuer": "agrysync-api",
    "Audience": "agrysync-client"
  }
}
```

#### Running

```bash
# Development mode
dotnet run

# Production mode
dotnet run --configuration Release
```

### Client Application (agrysync-client)

The client application provides a user interface built with React and Material UI.

#### Technologies

- React 18
- Material UI v6
- React Router
- Leaflet for maps
- Recharts for data visualization

#### Setup

```bash
cd agrysync-client
npm install
```

#### Configuration

Create a `.env` file in the client directory:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DISEASE_SERVICE_URL=http://localhost:5001/disease
REACT_APP_MODEL_URL=http://localhost:5000/predict
```

#### Running

```bash
# Development mode
npm start

# Build for production
npm run build
```

### Disease Detection Microservice

This Flask-based microservice handles crop disease detection using a TensorFlow deep learning model.

#### Technologies

- Flask
- Flask-RestX (Swagger UI)
- TensorFlow/Keras
- Image processing

#### Setup

```bash
cd disease-microservice
pip install -r requirements.txt
```

#### Required Packages

```
flask
flask-restx
tensorflow
numpy
werkzeug
```

#### Running

```bash
python app.py
```

#### API Endpoints

- `POST /disease/predict` - Upload an image for disease detection

#### Model Details

The service uses a pre-trained deep learning model (`paddy22.h5`) for classifying 10 different conditions in paddy/rice plants:

- bacterial_leaf_blight
- bacterial_leaf_streak
- bacterial_panicle_blight
- blast
- brown_spot
- dead_heart
- downy_mildew
- hispa
- normal
- tungro

### Crop Yield Prediction Model (Model 1)

This Flask-based service predicts crop yields based on various agricultural inputs.

#### Technologies

- Flask
- scikit-learn
- pandas
- joblib

#### Setup

```bash
cd "Model 1"
pip install -r requirements.txt
```

#### Required Packages

```
flask
pandas
scikit-learn
joblib
```

#### Input Parameters

The model accepts the following input features:

- CropType
- Variety
- Season
- FieldSize
- SoilType
- IrrigationType

#### Running

```bash
python app.py
```

#### API Endpoints

- `POST /predict` - Submit crop data for yield prediction

## API Documentation

- Backend API documentation is available at `/swagger` when the backend server is running
- Disease Detection microservice documentation is available at `/swagger` when the service is running

## Project Structure

```
Data Management Project/
├── agrysync-backend/        # .NET Core backend
├── agrysync-client/         # React frontend
├── disease-microservice/    # Flask disease detection service
├── Model 1/                 # Flask crop yield prediction service
└── README.md                # This file
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
