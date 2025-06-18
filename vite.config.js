import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
 plugins: [react()],
 server: {
   port: 5173,
   host: true,
   allowedHosts: [
     'spero-navette.be',
     'www.spero-navette.be',
     'localhost',
     '127.0.0.1'
   ]
 },
 resolve: {
   alias: {
     '@': fileURLToPath(new URL('./src', import.meta.url))
   }
 },
 build: {
   outDir: 'dist',
   minify: 'esbuild',
   target: 'es2015'
 }
});
