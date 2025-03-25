/*
function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("https://localhost:5001/logout", {
        method: "POST",
        credentials: "include", // Send the cookie to clear it on the backend
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
*/
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddProjectModal from "../components/AddProjectModal";
import config from "../config";
// Dummy data for projects (replace with real data from API or state)

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
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Projects
        </Typography>
        <Grid container spacing={3}>
          {/* List existing projects */}
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#56ab2f", // Green theme
                  "&:hover": { backgroundColor: "#8dcf56" },
                }}
                onClick={() => navigate(`/project/${project.cropId}`)}
              >
                {project.cropId + " - " + project.fieldName}
              </Button>
            </Grid>
          ))}

          {/* Add new project button */}
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#a8e063",
                "&:hover": { backgroundColor: "#8dcf56" },
              }}
              onClick={handleOpenModal}
              startIcon={<AddCircleIcon />}
            >
              Add Project
            </Button>
          </Grid>
        </Grid>

        {/* Modal for adding new project */}
        <AddProjectModal
          open={openModal}
          handleClose={handleCloseModal}
          onSave={handleSaveProject}
        />
      </Box>
    </Container>
  );
}

export default Home;
