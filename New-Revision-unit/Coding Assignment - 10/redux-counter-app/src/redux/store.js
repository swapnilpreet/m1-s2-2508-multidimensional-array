import { configureStore, createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    INCREMENT: (state) => {
      state.count += 1;
    },
    DECREMENT: (state) => {
      state.count -= 1;
    },
    Reset: (state) => {
      state.count = 0;
    },
  },
});

export const { INCREMENT, DECREMENT, Reset } = CounterSlice.actions;

const store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
  },
});

export default store;
