import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await fetch("https://reqres.in/api/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      console.log("response",response);
      if (!response.ok) {
        throw new Error("Login failed. please check your credentials.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("signup Failed . please try again.");
    }
    const data = await response.json();
    return data;
  }
);
