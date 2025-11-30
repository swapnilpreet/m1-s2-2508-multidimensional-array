// ✅ React Form With All Input Types + Print Data After Submit
    // ✔ Text Input
    // ✔ Email
    // ✔ Password
    // ✔ Number
    // ✔ Date
    // ✔ Time
    // ✔ Radio
    // ✔ Checkbox
    // ✔ Select Dropdown
    // ✔ Textarea
    // ✔ File Upload
    // ✔ Range Slider
    // ✔ Switch (Checkbox styled)
    // ✅ Full Working Code (Form.jsx)
    import React, { useState } from "react";

    const Form = () => {
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        dob: "",
        time: "",
        gender: "",
        skills: [],
        country: "",
        about: "",
        file: null,
        range: 50,
        isActive: false,
      });

      // Handle all changes
      const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        // Handle file upload
        if (type === "file") {
          setFormData({ ...formData, file: files[0] });
          return;
        }

        // Handle checkbox (multiple skills)
        if (type === "checkbox" && name === "skills") {
          const updatedSkills = checked
            ? [...formData.skills, value]
            : formData.skills.filter((skill) => skill !== value);

          setFormData({ ...formData, skills: updatedSkills });
          return;
        }

        // Handle switch
        if (type === "checkbox" && name === "isActive") {
          setFormData({ ...formData, isActive: checked });
          return;
        }

        // Normal input
        setFormData({ ...formData, [name]: value });
      };

      // Submit
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Data:", formData);
        alert("Check console for user data!");
      };

      return (
        <div style={{ width: "50%", margin: "auto", padding: "20px" }}>
          <h2>React Complete Form</h2>
          <form onSubmit={handleSubmit}>
            
            {/* Text input */}
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            {/* Email */}
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            {/* Password */}
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />

            {/* Number */}
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />

            {/* Date */}
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

            {/* Time */}
            <label>Time:</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} />

            {/* Radio */}
            <label>Gender:</label>
            <div>
              <label>
                <input type="radio" name="gender" value="Male"
                  checked={formData.gender === "Male"} onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female"
                  checked={formData.gender === "Female"} onChange={handleChange} />
                Female
              </label>
            </div>

            {/* Checkbox Multi */}
            <label>Skills:</label>
            <div>
              <label>
                <input type="checkbox" name="skills" value="JavaScript"
                  onChange={handleChange} />
                JavaScript
              </label>
              <label>
                <input type="checkbox" name="skills" value="React"
                  onChange={handleChange} />
                React
              </label>
              <label>
                <input type="checkbox" name="skills" value="Node"
                  onChange={handleChange} />
                Node
              </label>
            </div>

            {/* Select */}
            <label>Country:</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Japan">Japan</option>
            </select>

            {/* Textarea */}
            <label>About You:</label>
            <textarea name="about" value={formData.about} onChange={handleChange}></textarea>

            {/* File Upload */}
            <label>Upload File:</label>
            <input type="file" name="file" onChange={handleChange} />

            {/* Range Slider */}
            <label>Range (1-100): {formData.range}</label>
            <input type="range" name="range" min="1" max="100"
              value={formData.range} onChange={handleChange} />

            {/* Switch */}
            <label>Active User:</label>
            <input type="checkbox" name="isActive"
              checked={formData.isActive} onChange={handleChange} />

            {/* Submit */}
            <button type="submit" style={{ marginTop: "20px", padding: "10px" }}>
              Submit
            </button>
          </form>
        </div>
      );
    };

    export default Form;

// ✅ Output (When submitting)

// It prints full user data:

// {
//   name: "Swapnil",
//   email: "test@gmail.com",
//   password: "12345",
//   age: "23",
//   dob: "2001-01-01",
//   time: "10:30",
//   gender: "Male",
//   skills: ["JavaScript", "React"],
//   country: "India",
//   about: "I am a developer",
//   file: File {},
//   range: 80,
//   isActive: true
// }






