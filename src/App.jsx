// App.jsx — agora com ESTADO de verdade!
// O array de tarefas deixa de ser fixo e passa a viver no useState.
// Toda vez que o estado muda, o React RE-RENDERIZA a tela sozinho.

import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

const TAREFAS_INICIAIS = [
  { id: 1, titulo: "Estudar componentes do React", categoria: "Estudos", prioridade: "alta", concluida: false },
  { id: 2, titulo: "Configurar o Tailwind no projeto", categoria: "Projeto", prioridade: "media", concluida: true },
  { id: 3, titulo: "Beber água 💧", categoria: "Saúde", prioridade: "baixa", concluida: false },
];

function App() {
  // useState: [valorAtual, funçãoQueAtualiza]
  // A função lazy (() => ...) só roda a leitura do localStorage
  // UMA vez, na montagem — não a cada renderização.
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("devlife-tarefas");
    return salvas ? JSON.parse(salvas) : TAREFAS_INICIAIS;
  });

  const [anuncio, setAnuncio] = useState("");
  const [filtro, setFiltro] = useState("todas");

  // EFEITO COLATERAL: sincronizar o estado com o localStorage.
  // Roda toda vez que `tarefas` muda (é a dependência do array).
  useEffect(() => {
    console.log("💾 Salvando tarefas no localStorage...");
    localStorage.setItem("devlife-tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa(novaTarefa) {
    // Nunca alteramos o array diretamente (tarefas.push(...) ❌)
    // Sempre criamos um NOVO array — imutabilidade é regra de ouro no React.
    setTarefas((atual) => [
      ...atual,
      { ...novaTarefa, id: Date.now(), concluida: false },
    ]);
    setAnuncio(`Tarefa "${novaTarefa.titulo}" adicionada.`)
  }

  function alternarConcluida(id) {
    const tarefa = tarefa.find((t) => t.id === id);
    const setConcluir = !tarefa.concluida;
    const status = vaiConcluir ? "concluida" : "pendente";
    setTarefas((atual) =>
      atual.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
    setAnuncio(`Tarefa "${tarefa.titulo}" marcado como ${status}`)
  }

  function removerTarefa(id) {
    const tarefa = tarefa.find((t) => t.id === id);
    setTarefas((atual) => atual.filter((t) => t.id !== id));
    setAnuncio(`Tarefa "${tarefa.titulo}" removida. `);
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true; // "todas"
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <a
        href="#conteudo"
        className={"sr-only focus:not-st-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-500 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"} />
      <Header />

      <div aria-live="polite" role="status" className="sr-only">
        {anuncio}
      </div>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <TaskForm onAdicionar={adicionarTarefa} />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-700">
            Minhas tarefas ({tarefasFiltradas.length})
          </h2>

          <div className="flex gap-2">
            {["todas", "pendentes", "concluidas"].map((opcao) => (
              <button
                key={opcao}
                onClick={() => setFiltro(opcao)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filtro === opcao
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-300"
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>

        {tarefasFiltradas.length === 0 ? (
          <p className="text-slate-400 text-center py-10">
            Nenhuma tarefa por aqui. 🎉
          </p>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2">
            {tarefasFiltradas.map((tarefa) => (
              <TaskCard
                key={tarefa.id}
                titulo={tarefa.titulo}
                categoria={tarefa.categoria}
                prioridade={tarefa.prioridade}
                concluida={tarefa.concluida}
                onToggle={() => alternarConcluida(tarefa.id)}
                onRemover={() => removerTarefa(tarefa.id)}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
