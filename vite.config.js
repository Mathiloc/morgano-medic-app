// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // AÑADE ESTA LÍNEA CLAVE:
  base: './', 
  // Esto asegura que todos los enlaces a archivos estáticos (JS, CSS, imágenes) 
  // sean relativos a la ruta actual de index.html (ej: ./assets/...)
})