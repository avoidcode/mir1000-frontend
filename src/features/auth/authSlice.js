import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    userId: localStorage.getItem("id") || false,
    userRole: false,
    isLoggedIn: localStorage.getItem("id") ? true : false,
    darkMode: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            let payload = action.payload
            state.isLoggedIn = true;
            state.userId = payload.id;
            state.userRole = payload.role;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userId = false;
            state.userRole = false;
            toast.success("Вы успешно вышли из системы");
        },
        changeMode: (state) => {
            state.darkMode = !state.darkMode;
            if (state.darkMode) {
                document
                    .querySelector("html")
                    .setAttribute("data-theme", "dark");
            } else {
                document
                    .querySelector("html")
                    .setAttribute("data-theme", "winter");
            }
        },
    },
});

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
