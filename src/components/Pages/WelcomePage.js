import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import Expenses from "../Expense/Expenses";

const WelcomePage = () => {
  // const navigate = useNavigate();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const totalExpenses = useSelector((state) => state.expenses.expensesItems);
  const totalMoneySpent = useSelector((state) => state.expenses.totalAmount);

  // const navigateHandler = () => {
  //   navigate("/update-profile");
  // };

  const downloadCSV = () => {
    const csvData = totalExpenses.map((expense) => {
      return `${expense.moneySpend}, ${expense.description}, ${expense.category}`;
    });

    const csvContent = `Money Spend, Description, Category\n${csvData.join(
      "\n"
    )}\n\n\nTotal Amount, ${totalMoneySpent}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const containerClasses = darkTheme
    ? "bg-black text-white"
    : "bg-white-500 text-blue-600 font-semibold";

  return (
    <div
      className={`my-4 mx-auto max-w-screen-md text-center ${containerClasses}`}
    >
      <h2 className="text-3xl font-semibold mb-4">
        Welcome to Expense Tracker
      </h2>
      {/* <div
        className={`rounded-lg p-4 flex flex-col items-center ${
          darkTheme ? "bg-gray-900" : "bg-orange-300"
        }`}
      >
        <p className="text-lg mb-2">Your profile is incomplete.</p>
        <button
          className={`px-4 py-2 ${
            darkTheme
              ? "bg-blue-600 hover-bg-blue-700"
              : "bg-blue-600 hover-bg-blue-700"
          } text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          onClick={navigateHandler}
        >
          Complete Now
        </button>
      </div> */}
      <p className="text-lg font-semibold my-4">
        Total Expense: &#8377;{totalMoneySpent.toFixed(2)}
      </p>
      <Expenses />
      <div className="flex justify-center"> {/* Center the button */}
        <button
          className={`rounded-lg p-4 flex flex-col items-center ${
            darkTheme ? "bg-gray-700" : "bg-blue-600 text-white"
          }`}
          onClick={downloadCSV}
        >
          Download Expense
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
