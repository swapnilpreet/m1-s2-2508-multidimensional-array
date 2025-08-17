import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import { CartContext } from "../context/CartContext";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {items.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px" }}>
          <img src={product.image} alt={product.title} width="100" height="100" />
          <h4>{product.title}</h4>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
