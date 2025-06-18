import React, { lazy, Suspense, useEffect, memo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from "./components/ui/toaster";
import { HelmetProvider } from 'react-helmet-async';

// Imports directs pour les pages critiques (pas de lazy loading)
import Home from './pages/Home';

// Lazy loading optimisé pour les pages non critiques
const Services = lazy(() => 
  import('./pages/Services').then(module => ({ 
    default: module.default 
  }))
);
const Contact = lazy(() => import('./pages/Contact'));
const CalculationResult = lazy(() => import('./components/CalculationResult'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Avis = lazy(() => import('./pages/Avis'));


// Pages spécialisées avec preload
const BrusselsAirport = lazy(() => 
  import('./pages/BrusselsAirport').then(module => {
    // Preload des ressources liées si nécessaire
    return { default: module.default };
  })
);
const CharleroiAirport = lazy(() => import('./pages/CharleroiAirport'));
const ParisCDGAirport = lazy(() => import('./pages/ParisCDGAirport'));

// Pages de blog (faible priorité)
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Styles (chargement conditionnel)


// Optimisation: Fonction updatePageTitle memoized
const updatePageTitle = (() => {
  let lastTitle = '';
  return (title) => {
    if (title !== lastTitle) {
      document.title = title;
      lastTitle = title;
    }
  };
})();

// Exposer globalement seulement si nécessaire
if (typeof window !== 'undefined') {
  window.updatePageTitle = updatePageTitle;
}

// Composant de chargement optimisé
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center min-h-[200px]" role="status" aria-label="Chargement">
    <div 
      className="w-8 h-8 border-2 border-spero border-t-transparent rounded-full animate-spin"
      aria-hidden="true"
    ></div>
    <span className="sr-only">Chargement...</span>
  </div>
));

// Composant Google Analytics optimisé avec memo
const GoogleAnalytics = memo(() => {
  const location = useLocation();

  useEffect(() => {
    // Optimisation: Vérification en une fois
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('config', 'G-F5B5DN321P', {
          page_path: location.pathname + location.search,
          custom_map: { custom_parameter: 'performance_optimized' }
        });
      } catch (error) {
        // Silent fail pour éviter les logs en production
        if (process.env.NODE_ENV === 'development') {
          console.warn('Google Analytics error:', error);
        }
      }
    }
  }, [location.pathname, location.search]); // Plus spécifique

  return null;
});

// Navigation memoized pour éviter les re-renders
const Navigation = memo(() => (
  <nav className="bg-spero text-white p-4" aria-label="Navigation principale">
    <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-opacity-80" aria-label="Accueil">Accueil</Link>
        <Link to="/services" className="hover:text-opacity-80">Services</Link>
        <Link to="/blog" className="hover:text-opacity-80">Blog</Link>
        <Link to="/avis" className="hover:text-opacity-80">Avis clients</Link>
        <Link to="/contact" className="hover:text-opacity-80">Contactez-nous</Link>
        <Link to="/faq" className="hover:text-opacity-80">FAQ</Link>
      </div>
    </div>
  </nav>
));

// Footer memoized
const Footer = memo(() => (
  <footer className="bg-spero text-white py-8" id="contact">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-bold">Spero Navette</h3>
        <p>Les vacances à votre porte !</p>
        <p className="mt-2">Service de navette entre votre domicile et les aéroports de Bruxelles, Charleroi et autres destinations</p>
      </div>
      <div>
        <h3 className="font-bold mb-2">Information</h3>
        <Link to="/conditions-generales" className="block hover:text-opacity-80">Conditions générales</Link>
        <Link to="/avis" className="block hover:text-opacity-80">Avis clients</Link>
        <Link to="/blog" className="block hover:text-opacity-80">Blog</Link>
        <Link to="/faq" className="block hover:text-opacity-80">FAQ</Link>
        <div className="mt-4">
          <h4 className="font-medium mb-1">Aéroports desservis</h4>
          <ul className="text-sm">
            <li>Aéroport de Bruxelles-Zaventem</li>
            <li>Aéroport de Charleroi</li>
            <li>Aéroport de Paris CDG</li>
            <li>Aéroport d&apos;Amsterdam Schiphol</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="font-bold">Nous contacter</h3>
        <p>Téléphone: <a href="tel:+32490197914" className="hover:underline">0490/19.79.14</a></p>
        <p>Email: <a href="mailto:info@spero-navette.be" className="hover:underline">info@spero-navette.be</a></p>
        <p className="mt-2">
          <span className="block">Horaires d&apos;ouverture:</span>
          <span className="block text-sm">Lundi au vendredi: 10h - 19h</span>
          <span className="block text-sm">Samedi: 10h - 16h</span>
        </p>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-white/30 text-sm text-center">
      <p>© {new Date().getFullYear()} Spero Navette SRL. Tous droits réservés. | Navette aéroport Bruxelles, Charleroi et toutes destinations</p>
    </div>
  </footer>
));

// Preload des routes critiques
const preloadCriticalRoutes = () => {
  const criticalRoutes = [
    () => import('./components/CalculationResult'),
    () => import('./components/BookingForm')
  ];
  
  // Preload avec un délai pour ne pas bloquer le chargement initial
  setTimeout(() => {
    criticalRoutes.forEach(route => {
      route().catch(() => {}); // Échec silencieux
    });
  }, 2000);
};

// Hook d'optimisation du chargement
const useLoadingOptimization = () => {
  useEffect(() => {
    // Preload des routes critiques après le chargement initial
    preloadCriticalRoutes();
    
    // Optimisation: lazy load des images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    return () => {
      images.forEach(img => imageObserver.unobserve(img));
    };
  }, []);
};

// Composant principal App optimisé
function App() {
  useLoadingOptimization();

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-white text-[#1d1d1b]">
        <GoogleAnalytics />
        <Navigation />

        <main className="flex-grow px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Route critique sans lazy loading */}
              <Route path="/" element={<Home />} />
              
              {/* Routes importantes avec lazy loading */}
              <Route path="/result" element={<CalculationResult />} />
              <Route path="/reservation" element={<BookingForm />} />
              
              {/* Routes secondaires */}
              <Route path="/services" element={<Services />} />
              <Route path="/avis" element={<Avis />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/conditions-generales" element={<TermsAndConditions />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Routes spécialisées aéroports */}
              <Route path="/navette-aeroport-bruxelles-zaventem" element={<BrusselsAirport />} />
              <Route path="/navette-aeroport-charleroi" element={<CharleroiAirport />} />
              <Route path="/navette-aeroport-paris-cdg" element={<ParisCDGAirport />} />
              
              {/* Routes blog (faible priorité) */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default memo(App);

