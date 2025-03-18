import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// Importer plugin de compression
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    // Plugin pour analyser la taille du bundle
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    // Compression Gzip/Brotli des assets
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Optimisation des images
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
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
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info']
      }
    },
    rollupOptions: {
      external: ['react-helmet-async'],
      output: {
        manualChunks: (id) => {
          // Optimiser la division des chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide')) {
              return 'icons-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('date-fns') || id.includes('react-day-picker') || id.includes('react-date-range')) {
              return 'date-vendor';
            }
            return 'vendor';
          }
          
          // Diviser les pages
          if (id.includes('/pages/')) {
            const page = id.split('/pages/')[1].split('.')[0].toLowerCase();
            return `page-${page}`;
          }

          // Diviser les composants par fonctionnalité
          if (id.includes('/components/')) {
            if (id.includes('Booking') || id.includes('Calculation')) {
              return 'booking-components';
            }
            return 'ui-components';
          }
        }
      }
    }
  },
  // Optimiser le chargement des modules
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react',
      'date-fns'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  }
});