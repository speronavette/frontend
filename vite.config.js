import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // Retour au mode classic pour vos icônes SVG
  })],
  server: {
    port: 5173,
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    target: 'es2015'
  }
});
