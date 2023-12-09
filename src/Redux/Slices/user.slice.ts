import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: "",
  walletType: "",
  userDetails: {},
  network: "matic",
  isTCAccepted: false,
  isAdmin: false,
};

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    walletAddress: (state, param) => {
      const { payload } = param;
      state.walletAddress = payload;
    },

    walletType: (state, param) => {
      const { payload } = param;
      state.walletType = payload;
    },
    reset: () => initialState,
  },
});

/**ACTIONS FOR SLICE*/
export const { walletAddress, walletType, reset } = UserSlice.actions;
