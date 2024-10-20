import React from "react";
import { Button, Container, TextField, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    navigate("/");
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
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
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
