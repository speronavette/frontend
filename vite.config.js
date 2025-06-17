import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Autoriser votre domaine personnalisé
    allowedHosts: ['www.spero-navette.be', 'spero-navette.be', '.onrender.com']
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    target: 'es2015',
    // Configuration pour production avec domaine personnalisé
    assetsDir: 'assets',
    emptyOutDir: true
  },
  // Configuration de base pour votre domaine
  base: '/'
});