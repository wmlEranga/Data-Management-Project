// src/components/Header.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #4CAF50 30%, #8BC34A 100%)", // Gradient color for paddy
        boxShadow: "none", // Modern flat look without shadow
        height: "50px", // Fixed header height
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Space between title and menu buttons
          alignItems: "center", // Center all items vertically
          height: "100%", // Ensure the Toolbar takes the full height of AppBar
          padding: "0 16px", // Horizontal padding to align content
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            top: "-5px",
          }}
        >
          Paddy Farming App
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              fontSize: "0.875rem",
              padding: "0 16px",
              display: "flex",
              alignItems: "center", // Center button text vertically
              height: "50px", // Make button height match AppBar
              textTransform: "none", // Disable uppercase transformation
              top: "-5px",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/disease"
            color="inherit"
            sx={{
              fontSize: "0.875rem",
              padding: "0 16px",
              display: "flex",
              alignItems: "center", // Center button text vertically
              height: "50px",
              textTransform: "none",
              top: "-5px",
            }}
          >
            Disease Identifier
          </Button>
          <Button
            component={Link}
            to="/yield"
            color="inherit"
            sx={{
              fontSize: "0.875rem",
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              height: "50px",
              textTransform: "none",
              top: "-5px",
            }}
          >
            Yield Prediction
          </Button>
          <IconButton
            component={Link}
            to="/profile"
            color="inherit"
            sx={{
              padding: 0, // Remove padding for compactness
              display: "flex",
              alignItems: "center", // Vertically center the icon
              height: "50px", // Make the button take the full header height
              position: "relative",
              top: "-5px", // Move the icon 10px up
            }}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
