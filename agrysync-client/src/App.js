import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import DiseaseIdentifier from "./page/Disease";
import YieldPrediction from "./page/Yield";
import LogIn from "./page/Login";
import SignUp from "./page/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />} />{" "}
          <Route path="/signup" element={<SignUp />} />
          {/* No need for Container */}
          <Route
            path="*"
            element={
              <>
                <Header /> {/* Use the Header component */}
                <Routes>
                  <Route path="/disease" element={<DiseaseIdentifier />} />
                  <Route path="/" element={<div>Home</div>} />
                  <Route path="/profile" element={<div>Profile</div>} />
                  <Route path="/yield" element={<YieldPrediction />} />
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
