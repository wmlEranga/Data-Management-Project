import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import config from "../config";

const YieldPrediction = () => {
  // State to manage form inputs and prediction result
  const [formData, setFormData] = useState({
    CropType: "",
    Variety: "",
    Season: "",
    FieldSize: "",
    SoilType: "",
    IrrigationType: "",
  });

  const [predictedYield, setPredictedYield] = useState(null);
  const [cropTypes, setCropTypes] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch crop types and varieties on component mount
  useEffect(() => {
    const fetchCropTypes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5178/Crop/GetCropTypes");
        if (response.ok) {
          const data = await response.json();
          if (data.$values && Array.isArray(data.$values)) {
            setCropTypes(data.$values);
          }
        } else {
          console.error("Failed to fetch crop types");
        }
      } catch (error) {
        console.error("Error fetching crop types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCropTypes();
  }, []);

  // Update varieties when crop type changes
  useEffect(() => {
    if (formData.CropType) {
      const selectedCropType = cropTypes.find(
        (type) => type.cropTypeName === formData.CropType
      );

      if (
        selectedCropType &&
        selectedCropType.cropVarieties &&
        selectedCropType.cropVarieties.$values
      ) {
        setVarieties(selectedCropType.cropVarieties.$values);
        // Reset variety selection when crop type changes
        setFormData((prev) => ({ ...prev, Variety: "" }));
      } else {
        setVarieties([]);
      }
    }
  }, [formData.CropType, cropTypes]);

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
    return Object.values(formData).every(
      (field) => field.toString().trim() !== ""
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert FieldSize to number before sending
      const requestData = {
        ...formData,
        FieldSize: parseFloat(formData.FieldSize),
      };

      const response = await fetch(
        `${config.backendUrl}/YieldPrediction/predict-yield`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.prediction) {
          // Parse the prediction string to extract the yield value
          try {
            const predictionObj = JSON.parse(
              data.prediction.replace(/(\w+):/g, '"$1":')
            );
            setPredictedYield(predictionObj.predicted_yield);
          } catch (parseError) {
            console.error("Error parsing prediction:", parseError);
            // Fallback: try to extract using regex if JSON parsing fails
            const match = data.prediction.match(/predicted_yield:\s*([\d.]+)/);
            if (match && match[1]) {
              setPredictedYield(parseFloat(match[1]));
            } else {
              console.error("Could not extract prediction value");
            }
          }
        } else {
          console.error("No prediction data in response:", data);
        }
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

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
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
                    {cropTypes.map((type) => (
                      <MenuItem key={type.cropTypeId} value={type.cropTypeName}>
                        {type.cropTypeName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Variety"
                    name="Variety"
                    value={formData.Variety}
                    onChange={handleChange}
                    fullWidth
                    disabled={!formData.CropType}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#5B86E5",
                        },
                      },
                    }}
                  >
                    {varieties.map((v) => (
                      <MenuItem key={v.cropVarietyId} value={v.variety}>
                        {v.variety}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    label="Field Size (hectares)"
                    name="FieldSize"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={formData.FieldSize}
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

                {/* Third Row */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Soil Type"
                    name="SoilType"
                    value={formData.SoilType}
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
                    <MenuItem value="Clay">Clay</MenuItem>
                    <MenuItem value="Loam">Loam</MenuItem>
                    <MenuItem value="Sandy">Sandy</MenuItem>
                    <MenuItem value="Silt">Silt</MenuItem>
                    <MenuItem value="Peat">Peat</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Irrigation Type"
                    name="IrrigationType"
                    value={formData.IrrigationType}
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
                    <MenuItem value="Drip">Drip</MenuItem>
                    <MenuItem value="Flood">Flood</MenuItem>
                    <MenuItem value="Sprinkler">Sprinkler</MenuItem>
                    <MenuItem value="Rainfed">Rainfed</MenuItem>
                    <MenuItem value="Canal">Canal</MenuItem>
                  </TextField>
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
                  background:
                    "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
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
          )}

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
                {parseFloat(predictedYield).toFixed(2)}{" "}
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
