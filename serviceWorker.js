//serviceWorker.js
   const CACHE_NAME = 'my-pwa-cache-v1';
   /*const urlsToCache = [
     '/',
     '/index.html',
     '/src/App.vue',
     '/src/components/cliente/components/Home.vue',
     '/src/components/personal/components/SidebarNavbar.vue',
     '/src/components/cliente/components/Compras.vue',
   ];*/

   const urlsToCache = [
    '/', // Página principal
    '/index.html', // HTML principal
    '/assets/images/LogoWaterhouse2.png', 
    '/assets/images/LogoWaterhouse2.png',
    '/css/main.css',
    '/js/main.js'
  ];

   /*self.addEventListener('install', (event) => {
     event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
   });*/

   self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache).catch((error) => {
          console.error('Error al agregar recursos al caché:', error);
        });
      })
    );
  });
  


   self.addEventListener('activate', (event) => {
     event.waitUntil(
       caches.keys().then(cacheNames => Promise.all(
         cacheNames.map(cacheName => {
           if (cacheName !== CACHE_NAME) {
             return caches.delete(cacheName);
           }
         })
       ))
     );
  });
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then(fetchResponse => {
                if (fetchResponse.ok) {
                    const clonedResponse = fetchResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
                }
                return fetchResponse;
            })
            .catch(() => {
                return caches.match(event.request).then(response => {
                    if (response) {
                        return response;
                    }
                    return new Response(JSON.stringify({ error: 'Sin conexión a Internet' }), {
                        headers: {'Content-Type': 'application/json'}
                    });
                });
            })
    );
});