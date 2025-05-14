import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    user: null,
};

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.user = null;
        },
    },
});

export const { setLogin, setLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
