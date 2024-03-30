import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
  failure: false,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.failure = false;
      state.loading = false;
    },
    failureState: (state) => {
      state.failure = true;
      state.loading = false;
      state.success = false;
    },
    defaultState: (state) => {
      state.failure = false;
      state.loading = false;
      state.success = false;
    },
    loadingState: (state) => {
      state.loading = true;
      state.failure = false;
      state.success = false;
    },
    successState: (state) => {
      state.success = true;
      state.loading = false;
      state.failure = false;
    },
  },
});

export const {
  getUser,
  logout,
  defaultState,
  loadingState,
  successState,
  failureState,
} = userSlice.actions;

export default userSlice.reducer;
