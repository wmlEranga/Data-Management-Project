from flask import Flask, request, jsonify
from flask_restx import Api, Resource
from werkzeug.datastructures import FileStorage
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import tensorflow as tf

app = Flask(__name__)

api = Api(
    app,
    version="1.0",
    title="Crop Disease Detection API",
    description="API for predicting diseases in paddy/rice plants",
    doc="/swagger",  # Swagger UI will be available at /swagger endpoint
)

# Create a namespace for the API
ns = api.namespace("disease", description="Disease detection operations")

# Define the upload parser
upload_parser = api.parser()
upload_parser.add_argument(
    "file",
    location="files",
    type=FileStorage,
    required=True,
    help="Image file for disease detection",
)

# Define class names based on the paddy disease classification dataset
class_names = [
    "bacterial_leaf_blight",
    "bacterial_leaf_streak",
    "bacterial_panicle_blight",
    "blast",
    "brown_spot",
    "dead_heart",
    "downy_mildew",
    "hispa",
    "normal",
    "tungro",
]

# Load the trained model with compile=False to avoid the reduction error
MODEL_PATH = os.path.join(os.path.dirname(__file__), "paddy22.h5")
model = load_model(MODEL_PATH, compile=False)
print("Model loaded successfully")

# Manually recompile the model with compatible parameters
model.compile(
    optimizer="adam",
    loss=tf.keras.losses.SparseCategoricalCrossentropy(
        from_logits=False, reduction=tf.keras.losses.Reduction.SUM_OVER_BATCH_SIZE
    ),
    metrics=["accuracy"],
)

# Define the image size that the model expects
IMAGE_SIZE = (256, 256)


# Updated preprocessing function to match the example
def preprocess_image(image_path):
    # Load the image and resize it to match the model's expected input shape
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=IMAGE_SIZE)

    # Convert to array and add batch dimension
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_batch = np.expand_dims(img_array, 0)

    # No need for normalization - model handles it internally
    # The key change is removing img_array = img_array / 255.0

    print(f"Preprocessed image shape: {img_batch.shape}")
    return img_batch


@ns.route("/predict")
@ns.expect(upload_parser)
class DiseasePredictor(Resource):
    @ns.doc("predict_disease")
    @ns.response(200, "Success")
    @ns.response(400, "Validation Error")
    @ns.response(500, "Internal Server Error")
    def post(self):
        """Predict disease from paddy/rice plant image"""
        try:
            # Check if the request contains an image file
            if "file" not in request.files:
                return {"error": "No file uploaded"}, 400

            # Get the file from the request
            file = request.files["file"]

            # Check if the filename is empty
            if file.filename == "":
                return {"error": "No file selected"}, 400

            # Create absolute path for uploads directory
            upload_dir = os.path.join(
                os.path.dirname(os.path.abspath(__file__)), "uploads"
            )

            # Ensure the uploads directory exists
            os.makedirs(upload_dir, exist_ok=True)
            print(f"Upload directory confirmed: {upload_dir}")

            # Generate file path
            file_path = os.path.join(upload_dir, file.filename)
            print(f"Attempting to save file to: {file_path}")

            # Save the file
            file.save(file_path)
            print(f"File successfully saved: {file_path}")

            # Preprocess the image
            processed_image = preprocess_image(file_path)

            # Make predictions using the model
            predictions = model.predict(processed_image)
            print(f"Raw prediction output shape: {predictions.shape}")
            print(f"Raw prediction values: {predictions[0]}")

            # Convert predictions to readable format
            predicted_class_index = np.argmax(predictions[0])
            confidence = float(np.max(predictions[0]) * 100)

            result = {
                "disease": class_names[predicted_class_index],
                "confidence": round(confidence, 2),
                "class_index": int(predicted_class_index),
            }

            print(f"Prediction result: {result}")

            # Clean up the file after prediction
            try:
                os.remove(file_path)
                print(f"Removed temporary file: {file_path}")
            except Exception as e:
                print(f"Warning: Could not remove temporary file: {e}")

            # Return the prediction
            return result

        except Exception as e:
            import traceback

            print(f"Error during processing: {e}")
            print(traceback.format_exc())
            return {"error": f"Error processing image: {str(e)}"}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
