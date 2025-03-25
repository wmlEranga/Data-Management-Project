import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import config from "../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddCultivationModal({ open, onClose, projectId, cropId }) {
  const [formData, setFormData] = useState({
    dateRecorded: new Date().toISOString().split("T")[0], // Default to today's date
    growthStageId: "",
    waterLevelId: "",
    fertilizerUsed: "",
    pesticideUsed: "",
    diseaseReport: "",
    diseaseId: "",
    pesticideId: "",
    cropId: projectId || "", // Use projectId as fallback for cropId
  });
  const [growthStages, setGrowthStages] = useState([]);
  const [waterLevels, setWaterLevels] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState({
    growthStages: true,
    waterLevels: true,
    diseases: true,
    pesticides: true,
  });
  const [error, setError] = useState({
    growthStages: null,
    waterLevels: null,
    diseases: null,
    pesticides: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchGrowthStages = async () => {
      try {
        const response = await fetch(
          `${config.backendUrl}/cultivation/growth-stages`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the $values array from the response
        const stagesArray = data.$values || [];
        setGrowthStages(stagesArray);
        setLoading((prev) => ({ ...prev, growthStages: false }));
      } catch (err) {
        console.error("Error fetching growth stages:", err);
        setError((prev) => ({
          ...prev,
          growthStages: "Failed to load growth stages",
        }));
        setLoading((prev) => ({ ...prev, growthStages: false }));
      }
    };

    const fetchWaterLevels = async () => {
      try {
        const response = await fetch(
          `${config.backendUrl}/cultivation/water-levels`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the $values array from the response
        const levelsArray = data.$values || [];
        setWaterLevels(levelsArray);
        setLoading((prev) => ({ ...prev, waterLevels: false }));
      } catch (err) {
        console.error("Error fetching water levels:", err);
        setError((prev) => ({
          ...prev,
          waterLevels: "Failed to load water levels",
        }));
        setLoading((prev) => ({ ...prev, waterLevels: false }));
      }
    };

    const fetchDiseases = async () => {
      try {
        const response = await fetch(
          `${config.backendUrl}/cultivation/diseases`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the $values array from the response
        const diseasesArray = data.$values || [];
        setDiseases(diseasesArray);
        setLoading((prev) => ({ ...prev, diseases: false }));
      } catch (err) {
        console.error("Error fetching diseases:", err);
        setError((prev) => ({
          ...prev,
          diseases: "Failed to load diseases",
        }));
        setLoading((prev) => ({ ...prev, diseases: false }));
      }
    };

    const fetchPesticides = async () => {
      try {
        const response = await fetch(
          `${config.backendUrl}/cultivation/pesticides`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the $values array from the response
        const pesticidesArray = data.$values || [];
        setPesticides(pesticidesArray);
        setLoading((prev) => ({ ...prev, pesticides: false }));
      } catch (err) {
        console.error("Error fetching pesticides:", err);
        setError((prev) => ({
          ...prev,
          pesticides: "Failed to load pesticides",
        }));
        setLoading((prev) => ({ ...prev, pesticides: false }));
      }
    };

    // Reset form data when the modal is opened with a new cropId or projectId
    if (open) {
      const effectiveCropId = cropId || projectId; // Use projectId if cropId is not provided

      console.log("Setting cropId to:", effectiveCropId);

      setFormData((prev) => ({
        ...prev,
        cropId: effectiveCropId,
        dateRecorded: new Date().toISOString().split("T")[0], // Reset to today's date
      }));

      fetchGrowthStages();
      fetchWaterLevels();
      fetchDiseases();
      fetchPesticides();
    }
  }, [open, cropId, projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const effectiveCropId = formData.cropId || projectId;

    // Debug the values being checked
    console.log("Submitting form with values:", {
      dateRecorded: formData.dateRecorded,
      growthStageId: formData.growthStageId,
      waterLevelId: formData.waterLevelId,
      cropId: effectiveCropId,
    });

    // Fix validation logic to properly check for non-empty values
    // Use explicit checks for each field type
    if (
      !formData.dateRecorded ||
      formData.growthStageId === "" ||
      formData.growthStageId === null ||
      formData.waterLevelId === "" ||
      formData.waterLevelId === null ||
      !effectiveCropId
    ) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Create a date object and format it as ISO string for proper UTC handling
      const dateObj = new Date(formData.dateRecorded);
      const isoDate = dateObj.toISOString();

      const response = await fetch(
        `${config.backendUrl}/cultivation/create-cultivation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cropId: parseInt(effectiveCropId),
            dateRecorded: isoDate, // Use ISO formatted date
            growthStageId: parseInt(formData.growthStageId),
            waterLevelId: parseInt(formData.waterLevelId),
            fertilizerUsed: formData.fertilizerUsed || null,
            pesticideUsed: formData.pesticideUsed || null,
            diseaseReport: formData.diseaseReport || null,
            diseaseId: formData.diseaseId ? parseInt(formData.diseaseId) : null,
            pesticideId: formData.pesticideId
              ? parseInt(formData.pesticideId)
              : null,
          }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      // Success - clear form and notify user
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        dateRecorded: new Date().toISOString().split("T")[0],
        growthStageId: "",
        waterLevelId: "",
        fertilizerUsed: "",
        pesticideUsed: "",
        diseaseReport: "",
        diseaseId: "",
        pesticideId: "",
        cropId: cropId || "",
      });

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Error submitting cultivation data:", err);
      setSubmitError("Failed to submit cultivation data. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add Cultivation Data{" "}
            {formData.cropId ? `for Crop ${formData.cropId}` : ""}
          </Typography>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Date Recorded"
                  type="date"
                  name="dateRecorded"
                  value={formData.dateRecorded}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!error.growthStages}>
                  <InputLabel id="growth-stage-label">Growth Stage</InputLabel>
                  {loading.growthStages ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Select
                      labelId="growth-stage-label"
                      name="growthStageId"
                      value={formData.growthStageId}
                      onChange={handleChange}
                      label="Growth Stage"
                      disabled={!!error.growthStages}
                    >
                      {Array.isArray(growthStages) ? (
                        growthStages.map((stage) => (
                          <MenuItem
                            key={stage.growthStageId}
                            value={stage.growthStageId}
                          >
                            {stage.growthStageName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No growth stages available</MenuItem>
                      )}
                    </Select>
                  )}
                  {error.growthStages && (
                    <FormHelperText>{error.growthStages}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!error.waterLevels}>
                  <InputLabel id="water-level-label">Water Level</InputLabel>
                  {loading.waterLevels ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Select
                      labelId="water-level-label"
                      name="waterLevelId"
                      value={formData.waterLevelId}
                      onChange={handleChange}
                      label="Water Level"
                      disabled={!!error.waterLevels}
                    >
                      {Array.isArray(waterLevels) ? (
                        waterLevels.map((level) => (
                          <MenuItem
                            key={level.waterLevelId}
                            value={level.waterLevelId}
                          >
                            {level.waterLevelName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No water levels available</MenuItem>
                      )}
                    </Select>
                  )}
                  {error.waterLevels && (
                    <FormHelperText>{error.waterLevels}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Fertilizer Used"
                  name="fertilizerUsed"
                  value={formData.fertilizerUsed}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pesticide Used (Optional Notes)"
                  name="pesticideUsed"
                  value={formData.pesticideUsed}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Disease Report (Optional Notes)"
                  name="diseaseReport"
                  value={formData.diseaseReport}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!error.diseases}>
                  <InputLabel id="disease-label">Disease</InputLabel>
                  {loading.diseases ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Select
                      labelId="disease-label"
                      name="diseaseId"
                      value={formData.diseaseId}
                      onChange={handleChange}
                      label="Disease"
                      disabled={!!error.diseases}
                    >
                      <MenuItem value="">None</MenuItem>
                      {Array.isArray(diseases) ? (
                        diseases.map((disease) => (
                          <MenuItem
                            key={disease.diseaseId}
                            value={disease.diseaseId}
                          >
                            {disease.diseaseName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No diseases available</MenuItem>
                      )}
                    </Select>
                  )}
                  {error.diseases && (
                    <FormHelperText>{error.diseases}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!error.pesticides}>
                  <InputLabel id="pesticide-label">Pesticide</InputLabel>
                  {loading.pesticides ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Select
                      labelId="pesticide-label"
                      name="pesticideId"
                      value={formData.pesticideId}
                      onChange={handleChange}
                      label="Pesticide"
                      disabled={!!error.pesticides}
                    >
                      <MenuItem value="">None</MenuItem>
                      {Array.isArray(pesticides) ? (
                        pesticides.map((pesticide) => (
                          <MenuItem
                            key={pesticide.pesticideId}
                            value={pesticide.pesticideId}
                          >
                            {pesticide.pesticideName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No pesticides available</MenuItem>
                      )}
                    </Select>
                  )}
                  {error.pesticides && (
                    <FormHelperText>{error.pesticides}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="button"
                onClick={onClose}
                sx={{ mr: 1 }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cultivation data submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddCultivationModal;
