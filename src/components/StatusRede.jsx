import { useState, useEffect } from "react";
function StatusRede() {
const [online, setOnline] = useState(navigator.onLine);
useEffect(() => {
function aoFicarOnline() {
setOnline(true);
}
function aoFicarOffline() {
setOnline(false);
}
window.addEventListener("online", aoFicarOnline);
window.addEventListener("offline", aoFicarOffline);

return () => {
window.removeEventListener("online", aoFicarOnline);
window.removeEventListener("offline", aoFicarOffline);
};
}, []);
if (online) return null;
return (
<div
role="status"
aria-live="polite"
className="bg-amber-100 text-amber-900 text-sm text-center py-2 font-semibold"
>
📡 Você está offline — mostrando os dados salvos no seu dispositivo.
</div>
);
}
export default StatusRede;