// ✅ Fetch Data (API)
    // ✅ Search (with Debounce)
    // ✅ Filters
    // ✔ Filter by Category
    // ✔ Filter by Price Range
    // ✔ Filter by Stock / Availability
    // ✅ Sorting (Low–High, High–Low, A–Z, Z–A)
    // ✅ Pagination
    // ✅ Clean, beginner-friendly code
    // ✅ Fully working component (you can paste directly into your project)
    // 🚀 Full Working React Example
    import React, { useEffect, useState, useCallback } from "react";

    // Debounce Function
    const debounce = (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    const ProductList = () => {
      const [data, setData] = useState([]);
      const [filtered, setFiltered] = useState([]);
      // Search + Filters + Sort states
      const [search, setSearch] = useState("");
      const [category, setCategory] = useState("all");
      const [sort, setSort] = useState("default");
      const [priceRange, setPriceRange] = useState([0, 1000]);
      const [inStock, setInStock] = useState(false);

      // Pagination states
      const [page, setPage] = useState(1);
      const itemsPerPage = 5;

      // Fetch Data
      useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then(res => res.json())
          .then(json => {
            setData(json);
            setFiltered(json);
          });
      }, []);

      // Filter + Search + Sort Handler
      const applyFilters = useCallback(() => {
        let updated = [...data];

        // SEARCH
        if (search.trim() !== "") {
          updated = updated.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        // CATEGORY FILTER
        if (category !== "all") {
          updated = updated.filter(item => item.category === category);
        }

        // PRICE FILTER
        updated = updated.filter(
          p => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // STOCK FILTER (Fake Logic: rating.count > 100 means in stock)
        if (inStock) {
          updated = updated.filter(item => item.rating.count > 100);
        }

        // SORTING
        if (sort === "low-high") updated.sort((a, b) => a.price - b.price);
        if (sort === "high-low") updated.sort((a, b) => b.price - a.price);
        if (sort === "a-z") updated.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "z-a") updated.sort((a, b) => b.title.localeCompare(a.title));

        setFiltered(updated);
        setPage(1); // Reset to first page after sorting/filtering
      }, [data, search, category, sort, priceRange, inStock]);

      // Debounced Search
      const handleSearch = debounce((value) => {
        setSearch(value);
      }, 500);

      useEffect(() => {
        applyFilters();
      }, [search, category, sort, priceRange, inStock, applyFilters]);

      // PAGINATION LOGIC
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filtered.slice(startIndex, endIndex);

      const totalPages = Math.ceil(filtered.length / itemsPerPage);

      return (
        <div style={{ padding: "20px" }}>
          <h2>Product List With Filters, Sort, Search & Pagination</h2>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search product..."
            onChange={(e) => handleSearch(e.target.value)}
            style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
          />

          {/* FILTERS */}
          <div style={{ margin: "10px 0" }}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Category</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Women</option>
              <option value="jewelery">Jewelry</option>
              <option value="electronics">Electronics</option>
            </select>

            {/* Price Range */}
            <label style={{ marginLeft: "20px" }}>
              Min Price:
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                style={{ width: "80px", margin: "0 10px" }}
              />
            </label>

            <label>
              Max Price:
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                style={{ width: "80px", marginLeft: "10px" }}
              />
            </label>

            {/* In-Stock */}
            <label style={{ marginLeft: "20px" }}>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              In Stock Only
            </label>
          </div>

          {/* SORTING */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
            <option value="a-z">Name: A → Z</option>
            <option value="z-a">Name: Z → A</option>
          </select>

          {/* PRODUCTS LIST */}
          <div style={{ marginTop: "20px" }}>
            {paginatedData.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
              </div>
            ))}
          </div>

          {/* PAGINATION BUTTONS */}
          <div style={{ marginTop: "20px" }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>

            <span style={{ margin: "0 10px" }}>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      );
    };

    export default ProductList;


 
