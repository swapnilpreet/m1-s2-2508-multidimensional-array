import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService.js';
import { showNotification } from './notificationSlice.js';

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      dispatch(showNotification({ message: 'Logged in successfully!', type: 'success' }));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: message, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.register(name, email, password);
      dispatch(showNotification({ message: 'Registration successful!', type: 'success' }));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: message, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  authService.logout();
  dispatch(showNotification({ message: 'Logged out successfully!', type: 'info' }));
});

// Initial state from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfoFromStorage,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userInfo = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userInfo = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;