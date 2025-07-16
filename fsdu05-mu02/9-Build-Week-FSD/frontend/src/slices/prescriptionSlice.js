import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import prescriptionService from '../services/prescriptionService.js';
import { showNotification } from './notificationSlice.js';

export const uploadPrescription = createAsyncThunk(
  'prescriptions/upload',
  async (file, { dispatch, rejectWithValue }) => {
    try {
      const data = await prescriptionService.uploadPrescription(file);
      dispatch(showNotification({ message: 'Prescription uploaded successfully!', type: 'success' }));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(showNotification({ message: `Upload failed: ${message}`, type: 'error' }));
      return rejectWithValue(message);
    }
  }
);

// You might add more thunks here for fetching user's prescriptions, deleting, etc.

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState: {
    uploadedPrescription: null,
    isLoading: false,
    error: null,
    uploadProgress: 0,
  },
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearUploadState: (state) => {
      state.uploadedPrescription = null;
      state.isLoading = false;
      state.error = null;
      state.uploadProgress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPrescription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadPrescription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedPrescription = action.payload;
        state.uploadProgress = 100;
      })
      .addCase(uploadPrescription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.uploadedPrescription = null;
        state.uploadProgress = 0;
      });
  },
});

export const { setUploadProgress, clearUploadState } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;