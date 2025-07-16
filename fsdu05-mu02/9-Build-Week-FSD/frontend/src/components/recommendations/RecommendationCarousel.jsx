import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonalizedRecommendations } from '../../slices/recommendationSlice.js';
import ProductCard from '../products/ProductCard.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import '../../styles/components.css'; // Import component-specific styles

const RecommendationCarousel = () => {
  const dispatch = useDispatch();
  const { recommendations, isLoading, error } = useSelector((state) => state.recommendations);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchPersonalizedRecommendations());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="upload-message error text-center">Failed to load recommendations: {error}</p>;
  }

  if (!recommendations || recommendations.length === 0) {
    return <p className="text-center">No recommendations available at the moment.</p>;
  }

  const itemsPerPage = 3; // Number of items to show at once
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const startIndex = currentIndex * itemsPerPage;
  const visibleRecommendations = recommendations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="recommendation-carousel">
      <h3 className="text-center">Personalized Recommendations</h3>
      <div className="carousel-controls">
        <button onClick={handlePrev} disabled={totalPages <= 1} className="carousel-btn">
          &#9664; {/* Left arrow */}
        </button>
        <div className="carousel-items">
          {visibleRecommendations.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <button onClick={handleNext} disabled={totalPages <= 1} className="carousel-btn">
          &#9654; {/* Right arrow */}
        </button>
      </div>
      {totalPages > 1 && (
        <div className="carousel-dots">
          {[...Array(totalPages).keys()].map((dotIndex) => (
            <span
              key={dotIndex}
              className={`dot ${dotIndex === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(dotIndex)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationCarousel;