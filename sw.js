const CACHE_NAME = "pharmacy-adventure-v12"; // PENTING: Ubah version setiap kali update code

const APP_ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./pages/level1/level1.html",
    "./pages/level1/level1.css",
    "./pages/level1/level1.js",
    "./pages/level2/level2.html",
    "./pages/level2/level2.css",
    "./pages/level2/level2.js",
    "./pages/level3/level3.html",
    "./pages/level3/level3.css",
    "./pages/level3/level3.js",
    "./pages/levelBoss/levelBoss.html",
    "./assets/icon/meditips.ico",
    "./assets/font/ComicNeue-Regular.ttf",
    "./assets/font/ComicNeue-Bold.ttf",
    "./assets/font/ComicNeue-Italic.ttf",
    "./assets/font/ComicNeue-BoldItalic.ttf",
    "./assets/img/pills.png",
    "./assets/img/first-aid.png",
    "./assets/img/cahaya.png",
    "./assets/img/fridge.png",
    "./assets/img/termometer.png",
    "./assets/img/meditips.png",
    "./assets/img/semak.png",
    "./assets/img/hapus.png",
    "./assets/img/bungkus.png",
    "./assets/img/lupus.png",
    "./assets/img/imbas.png",
    "./assets/img/myubat.png",
    "./assets/img/interaksi.png",
    "./assets/img/kosmetik.png",
    "./assets/img/arahan.png",
    "./assets/img/alahan.png",
    "./assets/img/vaksin.png",
    "./assets/img/ubat-daftar.png",
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
