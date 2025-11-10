import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Liste des routes à pré-rendre
const routes = [
  '/',
  '/services',
  '/contact',
  '/navette-aeroport-bruxelles-zaventem',
  '/navette-aeroport-charleroi',
  '/navette-aeroport-paris-cdg',
  '/blog',
  '/avis',
  '/faq'
];

async function prerender() {
  console.log('🚀 Démarrage du prerendering...');

  // Créer un serveur de preview
  const server = await createServer({
    server: { port: 5173 },
    appType: 'spa',
    root: path.resolve(__dirname, 'build')
  });

  await server.listen();
  console.log('✅ Serveur démarré sur http://localhost:5173');

  // Lancer Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Pré-rendre chaque route
  for (const route of routes) {
    try {
      console.log(`📄 Prerendering ${route}...`);
      
      await page.goto(`http://localhost:5173${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Attendre que React finisse de charger
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Récupérer le HTML
      const html = await page.content();

      // Créer le chemin du fichier
      let filePath;
      if (route === '/') {
        filePath = path.join(__dirname, 'build', 'index.html');
      } else {
        const dir = path.join(__dirname, 'build', route);
        fs.mkdirSync(dir, { recursive: true });
        filePath = path.join(dir, 'index.html');
      }

      // Sauvegarder le HTML
      fs.writeFileSync(filePath, html);
      console.log(`✅ ${route} sauvegardé`);

    } catch (error) {
      console.error(`❌ Erreur sur ${route}:`, error.message);
    }
  }

  await browser.close();
  await server.close();
  
  console.log('🎉 Prerendering terminé !');
}

prerender().catch(console.error);