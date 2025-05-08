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
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
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
