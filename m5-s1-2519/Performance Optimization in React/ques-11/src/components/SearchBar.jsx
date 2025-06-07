import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = React.memo(({ onLocationSelect, placeholder = 'Search location' }) => {
  const [input, setInput] = useState('');

  const handleSearch = async () => {
    const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`);
    if (res.data && res.data.length > 0) {
      const loc = res.data[0];
      onLocationSelect({ lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) });
    }
  };

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
});

export default SearchBar;