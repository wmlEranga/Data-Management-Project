import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { Crop, LocationOn, Info, CalendarToday } from "@mui/icons-material";
import AddCultivationModal from "../components/AddCultivationModal";
import config from "../config";

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${config.backendUrl}/project/get-project-details/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );
  }, [id]);

  const handleNavigateToCultivationData = () => {
    navigate(`/cultivation-data/${id}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!project) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Project Details for Project ID: {id}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToCultivationData}
            sx={{ mr: 2 }}
          >
            View Cultivation Data
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenModal}
          >
            Add Cultivation Data
          </Button>
        </Box>
      </Box>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <Crop />
            </Avatar>
          }
          title="General Information"
        />
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Crop ID" secondary={project.cropId} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Crop Type" secondary={project.cropType} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Variety" secondary={project.variety} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText
                primary="Planting Date"
                secondary={new Date(project.plantingDate).toLocaleDateString()}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText
                primary="Expected Harvest Date"
                secondary={new Date(
                  project.expectedHarvestDate
                ).toLocaleDateString()}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Season" secondary={project.season} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          avatar={
            <Avatar>
              <LocationOn />
            </Avatar>
          }
          title="Field Information"
        />
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Field ID" secondary={project.fieldId} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText
                primary="Field Name"
                secondary={project.fieldName}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText
                primary="Field Size"
                secondary={`${project.fieldSize} hectares`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Soil Type" secondary={project.soilType} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText
                primary="Irrigation Type"
                secondary={project.irrigationType}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          avatar={
            <Avatar>
              <LocationOn />
            </Avatar>
          }
          title="Location Information"
        />
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary="Latitude" secondary={project.latitude} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary="Longitude" secondary={project.longitude} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          avatar={
            <Avatar>
              <Info />
            </Avatar>
          }
          title="Additional Information"
        />
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Farmer ID" secondary={project.farmerId} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText
                primary="Date Added"
                secondary={new Date(project.dateAdded).toLocaleDateString()}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <AddCultivationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        projectId={id}
      />
    </Container>
  );
}

export default ProjectPage;
