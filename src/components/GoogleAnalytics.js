<<<<<<< HEAD
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Envoi de la page vue à Google Analytics lors du changement de route
    if (window.gtag) {
      window.gtag('config', 'G-F5B5DN321P', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
}

=======
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Envoi de la page vue à Google Analytics lors du changement de route
    if (window.gtag) {
      window.gtag('config', 'G-F5B5DN321P', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
}

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default GoogleAnalytics;