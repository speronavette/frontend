import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    cors: true,
    allowedHosts: [
      'www.spero-navette.be',
      'spero-navette.be',
      'frontend-6zq4.onrender.com'
    ]
  },
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    cors: true,
    allowedHosts: [
      'www.spero-navette.be',
      'spero-navette.be',
      'frontend-6zq4.onrender.com'
    ]
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