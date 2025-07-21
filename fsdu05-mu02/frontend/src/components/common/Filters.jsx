// import React from "react";
// import "../css/Filters.css";

// const Filters = ({
//   keyword,
//   setKeyword,
//   brand,
//   setBrand,
//   minPrice,
//   setMinPrice,
//   maxPrice,
//   setMaxPrice,
//   brandList,
//   onApply,
// }) => {
//   return (
//     <div>
//       <div className="filter-bar">
//         <input
//           type="text"
//           placeholder="Search medicine..."
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//         />

//         <select
//           value={brand}
//           onChange={(e) => setBrand(e.target.value)}
//         >
//           <option value="">All Brands</option>
//           {brandList.map((b, index) => (
//             <option key={index} value={b}>
//               {b}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           placeholder="Min Price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Max Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />

//         <button className="apply-btn" onClick={onApply}>
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filters;

import React from "react";
import styled from "styled-components";

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 1rem;
  background-color: #f9f9f9;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  transition: border 0.3s ease;

  &:focus {
    border-color: #0e7490; /* Tailwind cyan-700 */
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  transition: border 0.3s ease;

  &:focus {
    border-color: #0e7490;
    outline: none;
  }
`;

const ApplyButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Filters = ({
  keyword,
  setKeyword,
  brand,
  setBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  brandList,
  onApply,
}) => {
  return (
    <FilterBar>
      <Input
        type="text"
        placeholder="Search medicine..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="">All Brands</option>
        {brandList.map((b, index) => (
          <option key={index} value={b}>
            {b}
          </option>
        ))}
      </Select>

      <Input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <ApplyButton onClick={onApply}>Apply Filters</ApplyButton>
    </FilterBar>
  );
};

export default Filters;
