import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AddEditBook from "./pages/AddEditBooks";
import Login from "./pages/login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <Router>
      <Navbar token={token} setToken={setToken} role={role} />
      <Routes>
        <Route path="/" element={<Home token={token} role={role} />} />
        <Route path="/add" element={<AddEditBook token={token} />} />
        <Route path="/edit/:id" element={<AddEditBook token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
      </Routes>
    </Router>
  );
}

export default App;