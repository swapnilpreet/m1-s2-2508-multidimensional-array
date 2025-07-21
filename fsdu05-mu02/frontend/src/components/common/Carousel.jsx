// import React, { useEffect, useState } from "react";
// import "../css/Carousel.css";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const slides = [
//   {
//     heading: "Celebrate Cetaphil day with sensitive SKIN EXPERT",
//     image:
//       "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-7_hl1n6t.avif",
//     bgColor: "#95befd",
//   },
//   {
//     heading: "UPGRADE your bedroom essentials",
//     image:
//       "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/banner-1_ejikgc.avif",
//     bgColor: "#ede7f6",
//   },
//   {
//     heading: "Vitamin combos for immunity boost",
//     image:
//       "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-3_nbi4ki.avif",
//     bgColor: "#f3e5f5",
//   },
//   {
//     heading: "UPGRADE your bedroom essentials",
//     image:
//       "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-4_g9ep4j.avif",
//     bgColor: "#ede7f6",
//   },
//   {
//     heading: "Vitamin combos for immunity boost",
//     image:
//       "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-2_lgm7rv.avif",
//     bgColor: "#f3e5f5",
//   },
//   {
//     heading: "Vitamin combos for immunity boost",
//     image:
//       "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-6_tdehmn.avif",
//     bgColor: "#f3e5f5",
//   },
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const goToPrevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
//     );
//   };

//   const visibleSlides = isMobile ? [0] : [0, 1];

//   return (
//     <div className="carousel-container">
//       <div className="carousel-wrapper">
//         <button className="arrow left" onClick={goToPrevSlide}>
//           <FaChevronLeft />
//         </button>

//         <div className="carousel-slide-group">
//           {visibleSlides.map((offset) => {
//             const index = (currentIndex + offset) % slides.length;
//             const slide = slides[index];
//             return (
//               <div
//                 className="carousel-card"
//                 key={index}
//                 style={{ backgroundColor: slide.bgColor }}
//               >
//                 <h3 className="carousel-heading">{slide.heading}</h3>
//                 <img
//                   src={slide.image}
//                   alt="Slide"
//                   className="carousel-image"
//                 />
//               </div>
//             );
//           })}
//         </div>

//         <button className="arrow right" onClick={goToNextSlide}>
//           <FaChevronRight />
//         </button>
//       </div>

//       <div className="carousel-dots">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentIndex ? "active" : ""}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    heading: "Celebrate Cetaphil day with sensitive SKIN EXPERT",
    image: "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-7_hl1n6t.avif",
    bgColor: "#95befd",
  },
  {
    heading: "UPGRADE your bedroom essentials",
    image: "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/banner-1_ejikgc.avif",
    bgColor: "#ede7f6",
  },
  {
    heading: "Vitamin combos for immunity boost",
    image: "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-3_nbi4ki.avif",
    bgColor: "#f3e5f5",
  },
  {
    heading: "UPGRADE your bedroom essentials",
    image: "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-4_g9ep4j.avif",
    bgColor: "#ede7f6",
  },
  {
    heading: "Vitamin combos for immunity boost",
    image: "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-2_lgm7rv.avif",
    bgColor: "#f3e5f5",
  },
  {
    heading: "Vitamin combos for immunity boost",
    image: "https://res.cloudinary.com/dejqyvuqj/image/upload/v1752867056/Banner-6_tdehmn.avif",
    bgColor: "#f3e5f5",
  },
];

// Styled Components
const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto;
  position: relative;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SlideGroup = styled.div`
  display: flex;
  gap: 1rem;
  overflow: hidden;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const SlideCard = styled.div`
  flex: 0 0 48%;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: transform 0.5s ease;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const SlideHeading = styled.h3`
  font-size: 1.2rem;
  margin: 1rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 0 16px 16px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 50%;
  border: 2px solid #ccc;
  padding: 0.6rem;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &.left {
    left: -10px;

    @media (max-width: 768px) {
      left: 0;
    }
  }

  &.right {
    right: -10px;

    @media (max-width: 768px) {
      right: 0;
    }
  }
`;

const DotsContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const Dot = styled.span`
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "#ccc")};
  border-radius: 50%;
  transition: background 0.3s;
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const visibleSlides = isMobile ? [0] : [0, 1];

  return (
    <CarouselContainer>
      <CarouselWrapper>
        <ArrowButton className="left" onClick={goToPrevSlide}>
          <FaChevronLeft />
        </ArrowButton>

        <SlideGroup>
          {visibleSlides.map((offset) => {
            const index = (currentIndex + offset) % slides.length;
            const slide = slides[index];
            return (
              <SlideCard key={index} style={{ backgroundColor: slide.bgColor }}>
                <SlideHeading>{slide.heading}</SlideHeading>
                <SlideImage src={slide.image} alt="Slide" />
              </SlideCard>
            );
          })}
        </SlideGroup>

        <ArrowButton className="right" onClick={goToNextSlide}>
          <FaChevronRight />
        </ArrowButton>
      </CarouselWrapper>

      <DotsContainer>
        {slides.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default Carousel;

