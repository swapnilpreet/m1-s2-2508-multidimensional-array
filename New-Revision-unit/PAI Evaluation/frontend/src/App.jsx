import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import AddEditCourse from "./pages/AddEditCourse";
import { AuthProvider } from "./context/authcontext";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/add-course" element={<AddEditCourse />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
