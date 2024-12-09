// serviceWorker.js

// Nombre del caché
const CACHE_NAME = 'mi-app-cache-v1';

// Archivos que se deben almacenar en caché
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/serviceWorker.js',
  '/assets/base.css',
  '/assets/main.css',
  '/assets/logo.svg',
  '/assets/images/logo3d.png',
  '/assets/images/logoapp.png',
  '/assets/images/logorealista.jpg',
  '/assets/images/logorealista.png',
  '/assets/images/LogoWaterhouse.png',
  '/assets/images/LogoWaterhouse2.png',
  '/assets/images/paqueteria/landingimg1.jpg',
  '/assets/images/paqueteria/landingimg2.jpg',
  '/assets/images/paqueteria/landingimg3.jpg',
  '/assets/images/paqueteria/landingimg4.jpg',
  '/assets/images/paqueteria/landingimg5.jpg',

  // Archivos de componentes Vue (revisa si son necesarios offline)
  '/src/components/cliente/components/CardService.vue',
  '/src/components/cliente/components/Compras.vue',
  '/src/components/cliente/components/Home.vue',
  '/src/components/cliente/components/Inicio.vue',
  '/src/components/cliente/components/Profile.vue',
  '/src/components/cliente/components/Servicios.vue',
  '/src/components/cliente/components/ShoppingCart.vue',
  '/src/components/public/DialogCambiarContra.vue',
  '/src/components/public/error/ErrorPage.vue',
  '/src/components/public/Landing-pages/LandingPage.vue',
  '/src/components/public/Login.vue',
  '/src/components/public/Profile.vue',
  '/src/components/public/Register.vue',
  '/src/components/public/Restablecer.vue',
  '/src/components/public/RestablecerConfirmar.vue',

  // Archivos de plugins, servicios, stores y utils (revisa cuidadosamente)
  '/src/plugins/vuetify.js',
  '/src/router/index.js',
  '/src/services/CartService.js',
  '/src/services/CategoryServices.js',
  '/src/services/RecuperarContraService.js',
  '/src/services/ServicesServices.js',
  '/src/services/SwalService.js',
  '/src/services/UsersServices.js',
  '/src/stores/auth.store.js',
  '/src/stores/cart.store.js',
  '/src/stores/index.js',
  '/src/utils/aes.js',
  '/src/utils/axios-client.js',
  '/src/utils/constants.js',
  '/src/utils/fetch-client.js',
  '/src/utils/notification.js',


  // Archivos de vistas (revisa si son necesarios offline)
  '/src/views/AboutView.vue',
  '/src/views/HomeView.vue',
  // Agrega aquí cualquier otro archivo .js, .css o de imagen que sea crítico para el funcionamiento offline de tu aplicación
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
