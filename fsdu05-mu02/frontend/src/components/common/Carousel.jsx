import { useEffect, useRef, useState } from "react";
import "../css/Carousel.css";
import Pagewrapper from "./Pagewrapper";
const Carousel = ({ images, interval = 3000 }) => {
  // State to keep track of the starting index for the currently displayed pair of images
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  // Ref to store the interval ID for autoplay, allowing it to be cleared
  const autoplayRef = useRef(null);

  // Function to determine if the screen is mobile based on a breakpoint
  const isMobile = () => window.innerWidth <= 768;

  // Function to move to the next set of images
  const goToNext = () => {
    setCurrentStartIndex((prevIndex) => {
      // If mobile, advance by 1 image; otherwise, advance by 2
      const step = isMobile() ? 1 : 2;
      return (prevIndex + step) % images.length;
    });
  };

  // Function to move to the previous set of images
  const goToPrev = () => {
    setCurrentStartIndex((prevIndex) => {
      // If mobile, move back by 1 image; otherwise, move back by 2
      const step = isMobile() ? 1 : 2;
      const newIndex = prevIndex - step;
      return newIndex < 0 ? images.length + newIndex : newIndex;
    });
  };

  // Effect hook for autoplay functionality
  useEffect(() => {
    // Set up the interval for autoplay
    autoplayRef.current = setInterval(goToNext, interval);

    // Cleanup function: clear the interval when the component unmounts or dependencies change
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [images.length, interval]); // Dependencies: re-run effect if image count or interval changes

  // Function to reset the autoplay timer when a user interacts with the slider (e.g., clicks arrows)
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(goToNext, interval);
  };

  // Calculate the indices of the images to display
  const firstImageIndex = currentStartIndex;
  const secondImageIndex = (currentStartIndex + 1) % images.length;

  // Handle "Buy More" button click for a specific image
  const handleBuyMore = (imageIndex) => {
    console.log(`Buy More button clicked for Image ${imageIndex + 1}!`);
    console.log("Buy More functionality would be implemented here!");
  };

  return (
    <>
      <div className="slider-container">
        <button
          className="slider-arrow left-arrow"
          onClick={() => {
            goToPrev();
            resetAutoplay();}}>
          &lt;
        </button>
        <div className="image-display-area">
          <div className="image-wrapper">
            <img
              src={images[firstImageIndex].src}
              alt={images[firstImageIndex].alt}
              className="slider-image"
            />
            <button
              className="buy-more-button"
              onClick={() => handleBuyMore(firstImageIndex)}
            >
              Buy More
            </button>
          </div>
          {/* The second image wrapper is conditionally rendered for non-mobile screens */}
          {!isMobile() && (
            <div className="image-wrapper">
              <img
                src={images[secondImageIndex].src}
                alt={images[firstImageIndex].alt}
                className="slider-image"
              />
              <button
                className="buy-more-button"
                onClick={() => handleBuyMore(secondImageIndex)}
              >
                Buy More
              </button>
            </div>
          )}
        </div>
        <button
          className="slider-arrow right-arrow"
          onClick={() => {
            goToNext();
            resetAutoplay();
          }}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default Carousel;
