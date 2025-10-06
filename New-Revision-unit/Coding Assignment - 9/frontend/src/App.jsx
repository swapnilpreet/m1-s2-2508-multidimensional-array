import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import useWindowWidth from "./CustomHook/useWindowWidth";
import APIFetch from "./components/APIFetch";

function App() {
  const width = useWindowWidth();
  const [theme, setTheme] = useState("light");
  const [resizing, setResizing] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setResizing(true);
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setResizing(false), 1000);
    setTimeoutId(id);
  }, [width]);

  return (
    <>
      <div className={`${theme === "light" ? "light" : "dark"}`}>
        <Counter />
        <h2>Current width:{width}</h2>
        {width < 768 && "📱 Mobile View"}
        {width > 768 && width < 1024 && "Tablet View"}
        {1024 <= width && "💻 Desktop View"}
         {resizing && <p style={{ color: "tomato", marginTop: "10px" }}>Resizing...</p>}
        <button
          onClick={toggleTheme}
          style={{
            width: "30%",
            padding: "15px",
            cursor: "pointer",
            backgroundColor: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
            transition: "all 0.3s ease",
          }}
        >
          Toggle Theme
        </button>
        <APIFetch/>
      </div>
    </>
  );
}

export default App;
