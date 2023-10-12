import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { expensesActions } from "../../store/expense";
import axios from "axios";
import formatEmail from "../Function/FormatEmail";
import Expenses from "./Expenses";

const ExpenseForm = () => {
  const moneySpendInputRef = useRef("");
  const descriptionInputRef = useRef("");
  const categoryInputRef = useRef("");
  // const [newExpense, setNewExpense] = useState([]);
  const dispatch = useDispatch();

  // // const userEmail = useSelector((state) => state.auth.userEmail);
  // // const userExpenses = useSelector((state) => state.expenses.expensesItems);

  // // useEffect(() => {
  // //   const newData = async () => {
  // //     try {
  // //       const response = await axios.post(
  // //         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
  // //         { idToken: localStorage.getItem("token") }
  // //       );
  // //       console.log(response.data);
  // //       const newResponse = await axios.get(
  // //         `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
  // //           response.data.users[0].email
  // //         )}/expenseDetails.json`
  // //       );
  // //       dispatch(authActions.setIdToken(localStorage.getItem("token")));
  // //       dispatch(authActions.login());
  // //       dispatch(authActions.setUserEmail(response.data.users[0].email));

  // //       const newItems = Object.keys(newResponse.data).map((key) => {
  // //         return { firebaseId: key, ...newResponse.data[key] };
  // //       });
  // //       setNewExpense(newItems);

  // //       dispatch(expensesActions.setExpenses(newItems));
  // //       console.log(userExpenses);
  // //     } catch (error) {
  // //       console.log(error);
  // //     }
  // //   };
  // //   newData();
  // // }, []);

  // const addExpenseHandler = async (event) => {
  //   event.preventDefault();
  // const enteredMoneySpend = moneySpendInputRef.current.value;
  // const enteredDescription = descriptionInputRef.current.value;
  // const enteredCategory = categoryInputRef.current.value;

  //   const expenseData = {
  // id: Math.random().toString(),
  // moneySpend: enteredMoneySpend,
  // description: enteredDescription,
  // category: enteredCategory,
  //   };

  // setNewExpense((previousExpense) => {
  //   return [...previousExpense, expenseData];
  //  });
  //   // try {
  //   //   const newResponseForAdd = await axios.post(
  //   //     `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
  //   //       userEmail
  //   //     )}/expenseDetails.json`,
  //   //     expenseData
  //   //   );
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }

  //   dispatch(expensesActions.setExpenses(newExpense));

  //   moneySpendInputRef.current.value = "";
  //   descriptionInputRef.current.value = "";
  //   categoryInputRef.current.value = "Food";
  // };

  // const deleteExpenseHandler = async (id, firebaseId) => {
  //   const expenseIndex = newExpense.findIndex((expense) => expense.id === id);

  //   if (expenseIndex === -1) {
  //     // Handle the case where the expense is not found (optional)
  //     console.log(`Expense with id ${id} not found.`);
  //     return;
  //   }

  //   // Remove the expense from the newExpense array
  //   const updatedExpenses = [...newExpense];
  //   updatedExpenses.splice(expenseIndex, 1);

  //   // Update the state with the updatedExpenses array
  //   setNewExpense(updatedExpenses);
  //   console.log(userEmail);
  //   dispatch(expensesActions.setExpenses(updatedExpenses));

  //   try {
  //     const newResponseForDelete = await axios.delete(
  //       `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
  //         userEmail
  //       )}/expenseDetails/${firebaseId}.json`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addExpenseHandler = () => {
    const enteredMoneySpend = moneySpendInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expenseData = {
      id: Math.random().toString(),
      moneySpend: enteredMoneySpend,
      description: enteredDescription,
      category: enteredCategory,
    };

    // setNewExpense((previousExpense) => {
    //   return [...previousExpense, expenseData];
    // });

    dispatch(expensesActions.addNewExpense(expenseData));
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
      
      {/* {newExpense.map((expense) => {
        return (
          <Expense
            newExpense={expense}
            key={expense.id}
            // onDelete={deleteExpenseHandler}
          />
        );
      })} */}
    </>
  );
};

export default ExpenseForm;
