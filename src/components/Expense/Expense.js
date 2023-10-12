import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { expensesActions } from "../../store/expense";

const Expense = (props) => {
  const { newExpense } = props;
  const dispatch = useDispatch();
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

  const deleteExpenseHandler = () => {
    // const expenseIndex = userExpense.findIndex((expense) => expense.id === id);

    // if (expenseIndex === -1) {
    //   // Handle the case where the expense is not found (optional)
    //   console.log(`Expense with id ${id} not found.`);
    //   return;
    // }

    // // Remove the expense from the newExpense array
    // const updatedExpenses = [...userExpense];
    // updatedExpenses.splice(expenseIndex, 1);
    // Update the state with the updatedExpenses array

    dispatch(expensesActions.setAfterDelete(newExpense.id));
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
