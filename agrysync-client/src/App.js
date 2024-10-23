import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import DiseaseIdentifier from "./page/Disease";
import YieldPrediction from "./page/Yield";
import LogIn from "./page/Login";
import SignUp from "./page/Signup";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* No need for Container */}
          <Route
            path="*"
            element={
              <>
                <Header /> {/* Use the Header component */}
                <Routes>
                  {/* Protected routes */}
                  <Route
                    path="/disease"
                    element={
                      <ProtectedRoute>
                        <DiseaseIdentifier />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/yield"
                    element={
                      <ProtectedRoute>
                        <YieldPrediction />
                      </ProtectedRoute>
                    }
                  />

                  {/* Public routes */}
                  <Route path="/" element={<div>Home</div>} />
                  <Route path="/profile" element={<div>Profile</div>} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
