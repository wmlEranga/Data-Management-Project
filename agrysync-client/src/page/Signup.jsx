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
          background: "linear-gradient(135deg, #5B86E5 30%, #36D1DC 90%)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            width: { xs: "90%", sm: "420px" },
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "#3a3a3a",
            }}
          >
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
            sx={{
              marginBottom: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5B86E5",
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5B86E5",
                },
              },
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              marginBottom: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5B86E5",
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
              backgroundColor: "#5B86E5",
              boxShadow: "0 4px 15px rgba(91, 134, 229, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#4A75D3",
                boxShadow: "0 6px 20px rgba(91, 134, 229, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ marginTop: 4 }}>
            Already have an account?{" "}
            <Link
              href="/login"
              sx={{
                color: "#5B86E5",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
