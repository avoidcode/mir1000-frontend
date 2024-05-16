import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const getTokenParam = (param) => {
    try {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        return decodedToken[param] ?? false;
    }
    catch {
        return false;
    }
}

const initialState = {
    userId: getTokenParam("user_id"),
    userRole: getTokenParam("role_id"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
    darkMode: localStorage.getItem("dark_mode") === "enabled",
    token: localStorage.getItem("token")
};

const setColorMode = (mode) => {
    if (mode) {
        document
            .querySelector("html")
            .setAttribute("data-theme", "dark");
    } else {
        document
            .querySelector("html")
            .setAttribute("data-theme", "winter");
    }
}

setColorMode(initialState.darkMode);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            let payload = action.payload;
            localStorage.setItem("token", payload.token);
            state.token = payload.token;
            state.isLoggedIn = true;
            state.userId = getTokenParam("user_id");
            state.userRole = getTokenParam("role_id");
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userId = false;
            state.userRole = false;
            state.token = false;
            localStorage.setItem("token", false);
            toast.success("Вы успешно вышли из системы");
        },
        changeMode: (state) => {
            state.darkMode = !state.darkMode;
            setColorMode(state.darkMode);
            localStorage.setItem("dark_mode", state.darkMode ? "enabled" : "disabled");
        },
    },
});

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
