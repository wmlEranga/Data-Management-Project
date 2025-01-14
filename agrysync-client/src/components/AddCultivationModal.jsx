import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";

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

function AddCultivationModal({ open, onClose, projectId }) {
  const [formData, setFormData] = useState({
    dateRecorded: "",
    growthStage: "",
    waterLevel: "",
    fertilizerUsed: "",
    pesticideUsed: "",
    diseaseReport: "",
    diseaseId: "",
    pesticideId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data to the backend
    console.log("Form data submitted:", formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add Cultivation Data
        </Typography>
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
              <TextField
                label="Growth Stage"
                name="growthStage"
                value={formData.growthStage}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Water Level"
                name="waterLevel"
                value={formData.waterLevel}
                onChange={handleChange}
                fullWidth
                required
              />
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
                label="Pesticide Used"
                name="pesticideUsed"
                value={formData.pesticideUsed}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Disease Report"
                name="diseaseReport"
                value={formData.diseaseReport}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Disease ID"
                name="diseaseId"
                value={formData.diseaseId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pesticide ID"
                name="pesticideId"
                value={formData.pesticideId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddCultivationModal;
