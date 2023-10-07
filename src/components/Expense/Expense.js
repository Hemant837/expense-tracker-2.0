import React from "react";

const Expense = (props) => {
  const { newExpense, onEdit, onDelete } = props;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-blue-600">Money Spent:</p>
          <p className="text-gray-800 font-medium">
            &#8377;{newExpense.moneySpend}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-600">Description:</p>
          <p className="text-gray-800 font-medium uppercase">
            {newExpense.description}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-600">Category:</p>
          <p className="text-gray-800 font-medium uppercase">
            {newExpense.category}
          </p>
        </div>
        <div>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2"
            // onClick={() => onEdit(newExpense)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-white px-2 py-1 rounded-md"
            // onClick={() => onDelete(newExpense.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
