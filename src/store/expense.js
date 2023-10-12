import { createSlice } from "@reduxjs/toolkit";

const expensesState = {
  expenseItems: [],
  totalAmount: 0,
};

const expensesSlice = createSlice({
  name: "expense",
  initialState: expensesState,
  reducers: {
    addNewExpense(state, action) {
      const newExpenseItem = action.payload;
      state.expenseItems.push({
        id: newExpenseItem.id,
        moneySpend: newExpenseItem.moneySpend,
        description: newExpenseItem.description,
        category: newExpenseItem.category,
      });
      state.totalAmount = state.totalAmount + newExpenseItem.moneySpend;
      // state.expenseItems = action.payload;
    },
    deleteExpense(state, action) {
      const id = action.payload;
      const existingExpense = state.expenseItems.find(
        (expense) => expense.id === id
      );
      if (existingExpense) {
        state.expenseItems.filter((expense) => expense.id !== id);
        state.totalAmount = state.totalAmount - existingExpense.moneySpend;
      }
    },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;
