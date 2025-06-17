import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      // ========== CORRECTION: Suppression config Emotion ==========
      fastRefresh: true
      // jsxImportSource: '@emotion/react', ← SUPPRIMÉ
      // babel: { plugins: [] } ← SUPPRIMÉ
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
    // ========== HMR SIMPLIFIÉ POUR DEV ==========
    hmr: {
      overlay: false
      // Configuration HMR production commentée pour dev local
      // clientPort: 443,
      // host: 'www.spero-navette.be',
      // protocol: 'wss'
    },
    cors: true,
    fs: {
      strict: false
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
    chunkSizeWarningLimit: 1000,
    target: 'es2015',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    cssMinify: true,
    assetsDir: 'assets',
    emptyOutDir: true,
    modulePreload: {
      polyfill: true
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.error'],
        passes: 2,
        dead_code: true,
        unused: true,
        loops: true,
        conditionals: true,
        collapse_vars: true,
        reduce_vars: true,
        unsafe: false,
        unsafe_comps: false
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    },
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
            if (id.includes('react-router')) {
              return 'router';
            }
            return 'vendor';
          }
          if (id.includes('src/data/prices') || id.includes('src/data/postalCodes')) {
            return 'calculator';
          }
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'calculator' || chunkInfo.name === 'react-vendor') {
            return 'js/[name]-[hash].js'
          }
          return 'js/[name]-[hash].js'
        },
        entryFileNames: 'js/main-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        },
        preserveEntrySignatures: false
      }
    }
  },
  css: {
    devSourcemap: false,
    modules: {
      generateScopedName: '[hash:base64:5]',
      hashPrefix: 'spero'
    }
  },
  esbuild: {
    target: 'es2015',
    drop: ['console', 'debugger'],
    legalComments: 'none'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    force: true
  },
  define: {
    __DEV__: true,
    'process.env.NODE_ENV': '"development"'
  }
});