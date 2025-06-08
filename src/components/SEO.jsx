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

export default SEO;