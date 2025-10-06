import React, { useState, useRef } from "react";

const CountriesList = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const API = "https://algochurn-server.onrender.com/practice/countries";
  const timerRef = useRef(null);

  const fetchCountries = async (text) => {
    if (!text.trim()) {
      setCountries([]);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API}/${text}`);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setCountries(data.countries);
    } catch (err) {
        console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchCountries(value);
    }, 1000);
  };
  console.log(countries);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Countries List</h1>

      <input
        type="text"
        placeholder="Search countries..."
        value={searchText}
        onChange={handleChange}
        style={{
          padding: "10px",
          width: "250px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Something went wrong!</p>}

      <ul>
        {countries?.map((country) => (
          <li key={country.name} style={{ margin: "6px 0"}}>
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
