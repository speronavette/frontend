
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';


export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic' // Performance optimisée - évite auto-imports React
    })
  ],
  
  // Configuration des alias de chemins
  resolve: {
    alias: {

      "@": path.resolve(__dirname, "./src"),
    },

      '@': fileURLToPath(new URL('./src', import.meta.url))
    }

  },
  
  server: {
    port: 5173,
    host: true
  },
  
  // Variables d'environnement
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false, // Pas de sourcemaps en prod
    minify: 'esbuild', // esbuild plus rapide que terser
    chunkSizeWarningLimit: 500, // Warning si chunk > 500kb
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    

    // Optimisations CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Target moderne pour bundle plus petit
    target: 'esnext',
    
    // Suppression console.log en production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Optimisations de dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vitejs/plugin-react']
  }
})

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

