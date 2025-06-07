import React from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Timer from "./components/Timer";
import ToggleItem from "./components/ToggleItem";

const App = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Custom Hooks Demo</h1>
      <LoginForm />
      <hr />
      <SignupForm />
      <hr />
      <Timer />
      <hr />
      <ToggleItem />
    </div>
  );
};

export default App;
