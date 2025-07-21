// import React from "react";
// import "../css/MedicineLoader.css";
// import { FaCapsules } from "react-icons/fa"; // medicine icon

// const MedicineLoader = ({ loading }) => {
//   if (!loading) return null;

//   return (
//     <div className="medicine-loader">
//       <FaCapsules className="loader-icon" />
//       <span className="loader-text">Searching medicines...</span>
//     </div>
//   );
// };

// export default MedicineLoader;


import React from "react";
import styled, { keyframes } from "styled-components";
import { FaCapsules } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #0a3d62;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const LoaderIcon = styled(FaCapsules)`
  font-size: 22px;
  color: #0066c3;
  animation: ${spin} 1s linear infinite;
`;

const LoaderText = styled.span`
  font-size: 16px;
`;

const MedicineLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <LoaderWrapper>
      <LoaderIcon />
      <LoaderText>Searching medicines...</LoaderText>
    </LoaderWrapper>
  );
};

export default MedicineLoader;
