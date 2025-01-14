import React, { useState } from "react";
import { Button, TextField, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Make sure you have backendUrl in config

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset the error before the login attempt

    try {
      const response = await fetch(`${config.backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: ensures cookies (token) are sent and received
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        //save userid in session storage
        const data = await response.json();
        sessionStorage.setItem("userId", data.userId);
        // Login successful, redirect to the home page

        navigate("/");
      } else if (response.status === 401) {
        // Unauthorized - wrong credentials
        setError("Invalid email or password.");
      } else {
        // Some other error occurred
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw", // Full screen width
        height: "100vh", // Full screen height
        background: "linear-gradient(135deg, #56ab2f 30%, #a8e063 90%)",
        overflow: "hidden", // Prevent scrolling if content exceeds screen size
      }}
    >
      <Box
        sx={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: { xs: "90%", sm: "400px" }, // Responsive design
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, color: "#777" }}>
          Please log in to your account
        </Typography>
        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          sx={{ marginBottom: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
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
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ marginTop: 3 }}>
          Don't have an account?{" "}
          <Link href="/signup" sx={{ color: "#56ab2f", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LogIn;
