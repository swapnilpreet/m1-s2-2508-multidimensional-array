import { useState, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Login</button>
    </form>
  );
}
