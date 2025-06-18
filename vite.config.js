import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
  },
  
  server: {
    port: 5173,
    host: true,
    // 🔥 AJOUT : Configuration des domaines autorisés
    allowedHosts: [
      'spero-navette.be',
      'www.spero-navette.be',
      '.spero-navette.be', // Wildcard pour tous les sous-domaines
      'localhost',
      '127.0.0.1'
    ]
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
