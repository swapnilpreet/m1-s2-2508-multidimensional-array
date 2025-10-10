import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  totalAmount: 0,
};

const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.items.find((i) => i.id === newItem.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...newItem, quantity: 1 });
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      updateLocalStorage(state);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity > 1
          ? (existing.quantity -= 1)
          : (state.items = state.items.filter((i) => i.id !== id));
      }
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      updateLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      updateLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
