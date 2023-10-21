import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
  },

  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { loginUser } = userSlice.actions;
