import React from 'react';

// Composant simple pour remplacer Helmet
export const Helmet = ({ title, meta, children }) => {
  React.useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return <>{children}</>;
};

// Wrapper pour remplacer HelmetProvider
export const HelmetProvider = ({ children }) => {
  return <>{children}</>;
};