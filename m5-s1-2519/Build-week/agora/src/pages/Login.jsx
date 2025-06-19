// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // <-- Import the CSS

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setMessage("Login successful!");
      setMessageType("success");
      navigate("/");
    } catch (err) {
      setMessage("Wrong credentials! Try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-links">
          <p>
            New to Reddit? <a href="#">Sign Up</a>
          </p>
          <p>
            Forgot your <a href="#">username</a> or <a href="#">password</a>?
          </p>
          <p className="privacy-terms">
            By continuing, you agree to our <a href="#">User Agreement</a> and
            acknowledge that you understand the <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
