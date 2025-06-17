import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
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
    target: 'es2015',
    assetsDir: 'assets',
    emptyOutDir: true,
    
    // OPTIMISATION CRITIQUE : Code splitting agressif
    rollupOptions: {
      output: {
        // Séparer les vendors des composants
        manualChunks: {
          // Chunk pour React et les utilitaires core
          'react-vendor': ['react', 'react-dom'],
          
          // Chunk pour les utilitaires date et calculs
          'utils-vendor': ['date-fns'],
          
          // Chunk pour chaque page/route majeure
          'calculator': ['./src/pages/Calculator.jsx'],
          'services': ['./src/pages/Services.jsx'],
          'about': ['./src/pages/About.jsx'],
          'contact': ['./src/pages/Contact.jsx'],
          
          // Chunk pour les composants UI lourds si existants
          'ui-components': ['./src/components/ui/index.js']
        },
        
        // Noms de fichiers optimisés pour cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // OPTIMISATION CRITIQUE : Réduction taille bundle
    cssCodeSplit: true,
    sourcemap: false, // Désactiver en prod pour réduire la taille
    
    // OPTIMISATION : Compression
    reportCompressedSize: false, // Plus rapide build
    chunkSizeWarningLimit: 1000
  },
  
  // OPTIMISATION CRITIQUE : Dépendances pré-bundlées
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'date-fns'
    ],
    exclude: [
      // Exclure les dépendances lourdes non critiques
    ]
  },
  
  base: '/'
});