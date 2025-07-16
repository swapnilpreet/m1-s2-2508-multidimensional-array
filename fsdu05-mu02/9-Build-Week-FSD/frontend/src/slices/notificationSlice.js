import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null, // 'success', 'error', 'info', 'warning'
    id: null,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.id = Date.now(); // Unique ID for each notification
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
      state.id = null;
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;