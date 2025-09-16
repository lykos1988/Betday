const CACHE_NAME = "betday-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
  // Αν έχεις CSS, JS αρχεία, icons κ.λπ. βάλε κι αυτά εδώ
];

// Εγκατάσταση
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch από cache πρώτα
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Αναβάθμιση cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
