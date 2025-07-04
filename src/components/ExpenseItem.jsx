const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow flex flex-col bg-white">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-bold text-lg">{expense.nome}</h3>
          <p className="text-sm text-gray-600">{expense.categoria} ({expense.tipo})</p>
          <p className="text-sm text-gray-600">{new Date(expense.data).toLocaleDateString()}</p>
        </div>
        <div className="text-green-600 font-bold text-xl">R$ {expense.valor.toFixed(2)}</div>
      </div>

      {expense.subGastos && expense.subGastos.length > 0 && (
        <div className="bg-gray-100 p-2 rounded mt-2">
          <h4 className="font-semibold">Detalhes de alimentação:</h4>
          <ul className="list-disc ml-4 text-sm">
            {expense.subGastos.map((sg, idx) => (
              <li key={idx}>{sg.nome} - R$ {parseFloat(sg.valor).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
