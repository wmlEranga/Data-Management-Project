import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddProjectModal from "../components/AddProjectModal";
import FolderIcon from "@mui/icons-material/Folder";
import config from "../config";

function Home() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProjectName("");
    setError("");
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${config.backendUrl}/project/get-projects/${userId}`
      );
      const data = await response.json();
      if (data && data.$values) {
        setProjects(data.$values);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId, refreshTrigger]);

  const handleSaveProject = (newProject) => {
    console.log("Saving project:", newProject);

    // Use the correct API endpoint
    fetch(`${config.backendUrl}/project/add-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if there's content to parse
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          // If no JSON, just return a success object
          return { success: true };
        }
      })
      .then((response) => {
        console.log("Project added successfully:", response);
        handleCloseModal();
        // Update the refresh trigger to fetch updated projects list
        setRefreshTrigger((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        alert("Failed to add project. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "calc(100vh - 50px)",
        backgroundColor: "#f5f8ff",
        paddingTop: 5,
        paddingBottom: 5,
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
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#5B86E5",
                mb: 1,
              }}
            >
              My Projects
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your paddy farming projects
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* List existing projects */}
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 24px rgba(91, 134, 229, 0.2)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/project/${project.cropId}`)}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <CardContent sx={{ width: "100%", padding: 2.5 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <FolderIcon
                          sx={{ color: "#5B86E5", mr: 1, fontSize: 28 }}
                        />
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 600 }}
                        >
                          {project.fieldName}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          backgroundColor: "rgba(91, 134, 229, 0.1)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          display: "inline-block",
                        }}
                      >
                        ID: {project.cropId}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}

            {/* Add new project button */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: "12px",
                  height: "100%",
                  border: "2px dashed rgba(91, 134, 229, 0.3)",
                  backgroundColor: "rgba(91, 134, 229, 0.02)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(91, 134, 229, 0.05)",
                    transform: "translateY(-5px)",
                  },
                  boxShadow: "none",
                  minHeight: "120px",
                }}
              >
                <CardActionArea
                  onClick={handleOpenModal}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <AddCircleIcon
                    sx={{
                      fontSize: 40,
                      color: "#5B86E5",
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      fontWeight: 500,
                      color: "#5B86E5",
                    }}
                  >
                    Add New Project
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Modal for adding new project */}
        <AddProjectModal
          open={openModal}
          handleClose={handleCloseModal}
          onSave={handleSaveProject}
        />
      </Container>
    </Box>
  );
}
export default Home;
