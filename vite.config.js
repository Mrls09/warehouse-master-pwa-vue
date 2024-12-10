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
          "short_name": "Integracarsi",
          "description": "Aplicación de gestión de inventarios y compras.",
          "icons": [
            {
              "src": "/assets/images/LogoWaterhouse144.png",
              "sizes": "144x144",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "/assets/images/LogoWaterhouse192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "/assets/images/LogoWaterhouse512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            }
          ],
          "start_url": "/",
          "display": "standalone",
          "background_color": "#ffffff",
          "theme_color": "#000000",
          "orientation": "portrait",
          "scope": "/",
          "lang": "es-MX"
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