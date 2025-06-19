import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1003);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1003) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isOpen && (
        <ul className="sidebar-items">
          <li onClick={() => navigate("/")}>🏠 Home</li>
          <li>🔥 Popular</li>
          <li>❓ Answers</li>
          <li onClick={() => navigate("/explore")}>🔍 Explore</li>
          <li>📚 All</li>
          <hr />
          <li>+ Create a custom feed</li>
          <li onClick={() => navigate("/createpost")}>+ Create a community</li>
          <hr />
          <li>ℹ️ About Reddit</li>
          <li>📢 Advertise</li>
          <li>📈 Reddit Pro</li>
          <li>🆘 Help</li>
          <hr />
          <li>📰 Blog</li>
          <li>💼 Careers</li>
          <li>🗞️ Press</li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
