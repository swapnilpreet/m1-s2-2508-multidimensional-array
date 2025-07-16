import React from 'react';
import '../../styles/components.css'; // Import component-specific styles

const Button = ({ children, variant = 'primary', onClick, disabled, type = 'button', className = '' }) => {
  const buttonClass = `btn btn-${variant} ${className}`;
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;