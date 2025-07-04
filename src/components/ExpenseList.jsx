import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return <p className="text-center p-4">Nenhuma despesa cadastrada.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={() => onEdit(expense)}
          onDelete={() => onDelete(expense.id)}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
