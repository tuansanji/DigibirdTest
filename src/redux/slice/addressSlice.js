import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: null,
    loading: true,
    error: false,
  },

  reducers: {
    getAllAddress(state, action) {
      state.addressList = action.payload;
    },
  },
});

export const { getAllAddress } = addressSlice.actions;
