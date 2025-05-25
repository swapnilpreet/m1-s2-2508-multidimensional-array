import React, { useState } from 'react';

const ToggleButton = ({ label = '' }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(prev => !prev);
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: isOn ? '#d4f4dd' : '#fbdada',
    color: isOn ? 'green' : 'red',
    border: '2px solid',
    borderColor: isOn ? 'green' : 'red',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {label && <span style={{ marginRight: '1rem' }}>{label}</span>}
      <button onClick={toggle} style={buttonStyle}>
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default ToggleButton;
