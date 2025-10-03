import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      return setError("Passwords do not match.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Failed to create an account. The email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#202020] rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center">
          Create Account
        </h2>

        {error && (
          <div className="p-3 text-sm text-red-300 bg-red-900/50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#121212] border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#121212] border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#121212] border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold transition-colors ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
