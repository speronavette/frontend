import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react({
      // ✅ FIX : Forcer le JSX classique au lieu de l'automatique
      jsxRuntime: 'classic'
    })
  ],
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
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 300,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'radix-ui': [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          'utils': ['class-variance-authority', 'clsx', 'tailwind-merge']
        }
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