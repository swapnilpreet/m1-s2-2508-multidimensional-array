import React, { useCallback, useEffect, useMemo, useState } from "react";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPro = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(term));
  }, [products, search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        listStyle: "none",
        padding: 0,
        maxHeight: "400px",
        overflowY: "scroll",
      }}
    >
      <h2>Product Search Optimization</h2>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={handleChange}
        style={{ padding: 10 }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPro.map((ele) => (
          <li key={ele.id}>
            Title: {ele.title} | Price: {ele.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
