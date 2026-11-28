import React from 'react';
import ReactDOM from 'react-dom/client';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Titres, descriptions et URL canoniques : gérés page par page par le composant SEO (react-helmet-async).

const handleFormSubmit = async (formData) => {
  try {
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

window.updatePageTitle = (title) => {
  const isEnglishPage = window.location.pathname.includes('/en/');
  
  if (isEnglishPage) {
    document.title = title ? `${title} | SPERO NAVETTE` : "Charleroi Airport Shuttle | SPERO NAVETTE";
  } else {
    document.title = title ? `${title} | Spero Navette` : "Navette Aéroport Bruxelles, Charleroi - Spero Navette";
  }
};

window.handleFormSubmit = handleFormSubmit;

// Support pour react-snap
const rootElement = document.getElementById('root');
const AppWithRouter = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  // Le contenu a été pré-rendu par react-snap
  hydrate(AppWithRouter, rootElement);
} else {
  // Render normal pour le dev
  ReactDOM.createRoot(rootElement).render(AppWithRouter);
}