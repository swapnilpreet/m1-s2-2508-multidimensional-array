import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/cart/CheckoutSteps.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import { saveShippingAddress, savePaymentMethod } from '../slices/cartSlice.js';
import '../styles/pages.css'; // Assuming page-specific styles
import '../styles/components.css'; // For form styles

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // State for Shipping Address
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  // State for Payment Method
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'PayPal');

  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Place Order

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping'); // Ensure user is logged in
    }
    // Determine current step based on saved data
    if (shippingAddress.address) {
      setCurrentStep(2); // If shipping address exists, move to payment
    }
    if (savedPaymentMethod) {
      setCurrentStep(3); // If payment method exists, move to place order
    }
  }, [userInfo, navigate, shippingAddress, savedPaymentMethod]);

  const submitShippingHandler = (e) => {
    e.preventDefault();
    if (address && city && postalCode && country) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      setCurrentStep(2); // Move to next step
      navigate('/checkout?step=payment'); // Update URL for clarity
    } else {
      dispatch(showNotification({ message: 'Please fill in all shipping details.', type: 'error' }));
    }
  };

  const submitPaymentHandler = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod));
      setCurrentStep(3); // Move to next step
      navigate('/checkout?step=placeorder'); // Update URL for clarity
    } else {
      dispatch(showNotification({ message: 'Please select a payment method.', type: 'error' }));
    }
  };

  const handleBackToShipping = () => {
    setCurrentStep(1);
    navigate('/checkout?step=shipping');
  };

  const handlePlaceOrder = () => {
    // This will navigate to a separate PlaceOrderPage where the order is actually created
    navigate('/placeorder');
  };

  return (
    <div className="checkout-page">
      <CheckoutSteps
        step1={true}
        step2={currentStep >= 2}
        step3={currentStep >= 3}
        step4={false} // Place Order is the final step, not yet completed
      />

      {currentStep === 1 && (
        <div className="form-container">
          <h2>Shipping Address</h2>
          <form onSubmit={submitShippingHandler}>
            <Input
              label="Address"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
            <Input
              label="City"
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
            <Input
              label="Postal Code"
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
              required
            />
            <Input
              label="Country"
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Continue
            </Button>
          </form>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-container">
          <h2>Payment Method</h2>
          <form onSubmit={submitPaymentHandler}>
            <Select
              label="Select Method"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={[
                { value: 'PayPal', label: 'PayPal or Credit Card' },
                { value: 'Stripe', label: 'Stripe' }, // Example
              ]}
              required
            />
            <div className="flex gap-md">
              <Button type="button" variant="secondary" onClick={handleBackToShipping}>
                Back
              </Button>
              <Button type="submit" variant="primary" className="flex-grow">
                Continue
              </Button>
            </div>
          </form>
        </div>
      )}

      {currentStep === 3 && (
        <div className="form-container">
          <h2>Place Order</h2>
          <p>Review your order details on the next page.</p>
          <div className="flex gap-md">
            <Button type="button" variant="secondary" onClick={() => setCurrentStep(2)}>
              Back to Payment
            </Button>
            <Button type="button" variant="primary" className="flex-grow" onClick={handlePlaceOrder}>
              Proceed to Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;