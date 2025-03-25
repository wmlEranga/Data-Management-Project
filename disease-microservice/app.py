from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import tensorflow as tf

app = Flask(__name__)

# Load the trained model without compiling (to fix the reduction error)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "paddy_2.h5")
model = load_model(MODEL_PATH, compile=False)

# Recompile the model with correct settings
model.compile(
    optimizer="adam",
    loss=tf.keras.losses.SparseCategoricalCrossentropy(
        from_logits=False
    ),  # Specify the proper loss function
    metrics=["accuracy"],
)

# Define the image size that the model expects (same as used during training)
IMAGE_SIZE = (256, 256)


# Updated preprocessing function to match exactly how images were processed during training
def preprocess_image(image_path):
    # Load the image and resize it to match the model's expected input shape
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=IMAGE_SIZE)

    # Convert to array and add batch dimension
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    # Ensure normalization is consistent with training
    # For TensorFlow/Keras models, normalization to [0,1] is standard
    img_array = img_array / 255.0

    print(
        f"Preprocessed image shape: {img_array.shape}, Range: {np.min(img_array)} to {np.max(img_array)}"
    )
    return img_array


@app.route("/predict", methods=["POST"])
def predict():
    # Check if the request contains an image file
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    # Get the file from the request
    file = request.files["file"]

    # Check if the filename is empty
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Create absolute path for uploads directory
    upload_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")

    # Ensure the uploads directory exists with appropriate permissions
    try:
        os.makedirs(upload_dir, exist_ok=True)
        print(f"Upload directory confirmed: {upload_dir}")
    except Exception as e:
        print(f"Error creating directory: {e}")
        return jsonify({"error": f"Cannot create upload directory: {str(e)}"}), 500

    # Generate file path
    file_path = os.path.join(upload_dir, file.filename)
    print(f"Attempting to save file to: {file_path}")

    # Save the file with error handling
    try:
        file.save(file_path)
        print(f"File successfully saved: {file_path}")
    except Exception as e:
        print(f"Error saving file: {e}")
        return jsonify({"error": f"Could not save uploaded file: {str(e)}"}), 500

    # Verify file exists after saving
    if not os.path.exists(file_path):
        return jsonify({"error": "File upload failed - file not found after save"}), 500

    try:
        # Preprocess the image
        processed_image = preprocess_image(file_path)

        # Make predictions using the model
        predictions = model.predict(processed_image)
        print(f"Raw prediction output shape: {predictions.shape}")
        print(f"Raw prediction values: {predictions[0]}")

        # Convert predictions to readable format
        predicted_class_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]) * 100)

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

        result = {
            "disease": class_names[predicted_class_index],
            "confidence": round(confidence, 2),
            "class_index": int(predicted_class_index),
        }

        print(f"Prediction result: {result}")

        # Clean up the file after prediction (optional)
        try:
            os.remove(file_path)
            print(f"Removed temporary file: {file_path}")
        except Exception as e:
            print(f"Warning: Could not remove temporary file: {e}")

        # Return the prediction as a JSON response
        return jsonify(result)

    except Exception as e:
        import traceback

        print(f"Error during processing: {e}")
        print(traceback.format_exc())
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
