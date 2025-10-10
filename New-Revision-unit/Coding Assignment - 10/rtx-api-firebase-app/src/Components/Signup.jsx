import React, { useState } from "react";
import { useAuth } from "./useAuth";

const Signup = () => {
  const { signupUser } = useAuth();
  
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(email, password, displayName);
      alert("Signup successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem",border:"1px solid gray" }}>
      <h3>Signup</h3>
      <input
        placeholder="Name"
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
