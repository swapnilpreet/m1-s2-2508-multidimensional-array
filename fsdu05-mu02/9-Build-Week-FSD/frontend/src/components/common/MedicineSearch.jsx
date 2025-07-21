// import React, { useEffect, useState } from "react";
// import "../css/MedicineSearch.css";
// import { FaMapMarkerAlt, FaChevronDown, FaSearch } from "react-icons/fa";
// import MedicineLoader from "./MedicineLoader";
// import { fetchSearchSuggestions } from "../../Utills/Api";

// const locations = [
//   { pincode: "400079", city: "Mumbai" },
//   { pincode: "110001", city: "Delhi" },
//   { pincode: "560001", city: "Bangalore" },
//   { pincode: "600001", city: "Chennai" },
//   { pincode: "700001", city: "Kolkata" },
//   { pincode: "440001", city: "Nagpur" },
// ];

// const MedicineSearch = () => {
//   const [selectedLocation, setSelectedLocation] = useState(locations[0]);
//   const [showInput, setShowInput] = useState(false);
//   const [pincodeInput, setPincodeInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [debounceTimer, setDebounceTimer] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [inputFocused, setInputFocused] = useState(false); // 👈 NEW

//   const rotatingList = [
//     "LEVIPIL", "PARACETAMOL", "ASPIRIN", "DOLO 650", "CETIRIZINE", "AZITHROMYCIN",
//   ];
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % rotatingList.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handlePincodeSubmit = (e) => {
//     e.preventDefault();
//     const found = locations.find((loc) => loc.pincode === pincodeInput);
//     setSelectedLocation(found || { pincode: pincodeInput, city: "Unknown City" });
//     setShowInput(false);
//     setPincodeInput("");
//   };

//   const handleSuggestionClick = (value) => {
//     setSearchTerm(value);
//     setSuggestions([]);
//   };

//   useEffect(() => {
//     if (debounceTimer) clearTimeout(debounceTimer);

//     if (!searchTerm.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     setLoading(true);
//     const timer = setTimeout(async () => {
//       try {
//         const list = await fetchSearchSuggestions(searchTerm);
//         setSuggestions([...new Set(list)]);
//       } catch (error) {
//         console.error("API Error:", error);
//         setSuggestions([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 1000);

//     setDebounceTimer(timer);
//   }, [searchTerm]);

//   return (
//     <div className="search-section">
//       <div className="background-icon left" />
//       <div className="background-icon right" />

//       <h1>Say Goodbye to High Medicine Prices</h1>
//       <p>Compare prices and save up to 51%</p>

//       <div className="search-bar">
//         <div className="location-select">
//           <FaMapMarkerAlt className="location-icon" />
//           <span>
//             {selectedLocation.pincode}, {selectedLocation.city}
//           </span>
//           <FaChevronDown className="dropdown-icon" onClick={() => setShowInput(!showInput)} />
//         </div>

//         {showInput && (
//           <form className="pincode-input-wrapper" onSubmit={handlePincodeSubmit}>
//             <input
//               type="text"
//               value={pincodeInput}
//               onChange={(e) => setPincodeInput(e.target.value)}
//               placeholder="Enter Pincode"
//               className="pincode-input"
//             />
//           </form>
//         )}

//         <div className="divider" />
//         <div className="search-input-wrapper">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={() => setInputFocused(true)}
//             onBlur={() => setTimeout(() => setInputFocused(false), 200)} // ⏱️ allow suggestion click
//             placeholder={`Search for ${rotatingList[placeholderIndex]}`}
//             className="search-input"
//           />

//           {inputFocused && suggestions.length > 0 && (
//             <ul className="suggestions-dropdown">
//               {suggestions.map((item, index) => (
//                 <li key={index} onClick={() => handleSuggestionClick(item.text)}>
//                   {item.text}, {item.type}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {loading && <MedicineLoader loading={loading} />}
//         <button className="search-button">
//           <FaSearch />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MedicineSearch;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaChevronDown, FaSearch } from "react-icons/fa";
import MedicineLoader from "./MedicineLoader";
import { fetchSearchSuggestions } from "../../Utills/Api";

const locations = [
  { pincode: "400079", city: "Mumbai" },
  { pincode: "110001", city: "Delhi" },
  { pincode: "560001", city: "Bangalore" },
  { pincode: "600001", city: "Chennai" },
  { pincode: "700001", city: "Kolkata" },
  { pincode: "440001", city: "Nagpur" },
];

const MedicineSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [showInput, setShowInput] = useState(false);
  const [pincodeInput, setPincodeInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const rotatingList = [
    "LEVIPIL", "PARACETAMOL", "ASPIRIN", "DOLO 650", "CETIRIZINE", "AZITHROMYCIN",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const found = locations.find((loc) => loc.pincode === pincodeInput);
    setSelectedLocation(found || { pincode: pincodeInput, city: "Unknown City" });
    setShowInput(false);
    setPincodeInput("");
  };

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    setSuggestions([]);
  };

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const list = await fetchSearchSuggestions(searchTerm);
        setSuggestions([...new Set(list)]);
      } catch (error) {
        console.error("API Error:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 1000);

    setDebounceTimer(timer);
  }, [searchTerm]);

  return (
    <SearchSection>
      <BackgroundIcon className="left" />
      <BackgroundIcon className="right" />
      <h1>Say Goodbye to High Medicine Prices</h1>
      <p>Compare prices and save up to 51%</p>

      <SearchBar>
        <LocationSelect>
          <FaMapMarkerAlt className="location-icon" />
          <span>
            {selectedLocation.pincode}, {selectedLocation.city}
          </span>
          <FaChevronDown className="dropdown-icon" onClick={() => setShowInput(!showInput)} />
        </LocationSelect>

        {showInput && (
          <PincodeForm onSubmit={handlePincodeSubmit}>
            <PincodeInput
              type="text"
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value)}
              placeholder="Enter Pincode"
            />
          </PincodeForm>
        )}

        <Divider />
        <SearchInputWrapper>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setTimeout(() => setInputFocused(false), 200)}
            placeholder={`Search for ${rotatingList[placeholderIndex]}`}
          />

          {inputFocused && suggestions.length > 0 && (
            <SuggestionsDropdown>
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSuggestionClick(item.text)}>
                  {item.text}, {item.type}
                </li>
              ))}
            </SuggestionsDropdown>
          )}
        </SearchInputWrapper>

        {loading && <MedicineLoader loading={loading} />}
        <SearchButton>
          <FaSearch />
        </SearchButton>
      </SearchBar>
    </SearchSection>
  );
};

