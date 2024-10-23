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
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProjectName("");
    setError("");
  };

  const handleSave = () => {
    if (newProjectName.trim() === "") {
      setError("Project name is required.");
      return;
    }

    // Generate a new project ID (replace with API call if needed)
    const newProject = { id: projects.length + 1, name: newProjectName };

    // Add new project to the list
    setProjects([...projects, newProject]);

    // Redirect to the new project's page
    navigate(`/project/${newProject.id}`);

    // Close modal
    handleClose();
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
              onClick={handleOpen}
              startIcon={<AddCircleIcon />}
            >
              Add Project
            </Button>
          </Grid>
        </Grid>

        {/* Modal for adding new project */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400,
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add New Project
            </Typography>
            <TextField
              label="Project Name"
              fullWidth
              variant="outlined"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#56ab2f",
                "&:hover": { backgroundColor: "#8dcf56" },
                mt: 2,
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              fullWidth
              sx={{
                backgroundColor: "#ddd",
                mt: 2,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Home;
