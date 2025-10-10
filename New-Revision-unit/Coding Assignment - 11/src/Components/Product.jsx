import React, { useEffect, useState, useCallback, useMemo } from "react";
const CartItem = React.memo(({item,onQuantityChange})=>{
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:"10px 0",
        borderBottom:"1px solid #ccc",
        paddingBottom:"5px",
      }}
    >
      <span>{item.title}</span>
      <span>{item.price}</span>
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e)=>onQuantityChange(item.id,Number(e.target.value))}
      />
    </div>
  );
});
 
const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
 
  const handleAddToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((p) => p.id === product.id);
        if (existing) {
          return prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
    },
    [setCart]
  );
 
  const handleQuantityChange = useCallback((id, qty) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
      <div>
        <h2>Product Cart Quantity Update</h2>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>{p.title}</span>
            <span>₹{p.price}</span>
            <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div style={{ width: "40%" }}>
        <h2>Cart</h2>
        {cart.length === 0 && <p>No items added yet.</p>}
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <h3>Total: {totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Product