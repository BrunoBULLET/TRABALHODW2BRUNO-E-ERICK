import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSaveExpense = (expense) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? expense : e))
      );
    } else {
      setExpenses((prev) => [...prev, expense]);
    }
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Excluir essa despesa?")) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingExpense(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Controle Financeiro</h1>

      {!showForm && (
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {expenses.length === 0 ? "Adicionar despesa" : "Nova despesa"}
          </button>
        </div>
      )}

      {showForm ? (
        <ExpenseForm
          onSave={handleSaveExpense}
          expenseToEdit={editingExpense}
          onCancel={handleCancel}
        />
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
