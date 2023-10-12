import Expense from "./Expense";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";

const Expenses = () => {
  const userExpense = useSelector((state) => state.expenses.expensesItems);

  return (
    <>
      <ExpenseForm />
      {userExpense.map((expense) => {
        return <Expense key={expense.id} id={expense.id} newExpense={expense} />;
      })}
    </>
  );
};

export default Expenses;
