import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Stack,
  Alert,
  Grid,
  Slider,
  InputLabel,
  Typography,
} from "@mui/material";
import config from "../config";

const AddYieldModal = ({ open, onClose, projectId }) => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [existingData, setExistingData] = useState(null);
  const [yieldData, setYieldData] = useState({
    cropId: parseInt(projectId),
    yieldAmount: "",
    grainQuality: 50,
  });

  // Fetch existing yield data when the modal opens
  useEffect(() => {
    if (open) {
      fetchExistingYieldData();
    }
  }, [open, projectId]);

  const fetchExistingYieldData = async () => {
    if (!projectId) return;

    setDataLoading(true);
    try {
      const response = await fetch(
        `${config.backendUrl}/Yield/get-latest-yield/${projectId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setExistingData(data);
          setYieldData({
            cropId: parseInt(projectId),
            yieldDataId: data.yieldDataId,
            yieldAmount: data.yieldAmount.toString(),
            grainQuality: data.grainQuality,
          });
        } else {
          resetForm();
        }
      } else {
        resetForm();
      }
    } catch (err) {
      console.error("Error fetching yield data:", err);
      resetForm();
    } finally {
      setDataLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQualityChange = (event, newValue) => {
    setYieldData((prev) => ({ ...prev, grainQuality: newValue }));
  };

  const resetForm = () => {
    setExistingData(null);
    setYieldData({
      cropId: parseInt(projectId),
      yieldAmount: "",
      grainQuality: 50,
    });
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Determine if we're updating or creating
      const endpoint = existingData
        ? `${config.backendUrl}/Yield/update-yield/${yieldData.yieldDataId}`
        : `${config.backendUrl}/Yield/create-yield`;

      const method = existingData ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...yieldData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process yield data");
      }

      const result = await response.json();
      setSuccess(true);

      // If it was a new record, update to show we're now editing
      if (!existingData) {
        setExistingData(result);
        setYieldData((prev) => ({ ...prev, yieldDataId: result.id }));
      }
    } catch (err) {
      console.error("Error submitting yield data:", err);
      setError(err.message || "An error occurred while processing yield data");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
          color: "white",
          fontWeight: 600,
          py: 2,
        }}
      >
        {existingData ? "Edit Yield Results" : "Add Yield Results"}
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 1 }}>
        {dataLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {existingData
                  ? "Yield data updated successfully!"
                  : "Yield data added successfully!"}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Box
              sx={{
                mb: 3,
                p: 2,
                backgroundColor: "rgba(91, 134, 229, 0.05)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {existingData
                  ? `Editing yield data recorded on ${new Date(
                      existingData.harvestDate
                    ).toLocaleDateString()} for the ${
                      existingData.season
                    } season.`
                  : "The harvest date and season will be automatically determined from the crop data. No need to enter them here."}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="yieldAmount"
                  label="Yield Amount (kg)"
                  type="number"
                  value={yieldData.yieldAmount}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="grain-quality-label" sx={{ mb: 1 }}>
                  Grain Quality: {yieldData.grainQuality}%
                </InputLabel>
                <Slider
                  aria-labelledby="grain-quality-label"
                  value={yieldData.grainQuality}
                  onChange={handleQualityChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={100}
                  sx={{
                    color: "#5B86E5",
                    "& .MuiSlider-thumb": {
                      height: 24,
                      width: 24,
                      backgroundColor: "#fff",
                      border: "2px solid currentColor",
                      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        boxShadow: "0 0 0 8px rgba(91, 134, 229, 0.16)",
                      },
                    },
                    "& .MuiSlider-track": {
                      height: 8,
                      borderRadius: 4,
                    },
                    "& .MuiSlider-rail": {
                      height: 8,
                      borderRadius: 4,
                      opacity: 0.5,
                      backgroundColor: "#bfbfbf",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: "#5B86E5",
            color: "#5B86E5",
            "&:hover": {
              borderColor: "#36D1DC",
              backgroundColor: "rgba(91, 134, 229, 0.04)",
            },
          }}
        >
          Cancel
        </Button>
        {!dataLoading && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
              boxShadow: "0 4px 15px rgba(91, 134, 229, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(91, 134, 229, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : existingData ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddYieldModal;
