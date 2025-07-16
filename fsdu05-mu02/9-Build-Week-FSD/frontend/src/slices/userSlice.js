import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService.js';
import { showNotification } from './notificationSlice.js';

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await userService.getUserProfile();
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Failed to fetch profile: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const data = await userService.updateUserProfile(userData);
      dispatch(showNotification({ message: 'Profile updated successfully!', type: 'success' }));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Profile update failed: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
    success: false, // For tracking successful updates
  },
  reducers: {
    resetUpdateSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.profile = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetUpdateSuccess } = userSlice.actions;
export default userSlice.reducer;