import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../services/cartService.js'; // Using cartService for order API calls
import { showNotification } from './notificationSlice.js';
import { clearCart } from './cartSlice.js'; // To clear cart after successful order

export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const data = await cartService.createOrder(orderData);
      dispatch(showNotification({ message: 'Order placed successfully!', type: 'success' }));
      dispatch(clearCart()); // Clear cart after successful order
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Order creation failed: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/details',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const data = await cartService.getOrderDetails(id);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Failed to fetch order details: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/pay',
  async ({ orderId, paymentResult }, { dispatch, rejectWithValue }) => {
    try {
      const data = await cartService.payOrder(orderId, paymentResult);
      dispatch(showNotification({ message: 'Order paid successfully!', type: 'success' }));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Payment failed: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'order/myOrders',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await cartService.getMyOrders();
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Failed to fetch my orders: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);


const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: null, // For single order details
    orders: [], // For list of user's orders
    isLoading: false,
    error: null,
    success: false, // For tracking successful order creation/payment
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.order = null;
      })
      // Pay Order
      .addCase(payOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload; // Update order with paid status
        state.success = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orders = [];
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;