// Говори service worker: network-first so updates show up right away,
// with a cached copy so the app still opens offline.
const CACHE = 'govori-v5';
const CORE = ['./', './index.html', './content.json', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './fonts/golos-text-cyrillic-400-normal.woff2', './fonts/golos-text-cyrillic-500-normal.woff2', './fonts/golos-text-cyrillic-600-normal.woff2', './fonts/golos-text-cyrillic-700-normal.woff2', './fonts/golos-text-latin-400-normal.woff2', './fonts/golos-text-latin-500-normal.woff2', './fonts/golos-text-latin-600-normal.woff2', './fonts/golos-text-latin-700-normal.woff2', './fonts/marck-script-cyrillic-400-normal.woff2', './fonts/marck-script-latin-400-normal.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // never touch API calls
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
