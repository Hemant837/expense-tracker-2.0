import Expense from "./Expense";
import { useSelector } from "react-redux";

const Expenses = () => {
  const userExpense = useSelector((state) => state.expenses.expensesItems);
  

  return (
    <>
      {userExpense.map((expense) => {
        return <Expense key={expense.id} newExpense={expense} />;
      })}
    </>
  );
};

export default Expenses;
