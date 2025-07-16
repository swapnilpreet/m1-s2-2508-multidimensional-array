import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recommendationService from '../services/recommendationService.js';
import { showNotification } from './notificationSlice.js';

export const fetchPersonalizedRecommendations = createAsyncThunk(
  'recommendations/fetchPersonalized',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await recommendationService.getPersonalizedRecommendations();
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Failed to fetch recommendations: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

// You might add another thunk for symptom-based recommendations if needed

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    recommendations: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalizedRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchPersonalizedRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.recommendations = [];
      });
  },
});

export default recommendationSlice.reducer;