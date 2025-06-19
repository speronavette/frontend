import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Configuration serveur UNIQUEMENT pour développement local
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://api.spero-navette.be',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
    cors: true
  },
  
  // Configuration preview pour production
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0',
    allowedHosts: ['spero-navette.be', 'www.spero-navette.be'],
    // Pas de HMR en production !
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      // Retiré 'react-helmet-async' d'external car il doit être bundlé
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide')) {
              return 'icons-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});