import { createSlice } from "@reduxjs/toolkit";

const expensesState = {
  expensesItems: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: expensesState,
  reducers: {
    setExpenses(state, action) {
      const newExpenseItem = action.payload;
      state.expensesItems.push({
        id: newExpenseItem.id,
        moneySpend: newExpenseItem.moneySpend,
        description: newExpenseItem.description,
        category: newExpenseItem.category,
      });
      state.totalAmount = state.totalAmount + newExpenseItem.moneySpend;
    },
    setAfterDelete(state, action) {
      const id = action.payload;
      const existingExpense = state.expensesItems.find(
        (expense) => expense.id === id
      );
      if (existingExpense) {
        state.expensesItems.filter((expense) => expense.id !== id);
        state.totalAmount = state.totalAmount - existingExpense.moneySpend;
      }
    },
  },
});

export const expensesActions = expenseSlice.actions;

export default expenseSlice;
