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
import React, { useState } from "react";
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

// Dummy data for projects (replace with real data from API or state)
const initialProjects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Project Beta" },
];

function Home() {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProjectName("");
    setError("");
  };

  const handleSaveProject = (newProject) => {
    // Assuming you have an API to handle the project creation
    fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects([...projects, data]); // Add new project to the list
      })
      .catch((error) => console.error("Error adding project:", error));
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
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {project.name}
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
