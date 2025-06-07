import React from "react";
import { useToggleItems } from "../hooks/useToggleItems";

const ToggleItem = () => {
  const [item, toggleItem] = useToggleItems(["A", "B", "C", "D"], 1);

  return (
    <div style={styles.container}>
      <h2>🔁 Toggle Items</h2>
      <p style={styles.item}>{item}</p>
      <button onClick={toggleItem}>Next</button>
    </div>
  );
};

const styles = {
  container: {
    background: "white",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  item: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
};

export default ToggleItem;
