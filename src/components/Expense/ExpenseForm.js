import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import expensesActions from "../../store/expense";
import Expense from "./Expense";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const moneySpendInputRef = useRef("");
  const descriptionInputRef = useRef("");
  const categoryInputRef = useRef("");
  const [newExpense, setNewExpense] = useState([]);

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const enteredMoneySpend = moneySpendInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expenseData = {
      id: Math.random(),
      moneySpend: enteredMoneySpend,
      description: enteredDescription,
      category: enteredCategory,
    };

    setNewExpense((previousExpense) => {
      return [...previousExpense, expenseData];
    });

    dispatch();

    moneySpendInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "Food";
  };

  const deleteExpenseHandler = async (id, firebaseId) => {
    const expenseIndex = newExpense.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
      // Handle the case where the expense is not found (optional)
      console.log(`Expense with id ${id} not found.`);
      return;
    }

    // Remove the expense from the newExpense array
    const updatedExpenses = [...newExpense];
    updatedExpenses.splice(expenseIndex, 1);

    // Update the state with the updatedExpenses array
    setNewExpense(updatedExpenses);
  };

  return (
    <>
      <form onSubmit={addExpenseHandler}>
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">
          Enter your Expense here
        </h2>
        <div className="mb-4">
          <label htmlFor="money-spend" className="block text-gray-700">
            Money Spend
          </label>
          <input
            id="money-spend"
            type="number"
            className="border rounded-md w-full py-2 px-3 text-gray-700"
            ref={moneySpendInputRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expense-description" className="block text-gray-700">
            Description of the expense
          </label>
          <input
            id="expense-description"
            type="text"
            className="border rounded-md w-full py-2 px-3 text-gray-700"
            ref={descriptionInputRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            id="category"
            className="border rounded-md w-full py-2 px-3 text-gray-700"
            ref={categoryInputRef}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
      <h2 className="text-2xl font-semibold text-blue-600 my-4">
        Expense Details
      </h2>
      {newExpense.map((expense) => {
        return (
          <Expense
            newExpense={expense}
            key={expense.id}
            onDelete={deleteExpenseHandler}
          />
        );
      })}
    </>
  );
};

export default ExpenseForm;
