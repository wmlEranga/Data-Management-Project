import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../config";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSignUp = async () => {
    setError(""); // Reset any previous error

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch(`${config.backendUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      // Check if the response contains specific data or status
      const data = await response.json();
      if (data.success) {
        // success message using react toastify
        toast.success("User signed up successfully!");
        navigate("/login");
      } else {
        throw new Error("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #56ab2f 30%, #a8e063 90%)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: { xs: "90%", sm: "400px" },
          }}
        >
          <Typography variant="h4" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4, color: "#777" }}>
            Please sign up to get started
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#a8e063",
              "&:hover": {
                backgroundColor: "#8dcf56",
              },
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ marginTop: 3 }}>
            Already have an account?{" "}
            <Link href="/login" sx={{ color: "#56ab2f", fontWeight: "bold" }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
