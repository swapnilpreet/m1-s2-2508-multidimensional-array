import React from 'react';
import LoginForm from '../components/auth/LoginForm.jsx';
import '../styles/pages.css'; // Assuming page-specific styles

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;