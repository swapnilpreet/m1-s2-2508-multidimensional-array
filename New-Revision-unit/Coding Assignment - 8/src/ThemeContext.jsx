import React, { createContext, useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
