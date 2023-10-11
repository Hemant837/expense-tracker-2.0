import { createSlice } from "@reduxjs/toolkit";

const expensesState = {
  expensesItems: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: expensesState,
  reducers: {
    setExpenses(state, action) {
      state.expensesItems = action.payload;
    },
  },
});

export const expensesActions = expenseSlice.actions;

export default expenseSlice;
