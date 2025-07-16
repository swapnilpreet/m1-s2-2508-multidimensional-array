import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components.css'; // Import component-specific styles

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="checkout-steps">
      {step1 ? (
        <Link to="/login" className="checkout-step-link active">
          Login
        </Link>
      ) : (
        <span className="checkout-step-link disabled">Login</span>
      )}

      {step2 ? (
        <Link to="/shipping" className="checkout-step-link active">
          Shipping
        </Link>
      ) : (
        <span className="checkout-step-link disabled">Shipping</span>
      )}

      {step3 ? (
        <Link to="/payment" className="checkout-step-link active">
          Payment
        </Link>
      ) : (
        <span className="checkout-step-link disabled">Payment</span>
      )}

      {step4 ? (
        <Link to="/placeorder" className="checkout-step-link active">
          Place Order
        </Link>
      ) : (
        <span className="checkout-step-link disabled">Place Order</span>
      )}
    </nav>
  );
};

export default CheckoutSteps;