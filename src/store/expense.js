import { createSlice } from "@reduxjs/toolkit";

const expensesState = {
  expensesItems: [],
  totalAmount: 0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: expensesState,
  reducers: {
    replaceExpenses(state, action) {
      state.expensesItems = action.payload;
    },
    setExpenses(state, action) {
      const newExpenseItem = action.payload;
      state.expensesItems.push({
        id: newExpenseItem.id,
        moneySpend: newExpenseItem.moneySpend,
        description: newExpenseItem.description,
        category: newExpenseItem.category,
      });
      state.totalAmount = state.totalAmount + Number(newExpenseItem.moneySpend);
    },
    setAfterDelete(state, action) {
      const id = action.payload;
      const existingExpense = state.expensesItems.find(
        (expense) => expense.id === id
      );
      if (existingExpense) {
        state.expensesItems = state.expensesItems.filter(
          (expense) => expense.id !== id
        );
        state.totalAmount =
          state.totalAmount - Number(existingExpense.moneySpend);
      }
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
});

export const expensesActions = expenseSlice.actions;

export default expenseSlice;
