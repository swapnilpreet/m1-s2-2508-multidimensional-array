import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, clearAuthError } from '../../slices/authSlice.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import '../../styles/components.css'; // Import component-specific styles

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home if already logged in
    }
    // Clear error and message when component mounts or unmounts
    return () => {
      dispatch(clearAuthError());
      setMessage('');
    };
  }, [navigate, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {isLoading && <LoadingSpinner />}
      {error && <p className="upload-message error">{error}</p>}
      {message && <p className="upload-message error">{message}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          Register
        </button>
      </form>
      <div className="my-md text-center">
        Have an Account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;