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
  Opacity,
  ArrowForward,
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
          minHeight: "calc(100vh - 50px)",
          backgroundColor: "#f5f8ff",
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#5B86E5" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f8ff",
        minHeight: "calc(100vh - 50px)",
        paddingTop: 4,
        paddingBottom: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "16px",
            backgroundColor: "#fff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 600,
                  color: "#5B86E5",
                }}
              >
                {project.cropType} Project
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Project ID: {id}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Agriculture />}
                onClick={handleNavigateToCultivationData}
                sx={{
                  borderRadius: "10px",
                  padding: "8px 16px",
                  color: "#5B86E5",
                  borderColor: "#5B86E5",
                  "&:hover": {
                    borderColor: "#36D1DC",
                    backgroundColor: "rgba(91, 134, 229, 0.04)",
                  },
                }}
              >
                Cultivation Data
              </Button>
              <Button
                variant="contained"
                startIcon={<Crop />}
                onClick={handleOpenModal}
                sx={{
                  borderRadius: "10px",
                  padding: "8px 16px",
                  background:
                    "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  boxShadow: "0 4px 15px rgba(91, 134, 229, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(91, 134, 229, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
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
            <Card
              sx={{
                borderRadius: "16px",
                height: "100%",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              elevation={0}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#5B86E5" }}>
                    <Crop />
                  </Avatar>
                }
                title="Crop Details"
                titleTypographyProps={{
                  variant: "h6",
                  fontWeight: 600,
                  color: "#333",
                }}
              />
              <CardContent>
                <Stack spacing={3}>
                  <InfoItem label="Crop Type" value={project.cropType} />
                  <InfoItem label="Variety" value={project.variety} />
                  <InfoItem
                    label="Planting"
                    value={new Date(project.plantingDate).toLocaleDateString()}
                    icon={<CalendarToday sx={{ color: "#5B86E5" }} />}
                  />
                  <InfoItem
                    label="Harvest"
                    value={new Date(
                      project.expectedHarvestDate
                    ).toLocaleDateString()}
                    icon={<CalendarToday sx={{ color: "#5B86E5" }} />}
                  />
                  <InfoItem
                    label="Season"
                    value={
                      <Chip
                        label={project.season}
                        sx={{
                          backgroundColor: "rgba(91, 134, 229, 0.1)",
                          color: "#5B86E5",
                          fontWeight: 500,
                        }}
                        size="small"
                      />
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Field Info Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: "16px",
                height: "100%",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              elevation={0}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#36D1DC" }}>
                    <LocationOn />
                  </Avatar>
                }
                title="Field Details"
                titleTypographyProps={{
                  variant: "h6",
                  fontWeight: 600,
                  color: "#333",
                }}
              />
              <CardContent>
                <Stack spacing={3}>
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
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              elevation={0}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                    }}
                  >
                    <Info />
                  </Avatar>
                }
                title="Additional Information"
                titleTypographyProps={{
                  variant: "h6",
                  fontWeight: 600,
                  color: "#333",
                }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      <InfoItem
                        label="Coordinates"
                        value={`${project.latitude}, ${project.longitude}`}
                        icon={<LocationOn sx={{ color: "#5B86E5" }} />}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      <InfoItem label="Farmer ID" value={project.farmerId} />
                      <InfoItem
                        label="Added"
                        value={new Date(project.dateAdded).toLocaleDateString()}
                        icon={<CalendarToday sx={{ color: "#5B86E5" }} />}
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
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#5B86E5",
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              Guidance - {guidance[0].stage}
            </Typography>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
                overflow: "hidden",
              }}
              elevation={0}
            >
              <Box
                sx={{
                  height: "8px",
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {guidance.map((item, index) => (
                    <Box
                      key={item.$id}
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        backgroundColor: "rgba(91, 134, 229, 0.02)",
                        border: "1px solid rgba(91, 134, 229, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          mb: 2,
                          color: "#333",
                        }}
                      >
                        {item.notes}
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                backgroundColor: "rgba(91, 134, 229, 0.1)",
                                color: "#5B86E5",
                                fontWeight: 500,
                                px: 1,
                                py: 0.5,
                                borderRadius: "4px",
                                mr: 1,
                              }}
                            >
                              Fertilizer
                            </Box>
                            {item.recommendedFertilizer}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                backgroundColor: "rgba(91, 134, 229, 0.1)",
                                color: "#5B86E5",
                                fontWeight: 500,
                                px: 1,
                                py: 0.5,
                                borderRadius: "4px",
                                mr: 1,
                              }}
                            >
                              Pesticides
                            </Box>
                            {item.recommendedPesticides}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          display="flex"
                          alignItems="center"
                        >
                          <Box
                            component="span"
                            sx={{
                              backgroundColor: "rgba(91, 134, 229, 0.1)",
                              color: "#5B86E5",
                              fontWeight: 500,
                              px: 1,
                              py: 0.5,
                              borderRadius: "4px",
                              mr: 1,
                            }}
                          >
                            Water Level
                          </Box>
                          <Stack direction="row" spacing={0.5}>
                            {Array.from({ length: 6 }, (_, i) => (
                              <Opacity
                                key={i}
                                sx={{
                                  color:
                                    i < item.recommendedWaterLevel
                                      ? "#36D1DC"
                                      : "rgba(0, 0, 0, 0.12)",
                                  fontSize: "1.2rem",
                                }}
                              />
                            ))}
                          </Stack>
                        </Grid>
                      </Grid>
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
    </Box>
  );
}

// Reusable Info Item Component
const InfoItem = ({ label, value, icon }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    {icon && <Box>{icon}</Box>}
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "0.85rem",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          color: "#333",
        }}
      >
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default ProjectPage;
