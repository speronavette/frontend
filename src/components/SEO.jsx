import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Composant SEO pour gérer les métadonnées des pages
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Le titre de la page (sera complété avec "| Spero Navette" ou "| SPERO NAVETTE" pour les pages anglaises)
 * @param {string} props.description - La description de la page pour les moteurs de recherche
 * @param {string} props.keywords - Mots-clés SEO séparés par des virgules
 * @param {string} props.canonicalUrl - URL canonique (par défaut: URL actuelle)
 * @param {string} props.ogType - Type Open Graph (par défaut: "website")
 * @param {string} props.ogImage - Image Open Graph (par défaut: URL de l'image de la société)
 * @param {boolean} props.isEnglish - Indique si la page est en anglais (pour modifier le format du titre)
 * @param {ReactNode} props.children - Contenu supplémentaire (ex: script JSON-LD)
 */
const SEO = ({ 
  title, 
  description, 
  keywords = "", 
  canonicalUrl = "",
  ogType = "website",
  ogImage = "/images/logo-og.jpg", // Image par défaut pour les partages sociaux
  isEnglish = false,
  children 
}) => {
  // Détecter automatiquement si la page est en anglais par l'URL si isEnglish n'est pas explicitement défini
  const isEnglishPage = isEnglish || (typeof window !== 'undefined' && window.location.pathname.includes('/en/'));
  
  // Construire le titre avec le nom de l'entreprise (en majuscules pour les pages anglaises)
  const fullTitle = title 
    ? `${title} | ${isEnglishPage ? 'SPERO NAVETTE' : 'Spero Navette'}` 
    : isEnglishPage 
      ? "Charleroi Airport Shuttle | Private Transfer | SPERO NAVETTE" 
      : "Navette Aéroport Bruxelles et Charleroi depuis votre domicile | Spero Navette";
  
  // URL canonique par défaut
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : '');
  
  return (
    <Helmet>
      {/* Balises de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      
      {/* Métadonnées Open Graph pour les réseaux sociaux */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={isEnglishPage ? 'SPERO NAVETTE' : 'Spero Navette'} />
      
      {/* Métadonnées Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Balises hreflang pour le multilinguisme */}
      <link rel="alternate" hreflang="fr" href="https://www.spero-navette.be/" />
      <link rel="alternate" hreflang="en" href="https://www.spero-navette.be/en/charleroi-airport-shuttle" />
      
      {/* Contenu supplémentaire si nécessaire (ex: JSON-LD) */}
      {children}
    </Helmet>
  );
};

export default SEO;