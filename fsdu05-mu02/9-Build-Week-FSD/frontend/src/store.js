import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import productReducer from './slices/productSlice.js';
import cartReducer from './slices/cartSlice.js';
import notificationReducer from './slices/notificationSlice.js';
import userReducer from './slices/userSlice.js';
import prescriptionReducer from './slices/prescriptionSlice.js';
// import recommendationReducer from './slices/recommendationSlice.js'; // Will add later

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    notification: notificationReducer,
    user: userReducer,
    prescriptions: prescriptionReducer,
    // recommendations: recommendationReducer,
  },
  // getDefaultMiddleware includes Redux Thunk by default for async actions
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;