import React from "react";

const ThemeToggle = React.memo(function ThemeToggle({ themeValue, onChangeTheme }) {
  return (
    <button
      className="theme-btn"
      onClick={() => onChangeTheme(themeValue === "dark" ? "light" : "dark")}
    >
      Theme: {themeValue === "dark" ? "Dark" : "Light"}
    </button>
  );
});

export default ThemeToggle;
