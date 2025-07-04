import { useState } from "react"; // importa o hook useState do React

// componente de formulário de despesa
const FormularioDespesa = ({ aoSalvar, despesaParaEditar, aoCancelar }) => {
  // estados para os campos do formulário, inicializados com valores da despesaParaEditar (caso exista)
  const [nome, setNome] = useState(despesaParaEditar ? despesaParaEditar.nome : "");
  const [categoria, setCategoria] = useState(despesaParaEditar ? despesaParaEditar.categoria : "");
  const [valor, setValor] = useState(despesaParaEditar ? despesaParaEditar.valor : "");
  const [data, setData] = useState(despesaParaEditar ? despesaParaEditar.data : "");
  const [tipo, setTipo] = useState(despesaParaEditar ? despesaParaEditar.tipo : "Fixa");
  const [subGastos, setSubGastos] = useState(
    despesaParaEditar ? despesaParaEditar.subGastos || [] : []
  );

  // estado para controlar um novo subgasto digitado pelo usuário
  const [novoSubGasto, setNovoSubGasto] = useState({ nome: "", valor: "" });

  // função para adicionar o subgasto digitado ao array de subGastos
  const adicionarSubGasto = () => {
    if (novoSubGasto.nome && novoSubGasto.valor) {
      setSubGastos([...subGastos, novoSubGasto]); // adiciona ao array existente
      setNovoSubGasto({ nome: "", valor: "" }); // reseta o campo do subgasto
    }
  };

  // função chamada ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // evita o comportamento padrão do form
    const dados = {
      id: despesaParaEditar ? despesaParaEditar.id : Date.now(), // cria um id novo se não for edição
      nome,
      categoria,
      valor: parseFloat(valor), // transforma valor para número
      data,
      tipo,
      subGastos: categoria === "Alimentação" ? subGastos : [], // somente se for alimentação salva os subgastos
    };
    aoSalvar(dados); // chama a função passada por props para salvar
    // limpa o formulário
    setNome("");
    setCategoria("");
    setValor("");
    setData("");
    setTipo("Fixa");
    setSubGastos([]);
  };

  return (
    // estrutura do formulário
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-4">
      {/* título do formulário */}
      <h2 className="text-xl font-bold">
        {despesaParaEditar ? "Editar" : "Nova"} Despesa
      </h2>

      {/* campo nome */}
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)} // atualiza estado
          required
          className="border p-1 ml-2"
        />
      </div>

      {/* campo categoria */}
      <div>
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)} // atualiza estado
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

      {/* campo valor */}
      <div>
        <label>Valor:</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)} // atualiza estado
          required
          className="border p-1 ml-2"
          min={0}
        />
      </div>

      {/* campo data */}
      <div>
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)} // atualiza estado
          required
          className="border p-1 ml-2"
        />
      </div>

      {/* campo tipo (fixa ou variável) */}
      <div>
        <label>Tipo:</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)} // atualiza estado
          className="border p-1 ml-2"
        >
          <option value="Fixa">Fixa</option>
          <option value="Variável">Variável</option>
        </select>
      </div>

      {/* campos extras de subgastos aparecem só para categoria Alimentação */}
      {categoria === "Alimentação" && (
        <div className="border p-2 mt-2 rounded bg-gray-100">
          <h3 className="font-bold">Subgastos</h3>
          {/* lista dos subgastos já inseridos */}
          {subGastos.map((sg, idx) => (
            <div key={idx} className="flex justify-between text-sm p-1">
              <span>{sg.nome}</span>
              <span>R$ {sg.valor}</span>
            </div>
          ))}

          {/* campos para adicionar novo subgasto */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Nome subgasto"
              value={novoSubGasto.nome}
              onChange={(e) =>
                setNovoSubGasto({ ...novoSubGasto, nome: e.target.value })
              } // atualiza o nome do novo subgasto
              className="border p-1"
            />
            <input
              type="number"
              placeholder="Valor"
              value={novoSubGasto.valor}
              onChange={(e) =>
                setNovoSubGasto({ ...novoSubGasto, valor: e.target.value })
              } // atualiza o valor do novo subgasto
              className="border p-1"
            />
            <button
              type="button"
              onClick={adicionarSubGasto} // adiciona na lista
              className="bg-blue-500 text-white px-2 rounded"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* botões de salvar e cancelar */}
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
          Salvar
        </button>
        {aoCancelar && (
          <button
            type="button"
            onClick={aoCancelar} // botão de cancelar chama a função aoCancelar se existir
            className="bg-gray-500 text-white px-4 py-1 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioDespesa; // exporta o componente
