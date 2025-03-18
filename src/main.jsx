import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';

// Différer le chargement de App.jsx
const App = lazy(() => import('./App.jsx'));

// Composant de chargement léger
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-12 h-12 border-4 border-spero border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Configuration SEO - Métadonnées par défaut
document.title = "Navette Aéroport Bruxelles, Charleroi - Spero Navette | Transport depuis votre domicile";

// Création ou mise à jour des balises meta pour le SEO
const updateMetaTags = () => {
  // Description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', 'Service de navette aéroport à Bruxelles et Charleroi. Transport de qualité entre votre domicile et tous les aéroports (Zaventem, Charleroi, CDG...). Réservation simple, prix compétitifs.');
 
  // Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', 'navette aéroport Bruxelles, navette aéroport Charleroi, navette aéroport Zaventem, transport aéroport domicile, navette Spero');
 
  // Open Graph
  const ogTags = [
    { property: 'og:title', content: 'Navette Aéroport Bruxelles, Charleroi - Spero Navette' },
    { property: 'og:description', content: 'Service de navette entre votre domicile et tous les aéroports (Bruxelles, Charleroi, Paris CDG, Orly...). Prix compétitifs et service de qualité.' },
    { property: 'og:url', content: 'https://www.spero-navette.be/' },
    { property: 'og:type', content: 'website' }
  ];
 
  ogTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', tag.property);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', tag.content);
  });
 
  // Balise canonique pour éviter le contenu dupliqué
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', window.location.origin + window.location.pathname);
};

// Appliquer les balises meta de façon asynchrone
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    updateMetaTags();
  });
} else {
  setTimeout(() => {
    updateMetaTags();
  }, 0);
}

// Configuration simplifiée pour les formulaires (sans backend)
window.handleFormSubmit = async (formData) => {
  try {
    // Simuler un appel API réussi
    console.log('Données du formulaire:', formData);
    return {
      success: true,
      message: 'Votre demande a été envoyée avec succès'
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de votre demande'
    };
  }
};

// Fonction pour mettre à jour le titre de la page dynamiquement
window.updatePageTitle = (title) => {
  document.title = title ? `${title} | Spero Navette` : "Navette Aéroport Bruxelles, Charleroi - Spero Navette";
};

// Créer l'application React avec HashRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Suspense fallback={<LoadingSpinner />}>
      <App />
    </Suspense>
  </HashRouter>
);

// Optimiser le chargement des ressources statiques
window.addEventListener('load', () => {
  // Précharger les pages populaires pendant les temps d'inactivité
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const prefetchLinks = [
        '/services',
        '/contact',
        '/faq'
      ];
     
      prefetchLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link;
        document.head.appendChild(prefetchLink);
      });
    });
  }
});