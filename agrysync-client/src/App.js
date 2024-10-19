// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import DiseaseIdentifier from "./page/Disease";
import { Container } from "@mui/material";
import YieldPrediction from "./page/Yield";

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Use the Header component */}
        <Container sx={{ paddingTop: 2 }}>
          <Routes>
            <Route path="/disease" element={<DiseaseIdentifier />} />
            {/* Add routes for Home, Yield Prediction, and Profile here */}
            <Route path="/" element={<div>Home</div>} />

            <Route path="/profile" element={<div>Profile</div>} />
            {/* Add routes for harvest yield prediction */}
            <Route path="/yield" element={<YieldPrediction />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
