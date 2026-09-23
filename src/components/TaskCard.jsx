// TaskCard.jsx — agora também dispara eventos para o pai.
// O card não guarda estado próprio de "concluída": ele recebe o valor
// via props e AVISA o pai quando algo muda (onToggle, onRemover).
// Isso é "levantar o estado" (lifting state up) — o App é a fonte da verdade.

const prioridadeEstilo = {
  alta: "bg-red-100 text-red-700",
  media: "bg-yellow-100 text-yellow-800",
  baixa: "bg-emerald-100 text-emerald-700",
};

function TaskCard({ titulo, categoria, prioridade, concluida, onToggle, onRemover }) {
  return (
    <article
      className={`bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border border-slate-100 ${
        concluida ? "bg-slate-50" : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
          {categoria}
        </span>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${prioridadeEstilo[prioridade]}`}
        >
          {prioridade}
        </span>
      </div>

      <h2
        className={`text-lg font-semibold text-slate-800 mb-4 ${
          concluida ? "line-through" : "text-slate-800"
        }`}
      >
        {titulo}
      </h2>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={concluida}
            onChange={onToggle}
            className="w-4 h-4 accent-emerald-500"
          />
          Concluída
        </label>

        <button
          onClick={onRemover}
          className="text-xs text-red-600 hover:text-red-700 font-semibold"
          aria-label={`Remover Tarefa ${titulo}`}
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
