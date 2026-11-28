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
  '/faq',
  '/conditions-generales',
  '/blog/voyager-famille-avantages-navette',
  '/blog/pourquoi-arriver-3-4-heures-avant-vol-ete',
  '/blog/erreurs-frequentes-voyage-aeroport-spero-navette',
  '/blog/entreprises-navettes-professionnelles-tendance',
  '/blog/erreurs-voyageurs-comment-eviter',
  '/blog/heures-pointe-rentre-eviter-bouchons-trajet-aeroport',
  '/blog/reserver-navette-wallonie-avantages',
  '/blog/check-list-avant-depart-aeroport'
  // Pages anglaises à rajouter quand EN_LIVE = true (src/data/enTransfers.js) :
  // '/en', '/en/charleroi-airport-to-brussels', '/en/charleroi-airport-to-bruges',
  // '/en/charleroi-airport-to-ghent', '/en/charleroi-airport-to-antwerp', '/en/charleroi-airport-to-namur'
];

/**
 * Nettoie le HTML généré par Puppeteer
 */
function cleanHTML(html) {
  let cleaned = html;

  // 1. Supprimer les scripts Vite de développement
  cleaned = cleaned.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');
  cleaned = cleaned.replace(/<script type="module" src="\/@vite\/client">[\s\S]*?<\/script>/g, '');
  
  // 2. Remplacer localhost par l'URL de production
  cleaned = cleaned.replace(/http:\/\/localhost:5173/g, 'https://spero-navette.be');
  cleaned = cleaned.replace(/http:\/\/localhost:\d+/g, 'https://spero-navette.be');
  
  // 3. S'assurer que l'encodage UTF-8 est bien présent
  if (!cleaned.includes('charset="UTF-8"') && !cleaned.includes("charset='UTF-8'")) {
    cleaned = cleaned.replace('<head>', '<head>\n    <meta charset="UTF-8">');
  }

  return cleaned;
}

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

  // Définir l'encodage UTF-8
  await page.setExtraHTTPHeaders({
    'Accept-Charset': 'utf-8'
  });

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
      // Attendre que la page demandée soit vraiment affichée (titre H1 + URL canonique de cette page)
      await page.waitForFunction((r) => {
        const canon = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        const path = canon.replace(/^https?:\/\/[^/]+/, '') || '/';
        return document.querySelector('h1') && (path === r || path === r + '/');
      }, { timeout: 15000 }, route).catch(() => console.warn(`⚠️ ${route} : page incomplète, vérifier le rendu`));
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Récupérer le HTML
      let html = await page.content();

      // Nettoyer le HTML
      html = cleanHTML(html);

      // Créer le chemin du fichier
      let filePath;
      if (route === '/') {
        filePath = path.join(__dirname, 'build', 'index.html');
      } else {
        const dir = path.join(__dirname, 'build', route);
        fs.mkdirSync(dir, { recursive: true });
        filePath = path.join(dir, 'index.html');
      }

      // Sauvegarder le HTML avec encodage UTF-8
      fs.writeFileSync(filePath, html, { encoding: 'utf8' });
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