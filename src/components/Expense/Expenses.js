import { useSelector } from "react-redux";
import Expense from "./Expense";

const Expesnes = (props) => {
  const userExpense = useSelector((state) => state.expenses.expensesItems);

  return (
    <>
      {userExpense.map((expense) => {
        return (
          <Expense
            newExpense={expense}
            key={expense.id}
            onDelete={props.onDelete}
          />
        );
      })}
    </>
  );
};

export default Expesnes;
