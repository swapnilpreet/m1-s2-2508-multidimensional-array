import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from './notificationSlice.js';

// Initial cart state from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const calculatePrices = (items) => {
  const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const taxPrice = 0.15 * itemsPrice; // 15% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    ...calculatePrices(cartItemsFromStorage), // Calculate initial prices
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      Object.assign(state, calculatePrices(state.cartItems)); // Update prices
      showNotification({ message: `${item.name} added to cart!`, type: 'success' });
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.product !== productIdToRemove);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      Object.assign(state, calculatePrices(state.cartItems)); // Update prices
      showNotification({ message: 'Item removed from cart!', type: 'info' });
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
      showNotification({ message: 'Shipping address saved!', type: 'success' });
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
      showNotification({ message: 'Payment method saved!', type: 'success' });
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
      Object.assign(state, calculatePrices(state.cartItems)); // Reset prices
      showNotification({ message: 'Cart cleared!', type: 'info' });
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart } = cartSlice.actions;
export default cartSlice.reducer;