export default MedicineSearch;

// Styled Components
const SearchSection = styled.div`
  position: relative;
  background-color: #f0f8ff;
  padding: 4rem 1rem;
  text-align: center;
  overflow: visible;
  z-index: 1;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
  }
  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #666;
  }
`;

const BackgroundIcon = styled.div`
  position: absolute;
  background-image: url("https://img.icons8.com/ios-filled/100/000000/pill.png");
  background-repeat: no-repeat;
  background-size: 100px;
  opacity: 0.06;
  width: 120px;
  height: 120px;
  z-index: 0;
  &.left {
    top: 20px;
    left: 10px;
  }
  &.right {
    bottom: 10px;
    right: 30px;
  }
`;

const SearchBar = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  max-width: 700px;
  margin-inline: auto;
  padding: 0.5rem 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  gap: 1rem;
  position: relative;
  z-index: 5;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 20px;
    padding: 1rem;
  }
`;

const LocationSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #007bff;
  font-weight: 500;
  white-space: nowrap;
  justify-content: center;
`;

const PincodeForm = styled.form`
  position: absolute;
  top: 110%;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  z-index: 10;
`;

const PincodeInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.9rem;
  width: 180px;
  &:focus {
    border-color: #007bff;
  }
`;

const Divider = styled.div`
  height: 30px;
  width: 1px;
  background: #ccc;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  color: #333;
  width: 100%;
  &::placeholder {
    color: #999;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SuggestionsDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  li {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

const SearchButton = styled.button`
  background-color: #0a66c2;
  border: none;
  color: white;
  padding: 0.6rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
