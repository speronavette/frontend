<<<<<<< HEAD
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords = "", 
  children 
}) => {
  const fullTitle = title 
    ? `${title} | Spero Navette` 
    : "Navette Aéroport Bruxelles et Charleroi depuis votre domicile | Spero Navette";

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {children}
      </Helmet>
    </>
  );
};

=======
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Composant SEO pour gérer les métadonnées des pages
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Le titre de la page (sera complété avec "| Spero Navette")
 * @param {string} props.description - La description de la page pour les moteurs de recherche
 * @param {string} props.keywords - Mots-clés SEO séparés par des virgules
 * @param {string} props.canonicalUrl - URL canonique (par défaut: URL actuelle)
 * @param {string} props.ogType - Type Open Graph (par défaut: "website")
 * @param {string} props.ogImage - Image Open Graph (par défaut: URL de l'image de la société)
 * @param {ReactNode} props.children - Contenu supplémentaire (ex: script JSON-LD)
 */
const SEO = ({ 
  title, 
  description, 
  keywords = "", 
  canonicalUrl = "",
  ogType = "website",
  ogImage = "/images/logo-og.jpg", // Image par défaut pour les partages sociaux
  children 
}) => {
  // Construire le titre avec le nom de l'entreprise
  const fullTitle = title 
    ? `${title} | Spero Navette` 
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
      <meta property="og:site_name" content="Spero Navette" />
      
      {/* Métadonnées Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Contenu supplémentaire si nécessaire (ex: JSON-LD) */}
      {children}
    </Helmet>
  );
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default SEO;