import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from 'react-helmet-async';

// Pages principales uniquement
import Home from './pages/Home';
import CalculationResult from './components/CalculationResult';
import BookingForm from './components/BookingForm';
import Confirmation from './pages/Confirmation';
import TermsAndConditions from './pages/TermsAndConditions';
import FAQ from './pages/FAQ';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Styles
import "./styles/date-range.css";

// Fonction pour définir le titre de la page (utilisée par les anciens composants)
window.updatePageTitle = (title) => {
  document.title = title;
};

// Composant pour suivre les changements de page avec Google Analytics
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

function App() {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-white text-[#1d1d1b]">
        {/* Composant de suivi Google Analytics */}
        <GoogleAnalytics />
        
        <nav className="bg-spero text-white p-4" aria-label="Navigation principale">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-opacity-80">
                Accueil
              </Link>
              <Link to="/services" className="hover:text-opacity-80">
                Services
              </Link>
              <Link to="/contact" className="hover:text-opacity-80">
                Contactez-nous
              </Link>
              <Link to="/faq" className="hover:text-opacity-80">
                FAQ
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow px-4 sm:px-6 lg:px-8">
          <Routes>
            {/* Routes publiques uniquement */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/result" element={<CalculationResult />} />
            <Route path="/reservation" element={<BookingForm />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/conditions-generales" element={<TermsAndConditions />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>

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
              <Link to="/faq" className="block hover:text-opacity-80">FAQ</Link>
              <div className="mt-4">
                <h4 className="font-medium mb-1">Aéroports desservis</h4>
                <ul className="text-sm">
                  <li>Aéroport de Bruxelles-Zaventem</li>
                  <li>Aéroport de Charleroi</li>
                  <li>Aéroport de Paris CDG</li>
                  <li>Aéroport d'Amsterdam Schiphol</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-bold">Nous contacter</h3>
              <p>Téléphone: <a href="tel:+32490197914" className="hover:underline">0490/19.79.14</a></p>
              <p>Email: <a href="mailto:info@spero-navette.be" className="hover:underline">info@spero-navette.be</a></p>
              <p className="mt-2">
                <span className="block">Horaires d'ouverture:</span>
                <span className="block text-sm">Lundi au vendredi: 10h - 19h</span>
                <span className="block text-sm">Samedi: 10h - 16h</span>
              </p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-white/30 text-sm text-center">
            <p>© {new Date().getFullYear()} Spero Navette SRL. Tous droits réservés. | Navette aéroport Bruxelles, Charleroi et toutes destinations</p>
          </div>
        </footer>
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;