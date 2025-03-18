import { createServer } from 'http';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 5173;

async function createDevServer() {
  const vite = await createViteServer({
    server: { port },
    appType: 'spa',
  });
  
  await vite.listen();
  console.log(`Dev server running at http://localhost:${port}`);
  
  return () => vite.close();
}

function createProdServer() {
  const dist = join(__dirname, 'dist');
  const server = createServer((req, res) => {
    try {
      // Gérer l'URL de base et les redirections
      let url = req.url === '/' ? '/index.html' : req.url;
      
      // En production avec SPA, renvoyer index.html pour les routes inexistantes
      if (!url.includes('.')) {
        url = '/index.html';
      }
      
      // Lire le fichier et déterminer le type de contenu
      const file = readFileSync(join(dist, url));
      const ext = url.split('.').pop();
      const contentTypes = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        json: 'application/json',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        svg: 'image/svg+xml',
        ico: 'image/x-icon'
      };
      
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(file);
    } catch (e) {
      console.error(e);
      res.writeHead(404);
      res.end('Not found');
    }
  });
  
  server.listen(port, () => {
    console.log(`Production server running at http://localhost:${port}`);
  });
  
  return () => server.close();
}

// Démarrer le serveur approprié
const isDev = process.env.NODE_ENV !== 'production';
const close = isDev ? await createDevServer() : createProdServer();

// Gestion de la fermeture propre
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    close();
    process.exit();
  });
});