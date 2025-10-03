import React from "react";
import "./App.css";
import { ThemeProvider,useTheme} from "./ThemeContext";

function ThemeToggleButton(){
  const {theme,toggleTheme}=useTheme();
  return (
    <button onClick={toggleTheme} className="toggle-btn">
      Switch to {theme==="light"?"Dark":"Light"} Mode
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Swapnil</h1>
        <ThemeToggleButton/>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat facilis tempora quae dolorum consequuntur! Minus laboriosam harum quasi, illo nisi in exercitationem neque quod tempora animi omnis cum temporibus pariatur?</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
