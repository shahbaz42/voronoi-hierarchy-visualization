import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EmployeeData from "./pages/employee-table";
import VoronoiVisualization from "./pages/vornoi-visualization";
import EmployeeRegistration from "./pages/employee-registration";
import PrivateRoute from "./components/PrivateRoute";
import AuthenticationPage from "./pages/login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<VoronoiVisualization />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={<EmployeeData />} />}
        />
        <Route
          path="/register"
          element={<PrivateRoute element={<EmployeeRegistration />} />}
        />
        <Route path="login" element={<AuthenticationPage />} />
      </Routes>
    </div>
  );
}

export default App;
