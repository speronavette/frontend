import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Récupérer le port depuis les variables d'environnement, 
// ou utiliser 5173 comme port par défaut
const port = process.env.PORT || 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
    host: true // Exposer à toutes les interfaces réseau
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