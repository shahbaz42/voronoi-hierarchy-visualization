import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EmployeeData from "./pages/employee-table";
import VoronoiVisualization from "./pages/vornoi-visualization";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoronoiVisualization />} />
        <Route path="/admin" element={<EmployeeData />} />
      </Routes>
    </Router>
  );
}

export default App;