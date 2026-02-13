import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    mode: "light" | "dark";
}

const initialState: ThemeState = {
    mode: "dark", // Default to dark as per existing design
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
