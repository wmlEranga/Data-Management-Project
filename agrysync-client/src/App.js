import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiseaseIdentifier from "./page/Disease";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Routes>
          <Route path="/disease" element={<DiseaseIdentifier />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
