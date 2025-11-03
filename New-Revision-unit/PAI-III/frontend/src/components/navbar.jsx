import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken, role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {role === "admin" && <Link to="/add">Add Book</Link>}
      <Link to="/about">About</Link>
      {!token ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}