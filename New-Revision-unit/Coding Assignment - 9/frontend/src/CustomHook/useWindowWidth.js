import React, { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setwidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return width;
};

export default useWindowWidth;
