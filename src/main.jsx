const React = window.React || require('react');
const ReactDOM = window.ReactDOM || require('react-dom/client');
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Configuration SEO - Métadonnées par défaut
document.title = "Navette Aéroport Bruxelles, Charleroi - Spero Navette | Transport depuis votre domicile";

// Appliquer les balises meta au chargement
const updateMetaTags = () => {
  const metaTags = {
    description: 'Service de navette aéroport à Bruxelles et Charleroi. Transport de qualité entre votre domicile et tous les aéroports (Zaventem, Charleroi, CDG...). Réservation simple, prix compétitifs.',
    keywords: 'navette aéroport Bruxelles, navette aéroport Charleroi, navette aéroport Zaventem, transport aéroport domicile, navette Spero',
    og: [
      { property: 'og:title', content: 'Navette Aéroport Bruxelles, Charleroi - Spero Navette' },
      { property: 'og:description', content: 'Service de navette entre votre domicile et tous les aéroports (Bruxelles, Charleroi, Paris CDG, Orly...). Prix compétitifs et service de qualité.' },
      { property: 'og:url', content: 'https://www.spero-navette.be/' },
      { property: 'og:type', content: 'website' }
    ]
  };

  // Mettre à jour meta description et keywords
  ['description', 'keywords'].forEach(name => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', metaTags[name]);
  });

  // Mettre à jour les balises Open Graph
  metaTags.og.forEach(tag => {
    let meta = document.querySelector(`meta[property="${tag.property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', tag.content);
  });

  // Balise canonique
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', window.location.origin + window.location.pathname);
};

updateMetaTags();

// Fonctions globales
window.updatePageTitle = (title) => {
  document.title = title ? `${title} | Spero Navette` : "Navette Aéroport Bruxelles, Charleroi - Spero Navette";
};

window.handleFormSubmit = async (formData) => {
  try {
    console.log('Données du formulaire:', formData);
    return { success: true, message: 'Votre demande a été envoyée avec succès' };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: 'Une erreur est survenue lors de l\'envoi de votre demande' };
  }
};

// Créer l'application React avec HashRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);