import React, { useState } from 'react'
import { loginUser } from '../api';

const Login = () => {
   const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const res = await loginUser(email, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      window.location.href = "/forecast"
    } else {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="p-6 border rounded w-80 mx-auto mt-10 shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 w-full rounded">
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Login