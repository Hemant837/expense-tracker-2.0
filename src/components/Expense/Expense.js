import React from "react";

const Expense = (props) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold text-blue-600">Money Spent:</p>
          <p className="text-gray-800 font-medium">
            &#8377;{props.newExpense.moneySpend}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-600">Description:</p>
          <p className="text-gray-800 font-medium uppercase">
            {props.newExpense.description}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-600">Category:</p>
          <p className="text-gray-800 font-medium uppercase">
            {props.newExpense.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Expense;
