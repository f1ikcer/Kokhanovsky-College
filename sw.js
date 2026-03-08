/* ═══════════════════════════════════════════════════
   КГК — Service Worker (офлайн-кэш)
   ═══════════════════════════════════════════════════ */

const CACHE_NAME = "kgk-v1";

// Все файлы сайта — кэшируем при установке
const ASSETS = [
  "./index.html",
  "./schedule.html",
  "./about.html",
  "./gallery.html",
  "./contacts.html",
  "./wheel.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Установка — кэшируем все файлы
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Активация — удаляем старый кэш
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Запросы — сначала кэш, потом сеть
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Кэшируем новые ресурсы
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // Если нет сети — возвращаем кэш
    })
  );
});
