import { createSlice } from "@reduxjs/toolkit";

const INITIAL_AUTH_STATE = {
  loading: false,
  userInfo: {
    id: null,
    username: null,
    email: null,
    password: null,
    role: null,
    status: null,
  },
  userToken: null,
  error: null,
  // success: false //optional
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_AUTH_STATE,
  reducers: {
    login: (state, action) => {
      state.loading = true;
      state.id = action.payload.id;
      state.userInfo.username = action.payload.username;
      state.userInfo.email = action.payload.email;
      state.userInfo.password = action.payload.password;
      state.userInfo.role = action.payload.role;
      state.userInfo.status = action.payload.status;
      state.userToken = action.payload.userToken;
      state.error = null;
    },

    logout: (state, action) => {
      state.loading = false;
      state.id = null;
      state.userInfo.username = null;
      state.userInfo.email = null;
      state.userInfo.password = null;
      state.userInfo.role = null;
      state.userInfo.status = null;
      state.userToken = null;
      state.error = action.payload?.error;
    },
  },
});

export const { login, logout } = authSlice.actions;
