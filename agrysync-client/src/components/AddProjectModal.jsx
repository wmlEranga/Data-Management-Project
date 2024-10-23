import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import the Leaflet styles

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png"; // Fix marker icon path issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useAuth } from "../context/AuthContext"; // Assuming you have authentication context
import config from "../config";

// Fix the default icon paths for leaflet markers
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationPicker = ({ setLatitude, setLongitude }) => {
  useMapEvents({
    click: (e) => {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });
  return null;
};

const AddProjectModal = ({ open, handleClose, onSave }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [soilType, setSoilType] = useState("");
  const [irrigationType, setIrrigationType] = useState("");
  const [latitude, setLatitude] = useState(0); // Default value
  const [longitude, setLongitude] = useState(0); // Default value
  const [cropPlantingDate, setCropPlantingDate] = useState("");
  const [expectedHarvestDate, setExpectedHarvestDate] = useState("");
  const [season, setSeason] = useState("");
  const { currentUser } = useAuth(); // Get current farmer details
  const [cropTypes, setCropTypes] = useState([]);
  const [selectedCropType, setSelectedCropType] = useState("");
  const [cropVarieties, setCropVarieties] = useState([]);
  const [selectedCropVariety, setSelectedCropVariety] = useState("");

  useEffect(() => {
    // Fetch crop types from the API
    fetch(`${config.backendUrl}/Crop/GetCropTypes`)
      .then((response) => response.json())
      .then((data) => {
        setCropTypes(data.$values);
      })
      .catch((error) => console.error("Error fetching crop types:", error));
  }, []);

  const handleCropTypeChange = (event) => {
    const cropTypeId = event.target.value;
    setSelectedCropType(cropTypeId);

    // Find the selected crop type and set its varieties
    const selectedCrop = cropTypes.find(
      (crop) => crop.cropTypeId === cropTypeId
    );
    if (selectedCrop) {
      setCropVarieties(selectedCrop.cropVarieties.$values);
    } else {
      setCropVarieties([]);
    }
  };

  const handleCropVarietyChange = (event) => {
    setSelectedCropVariety(event.target.value);
  };

  const handleSave = async () => {
    const projectData = {
      fieldName,
      fieldSize,
      soilType,
      irrigationType,
      latitude,
      longitude,
      cropPlantingDate,
      expectedHarvestDate,
      season,
      //cropType Name and Crop Variety String
      cropType: cropTypes.find((crop) => crop.cropTypeId === selectedCropType)
        .cropTypeName,
      cropVariety: cropVarieties.find(
        (variety) => variety.cropVarietyId === selectedCropVariety
      ).variety,

      farmerId: currentUser.farmerId,
    };
    await fetch(`${config.backendUrl}/Project/AddProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
      credentials: "include",
    });
    onSave(projectData); // Pass the new project data to the parent component

    handleClose(); // Close modal after save
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: "80vh", // Set max height for scrollable content
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          overflowY: "auto", // Make the content scrollable
        }}
      >
        <Typography variant="h6" color={green[600]} mb={2}>
          Add New Project
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Field Name"
                required
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Field Size (acres/hectares)"
                type="number"
                required
                value={fieldSize}
                onChange={(e) => setFieldSize(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Soil Type</InputLabel>
                <Select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  label="Soil Type"
                  required
                >
                  <MenuItem value="Clayey Soil">Clayey Soil</MenuItem>
                  <MenuItem value="Loamy Soil">Loamy Soil</MenuItem>
                  <MenuItem value="Silty Soil">Silty Soil</MenuItem>
                  <MenuItem value="Alluvial Soil">Alluvial Soil</MenuItem>
                  <MenuItem value="Peaty Soil">Peaty Soil</MenuItem>
                  <MenuItem value="Sandy Soils">Sandy Soils</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Irrigation Type</InputLabel>
                <Select
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  label="Irrigation Type"
                  required
                >
                  <MenuItem value="Drip Irrigation">Drip Irrigation</MenuItem>
                  <MenuItem value="Sprinkler Irrigation">
                    Sprinkler Irrigation
                  </MenuItem>
                  <MenuItem value="Flood Irrigation">Flood Irrigation</MenuItem>
                  <MenuItem value="Canal Irrigation">Canal Irrigation</MenuItem>
                  <MenuItem value="Subsurface Irrigation">
                    Subsurface Irrigation
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Crop Type</InputLabel>
                <Select
                  value={selectedCropType}
                  onChange={handleCropTypeChange}
                  label="Crop Type"
                  required
                >
                  {cropTypes.map((cropType) => (
                    <MenuItem
                      key={cropType.cropTypeId}
                      value={cropType.cropTypeId}
                    >
                      {cropType.cropTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Crop Variety</InputLabel>
                <Select
                  value={selectedCropVariety}
                  onChange={handleCropVarietyChange}
                  disabled={!selectedCropType}
                  label="Crop Variety"
                  required
                >
                  {cropVarieties.map((variety) => (
                    <MenuItem
                      key={variety.cropVarietyId}
                      value={variety.cropVarietyId}
                    >
                      {variety.variety}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Crop Planting Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={cropPlantingDate}
                onChange={(e) => setCropPlantingDate(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Expected Harvest Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={expectedHarvestDate}
                onChange={(e) => setExpectedHarvestDate(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Season</InputLabel>
                <Select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  label="Season"
                  required
                >
                  <MenuItem value="Yala">Yala</MenuItem>
                  <MenuItem value="Maha">Maha</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="body1" color={green[600]} mt={3}>
          Click on the map to select location:
        </Typography>
        <Box sx={{ height: 300, mb: 2 }}>
          <MapContainer
            center={[51.505, -0.09]} // Default location, can be customized
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
            {latitude && longitude && (
              <Marker position={[latitude, longitude]} />
            )}
          </MapContainer>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Latitude"
              type="number"
              value={latitude}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Longitude"
              type="number"
              value={longitude}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: green[600],
              "&:hover": { backgroundColor: green[800] },
            }}
            onClick={handleSave}
          >
            Save Project
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProjectModal;
