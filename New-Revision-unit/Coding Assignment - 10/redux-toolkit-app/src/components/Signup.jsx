import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          Signup
        </button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && <p>✅ Token: {token}</p>}
      {status === "failed" && <p style={{ color: "red" }}>❌ {error}</p>}
    </div>
  );
};

 
export default Signup;
