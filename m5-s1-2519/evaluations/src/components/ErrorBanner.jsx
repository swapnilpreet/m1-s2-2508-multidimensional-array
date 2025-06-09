import React from "react";
import { useSelector } from "react-redux";

const ErrorBanner = () => {
  const { error } = useSelector((state) => state.pokemon);
  return <div>Error-Banner {error}</div>;
};

export default ErrorBanner;
