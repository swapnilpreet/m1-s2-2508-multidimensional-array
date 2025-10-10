import React from "react";
import { clearCart, removeItem } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
    toast.error(`removed from cart`);
  };

  return (
    <div style={{padding:"1rem",border:"1px solid gray" }}>
      <h3>Your Cart</h3>
      {items.length === 0 ? (
        <p>Cart is empty!</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} × {item.quantity}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
