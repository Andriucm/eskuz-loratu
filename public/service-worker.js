const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/pwa-192x192.png", "/pwa-512x512.png"];

self.addEventListener("install", (event) => {
	self.skipWaiting(); // Fuerza la activación de inmediato
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});


self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});


self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	self.clients.claim(); // Toma el control de la página de inmediato
});
