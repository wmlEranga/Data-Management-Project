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

  const [cropTypes, setCropTypes] = useState([]);
  const [selectedCropType, setSelectedCropType] = useState("");
  const [cropVarieties, setCropVarieties] = useState([]);
  const [selectedCropVariety, setSelectedCropVariety] = useState("");
  //farmer id from session storage
  const farmerId = sessionStorage.getItem("userId");

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
    const selectedCrop = cropTypes.find(
      (crop) => crop.cropTypeId === selectedCropType
    );
    const selectedVariety = cropVarieties.find(
      (variety) => variety.cropVarietyId === selectedCropVariety
    );

    const projectData = {
      fieldName,
      fieldSize: parseFloat(fieldSize),
      soilType,
      irrigationType,
      latitude,
      longitude,
      cropPlantingDate,
      expectedHarvestDate,
      season,
      cropType: selectedCrop ? selectedCrop.cropTypeName : "",
      cropVariety: selectedVariety ? selectedVariety.variety : "",
      farmerId: parseInt(farmerId, 10),
    };

    try {
      // Using onSave instead of direct API call to align with Home.jsx
      onSave(projectData);
    } catch (error) {
      console.error("Error adding project:", error);
    }
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
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          p: 4,
          overflowY: "auto", // Make the content scrollable
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#5B86E5" mb={3}>
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Field Size (hectares)"
                type="number"
                required
                value={fieldSize}
                onChange={(e) => setFieldSize(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
                <InputLabel>Soil Type</InputLabel>
                <Select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  label="Soil Type"
                  required
                >
                  <MenuItem value="Clay">Clay</MenuItem>
                  <MenuItem value="Loam">Loam</MenuItem>
                  <MenuItem value="Silt">Silt</MenuItem>

                  <MenuItem value="Peat">Peat</MenuItem>
                  <MenuItem value="Sand">Sand</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
                <InputLabel>Irrigation Type</InputLabel>
                <Select
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  label="Irrigation Type"
                  required
                >
                  <MenuItem value="Drip">Drip</MenuItem>
                  <MenuItem value="Sprinkler">Sprinkler</MenuItem>
                  <MenuItem value="Flood">Flood</MenuItem>
                  <MenuItem value="Canal">Canal</MenuItem>
                  <MenuItem value="Rainfed">Rainfed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
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
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
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
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
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
        <Typography
          variant="body1"
          color="#5B86E5"
          mt={3}
          mb={1}
          fontWeight={500}
        >
          Click on the map to select location:
        </Typography>
        <Box
          sx={{
            height: 300,
            mb: 2,
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(91, 134, 229, 0.2)",
          }}
        >
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
        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#5B86E5",
              "&:hover": { backgroundColor: "#3a66c5" },
              borderRadius: "10px",
              padding: "10px 0",
              textTransform: "none",
              fontWeight: 600,
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
