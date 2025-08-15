import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
 const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if(!res.token){
        alert("error")
    }else{
        localStorage.setItem("token",res.token)
        console.log(res.token)
        window.location.href="/home"
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
