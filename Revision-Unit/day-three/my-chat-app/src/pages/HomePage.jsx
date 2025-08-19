import React from "react";

function HomePage({ goNext }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to My App</h1>
      <p>This is Home Page.</p>
      <button onClick={goNext}>Go to Nested Input Page</button>
    </div>
  );
}

export default HomePage;
