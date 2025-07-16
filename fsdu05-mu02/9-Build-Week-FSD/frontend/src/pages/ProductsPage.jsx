import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice.js';
import ProductCard from '../components/products/ProductCard.jsx';
import SearchBar from '../components/products/SearchBar.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import '../styles/pages.css'; // Assuming you might have page-specific styles

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error, page, pages, count } = useSelector((state) => state.products);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ keyword, category, brand, minPrice, maxPrice, pageNumber: currentPage }));
  }, [dispatch, keyword, category, brand, minPrice, maxPrice, currentPage]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category': setCategory(value); break;
      case 'brand': setBrand(value); break;
      case 'minPrice': setMinPrice(value); break;
      case 'maxPrice': setMaxPrice(value); break;
      default: break;
    }
    setCurrentPage(1); // Reset to first page on new filter
  };

  return (
    <div className="products-page">
      <SearchBar onSearch={handleSearch} />

      <div className="products-content">
        <aside className="filters-section">
          <h4>Filters</h4>
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select id="category" value={category} onChange={(e) => handleFilterChange('category', e.target.value)}>
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
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="minPrice">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </aside>

        <section className="product-list">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="upload-message error">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center">No products found matching your criteria.</p>
          ) : (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {pages > 1 && (
                <div className="pagination my-md text-center">
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      key={x + 1}
                      className={`btn ${x + 1 === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setCurrentPage(x + 1)}
                      style={{ margin: '0 5px' }}
                    >
                      {x + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;