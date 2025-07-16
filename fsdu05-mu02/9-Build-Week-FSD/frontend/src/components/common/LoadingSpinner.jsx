import React from 'react';
import '../../styles/components.css'; // Import component-specific styles

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;