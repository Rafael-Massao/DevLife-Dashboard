import { useState } from "react";

function TaskForm({ onAdicionar }) {
  // Um estado para cada campo do formulário
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Estudos");
  const [prioridade, setPrioridade] = useState("media");

  function aoEnviar(evento) {
    evento.preventDefault(); // impede o recarregamento da página

    if (titulo.trim() === "") return; // validação simples

    onAdicionar({ titulo, categoria, prioridade });
    setTitulo(""); // limpa o campo após adicionar
  }

  return (
    <form onSubmit={aoEnviar} className="bg-white rounded-xl shadow-md p-5 mb-8 flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Nova tarefa
        </label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="O que precisa ser feito?" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Categoria
        </label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2">
          <option>Estudos</option>
          <option>Projeto</option>
          <option>Saúde</option>
          <option>Pessoal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Prioridade
        </label>
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2">
          <option value="alta">alta</option>
          <option value="media">media</option>
          <option value="baixa">baixa</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2 rounded-lg transition-colors"
      >
        + Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
