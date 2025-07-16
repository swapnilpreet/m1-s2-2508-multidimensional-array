import React from 'react';
import '../../styles/components.css'; // Import component-specific styles

const Select = ({ label, id, value, onChange, options, required, className = '' }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`select-field ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;