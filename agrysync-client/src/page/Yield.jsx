import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
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
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            borderRadius: "16px",
            backgroundColor: "#fff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <BarChartIcon sx={{ fontSize: 48, color: "#5B86E5", mb: 1 }} />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#5B86E5",
              }}
            >
              Paddy Yield Prediction
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your field parameters to predict yield
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* First Row */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Crop Type"
                  name="CropType"
                  value={formData.CropType}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Fourth Row */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Temperature (°C)"
                  name="Temperature"
                  type="number"
                  value={formData.Temperature}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Humidity (%)"
                  name="Humidity"
                  type="number"
                  value={formData.Humidity}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Rainfall (mm)"
                  name="Rainfall"
                  type="number"
                  value={formData.Rainfall}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5B86E5",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 4,
                padding: "12px",
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
              fullWidth
              disabled={!isFormComplete()}
            >
              Predict Yield
            </Button>
          </form>

          {predictedYield && (
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
                Prediction Result
              </Typography>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontWeight: "700",
                  color: "#3a3a3a",
                }}
              >
                {predictedYield.toFixed(2)}{" "}
                <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                  tons/hectare
                </span>
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default YieldPrediction;
