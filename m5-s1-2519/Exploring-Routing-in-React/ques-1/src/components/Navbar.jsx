import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
  return (
    <nav style={{padding:"12px",borderBottom:"1px solid #ccc"}}>
      <Link to="/" style={{ marginRight: "12px" }}>
        Home
      </Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Navbar;
