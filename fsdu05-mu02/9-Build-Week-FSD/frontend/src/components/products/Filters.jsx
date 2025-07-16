import React from 'react';
import '../../styles/components.css'; // Import component-specific styles

const Filters = ({ category, brand, minPrice, maxPrice, onFilterChange }) => {
  return (
    <aside className="filters-section">
      <h4>Filters</h4>
      <div className="filter-group">
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={(e) => onFilterChange('category', e.target.value)}>
          <option value="">All</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Cough & Cold">Cough & Cold</option>
          <option value="Vitamins & Supplements">Vitamins & Supplements</option>
          <option value="Digestive Health">Digestive Health</option>
          <option value="First Aid">First Aid</option>
          <option value="Allergy & Asthma">Allergy & Asthma</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Medical Devices">Medical Devices</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          placeholder="e.g., Generic Pharma"
          value={brand}
          onChange={(e) => onFilterChange('brand', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
        />
      </div>
    </aside>
  );
};

export default Filters;









// // In ProductsPage.jsx
// import Filters from '../components/products/Filters.jsx';

// const ProductsPage = () => {
//   // ... existing state and useEffect ...

//   // Pass filter state and handler to Filters component
//   return (
//     <div className="products-page">
//       {/* ... SearchBar ... */}
//       <div className="products-content">
//         <Filters
//           category={category}
//           brand={brand}
//           minPrice={minPrice}
//           maxPrice={maxPrice}
//           onFilterChange={handleFilterChange}
//         />
//         {/* ... product list ... */}
//       </div>
//     </div>
//   );
// };