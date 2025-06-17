import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react({
      // OPTIMISATION CRITIQUE: Réduire la taille de React
      jsxRuntime: 'automatic',
      jsxImportSource: 'react'
    })
  ],
  server: {
    port: 5173,
    host: true,
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
    target: 'es2020', // Plus moderne = plus petit
    assetsDir: 'assets',
    emptyOutDir: true,
    
    // OPTIMISATION CRITIQUE: Tree-shaking agressif
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        // Chunks optimisés pour réduire JavaScript inutilisé
        manualChunks: (id) => {
          // React core séparé
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }
          
          // Router séparé (chargé uniquement si navigation)
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // Date utilities séparées
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          
          // Node modules séparés
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          
          // Pages comme chunks séparés
          if (id.includes('/pages/')) {
            const page = id.split('/pages/')[1].split('.')[0];
            return `page-${page}`;
          }
          
          // Composants comme chunks séparés
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/main-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
      
      // OPTIMISATION: Externaliser les gros modules si possible
      external: (id) => {
        // Ne pas externaliser car on n'a pas de CDN pour React
        return false;
      }
    },
    
    // OPTIMISATION CRITIQUE: CSS et JavaScript
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500, // Warning si chunk > 500kb
    
    // OPTIMISATION: Minification avancée
    minify: 'esbuild',
    target: 'es2020'
  },
  
  // OPTIMISATION CRITIQUE: Dépendances optimisées
  optimizeDeps: {
    include: [
      'react',
      'react-dom/client',
      'react-router-dom'
    ],
    exclude: [
      // Exclure les modules lourds non critiques
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  
  // OPTIMISATION: Définir les variables d'environnement
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
  },
  
  base: '/'
});