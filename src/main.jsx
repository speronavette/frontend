import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Configuration SEO - Métadonnées par défaut
document.title = "Navette Aéroport Bruxelles, Charleroi - Spero Navette | Transport depuis votre domicile";

// Création ou mise à jour des balises meta pour le SEO
const updateMetaTags = () => {
  // Check if we're on the English page
  const isEnglishPage = window.location.pathname.includes('/en/charleroi-airport-shuttle');

  // Description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  
  // Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  
  // Set appropriate metadata based on page language
  if (isEnglishPage) {
    document.title = "Charleroi Airport Shuttle | Private Transfer to Brussels, Bruges, Ghent | SPERO NAVETTE";
    metaDescription.setAttribute('content', 'Private door-to-door shuttle service from Charleroi Airport to Brussels, Bruges, Ghent, and all Belgium. Fixed price, English-speaking drivers, 24/7 service.');
    metaKeywords.setAttribute('content', 'Charleroi airport shuttle, Brussels airport transfer, Charleroi to Brussels, airport taxi Belgium, private airport transfer, Charleroi to Bruges shuttle');
  } else {
    // Default French metadata
    document.title = "Navette Aéroport Bruxelles, Charleroi - Spero Navette | Transport depuis votre domicile";
    metaDescription.setAttribute('content', 'Service de navette aéroport à Bruxelles et Charleroi. Transport de qualité entre votre domicile et tous les aéroports (Zaventem, Charleroi, CDG...). Réservation simple, prix compétitifs.');
    metaKeywords.setAttribute('content', 'navette aéroport Bruxelles, navette aéroport Charleroi, navette aéroport Zaventem, transport aéroport domicile, navette Spero');
  }
 
  // Open Graph
  const ogTags = [
    { 
      property: 'og:title', 
      content: isEnglishPage ? 
        'Charleroi Airport Shuttle | Private Transfer to Brussels, Bruges, Ghent | SPERO NAVETTE' : 
        'Navette Aéroport Bruxelles, Charleroi - Spero Navette' 
    },
    { 
      property: 'og:description', 
      content: isEnglishPage ? 
        'Private door-to-door shuttle service from Charleroi Airport to anywhere in Belgium. Fixed price, English-speaking drivers, 24/7 service.' : 
        'Service de navette entre votre domicile et tous les aéroports (Bruxelles, Charleroi, Paris CDG, Orly...). Prix compétitifs et service de qualité.' 
    },
    { 
      property: 'og:url', 
      content: isEnglishPage ? 
        'https://spero-navette.be/en/charleroi-airport-shuttle' : 
        'https://spero-navette.be/' 
    },
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

  // Add language alternates to improve SEO
  let alternateFrLink = document.querySelector('link[hreflang="fr"]');
  if (!alternateFrLink) {
    alternateFrLink = document.createElement('link');
    alternateFrLink.setAttribute('rel', 'alternate');
    alternateFrLink.setAttribute('hreflang', 'fr');
    document.head.appendChild(alternateFrLink);
  }
  alternateFrLink.setAttribute('href', 'https://spero-navette.be/');
  
  let alternateEnLink = document.querySelector('link[hreflang="en"]');
  if (!alternateEnLink) {
    alternateEnLink = document.createElement('link');
    alternateEnLink.setAttribute('rel', 'alternate');
    alternateEnLink.setAttribute('hreflang', 'en');
    document.head.appendChild(alternateEnLink);
  }
  alternateEnLink.setAttribute('href', 'https://spero-navette.be/en/charleroi-airport-shuttle');
};

// Apply on page load and when route changes
updateMetaTags();
window.addEventListener('popstate', updateMetaTags);

// Configuration simplifiée pour les formulaires (sans backend)
const handleFormSubmit = async (formData) => {
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
  // Check if we're on the English page
  const isEnglishPage = window.location.pathname.includes('/en/');
  
  if (isEnglishPage) {
    document.title = title ? `${title} | SPERO NAVETTE` : "Charleroi Airport Shuttle | SPERO NAVETTE";
  } else {
    document.title = title ? `${title} | Spero Navette` : "Navette Aéroport Bruxelles, Charleroi - Spero Navette";
  }
};

// Attacher la fonction handleFormSubmit à window pour y accéder depuis les composants
window.handleFormSubmit = handleFormSubmit;

// BrowserRouter pour URLs propres
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);