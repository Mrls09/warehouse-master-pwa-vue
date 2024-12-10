import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          "name": "Warehouse",
          "short_name": "Warehouse",
          "theme_color": "#ffffff",
          "background_color": "#ffffff",
          "icons": [
            {
              "src": "/LogoWaterhouse192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/LogoWaterhouse512.png",
              "sizes": "512x512",
              "type": "image/png"
            }
            // ... otros iconos
          ],
          "start_url": "/",
          "display": "standalone"
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff2}'],
          globDirectory: isDevelopment ? 'dev-dist' : 'dist',
          globIgnores: [
            '**/node_modules/**/*',
            'sw.js',
            'workbox-*.js'
          ],
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith('https://az3dtour.online:8443/warehouse-master-api'),
              handler: 'CacheFirst',
              options: {
                cacheName: '_pouch_carrito',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 24 * 60 * 60 // 1 día
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image' || request.destination === 'font',
              handler: 'CacheFirst',
              options: {
                cacheName: 'static-resources',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
                }
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      outDir: 'dist'
    }
  };
});