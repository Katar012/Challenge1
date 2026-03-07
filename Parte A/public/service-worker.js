// ${CACHE_NAME} guarda los recursos de la PWA
// Nota: la estrategia actual en fetch es "Network First" (primero va
// a la red y, si falla, recurre a la caché). La estrategia "Cache First"
// serviría siempre el recurso almacenado localmente y solo consulta la
// red cuando no existe. Para una app médica, "cache first" es útil en
// situaciones en las que la interfaz y los datos críticos (pacientes,
// turnos) deben estar disponibles aún sin conexión; sin embargo, hay que
// gestionar con cuidado la caducidad y renovación para no mostrar
// información anticuada.
const CACHE_NAME = "react-pwa-v2";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  ""
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Network First
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});