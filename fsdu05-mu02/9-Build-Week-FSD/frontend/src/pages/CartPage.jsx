import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../slices/cartSlice.js';
import Button from '../components/ui/Button.jsx';
import '../styles/pages.css'; // Assuming page-specific styles
import '../styles/components.css'; // For cart-item styles

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQtyChange = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping'); // If logged in, go to shipping
    } else {
      navigate('/login?redirect=/shipping'); // If not, go to login with redirect
    }
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty. <Link to="/products">Go Shopping</Link></p>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-column">
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item-full">
                <img src={item.image} alt={item.name} className="cart-item-image-full" />
                <div className="cart-item-details-full">
                  <Link to={`/products/${item.product}`}><h4>{item.name}</h4></Link>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-md">
                    <label htmlFor={`qty-${item.product}`}>Qty:</label>
                    <select
                      id={`qty-${item.product}`}
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
                </div>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.product)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="cart-summary-column">
            <div className="cart-summary-box">
              <h3>Order Summary</h3>
              <p>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</p>
              <p>Items Price: <strong>${itemsPrice.toFixed(2)}</strong></p>
              <p>Shipping: <strong>${shippingPrice.toFixed(2)}</strong></p>
              <p>Tax: <strong>${taxPrice.toFixed(2)}</strong></p>
              <h4>Total: <strong>${totalPrice.toFixed(2)}</strong></h4>
              <Button
                variant="primary"
                className="w-full mt-md"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;