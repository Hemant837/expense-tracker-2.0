import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { expensesActions } from "../../store/expense";
import formatEmail from "../Function/FormatEmail";

const Expense = (props) => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const { newExpense, onDelete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({ ...newExpense });

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedExpense({ ...newExpense });
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);
    try {
      // const responseForSaveEdit = await axios.post(
      //   "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
      //   { idToken: localStorage.getItem("token") }
      // );

      const responseForSaveEdit = await axios.put(
        `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
          userEmail
        )}/expenseDetails/${editedExpense.firebaseId}.json`,
        editedExpense
      );
      dispatch(expensesActions.setExpenses(editedExpense));
      console.log(responseForSaveEdit.data);
      console.log(userEmail);
      console.log(editedExpense);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Editing", name, value);
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
    console.log("Changing category", name, value);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
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
              className="border rounded-md w-full py-2 px-3 text-gray-700"
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
              className="border rounded-md w-full py-2 px-3 text-gray-700"
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
              className="border rounded-md w-full py-2 px-3 text-gray-700"
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
              className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-2 py-1 rounded-md"
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
            <p className="text-gray-800 font-medium">
              &#8377;{editedExpense.moneySpend}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">Description:</p>
            <p className="text-gray-800 font-medium uppercase">
              {editedExpense.description}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">Category:</p>
            <p className="text-gray-800 font-medium uppercase">
              {editedExpense.category}
            </p>
          </div>
          <div>
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded-md"
              onClick={() => onDelete(newExpense.id, newExpense.firebaseId)}
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
