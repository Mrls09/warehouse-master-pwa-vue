const CACHE_NAME = 'mi-app-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/serviceWorker.js',
  '/src/assets/base.css',
  '/src/assets/main.css',
  '/src/assets/logo.svg',
  '/src/assets/images/logo3d.png',
  '/src/assets/images/logoapp.png',
  '/src/assets/images/logorealista.jpg',
  '/src/assets/images/logorealista.png',
  '/src/assets/images/LogoWaterhouse.png',
  '/src/assets/images/LogoWaterhouse2.png',
  '/src/assets/images/paqueteria/landingimg1.jpg',
  '/src/assets/images/paqueteria/landingimg2.jpg',
  '/src/assets/images/paqueteria/landingimg3.jpg',
  '/src/assets/images/paqueteria/landingimg4.jpg',
  '/src/assets/images/paqueteria/landingimg5.jpg',
  '/src/assets/Compras.vue',
  '/src/assets/ErrorPage.css',
  '/src/assets/ErrorPage.vue',
  '/src/assets/Home.vue',
  '/src/assets/landingimg1.jpg',
  '/src/assets/landingimg2.jpg',
  '/src/assets/landingimg3.jpg',
  '/src/assets/landingimg4.jpg',
  '/src/assets/landingimg5.jpg',
  '/src/assets/LandingPage.css',
  '/src/assets/LandingPage.vue',
  '/src/assets/Login.vue',
  '/src/assets/LogoWaterhouse.png',
  '/src/assets/LogoWaterhouse2.png',
  '/src/assets/LogoWaterhouse2.js',
  '/src/assets/Profile.vue',
  '/src/assets/Profile.vue',
  '/src/assets/Register.vue',
  '/src/assets/ServicesServices.js',
  '/src/assets/Servicios.vue',
  '/src/assets/Servicios.css',
  '/src/assets/ShoppingCart.vue',
  '/src/assets/ShoppingCart.css',
  '/src/assets/UsersServices.vue',
];

// Instalación del service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del service worker
self.addEventListener('activate', (event) => {
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
});

// Fetch: Manejo de las peticiones
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Si hay respuesta en caché, devuelvela
        return cachedResponse;
      }

      // Si no hay caché, realiza la petición de red
      return fetch(event.request).then((response) => {
        // Si la respuesta no es válida, no la cacheamos
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cacheamos la respuesta
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
