import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Agrega otras configuraciones de Vite si las necesitas (CSS preprocesadores, etc.)
  build: {
    outDir: 'dist' //Especifica donde se generaran los archivos estáticos
  },

});