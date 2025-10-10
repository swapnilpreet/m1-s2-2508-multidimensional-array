import React, { useEffect, useState } from "react";
import { addItem } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { isloggedin } = useAuth();
  //   console.log("isLoggedIn",isloggedin)
  //   console.log("auisLoggedInh",useAuth())
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleAdd = (product) => {
    if (!isloggedin) {
      alert("Please log in to add items to cart!");
      return;
    }
    dispatch(
      addItem({ id: product.id, name: product.title, price: product.price })
    );
    toast.success(`added to cart`);
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid gray" }}>
      <h3>🛒 Products</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h4>{p.title}</h4>
            <p>${p.price}</p>
            <button onClick={() => handleAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
