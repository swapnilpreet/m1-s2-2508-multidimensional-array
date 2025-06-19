// src/components/layouts/ProtectedLayout.jsx
import React from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../Sidebar";
import "../../styles/HomePage.css";

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default ProtectedLayout;
