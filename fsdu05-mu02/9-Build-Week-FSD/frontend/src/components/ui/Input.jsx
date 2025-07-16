import React from 'react';
import '../../styles/components.css'; // Import component-specific styles

const Input = ({ label, id, type = 'text', value, onChange, placeholder, required, className = '' }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input-field ${className}`}
      />
    </div>
  );
};

export default Input;