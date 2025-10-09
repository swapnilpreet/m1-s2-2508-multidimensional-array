import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && <p>✅ Token: {token}</p>}
      {status === "failed" && <p>❌ {error}</p>}
    </div>
  );
};


export default Login;
