import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Chip,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  Crop,
  LocationOn,
  Info,
  CalendarToday,
  Agriculture,
  Opacity, // <-- added for water level visualization
} from "@mui/icons-material";
import AddCultivationModal from "../components/AddCultivationModal";
import config from "../config";

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guidance, setGuidance] = useState([]);

  useEffect(() => {
    fetch(`${config.backendUrl}/project/get-project-details/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );
  }, [id]);

  useEffect(() => {
    fetch(`${config.backendUrl}/api/Guide/get-guidance/${id}`)
      .then((response) => response.json())
      .then((data) => setGuidance(data))
      .catch((error) =>
        console.error("Error fetching guidance details:", error)
      );
  }, [id]);

  console.log("Guidance" + guidance);

  const handleNavigateToCultivationData = () => {
    navigate(`/cultivation-data/${id}`);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!project) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "grey.100",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: "background.default",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {project.cropType} Project
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Project ID: {id}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Agriculture />}
              onClick={handleNavigateToCultivationData}
              sx={{ borderRadius: 20 }}
            >
              Cultivation Data
            </Button>
            <Button
              variant="contained"
              startIcon={<Crop />}
              onClick={handleOpenModal}
              sx={{ borderRadius: 20 }}
            >
              Add Data
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* General Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: "100%" }} elevation={3}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Crop />
                </Avatar>
              }
              title="Crop Details"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Stack spacing={2}>
                <InfoItem label="Crop Type" value={project.cropType} />
                <InfoItem label="Variety" value={project.variety} />
                <InfoItem
                  label="Planting"
                  value={new Date(project.plantingDate).toLocaleDateString()}
                  icon={<CalendarToday />}
                />
                <InfoItem
                  label="Harvest"
                  value={new Date(
                    project.expectedHarvestDate
                  ).toLocaleDateString()}
                  icon={<CalendarToday />}
                />
                <InfoItem
                  label="Season"
                  value={
                    <Chip label={project.season} color="success" size="small" />
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Field Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: "100%" }} elevation={3}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LocationOn />
                </Avatar>
              }
              title="Field Details"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Stack spacing={2}>
                <InfoItem label="Field Name" value={project.fieldName} />
                <InfoItem label="Size" value={`${project.fieldSize} ha`} />
                <InfoItem label="Soil Type" value={project.soilType} />
                <InfoItem label="Irrigation" value={project.irrigationType} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Location and Additional Info */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }} elevation={3}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <Info />
                </Avatar>
              }
              title="Additional Information"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2}>
                    <InfoItem
                      label="Coordinates"
                      value={`${project.latitude}, ${project.longitude}`}
                      icon={<LocationOn />}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2}>
                    <InfoItem label="Farmer ID" value={project.farmerId} />
                    <InfoItem
                      label="Added"
                      value={new Date(project.dateAdded).toLocaleDateString()}
                      icon={<CalendarToday />}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Preview Guidance Section */}
      {guidance.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Guidance - {guidance[0].stage}
          </Typography>
          <Card sx={{ borderRadius: 3 }} elevation={3}>
            <CardContent>
              <Stack spacing={2}>
                {guidance.map((item, index) => (
                  <Box key={item.$id}>
                    <Typography variant="body1" fontWeight="medium">
                      {item.notes}
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Fertilizer: {item.recommendedFertilizer}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Pesticides: {item.recommendedPesticides}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          Water Level:
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          {Array.from({ length: 6 }, (_, i) => (
                            <Opacity
                              key={i}
                              sx={{
                                color:
                                  i < item.recommendedWaterLevel
                                    ? "#1976d2"
                                    : "#c0c0c0",
                              }}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                    {index !== guidance.length - 1 && (
                      <Box sx={{ my: 1, borderBottom: "1px solid #e0e0e0" }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      <AddCultivationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        projectId={id}
      />
    </Container>
  );
}

// Reusable Info Item Component
const InfoItem = ({ label, value, icon }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    {icon && <Box sx={{ color: "text.secondary" }}>{icon}</Box>}
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default ProjectPage;
