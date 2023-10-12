import { useNavigate } from "react-router";
import ExpenseForm from "../Expense/ExpenseForm";
import Expenses from "../Expense/Expenses";

const WelcomePage = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/update-profile");
  };

  return (
    <div className="my-4 mx-auto max-w-screen-md text-center">
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">
        Welcome to Expense Tracker
      </h2>
      <div className="bg-orange-300 text-white rounded-lg p-4 flex flex-col items-center">
        <p className="text-lg mb-2">Your profile is incomplete.</p>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onClick={navigateHandler}
        >
          Complete Now
        </button>
      </div>
      <ExpenseForm />
      <Expenses />
    </div>
  );
};

export default WelcomePage;
