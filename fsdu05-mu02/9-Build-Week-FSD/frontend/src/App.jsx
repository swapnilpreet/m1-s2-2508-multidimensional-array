import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Notification from './components/common/Notification.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';

import { clearNotification } from './slices/notificationSlice.js';
import PrescriptionUpload from './components/prescriptions/PrescriptionUpload.jsx';

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  // Auto-clear notifications after a delay
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000); // Notification visible for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification.message, notification.id, dispatch]); // Re-run if message or ID changes

  // PWA Service Worker Registration (Optional, if not using vite-plugin-pwa's auto-inject)
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/sw.js') // Path to your generated service worker
  //         .then(registration => {
  //           console.log('SW registered: ', registration);
  //         })
  //         .catch(registrationError => {
  //           console.log('SW registration failed: ', registrationError);
  //         });
  //     });
  //   }
  // }, []);

  return (
    <Router>
      <Header />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/prescription-upload" element={<PrivateRoute><PrescriptionUpload /></PrivateRoute>} />


          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            {/* Add more protected routes here */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;