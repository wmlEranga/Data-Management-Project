import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import config from "../config";

const YieldPrediction = () => {
  // State to manage form inputs and prediction result
  const [formData, setFormData] = useState({
    CropType: "",
    Variety: "",
    Season: "",
    GrowthStage: "",
    WaterLevel: "",
    FertilizerUsed: "",
    Temperature: "",
    Humidity: "",
    Rainfall: "",
  });

  const [predictedYield, setPredictedYield] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Check if all fields are filled
  const isFormComplete = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.backendUrl}/YieldPrediction/predict-yield`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPredictedYield(data.predicted_yield);
      } else {
        console.error("Error in fetching the prediction.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 4 }} elevation={3}>
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
          Predict Paddy Yield
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Crop Type"
                name="CropType"
                value={formData.CropType}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              >
                <MenuItem value="Paddy">Paddy</MenuItem>
                <MenuItem value="Wheat">Wheat</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Variety"
                name="Variety"
                value={formData.Variety}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Season"
                name="Season"
                value={formData.Season}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              >
                <MenuItem value="Yala">Yala</MenuItem>
                <MenuItem value="Maha">Maha</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Growth Stage"
                name="GrowthStage"
                value={formData.GrowthStage}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              >
                <MenuItem value="Seedling">Seedling</MenuItem>
                <MenuItem value="Mature">Mature</MenuItem>
              </TextField>
            </Grid>

            {/* Third Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Water Level"
                name="WaterLevel"
                value={formData.WaterLevel}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Fertilizer Used"
                name="FertilizerUsed"
                value={formData.FertilizerUsed}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              />
            </Grid>

            {/* Fourth Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Temperature (°C)"
                name="Temperature"
                type="number"
                value={formData.Temperature}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Humidity (%)"
                name="Humidity"
                type="number"
                value={formData.Humidity}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              />
            </Grid>

            {/* Fifth Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rainfall (mm)"
                name="Rainfall"
                type="number"
                value={formData.Rainfall}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }} // Material-UI spacing shorthand
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: 1.5,
              fontWeight: "bold",
              mt: 3,
              backgroundColor: "#00796b",
              "&:hover": {
                backgroundColor: "#004d40",
              },
              color: "#fff",
            }} // Custom color
            fullWidth
            disabled={!isFormComplete()} // Disable if form is not complete
          >
            Predict Yield
          </Button>
        </form>

        {predictedYield && (
          <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
            Predicted Yield: {predictedYield.toFixed(2)} tons/ha
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default YieldPrediction;
