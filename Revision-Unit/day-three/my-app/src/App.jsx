import React, { useState, useMemo } from "react";
import "./App.css";
import TotalSummary from "./component/TotalSummary";
import HeaderBar from "./component/HeaderBar";
import ItemCard from "./component/ItemCard";

const seedItems = [
  {
    id: 1,
    name: "iPhone 15",
    price: 999,
    category: "Electronics",
    rating: 4.5,
    stock: 10,
  },
  {
    id: 2,
    name: "Nike Shoes",
    price: 120,
    category: "Fashion",
    rating: 4.2,
    stock: 25,
  },
  {
    id: 3,
    name: "Samsung TV",
    price: 700,
    category: "Electronics",
    rating: 4.7,
    stock: 8,
  },
  {
    id: 4,
    name: "T-Shirt",
    price: 25,
    category: "Fashion",
    rating: 4.1,
    stock: 50,
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 85,
    category: "Home",
    rating: 4.0,
    stock: 15,
  },
];

function App() {
  const [items, setItems] = useState(seedItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceOrder, setPriceOrder] = useState("asc");

  const displayItems = useMemo(() => {
    let result = [...items];
    if (selectedCategory !== "All") {
      result = result.filter((i) => i.category === selectedCategory);
    }
    if (priceOrder === "asc") result.sort((a, b) => a.price - b.price);
    if (priceOrder === "desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [items, selectedCategory, priceOrder]);

  const sumPrice = useMemo(() => {
    return displayItems.reduce((sum, i) => sum + i.price, 0);
  }, [displayItems]);
 
  const updateStock = (id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, stock: i.stock - 1 } : i))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addItem = () => {
    const newEntry = {
      id: Date.now(),
      name: "New Item",
      price: Math.floor(Math.random() * 500),
      category: "Misc",
      rating: 3.5,
      stock: 5,
    };
    setItems((prev) => [...prev, newEntry]);
  };

  return (
    <div className="container">
      <h1>Product Dashboard</h1>

      <HeaderBar count={displayItems.length} filter={selectedCategory} />

      <div className="controls">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
          <option value="Misc">Misc</option>
        </select>

        <select
          value={priceOrder}
          onChange={(e) => setPriceOrder(e.target.value)}
        >
          <option value="asc">Price: Low High</option>
          <option value="desc">Price: High Low</option>
        </select>

        <button onClick={addItem}>Add Item</button>
      </div>

      <TotalSummary sumPrice={sumPrice} />

      <div className="grid">
        {displayItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            updateStock={updateStock}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
