import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) navigate(`/weather/${city.trim()}`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "0.5rem", width: "200px" }}
        />
        <button type="submit" style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default Home;
