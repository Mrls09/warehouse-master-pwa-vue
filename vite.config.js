import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue2';
import {resolve} from 'path';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
    const isDevelopment = mode === 'development';

    return {
        base: '/warehouse-master-pwa-vue/',  // Set the base URL for GitHub Pages
        plugins: [vue(), VitePWA({
            registerType: 'autoUpdate', devOptions: {
                enabled: true
            }, manifest: {
                "name": "Warehouse Store",
                "short_name": "Warehouse Store",
                "description": "Aplicación de gestión de inventarios y compras.",
                "icons": [{
                    "src": "https://i.ibb.co/hLC5Lb6/Logo-Waterhouse144.png",
                    "sizes": "144x144",
                    "type": "image/png",
                    "purpose": "any"
                }, {
                    "src": "https://i.ibb.co/Dbm0TX2/Logo-Waterhouse192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any"
                }, {
                    "src": "https://i.ibb.co/6DRvZPx/Logo-Waterhouse512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                }],
                "start_url": "/warehouse-master-pwa-vue/",
                "display": "standalone",
                "background_color": "#ffffff",
                "theme_color": "#000000",
                "orientation": "portrait",
                "scope": "/",
                "lang": "es-MX"
            }, workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff2}'],
                globDirectory: isDevelopment ? 'dev-dist' : 'dist',
                globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js']
            }
        })], resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        }, build: {
            outDir: 'dist'
        }
    };
});