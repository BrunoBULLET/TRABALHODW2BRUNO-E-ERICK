import { useState } from "react";
import FormularioDespesa from "./componentes/FormularioDespesa";
import ListaDespesas from "./componentes/ListaDespesas";

function App() {
  // estado para armazenar todas as despesas cadastradas
  const [despesas, setDespesas] = useState([]);

  // estado para armazenar a despesa que está sendo editada (ou null se nenhuma)
  const [despesaEditando, setDespesaEditando] = useState(null);

  // estado para controlar se o formulário está visível ou não
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // função para salvar uma nova despesa ou atualizar uma existente
  const salvarDespesa = (despesa) => {
    if (despesaEditando) {
      // se estiver editando, atualiza a despesa na lista
      setDespesas((prev) =>
        prev.map((d) => (d.id === despesa.id ? despesa : d))
      );
    } else {
      // se for nova despesa, adiciona à lista
      setDespesas((prev) => [...prev, despesa]);
    }
    // limpa o estado de edição e oculta o formulário
    setDespesaEditando(null);
    setMostrarFormulario(false);
  };

  // função chamada ao clicar para editar uma despesa
  const editarDespesa = (despesa) => {
    setDespesaEditando(despesa); // define a despesa que será editada
    setMostrarFormulario(true); // mostra o formulário para edição
  };

  // função para excluir uma despesa pelo seu id
  const excluirDespesa = (id) => {
    // confirmação antes de excluir
    if (window.confirm("Tem certeza que deseja excluir?")) {
      setDespesas((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // função para cancelar a edição ou criação e esconder o formulário
  const cancelar = () => {
    setDespesaEditando(null);
    setMostrarFormulario(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      {/* Título da aplicação */}
      <h1 className="text-3xl font-bold mb-6 text-center">Controle Financeiro</h1>

      {/* Se o formulário não estiver visível, exibe o botão para adicionar nova despesa */}
      {!mostrarFormulario && (
        <div className="mb-6 text-center">
          <button
            onClick={() => setMostrarFormulario(true)} // mostra o formulário ao clicar
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {/* Texto muda se não houver despesas */}
            {despesas.length === 0 ? "Adicionar despesa" : "Nova despesa"}
          </button>
        </div>
      )}

      {/* Se o formulário estiver visível, exibe o formulário para criar/editar despesa */}
      {mostrarFormulario ? (
        <FormularioDespesa
          aoSalvar={salvarDespesa} // função para salvar a despesa
          despesaParaEditar={despesaEditando} // despesa que está sendo editada (ou null)
          aoCancelar={cancelar} // função para cancelar edição/criação
        />
      ) : (
        // Se o formulário não estiver visível, exibe a lista de despesas
        <ListaDespesas
          despesas={despesas} // lista de despesas para exibir
          aoEditar={editarDespesa} // função chamada para editar uma despesa
          aoExcluir={excluirDespesa} // função chamada para excluir uma despesa
        />
      )}
    </div>
  );
}

export default App;
