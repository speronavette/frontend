import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuration des alias pour les imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Configuration pour le serveur de développement
  server: {
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      port: 5173,
    }
  },
  
  // Configuration preview pour production
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0',
    allowedHosts: [
      'spero-navette.be',
      'www.spero-navette.be',
      'frontend-6zq4.onrender.com',
      '.onrender.com'
    ],
  },
  
  // Configuration de base
  base: '/',
  
  // Configuration de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
})