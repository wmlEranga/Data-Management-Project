import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

function DiseaseIdentifier() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile)); // Create image URL for preview
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await fetch(
        `${config.backendUrl}/PaddyDisease/predict-disease`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prediction from the server.");
      }

      const data = await response.json();
      setPrediction(data.prediction);
      toast.success("Prediction received successfully!");
    } catch (error) {
      console.error("Error uploading the file", error);
      toast.error("Error uploading the file: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "0 auto",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#00796b",
          marginBottom: 3,
        }}
      >
        Paddy Disease Identifier
      </Typography>

      <Box
        component="label"
        sx={{
          display: "block",
          textAlign: "center",
          backgroundColor: "#f1f1f1",
          borderRadius: 2,
          padding: 2,
          border: "2px dashed #00796b",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#e0f7fa",
          },
          marginBottom: 2,
        }}
      >
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Typography variant="body1" color="textSecondary">
          {file ? file.name : "Click to select an image"}
        </Typography>
      </Box>

      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Selected Preview"
          sx={{
            width: "100%",
            maxHeight: 300,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid #00796b",
            marginBottom: 2,
          }}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || loading}
        fullWidth
        sx={{
          padding: 1.5,
          fontWeight: "bold",
          backgroundColor: "#00796b",
          "&:hover": {
            backgroundColor: "#004d40",
          },
        }}
      >
        {loading ? (
          <>
            <CircularProgress
              size={24}
              color="inherit"
              sx={{ marginRight: 1 }}
            />
            Identifying...
          </>
        ) : (
          "Identify Disease"
        )}
      </Button>

      {prediction && (
        <Typography
          variant="h6"
          component="p"
          sx={{
            marginTop: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "#00796b",
          }}
        >
          Prediction: {prediction}
        </Typography>
      )}

      <ToastContainer />
    </Box>
  );
}

export default DiseaseIdentifier;
