from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load the trained model
model = load_model("paddy.h5")  # Update to the correct model path


def preprocess_image(image_path):
    img = image.load_img(
        image_path, target_size=(224, 224)
    )  # Adjust size to what the model expects
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Create an uploads directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    processed_image = preprocess_image(file_path)
    prediction = model.predict(processed_image)

    # Assuming your model outputs a probability for each class, adjust this as needed
    predicted_class = np.argmax(prediction, axis=1)  # Get the predicted class index

    return jsonify({"prediction": int(predicted_class[0])})  # Return class index


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
