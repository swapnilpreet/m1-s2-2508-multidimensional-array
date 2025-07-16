import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce.js';
import '../../styles/components.css'; // Import component-specific styles

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  useEffect(() => {
    // Only trigger search if debounced term is not empty, or if it explicitly becomes empty (to clear results)
    if (debouncedSearchTerm !== undefined) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Trigger immediate search on button click
  };

  return (
    <form className="search-bar" onSubmit={handleSearchClick}>
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="btn btn-primary search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;