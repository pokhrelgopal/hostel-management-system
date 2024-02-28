import { createSlice } from "@reduxjs/toolkit";

const initialAccessToken = localStorage.getItem("accessToken") || null;
const initialRefreshToken = localStorage.getItem("refreshToken") || null;
const initialIsLoggedIn = !!initialAccessToken;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: initialAccessToken,
    refreshToken: initialRefreshToken,
    isLoggedIn: initialIsLoggedIn,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
