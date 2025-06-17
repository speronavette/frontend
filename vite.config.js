import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true
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
      overlay: false
    },
    cors: true,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  
  preview: {
    host: '0.0.0.0',
    port: 4173,
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
    chunkSizeWarningLimit: 50,  // Plus strict pour mobile
    target: 'es2015',
    assetsInlineLimit: 4096,
    
    // ========== OPTIMISATION CRITIQUE POUR MOBILE ==========
    cssCodeSplit: false,  // Inline tout le CSS pour éviter les requêtes multiples
    cssMinify: true,
    assetsDir: 'assets',
    emptyOutDir: true,
    
    // Préchargement optimisé
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        // Précharger seulement les dépendances critiques
        return deps.filter(dep => 
          dep.includes('react') || 
          dep.includes('router') || 
          dep.includes('calculator')
        );
      }
    },
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.error'],
        passes: 3,  // Plus de passes pour une compression maximale
        dead_code: true,
        unused: true,
        loops: true,
        conditionals: true,
        collapse_vars: true,
        reduce_vars: true,
        unsafe: false,
        unsafe_comps: false,
        // Optimisations supplémentaires
        arrows: true,
        booleans: true,
        cascade: true,
        comparisons: true,
        computed_props: true,
        hoist_funs: true,
        hoist_props: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        keep_infinity: true,
        negate_iife: true,
        properties: true,
        sequences: true,
        side_effects: true,
        switches: true,
        top_retain: null,
        typeofs: true
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        },
        toplevel: true
      },
      format: {
        comments: false,
        beautify: false,
        preamble: null
      }
    },
    
    rollupOptions: {
      output: {
        // ========== CHUNKING ULTRA OPTIMISÉ POUR MOBILE ==========
        manualChunks: (id) => {
          // Chunks plus petits et spécialisés pour mobile
          if (id.includes('node_modules')) {
            // React DOM séparé pour lazy loading
            if (id.includes('react-dom')) return 'react-dom';
            // React core (critique)
            if (id.includes('react') && !id.includes('dom') && !id.includes('router')) return 'react';
            // Router séparé
            if (id.includes('react-router')) return 'router';
            // Helmet séparé (non critique)
            if (id.includes('react-helmet-async')) return 'helmet';
            // Autres vendors (non critique)
            return 'vendor';
          }
          
          // Chunk calculateur prioritaire (critique)
          if (id.includes('src/data/prices') || id.includes('src/data/postalCodes')) {
            return 'calculator';
          }
          
          // Chunk pages non critiques
          if (id.includes('src/pages/') && !id.includes('Home')) {
            return 'pages';
          }
          
          // Chunk composants non critiques
          if (id.includes('src/components/') && !id.includes('SEO')) {
            return 'components';
          }
        },
        
        // Noms de fichiers optimisés
        chunkFileNames: (chunkInfo) => {
          // Chunks critiques avec priorité de chargement
          const criticalChunks = ['react', 'calculator', 'react-dom'];
          if (criticalChunks.includes(chunkInfo.name)) {
            return 'js/critical-[name]-[hash].js';
          }
          return 'js/[name]-[hash].js';
        },
        entryFileNames: 'js/main-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/main-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
        
        // Optimisations rollup
        preserveEntrySignatures: false,
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true
        }
      },
      
      // Tree-shaking agressif
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    }
  },
  
  // ========== CSS OPTIMISÉ ==========
  css: {
    devSourcemap: false,
    modules: {
      generateScopedName: '[hash:base64:4]',  // Noms encore plus courts
      hashPrefix: 'sp'  // Préfixe court
    },
    // PostCSS optimisé
    postcss: {
      plugins: [
        // PurgeCSS sera ajouté automatiquement par Vite
      ]
    }
  },
  
  // ========== ESBUILD OPTIMISÉ ==========
  esbuild: {
    target: 'es2015',
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true
  },
  
  // ========== OPTIMISATION DES DÉPENDANCES ==========
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: [
      // Exclure les dépendances lourdes non critiques
    ],
    force: true
  },
  
  // ========== VARIABLES D'ENVIRONNEMENT ==========
  define: {
    __DEV__: false,
    'process.env.NODE_ENV': '"production"',
    // Éliminer les checks de développement
    'process.env.BABEL_ENV': '"production"'
  },
  
  // ========== WORKER OPTIMISÉ ==========
  worker: {
    format: 'es'
  }
});