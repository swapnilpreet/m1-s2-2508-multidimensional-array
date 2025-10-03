import React from "react";
import { useTheme } from "../Authcontext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        margin: "20px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "none",
        backgroundColor: theme === "light" ? "#333" : "#ddd",
        color: theme === "light" ? "#fff" : "#000",
      }}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggleButton;
