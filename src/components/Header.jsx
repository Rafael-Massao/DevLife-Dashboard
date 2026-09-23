// Header.jsx — agora com ESTADO próprio e o Relogio como filho.
// Mostrar/esconder o relógio demonstra MONTAGEM e DESMONTAGEM na prática:
// abra o console e veja as mensagens do ciclo de vida!

import { useState } from "react";
import Relogio from "./Relogio";

function Header() {
  const [mostrarRelogio, setMostrarRelogio] = useState(true);

  return (
    <header className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        DevLife <span className="text-emerald-400">Dashboard</span>
      </h1>

      <div className="flex items-center gap-3">
        {/* Renderização condicional: se false, o Relogio é DESMONTADO */}
        {mostrarRelogio && (
            <span aria-hidden="true">
                <Relogio />
            </span>
        )}

        <button
          onClick={() => setMostrarRelogio(!mostrarRelogio)}
          aria-pressed={mostrarRelogio}
          className="text-xs border border-slate-600 hover:border-emerald-500 px-3 py-1 rounded-lg transition-colors"
        >
          {mostrarRelogio ? "Esconder relógio" : "Mostrar relógio"}
        </button>
      </div>
    </header>
  );
}

export default Header;