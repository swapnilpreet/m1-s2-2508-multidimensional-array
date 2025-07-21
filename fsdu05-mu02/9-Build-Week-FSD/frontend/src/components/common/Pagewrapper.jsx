// import React from 'react'
// import '../css/Pagewrapper.css'
// const Pagewrapper = ({children}) => {
//   return (
//     <div className='page-wrapper'>{children}</div>
//   )
// }

// export default Pagewrapper

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid red;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  padding-bottom: 30px;

  @media (max-width: 768px) {
    padding: 0 15px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    padding-top: 20px;
    padding-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const Pagewrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Pagewrapper;
