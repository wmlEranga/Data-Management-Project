from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import tensorflow as tf

app = Flask(__name__)

# Load the trained model without compiling (to fix the reduction error)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "paddy.h5")
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


def preprocess_image(image_path):
    img = image.load_img(
        image_path, target_size=IMAGE_SIZE
    )  # Resize image to the input size expected by the model
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize the image
    return img_array


@app.route("/predict", methods=["POST"])
def predict():
    # Check if the request contains an image file
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    # Get the file from the request
    file = request.files["file"]
    file_path = f"uploads/{file.filename}"

    # Save the uploaded file
    os.makedirs("uploads", exist_ok=True)
    file.save(file_path)

    # Preprocess the image
    processed_image = preprocess_image(file_path)

    # Make predictions using the model
    prediction = model.predict(processed_image)

    # Convert predictions to readable format
    predicted_class = np.argmax(prediction, axis=1)[0]
    class_names = [
        "Bacterial leaf blight",
        "Brown spot",
        "Leaf smut",
    ]  # Replace with actual class names used in your dataset
    result = class_names[predicted_class]

    # Return the prediction as a JSON response
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
