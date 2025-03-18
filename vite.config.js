import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Récupérer le port depuis les variables d'environnement ou utiliser 10000 comme port par défaut
const port = parseInt(process.env.PORT || '10000');

export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
    host: true,
    allowedHosts: ['www.spero-navette.be', 'spero-navette.be'],
    proxy: {
      '/api': {
        target: 'https://api.spero-navette.be',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
    hmr: {
      clientPort: 443,
      host: 'www.spero-navette.be',
      protocol: 'wss'
    },
    cors: true
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