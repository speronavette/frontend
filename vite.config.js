import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react({
      // Garder le fast refresh mais sans options problématiques
      fastRefresh: true

    })
  ],
  server: {
    port: 5173,
    host: true,
    // Remettre progressivement vos options serveur
    cors: true,
    hmr: {
      overlay: true
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    cors: true
  },
  resolve: {
    alias: {
      // Correction de l'alias @ - plus robuste
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Commencer avec esbuild, puis passer à terser si nécessaire
    minify: 'esbuild',
    target: 'es2015',
    emptyOutDir: true,
    
    // Remettre progressivement vos optimisations rollup
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
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/main-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  },
  
  esbuild: {
    target: 'es2015',
    legalComments: 'none'
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
});
