import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('Please fill in both email and password fields.');
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login Error:', err);
      setError('Failed to log in. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#202020] rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center">Sign In</h2>
        
        {error && (
          <div className="p-3 text-sm text-red-300 bg-red-900/50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#121212] border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#121212] border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold transition-colors ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Need an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}