// ✅ Searching products based on input
// ✅ Debounced search (500ms)
// ✅ No filters, no complexity — just pure search + debounce
// ✅ Easy to use for freshers

// 🚀 React Debounced Search (Beginner-Friendly Code)
// ✅ Working Example
    import React, { useEffect, useState } from "react";

    // Simple debounce function
    const debounce = (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    const SearchProducts = () => {
      const [products, setProducts] = useState([]);
      const [searchText, setSearchText] = useState("");
      const [filtered, setFiltered] = useState([]);

      // Fetch Products
      useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
            setFiltered(data);
          });
      }, []);

      // Debounced Search Handler
      const handleSearch = debounce((value) => {
        setSearchText(value);
      }, 500);

      // Filter products whenever searchText changes
      useEffect(() => {
        const results = products.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFiltered(results);
      }, [searchText, products]);

      return (
        <div style={{ padding: "20px" }}>
          <h2>Search Products (Debounced)</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search product..."
            onChange={(e) => handleSearch(e.target.value)}
            style={{ padding: "10px", width: "250px", marginBottom: "20px" }}
          />

          {/* Products List */}
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
              }}
            >
              <h4>{item.title}</h4>
              <p>₹ {item.price}</p>
            </div>
          ))}
        </div>
      );
    };

    export default SearchProducts;

// 🧠 How This Works (Very Simple Explanation)
// 1️⃣ debounce()

// This function waits for 500ms after the user stops typing, and THEN calls the actual search.

// This avoids calling filter again and again on every keystroke.

// 2️⃣ handleSearch

// Runs the debounced version of search:

const handleSearch = debounce((value) => {
  setSearchText(value);
}, 500);

// 3️⃣ useEffect

// Every time search text changes, filter products:

useEffect(() => {
  const results = products.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  setFiltered(results);
}, [searchText, products]);










// ✅ Debounced Search (500ms) + API Call


// Key points:
// API hits happen ONLY after user stops typing for 500ms
// Uses setTimeout + useEffect
// Clearest code possible
// No third-party library
// ✅ React Code (Beginner Friendly)
    import React, { useState, useEffect } from "react";

    const ProductSearch = () => {
      const [search, setSearch] = useState("");        // Input value
      const [debouncedValue, setDebouncedValue] = useState(""); // Value after 500ms delay
      const [products, setProducts] = useState([]);

      // ------------------------------
      // 1. Debounce Logic (500ms)
      // ------------------------------
      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedValue(search); // Update debounced value only after user stops typing
        }, 500);

        return () => clearTimeout(timer); // Cleanup previous timer
      }, [search]);

      // ------------------------------
      // 2. API Call based on debouncedValue
      // ------------------------------
      useEffect(() => {
        if (debouncedValue === "") return; // No empty API call

        const fetchProducts = async () => {
          try {
            const res = await fetch(
              `https://dummyjson.com/products/search?q=${debouncedValue}`
            );
            const data = await res.json();
            setProducts(data.products || []);
          } catch (error) {
            console.log("Error:", error);
          }
        };

        fetchProducts();
      }, [debouncedValue]);

      return (
        <div style={{ padding: "20px" }}>
          <h2>Debounced Search (500ms)</h2>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              fontSize: "16px",
            }}
          />

          <h3>Results:</h3>

          {products.length === 0 && debouncedValue && <p>No products found.</p>}

          <ul>
            {products.map((p) => (
              <li key={p.id}>
                {p.title} — ${p.price}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default ProductSearch;



// ✅ How It Works (Simple Explanation)
// 1. User types in input → search updates
// onChange={(e) => setSearch(e.target.value)}

// 2. Debounce timer waits 500ms

// If user keeps typing → timer resets
// If user STOPS typing → update debouncedValue

// 3. When debouncedValue updates → API call runs
// useEffect(() => {
//    fetch(`.../search?q=${debouncedValue}`)
// }, [debouncedValue]);



