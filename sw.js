const CACHE_NAME = "pharmacy-adventure-v1";

const APP_ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./pages/level1/level1.html",
    "./pages/level2/level2.html",
    "./pages/level3/level3.html",
    "./pages/levelBoss/levelBoss.html",
    "./assets/img/pills.png",
    "./assets/i18n/en.js",
    "./assets/i18n/ms.js",
    "./assets/i18n/i18n.js",
    "./assets/sound/bckgrd.mp3",
    "./assets/sound/lvl1.mp3",
    "./assets/sound/lvl2.mp3",
    "./assets/sound/lvl3.mp3",
    "./assets/sound/lvlBoss.mp3"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request).then(response => response || caches.match("./index.html")))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type === "opaque") return response;
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
            return response;
        }))
    );
});
