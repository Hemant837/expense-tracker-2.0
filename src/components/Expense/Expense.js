import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expense";
import formatEmail from "../Function/FormatEmail";

const Expense = (props) => {
  const { newExpense, id } = props;
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({ ...newExpense });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedExpense({ ...newExpense });
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);

    dispatch(expensesActions.updateExpense(editedExpense));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedExpense({
      ...editedExpense,
      [name]: value,
    });
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setEditedExpense({
      ...editedExpense,
      [name]: value,
    });
  };

  const deleteExpenseHandler = () => {
    dispatch(expensesActions.setAfterDelete(id));
    try {
      axios.delete(
        `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
          userEmail
        )}/expenseData/${editedExpense.firebaseId}.json`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`p-4 mb-4 rounded-lg shadow-md ${darkTheme ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"}`}>
      {isEditing ? (
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 pr-4">
            <label htmlFor="edited-money-spend" className="block text-gray-700">
              Money Spend:
            </label>
            <input
              id="edited-money-spend"
              type="number"
              name="moneySpend"
              className={`border rounded-md w-full py-2 px-3 text-gray-700 ${
                darkTheme ? "bg-gray-800 text-gray-300" : "bg-white"
              }`}
              value={editedExpense.moneySpend}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/3 mb-4 pr-4">
            <label htmlFor="edited-description" className="block text-gray-700">
              Description:
            </label>
            <input
              id="edited-description"
              type="text"
              name="description"
              className={`border rounded-md w-full py-2 px-3 text-gray-700 ${
                darkTheme ? "bg-gray-800 text-gray-300" : "bg-white"
              }`}
              value={editedExpense.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/3 mb-4">
            <label htmlFor="edited-category" className="block text-gray-700">
              Category:
            </label>
            <select
              id="edited-category"
              name="category"
              className={`border rounded-md w-full py-2 px-3 text-gray-700 ${
                darkTheme ? "bg-gray-800 text-gray-300" : "bg-white"
              }`}
              value={editedExpense.category}
              onChange={handleCategoryChange}
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div className="w-full">
            <button
              className={`${
                darkTheme ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
              } px-2 py-1 rounded-md mr-2`}
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className={`${
                darkTheme ? "bg-gray-700 text-white" : "bg-gray-400 text-white"
              } px-2 py-1 rounded-md`}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-blue-600">Money Spent:</p>
            <p className={`text-gray-800 font-medium ${darkTheme ? "text-gray-300" : "text-gray-800"}`}>
              &#8377;{editedExpense.moneySpend}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">Description:</p>
            <p className={`text-gray-800 font-medium uppercase ${darkTheme ? "text-gray-300" : "text-gray-800"}`}>
              {editedExpense.description}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">Category:</p>
            <p className={`text-gray-800 font-medium uppercase ${darkTheme ? "text-gray-300" : "text-gray-800"}`}>
              {editedExpense.category}
            </p>
          </div>
          <div>
            <button
              className={`${
                darkTheme ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
              } px-2 py-1 rounded-md mr-2`}
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className={`${
                darkTheme ? "bg-gray-700 text-white" : "bg-red-600 text-white"
              } px-2 py-1 rounded-md`}
              onClick={deleteExpenseHandler}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
