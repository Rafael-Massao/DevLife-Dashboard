const CACHE_NAME = "devlife-cache-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((nomes) =>
        Promise.all(
          nomes
            .filter((nome) => nome !== CACHE_NAME)
            .map((nome) => caches.delete(nome))
        )
      )
      .then(() => self.clients.claim())
  );
});

// FETCH
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((respostaEmCache) => {
      // 1. Se já existe no cache, entrega imediatamente e atualiza em segundo plano (quando online)
      if (respostaEmCache) {
        fetch(request)
          .then((respostaDaRede) => {
            if (respostaDaRede && respostaDaRede.status === 200 && respostaDaRede.type === "basic") {
              const copia = respostaDaRede.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
            }
          })
          .catch(() => {
            /* Silencia erro de rede offline no background */
          });

        return respostaEmCache;
      }

      // 2. Se NÃO está no cache, tenta buscar na rede e guardar
      return fetch(request)
        .then((respostaDaRede) => {
          if (respostaDaRede && respostaDaRede.status === 200 && respostaDaRede.type === "basic") {
            const copia = respostaDaRede.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
          }
          return respostaDaRede;
        })
        .catch(() => {
          // Fallback para requisições de navegação HTML quando estiver totalmente offline
          if (request.mode === "navigate") {
            return caches.match("/index.html") || caches.match("/");
          }
        });
    })
  );
});