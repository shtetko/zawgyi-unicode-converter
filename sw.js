const CACHE_NAME = "zu-font-converter-v1.1";
const urlsToCache = [
  "/",
  "/css/index.css",
  "/js/index.js",
  "/favicon.ico",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://unpkg.com/rabbit-node@1.0.3/dist/rabbit.min.js"
]
  
self.addEventListener("install", (event) => {
    event.waitUtil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
    )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});