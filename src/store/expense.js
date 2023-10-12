import { createSlice } from "@reduxjs/toolkit";

const expensesState = {
  expensesItems: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: expensesState,
  reducers: {
    setExpenses(state, action) {
      state.expensesItems.push(action.payload);
    },
  },
});

export const expensesActions = expenseSlice.actions;

export default expenseSlice;
