import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
//import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    /*legacy({
      targets: ['defaults', '> 1%', 'not IE 11'], // Soporta más navegadores modernos y elimina IE11
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })*/
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',  // Usa un estándar que todavía sea bastante moderno pero más compatible
    chunkSizeWarningLimit: 8000,  // Ajusta el límite de tamaño de los chunks
  }
});


