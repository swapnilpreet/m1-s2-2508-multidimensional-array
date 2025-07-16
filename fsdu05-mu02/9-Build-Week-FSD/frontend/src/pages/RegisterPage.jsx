import React from 'react';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import '../styles/pages.css' // Assuming page-specific styles

const RegisterPage = () => {
  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;