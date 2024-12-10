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