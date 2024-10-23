import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
