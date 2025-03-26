// src/components/Header.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import BiotechIcon from "@mui/icons-material/Biotech";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Added Dashboard icon
import config from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const isActive = (path) => location.pathname === path;

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${config.backendUrl}/login/logout`, {
        method: "POST",
        credentials: "include", // Send the cookie to clear it on the backend
      });

      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleNavigateToProfile = () => {
    handleProfileClose();
    navigate("/profile");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
        boxShadow: "0 4px 16px rgba(91,134,229,0.16)",
        borderRadius: "0 0 12px 12px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: "60px", // Increased height slightly
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#ffffff",
              letterSpacing: "0.5px",
              mr: 2,
            }}
          >
            AgrySync
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Tooltip title="Home">
            <Button
              component={Link}
              to="/"
              color="inherit"
              startIcon={<HomeIcon />}
              sx={{
                fontSize: "0.875rem",
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                textTransform: "none",
                transition: "all 0.2s ease",
                backgroundColor: isActive("/")
                  ? "rgba(255, 255, 255, 0.15)"
                  : "transparent",
                fontWeight: isActive("/") ? 600 : 400,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Home
            </Button>
          </Tooltip>

          {/* Added Dashboard Button */}
          <Tooltip title="Dashboard">
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
              startIcon={<DashboardIcon />}
              sx={{
                fontSize: "0.875rem",
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                textTransform: "none",
                transition: "all 0.2s ease",
                backgroundColor: isActive("/dashboard")
                  ? "rgba(255, 255, 255, 0.15)"
                  : "transparent",
                fontWeight: isActive("/dashboard") ? 600 : 400,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Dashboard
            </Button>
          </Tooltip>

          <Tooltip title="Disease Identifier">
            <Button
              component={Link}
              to="/disease"
              color="inherit"
              startIcon={<BiotechIcon />}
              sx={{
                fontSize: "0.875rem",
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                textTransform: "none",
                transition: "all 0.2s ease",
                backgroundColor: isActive("/disease")
                  ? "rgba(255, 255, 255, 0.15)"
                  : "transparent",
                fontWeight: isActive("/disease") ? 600 : 400,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Disease Identifier
            </Button>
          </Tooltip>

          <Tooltip title="Yield Prediction">
            <Button
              component={Link}
              to="/yield"
              color="inherit"
              startIcon={<AssessmentIcon />}
              sx={{
                fontSize: "0.875rem",
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                textTransform: "none",
                transition: "all 0.2s ease",
                backgroundColor: isActive("/yield")
                  ? "rgba(255, 255, 255, 0.15)"
                  : "transparent",
                fontWeight: isActive("/yield") ? 600 : 400,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Yield Prediction
            </Button>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              onClick={handleProfileClick}
              color="inherit"
              sx={{
                padding: "8px",
                ml: 1,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.5)",
                }}
              >
                <AccountCircleIcon fontSize="small" />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                borderRadius: "8px",
                minWidth: "180px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <MenuItem onClick={handleNavigateToProfile} sx={{ py: 1.5 }}>
              <AccountCircleIcon
                fontSize="small"
                sx={{ mr: 1.5, color: "#5B86E5" }}
              />
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1.5, color: "#5B86E5" }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
