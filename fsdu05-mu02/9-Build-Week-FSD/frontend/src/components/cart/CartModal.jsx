import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../../slices/cartSlice.js';
import { Link } from 'react-router-dom';
import '../../styles/components.css'; // Import component-specific styles

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQtyChange = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="cart-modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Your Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.product} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                    <p>${item.price.toFixed(2)}</p>
                    <select
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item, e.target.value)}
                      className="cart-item-qty-select"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.product)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <p>Items Price: <strong>${itemsPrice.toFixed(2)}</strong></p>
              <p>Shipping: <strong>${shippingPrice.toFixed(2)}</strong></p>
              <p>Tax: <strong>${taxPrice.toFixed(2)}</strong></p>
              <h4>Total: <strong>${totalPrice.toFixed(2)}</strong></h4>
            </div>
            <div className="cart-actions">
              <Link to="/cart" className="btn btn-secondary" onClick={onClose}>
                View Full Cart
              </Link>
              <Link to="/checkout" className="btn btn-primary" onClick={onClose}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;