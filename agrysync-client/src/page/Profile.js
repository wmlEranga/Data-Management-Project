import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Alert,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import config from "../config";

function Profile() {
  const [profile, setProfile] = useState({
    farmerName: "",
    farmerEmail: "",
    farmerAddress: "",
    farmerContact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get userId from sessionStorage
        const userId = sessionStorage.getItem("userId");

        if (!userId) {
          setError("User ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${config.backendUrl}/api/Profile?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile data");
        setLoading(false);
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get userId from sessionStorage
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        setError("User ID not found. Please login again.");
        return;
      }

      const response = await fetch(
        `${config.backendUrl}/api/Profile?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccess("Profile updated successfully");
      setIsEditing(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile");
      console.error("Error updating profile:", err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading profile data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Farmer Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Card elevation={3}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="farmerName"
                  value={profile.farmerName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="farmerEmail"
                  type="email"
                  value={profile.farmerEmail || ""}
                  disabled={true} // Email cannot be edited
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="farmerAddress"
                  value={profile.farmerAddress || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="farmerContact"
                  value={profile.farmerContact || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                {isEditing ? (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<Save />}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                      startIcon={<Cancel />}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                    startIcon={<Edit />}
                  >
                    Edit Profile
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;
