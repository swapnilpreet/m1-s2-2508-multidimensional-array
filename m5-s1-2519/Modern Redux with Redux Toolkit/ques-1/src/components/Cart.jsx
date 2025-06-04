import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../cartSlice';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - ₹{item.price}
              <button onClick={() => dispatch(removeItem(item.id))} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
