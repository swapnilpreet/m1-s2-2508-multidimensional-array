import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearAuthError } from '../../slices/authSlice.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import '../../styles/components.css'; // Import component-specific styles

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home if already logged in
    }
    // Clear error when component mounts or unmounts
    return () => {
      dispatch(clearAuthError());
    };
  }, [navigate, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      {isLoading && <LoadingSpinner />}
      {error && <p className="upload-message error">{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          Sign In
        </button>
      </form>
      <div className="my-md text-center">
        New Customer? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;