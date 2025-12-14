import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
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
  preview: {
    host: '0.0.0.0'  // ← Juste ça !
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
      external: ['react-helmet-async'],
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