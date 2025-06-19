import React from "react";
import "../../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">reddit</div>
      <input type="text" className="search" placeholder="Search Reddit"/>
      <div className="nav-icons">
        <button> + </button>
        <button>🔔</button>
        <button>👤</button>
      </div>
    </nav>
  );
};

export default Navbar;