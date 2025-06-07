import { useState } from "react";

export const useToggleItems = (initialValue, initialPosition = 0) => {
  const [index, setIndex] = useState(initialPosition % initialValue.length);

  const toggleState = () => {
    setIndex((prevIndex) => (prevIndex + 1) % initialValue.length);
  };

  return [initialValue[index], toggleState];
};
