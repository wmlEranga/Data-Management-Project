import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, md: 4 },
        minHeight: "calc(100vh - 100px)",
        backgroundColor: "#f5f8ff",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: "16px",
          backgroundColor: "#fff",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{
            fontWeight: 600,
            color: "#5B86E5",
            marginBottom: 4,
          }}
        >
          Paddy Disease Identifier
        </Typography>

        <Box
          component="label"
          sx={{
            display: "block",
            textAlign: "center",
            backgroundColor: "rgba(91, 134, 229, 0.05)",
            borderRadius: "12px",
            padding: 3,
            border: "2px dashed #5B86E5",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(91, 134, 229, 0.1)",
              borderColor: "#36D1DC",
            },
            marginBottom: 3,
          }}
        >
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <CloudUploadIcon
            sx={{ fontSize: 48, color: "#5B86E5", marginBottom: 2 }}
          />
          <Typography variant="body1" color="#5B86E5" fontWeight={500}>
            {file ? file.name : "Click to upload a paddy leaf image"}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            Supported formats: JPG, PNG, JPEG
          </Typography>
        </Box>

        {imagePreview && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 3,
            }}
          >
            <Box
              component="img"
              src={imagePreview}
              alt="Selected Preview"
              sx={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                borderRadius: "12px",
                border: "1px solid rgba(91, 134, 229, 0.2)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || loading}
          fullWidth
          sx={{
            padding: 1.5,
            fontWeight: "600",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
            boxShadow: "0 4px 15px rgba(91, 134, 229, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(91, 134, 229, 0.4)",
              transform: "translateY(-2px)",
            },
            "&.Mui-disabled": {
              background: "#e0e0e0",
              color: "#a0a0a0",
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
          <Box
            sx={{
              marginTop: 4,
              padding: 3,
              backgroundColor: "rgba(91, 134, 229, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(91, 134, 229, 0.2)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: "600",
                color: "#5B86E5",
                marginBottom: 1,
              }}
            >
              Result
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontWeight: "500",
              }}
            >
              {prediction}
            </Typography>
          </Box>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Paper>
    </Box>
  );
}

export default DiseaseIdentifier;
