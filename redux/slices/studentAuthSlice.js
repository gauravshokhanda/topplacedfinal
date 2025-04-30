// redux/slices/studentAuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const studentAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        // console.log("🟢 loginSuccess dispatched with payload:", action.payload); 
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload._id,
      };
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;
