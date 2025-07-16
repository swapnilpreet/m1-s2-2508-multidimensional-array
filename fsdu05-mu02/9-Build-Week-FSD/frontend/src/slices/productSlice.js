import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../services/productService.js';
import { showNotification } from './notificationSlice.js';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { dispatch, rejectWithValue }) => {
    try {
      const { keyword = '', category = '', brand = '', minPrice = '', maxPrice = '', pageNumber = 1 } = params;
      const data = await productService.getProducts(keyword, category, brand, minPrice, maxPrice, pageNumber);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Failed to fetch products: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const data = await productService.getProductById(id);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Failed to fetch product details: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    isLoading: false,
    error: null,
    page: 1,
    pages: 1,
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.count = action.payload.count;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.products = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.product = null;
      });
  },
});

export default productSlice.reducer;