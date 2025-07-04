import { useState } from "react";

const ExpenseForm = ({ onSave, expenseToEdit, onCancel }) => {
  const [nome, setNome] = useState(expenseToEdit ? expenseToEdit.nome : "");
  const [categoria, setCategoria] = useState(expenseToEdit ? expenseToEdit.categoria : "");
  const [valor, setValor] = useState(expenseToEdit ? expenseToEdit.valor : "");
  const [data, setData] = useState(expenseToEdit ? expenseToEdit.data : "");
  const [tipo, setTipo] = useState(expenseToEdit ? expenseToEdit.tipo : "Fixa");
  const [subGastos, setSubGastos] = useState(expenseToEdit ? expenseToEdit.subGastos || [] : []);

  const [novoSubGasto, setNovoSubGasto] = useState({ nome: "", valor: "" });

  const handleAddSubGasto = () => {
    if (novoSubGasto.nome && novoSubGasto.valor) {
      setSubGastos([...subGastos, novoSubGasto]);
      setNovoSubGasto({ nome: "", valor: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      id: expenseToEdit ? expenseToEdit.id : Date.now(),
      nome,
      categoria,
      valor: parseFloat(valor),
      data,
      tipo,
      subGastos: categoria === "Alimentação" ? subGastos : [],
    };
    onSave(expenseData);
    // Limpar campos
    setNome("");
    setCategoria("");
    setValor("");
    setData("");
    setTipo("Fixa");
    setSubGastos([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold">{expenseToEdit ? "Editar" : "Nova"} Despesa</h2>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="border p-1 ml-2"
        />
      </div>

      <div>
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="border p-1 ml-2"
        >
          <option value="">Selecione</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Moradia">Moradia</option>
          <option value="Saúde">Saúde</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div>
        <label>Valor:</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          className="border p-1 ml-2"
        />
      </div>

      <div>
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          className="border p-1 ml-2"
        />
      </div>

      <div>
        <label>Tipo:</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-1 ml-2"
        >
          <option value="Fixa">Fixa</option>
          <option value="Variável">Variável</option>
        </select>
      </div>

      {categoria === "Alimentação" && (
        <div className="border p-2 mt-2 rounded bg-gray-100">
          <h3 className="font-bold">Subgastos</h3>
          {subGastos.map((sg, idx) => (
            <div key={idx} className="flex justify-between text-sm p-1">
              <span>{sg.nome}</span>
              <span>R$ {sg.valor}</span>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Nome subgasto"
              value={novoSubGasto.nome}
              onChange={(e) => setNovoSubGasto({ ...novoSubGasto, nome: e.target.value })}
              className="border p-1"
            />
            <input
              type="number"
              placeholder="Valor"
              value={novoSubGasto.valor}
              onChange={(e) => setNovoSubGasto({ ...novoSubGasto, valor: e.target.value })}
              className="border p-1"
            />
            <button
              type="button"
              onClick={handleAddSubGasto}
              className="bg-blue-500 text-white px-2 rounded"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
          Salvar
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-1 rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
