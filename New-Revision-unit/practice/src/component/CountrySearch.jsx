import React, { useEffect, useMemo } from "react";


function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

async function fetchData(value, setCountries) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${value}`
    );
    if (!response.ok) {
      setCountries([]);
      return;
    }
    const data = await response.json();
    const countryNames = data.map((country) => country.name.common);
    setCountries(countryNames);
    console.log(countryNames);
  } catch (error) {
    console.log(error);
  }
}

const CountrySearch = () => {
  const [query, setQuery] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState([]);

  const debouncedSearch = useMemo(
    () => debounce((value) => fetchData(value, setCountries), 1000),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setCountries([]);
      return;
    }
  }, [query, debouncedSearch]);

  const handleselect = (country) => {
    if (!selectedCountry.includes(country)) {
      setSelectedCountry([...selectedCountry, country]);
    }
    setCountries([]);
  };
  return (
    <div>
      <h1>Country Search</h1>
      <div style={{ width:"400px",margin:"50px auto" }}>
        <div style={{position:"relative" }}>
          <input
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            style={{
              width:"100%",
              padding:"8px",
              fontSize:"14px",
              boxSizing:"border-box",
            }}
          />
          {countries.length>0&&(
            <ul
              style={{
                listStyleType:"none",
                margin:0,
                padding:"8px",
              }}
            >
              {countries.map((country)=>(
                <li
                  key={country}
                  style={{padding:"4px 0" }}
                  onClick={()=>handleselect(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedCountry.length > 0 &&
          selectedCountry.map((country) => <p key={country}>{country}</p>)}
      </div>
    </div>
  );
};

export default CountrySearch;
