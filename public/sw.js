// ===== SERVICE WORKER — SistemaVida Entrenamiento =====
// Caching strategy: network-first for API, cache-first for static assets.

const CACHE = 'sv-v1';

// Assets to pre-cache on install
const PRECACHE = [
  './',
  './index.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip Supabase API requests — always network
  if (url.hostname.includes('supabase')) return;

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
      // Return cache immediately if available, update in background
      return cached || networkFetch;
    })
  );
});
