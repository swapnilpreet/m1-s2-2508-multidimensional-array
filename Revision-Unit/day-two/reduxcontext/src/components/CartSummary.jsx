import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartSummary() {
  const { cart, removeFromCart, totalPrice } = useContext(CartContext);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Cart Summary</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} (x{item.quantity}) - ${item.price * item.quantity}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}
