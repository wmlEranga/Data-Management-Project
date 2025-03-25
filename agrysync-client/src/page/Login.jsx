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
          sx={{
            marginBottom: 2.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5B86E5",
              },
            },
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          sx={{
            marginBottom: 2.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5B86E5",
              },
            },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            marginTop: 2.5,
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
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ marginTop: 4 }}>
          Don't have an account?{" "}
          <Link
            href="/signup"
            sx={{
              color: "#5B86E5",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LogIn;
