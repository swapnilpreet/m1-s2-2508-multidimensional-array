// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import "../css/Breadcrumb.css";

// const Breadcrumb = ({ medicineName }) => {
//   const { id } = useParams();
// // const data=useParams();
// // console.log("data-params",data)
//   return (
//     <div className="breadcrumb">
//       <Link to="/">Home</Link>
//       <span> &gt; </span>
//       <Link to="/medicines">Medicines</Link>
//       <span> &gt; </span>
//       <span>{medicineName || id}</span>
//     </div>
//   );
// };

// export default Breadcrumb;

import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const BreadcrumbWrapper = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #555;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
`;

const Breadcrumb = ({ medicineName }) => {
  const { id } = useParams();

  return (
    <BreadcrumbWrapper>
      <StyledLink to="/">Home</StyledLink>
      <Separator>&gt;</Separator>
      <StyledLink to="/medicines">Medicines</StyledLink>
      <Separator>&gt;</Separator>
      <span>{medicineName || id}</span>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
