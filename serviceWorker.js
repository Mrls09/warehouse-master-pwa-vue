//    serviceWorker.js
//   const CACHE_NAME = 'my-pwa-cache-v1';
//   const urlsToCache = [
//     '/',
//     '/index.html',
//     '/src/App.vue',
//     '/src/components/cliente/components/Home.vue',
//   ];



//   self.addEventListener('install', (event) => {
//     event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
//   });


//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then(response => {
//         if (response) { return response; }
//         return fetch(event.request)
//           .then(fetchResponse => {
//              //Cacha la respuesta solo si es un éxito 200-299
//             if (fetchResponse.ok) {
//               const clonedResponse = fetchResponse.clone();
//               caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
//             }
//             return fetchResponse;
//           })
//           .catch(error => {
//             console.error('Fetch failed:', error);
//              //Mostrar mensaje offline
//             return new Response('<h1>Sin conexión a Internet</h1>', {
//               headers: {'Content-Type': 'text/html'}
//             });
//           });
//       })
//     );
//   });

//   self.addEventListener('activate', (event) => {
//     event.waitUntil(
//       caches.keys().then(cacheNames => Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       ))
//     );
//  });