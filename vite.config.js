import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // 🔥 CHANGÉ: automatic au lieu de classic - évite d'importer React partout
      fastRefresh: true
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
    open: true,
    // Configuration des domaines autorisés
    allowedHosts: [
      'spero-navette.be',
      'www.spero-navette.be',
      '.spero-navette.be',
      'localhost',
      '127.0.0.1'
    ]
  },
  
  // Variables d'environnement
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          radix: ['@radix-ui/react-alert-dialog', '@radix-ui/react-dialog', '@radix-ui/react-label']
        }
      }
    },
    
    // Optimisations CSS
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    
    // Target moderne pour bundle plus petit
    target: 'esnext'
  },
  
  // Optimisations de dépendances
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@vitejs/plugin-react']
  },

  // Configuration ESBuild pour éviter les erreurs React
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  }
})
