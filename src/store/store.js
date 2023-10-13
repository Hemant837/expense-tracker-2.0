import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import expenseSlice from "./expense";
import darkThemeSlice from "./darkTheme";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expenses: expenseSlice.reducer,
    theme: darkThemeSlice.reducer,
  },
});

export default store;
