import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import StatusRede from "./components/StatusRede";
import InstallPrompt from "./components/InstallPrompt";

const TAREFAS_INICIAIS = [
  { id: 1, titulo: "Estudar componentes do React", categoria: "Estudos", prioridade: "alta", concluida: false },
  { id: 2, titulo: "Configurar o Tailwind no projeto", categoria: "Projeto", prioridade: "media", concluida: true },
  { id: 3, titulo: "Beber água 💧", categoria: "Saúde", prioridade: "baixa", concluida: false },
];

function App() {
  // useState: [valorAtual, funçãoQueAtualiza]
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("devlife-tarefas");
    return salvas ? JSON.parse(salvas) : TAREFAS_INICIAIS;
  });

  const [anuncio, setAnuncio] = useState("");
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    console.log("💾 Salvando tarefas no localStorage...");
    localStorage.setItem("devlife-tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa(novaTarefa) {
    setTarefas((atual) => [
      ...atual,
      { ...novaTarefa, id: Date.now(), concluida: false },
    ]);
    setAnuncio(`Tarefa "${novaTarefa.titulo}" adicionada.`);
  }

  function alternarConcluida(id) {
    const tarefaEncontrada = tarefas.find((t) => t.id === id);
    if (!tarefaEncontrada) return;

    const vaiConcluir = !tarefaEncontrada.concluida;
    const status = vaiConcluir ? "concluída" : "pendente";

    setTarefas((atual) =>
      atual.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
    setAnuncio(`Tarefa "${tarefaEncontrada.titulo}" marcada como ${status}.`);
  }

  function removerTarefa(id) {
    const tarefaEncontrada = tarefas.find((t) => t.id === id);

    setTarefas((atual) => atual.filter((t) => t.id !== id));

    if (tarefaEncontrada) {
      setAnuncio(`Tarefa "${tarefaEncontrada.titulo}" removida.`);
    }
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-500 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      
      <Header />
      <StatusRede />
      <InstallPrompt />

      <div aria-live="polite" role="status" className="sr-only">
        {anuncio}
      </div>

      <main id="conteudo" className="max-w-4xl mx-auto px-6 py-10">
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