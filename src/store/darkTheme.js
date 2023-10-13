import { createSlice } from "@reduxjs/toolkit";

const darkThemeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const darkThemeActions = darkThemeSlice.actions;

export default darkThemeSlice;
