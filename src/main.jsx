import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Importa o arquivo CSS para estilizar a aplicação (opcional)

// Cria a raiz da aplicação React no elemento HTML com id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode ajuda a detectar problemas no código durante o desenvolvimento
  <React.StrictMode>
    <App /> {/* Renderiza o componente principal da aplicação */}
  </React.StrictMode>
);
