import ItemDespesa from "./ItemDespesa";

const ListaDespesas = ({ despesas, aoEditar, aoExcluir }) => {
  if (despesas.length === 0) {
    return <p className="text-center p-4">Nenhuma despesa cadastrada.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {despesas.map((despesa) => (
        <ItemDespesa
          key={despesa.id}
          despesa={despesa}
          aoEditar={() => aoEditar(despesa)}
          aoExcluir={() => aoExcluir(despesa.id)}
        />
      ))}
    </div>
  );
};

export default ListaDespesas;
