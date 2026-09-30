import { useState, useEffect } from "react";
function InstallPrompt() {
const [promptEvent, setPromptEvent] = useState(null);
const [visivel, setVisivel] = useState(false);
useEffect(() => {
function aoPoderInstalar(evento) {
// Impede o mini-infobar automático do Chrome — vamos mostrar o
// NOSSO botão, no NOSSO momento.
evento.preventDefault();
setPromptEvent(evento);
setVisivel(true);

}
window.addEventListener("beforeinstallprompt", aoPoderInstalar);
return () => window.removeEventListener("beforeinstallprompt", aoPoderInstalar);
}, []);
async function instalar() {
if (!promptEvent) return;
promptEvent.prompt();
await promptEvent.userChoice;
setPromptEvent(null);
setVisivel(false);
}
if (!visivel) return null;
return (
<div
className={`bg-emerald-700 text-white px-6 py-3
flex items-center justify-between gap-4 flex-wrap`}
>
<div className="flex items-center gap-3">
<img src="/icons/icon-192.png" alt="" className="w-8 h-8 rounded-lg" />
<p className="text-sm font-medium">
Instale o DevLife Dashboard no seu dispositivo e use até offline.
</p>
</div>

<div className="flex items-center gap-2">
<button
onClick={instalar}
className={`bg-white text-emerald-800 text-sm font-bold px-4 py-1.5
rounded-lg hover:bg-emerald-50 focus:outline-none focus:ring-2
focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-700`}
>
Instalar
</button>
<button
onClick={() => setVisivel(false)}
aria-label="Fechar aviso de instalação"
className={`text-emerald-100 hover:text-white text-sm px-2
focus:outline-none focus:ring-2 focus:ring-white rounded`}
>
✕
</button>
</div>
</div>
);
}
export default InstallPrompt;