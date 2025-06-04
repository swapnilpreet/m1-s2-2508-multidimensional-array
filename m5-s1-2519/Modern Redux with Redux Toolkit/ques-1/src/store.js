import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import taskReducer from './taskSlice';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tasks: taskReducer,
     counter: counterReducer,
  },
});