import React, { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expense";
import formatEmail from "../Function/FormatEmail";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const darkTheme = useSelector((state) => state.theme.darkTheme); // Added dark theme state

  const moneySpendInputRef = useRef("");
  const descriptionInputRef = useRef("");
  const categoryInputRef = useRef();

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const enteredMoneySpend = moneySpendInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expenseData = {
      id: Math.random().toString(),
      moneySpend: enteredMoneySpend,
      description: enteredDescription,
      category: enteredCategory,
    };

    // Dispatch the action after updating the local state
    dispatch(expensesActions.setExpenses(expenseData));

    try {
      const { data } = await axios.post(
        `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
          userEmail
        )}/expenseData.json`,
        expenseData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    moneySpendInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "Food";
  };

  return (
    <div
      className={`px-4 ${
        darkTheme ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
      } rounded-md shadow-md p-4 mb-4`}
    >
      <form onSubmit={addExpenseHandler}>
        <h2
          className={`text-3xl font-semibold ${
            darkTheme ? "text-blue-300" : "text-blue-600"
          } mb-4`}
        >
          Enter your Expense here
        </h2>
        <div className="mb-4">
          <label
            htmlFor="money-spend"
            className={`block ${darkTheme ? "text-gray-300" : "text-gray-700"}`}
          >
            Money Spend
          </label>
          <input
            id="money-spend"
            type="number"
            className={`border rounded-md w-full py-2 px-3 ${
              darkTheme ? "text-gray-300" : "text-gray-700"
            }`}
            ref={moneySpendInputRef}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="expense-description"
            className={`block ${darkTheme ? "text-gray-300" : "text-gray-700"}`}
          >
            Description of the expense
          </label>
          <input
            id="expense-description"
            type="text"
            className={`border rounded-md w-full py-2 px-3 ${
              darkTheme ? "text-gray-300" : "text-gray-700"
            }`}
            ref={descriptionInputRef}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className={`block ${darkTheme ? "text-gray-300" : "text-gray-700"}`}
          >
            Category
          </label>
          <select
            id="category"
            className={`border rounded-md w-full py-2 px-3 ${
              darkTheme ? "text-gray-300" : "text-gray-700"
            }`}
            ref={categoryInputRef}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <button
          className={`px-4 py-2 ${
            darkTheme
              ? "bg-blue-300 hover:bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          type="submit"
        >
          Submit
        </button>
      </form>
      <h2
        className={`text-2xl font-semibold ${
          darkTheme ? "text-blue-300" : "text-blue-600"
        } my-4`}
      >
        Expense Details
      </h2>
    </div>
  );
};

export default ExpenseForm;
