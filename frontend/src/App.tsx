import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EmployeeData from "./pages/employee-table";
import VoronoiVisualization from "./pages/vornoi-visualization";
import EmployeeRegistration from "./pages/employee-registration";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<VoronoiVisualization />} />
          <Route path="/admin" element={<EmployeeData />} />
          <Route path="/register" element={<EmployeeRegistration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
