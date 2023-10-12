import Expense from "./Expense";
import { useSelector } from "react-redux";

const Expenses = () => {
    const newExpenses = useSelector((state) => state.expenses.expenseItems);
  return (
    <>
      {newExpenses.map((expense) => {
        return <Expense key={expense.id} newExpense={expense} />;
      })}
    </>
  );
};

export default Expenses;
