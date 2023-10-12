import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import expensesSlice from "./expense";

const store = configureStore({
  reducer: { auth: authSlice.reducer, expenses: expensesSlice.reducer },
});

export default store;
