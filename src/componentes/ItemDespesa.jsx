// componente de exibição de uma despesa individual
const ItemDespesa = ({ despesa, aoEditar, aoExcluir }) => {
  return (
    // contêiner principal da despesa
    <div className="border rounded p-4 shadow flex flex-col bg-white">
      <div className="flex justify-between items-center mb-2">
        <div>
          {/* nome da despesa */}
          <h3 className="font-bold text-lg">{despesa.nome}</h3>

          {/* categoria e tipo da despesa (fixa/variável) */}
          <p className="text-sm text-gray-600">
            {despesa.categoria} ({despesa.tipo})
          </p>

          {/* data formatada no padrão local */}
          <p className="text-sm text-gray-600">
            {new Date(despesa.data).toLocaleDateString()}
          </p>
        </div>

        {/* valor total da despesa, formatado em reais */}
        <div className="text-green-600 font-bold text-xl">
          R$ {despesa.valor.toFixed(2)}
        </div>
      </div>

      {/* se a despesa tiver subgastos (ex.: alimentação detalhada), lista eles */}
      {despesa.subGastos && despesa.subGastos.length > 0 && (
        <div className="bg-gray-100 p-2 rounded mt-2">
          <h4 className="font-semibold">Detalhes de alimentação:</h4>
          <ul className="list-disc ml-4 text-sm">
            {despesa.subGastos.map((sg, idx) => (
              <li key={idx}>
                {sg.nome} - R$ {parseFloat(sg.valor).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* botões de ação: editar ou excluir a despesa */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={aoEditar}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
        <button
          onClick={aoExcluir}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ItemDespesa;
