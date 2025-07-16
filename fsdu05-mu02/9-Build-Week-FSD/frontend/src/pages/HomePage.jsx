import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages.css'; // Assuming you might have page-specific styles

const HomePage = () => {
  return (
    <div className="home-page text-center">
      <h1>Welcome to Online Pharmacy</h1>
      <p>Your health, delivered to your door.</p>
      <div className="home-actions my-md">
        <Link to="/products" className="btn btn-primary">
          Shop Medicines
        </Link>
        <Link to="/prescription-upload" className="btn btn-secondary" style={{ marginLeft: 'var(--spacing-md)' }}>
          Upload Prescription
        </Link>
      </div>
      {/* Placeholder for AI Recommendations Carousel */}
      <section className="recommendations-section my-xl">
        <h2>Recommended for You</h2>
        <p>Based on your browsing history and preferences.</p>
        {/* <RecommendationCarousel /> This component would go here */}
        <div className="product-grid">
          {/* Dummy recommendation cards */}
          <div className="product-card">
            <img src="https://placehold.co/400x300/E0F7FA/000?text=Recommended+1" alt="Recommended Product" className="product-card-image" />
            <h3 className="product-card-title">Recommended Medicine A</h3>
            <p className="product-card-price">$9.99</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://placehold.co/400x300/FFF3E0/000?text=Recommended+2" alt="Recommended Product" className="product-card-image" />
            <h3 className="product-card-title">Recommended Medicine B</h3>
            <p className="product-card-price">$14.50</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;