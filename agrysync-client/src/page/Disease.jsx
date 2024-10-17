import React, { useState } from "react";
import axios from "axios";

function DiseaseIdentifier() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5178/PaddyDisease/predict-disease",
        formData
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading the file", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Identify Disease</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default DiseaseIdentifier;
