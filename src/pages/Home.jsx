import React, { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { calculatePrice } from '../data/prices';
import { postalCodesDB } from '../data/postalCodes';

// ✅ IMPORTS LUCIDE-REACT SEULEMENT - SUPPRESSION DES ICÔNES MANUELLES
import { 
  ArrowRight, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle, 
  Phone, 
  Mail, 
  Shield, 
  Star 
} from 'lucide-react';


// === DONNÉES STATIQUES ===

// === ICÔNES SVG OPTIMISÉES (memoized pour éviter re-renders) ===
const ArrowRight = memo(({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
));

const Clock = memo(({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
));

const MapPin = memo(({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
));

const Shield = memo(({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
));

const Users = memo(({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
));

const CheckCircle = memo(({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
));

const Phone = memo(({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
));

const Mail = memo(({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
));

const Star = memo(({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
));

// OPTIMISATION: Définir les noms des composants pour React DevTools
ArrowRight.displayName = 'ArrowRight';
Clock.displayName = 'Clock';
MapPin.displayName = 'MapPin';
Shield.displayName = 'Shield';
Users.displayName = 'Users';
CheckCircle.displayName = 'CheckCircle';
Phone.displayName = 'Phone';
Mail.displayName = 'Mail';
Star.displayName = 'Star';

// === DONNÉES STATIQUES (memoized pour éviter re-création) ===

const airports = [
  { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
  { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
  { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
  { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' },
  { code: 'DUS', nom: 'Aéroport de Dusseldorf', pays: 'Allemagne' },
  { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
  { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
  { code: 'ZYR', nom: 'Gare de Bruxelles-Midi', pays: 'Belgique' },
  { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
  { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' }
];

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

// Données structurées optimisées pour le SEO local
const structuredData = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Spero Navette - Service de Navette Aéroport",
  "image": "https://www.spero-navette.be/images/logo.jpg",
  "url": "https://www.spero-navette.be/",
  "telephone": "+32490197914",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Service disponible dans tout le Hainaut",
    "addressLocality": "Charleroi",
    "postalCode": "6000",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.4108,
    "longitude": 4.4446
  },
  "areaServed": [
    "Grand Charleroi", "Pont-à-Celles", "Courcelles", "Fontaine-l'Évêque", 
    "Fleurus", "Basse Sambre", "Sambreville", "Gerpinnes", "Ham-sur-Heure", 
    "Thuin", "Beaumont", "Rance", "Chimay", "Couvin", "Philippeville", "Walcourt"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "€€",
  "description": "Service de navette aéroport professionnel depuis le Grand Charleroi et environs vers Bruxelles-Zaventem, Charleroi, Paris CDG, Cologne, Düsseldorf, Amsterdam et Lille. Transport 24h/7j, ponctualité garantie.",
  "serviceType": ["Navette aéroport", "Transport aéroportuaire", "Transfert aéroport"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de navette aéroport",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Navette Aéroport de Bruxelles",
          "description": "Transport direct domicile-aéroport Bruxelles-Zaventem"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Navette Aéroport de Charleroi",
          "description": "Transport direct domicile-aéroport Charleroi Brussels South"
        }
      }
    ]
  }
};

// FAQ optimisée pour le SEO
const navetteFAQData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelles zones desservez-vous pour vos navettes aéroport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous desservons principalement le Grand Charleroi, Pont-à-Celles, Courcelles, Fontaine-l'Évêque, Fleurus, Basse Sambre, Sambreville, Gerpinnes, Ham-sur-Heure, Thuin, Beaumont, Rance, Chimay, Couvin, Philippeville, Walcourt et toutes les communes environnantes. Notre service de navette aéroport couvre tout le Hainaut."
      }
    },
    {
      "@type": "Question",
      "name": "Vers quels aéroports proposez-vous des navettes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos navettes desservent principalement l'aéroport de Bruxelles-Zaventem, l'aéroport de Charleroi, Paris CDG, Cologne, Düsseldorf, Amsterdam Schiphol et Lille. Nous proposons également des navettes vers tous les autres aéroports européens sur demande."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte une navette aéroport depuis Charleroi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les tarifs de nos navettes aéroport varient selon la distance et le type de service (partagé ou privé). Utilisez notre calculateur en ligne pour obtenir un prix précis depuis votre commune. Nos prix sont compétitifs et transparents, sans frais cachés."
      }
    }
  ]
};


// OPTIMISATION: CSS inline pour éliminer CLS et améliorer LCP

// OPTIMISATION CRITIQUE: CSS inline pour éliminer CLS et améliorer LCP

const criticalCSS = `
  .calculator-section {
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }
  .calculator-container {
    width: 100%;
    max-width: 28rem;
    background: white;
    border-radius: 0.5rem;
    border: 2px solid rgba(139, 92, 246, 0.2);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 2rem;
  }
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passengers: '',
    postalCode: '',
    commune: '',
    destination: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OPTIMISATION: Handlers memoized
  const handlePostalCodeChange = useCallback((e) => {
    const code = e.target.value;
    const commune = code.length === 4 ? (postalCodesDB[code] || 'Code postal non trouvé') : '';
    
    setFormData(prev => ({
      ...prev,
      postalCode: code,
      commune
    }));
    
    // Clear error si valide
    if (code.length === 4 && postalCodesDB[code]) {
      setErrors(prev => ({ ...prev, postalCode: null }));
    }
  }, []);

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.passengers) {
      newErrors.passengers = "Veuillez sélectionner le nombre de passagers";
    }
    
    if (!formData.postalCode || formData.postalCode.length !== 4) {
      newErrors.postalCode = "Veuillez entrer un code postal valide";
    }
    
    if (!formData.destination) {
      newErrors.destination = "Veuillez sélectionner une destination";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const prices = calculatePrice(formData.postalCode, formData.destination, formData.passengers);
      
      const navigationState = {
        passengers: formData.passengers,
        postalCode: formData.postalCode,
        commune: formData.commune,
        destination: {
          code: formData.destination,
          nom: airports.find(a => a.code === formData.destination)?.nom
        },
        prices,
        noPriceFound: prices.sharedPrice === 0 && prices.privatePrice === 0
      };

      navigate('/result', { state: navigationState });
    } catch (error) {
      console.error('Error calculating price:', error);
      setErrors({ general: 'Erreur lors du calcul. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, isSubmitting, navigate]);

  // OPTIMISATION: Options memoized
  const passengerOptions = useMemo(() => 
    PASSENGER_OPTIONS.map(num => (
      <option key={num} value={num}>{num}</option>
    )), []);

  const getInputClasses = useCallback((fieldName) => 
    `w-full p-2 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero transition-colors`,
    [errors]);

  return (
    <>
      <SEO
        title="Navette Aéroport Charleroi Bruxelles | Transport 24h/7j | Spero Navette"
        description="Service de navette aéroport depuis le Grand Charleroi et environs vers Bruxelles-Zaventem, Charleroi, Paris CDG, Cologne, Amsterdam. Réservation en ligne, prix compétitifs. ☎ 0490/19.79.14"
        keywords="navette aéroport Charleroi, navette aéroport Bruxelles, transport aéroport Zaventem, navette Charleroi Brussels South, navette aéroport Paris CDG, transport aéroport Hainaut"
        canonicalUrl="https://www.spero-navette.be/">
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(navetteFAQData)}
        </script>
        <style type="text/css">{criticalCSS}</style>
      </SEO>

      <div className="container mx-auto px-4 py-8">

        {/* === CALCULATEUR DE PRIX === */}

        {/* === CALCULATEUR DE PRIX (votre outil central) === */}

        <section id="calculator" className="calculator-section scroll-mt-24 mb-16">
          <div className="calculator-container">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Calculez le prix de votre navette aéroport
            </h2>
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="passengers" className="block text-center mb-2 font-medium">
                  Nombre de personnes :
                </label>
                <select
                  id="passengers"
                  value={formData.passengers}
                  onChange={(e) => handleFieldChange('passengers', e.target.value)}
                  className={getInputClasses('passengers')}
                  aria-label="Sélectionnez le nombre de passagers"
                  required
                >
                  <option value="">Sélectionnez</option>
                  {passengerOptions}
                </select>
                {errors.passengers && (
                  <p className="mt-1 text-sm text-red-500">{errors.passengers}</p>
                )}
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-center mb-2 font-medium">
                  Code postal de départ :
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handlePostalCodeChange}
                  className={getInputClasses('postalCode')}
                  maxLength="4"
                  inputMode="numeric"
                  placeholder="Ex: 6000 pour Charleroi"
                  aria-label="Entrez votre code postal"
                  required
                />
                {formData.commune && (
                  <p className="mt-1 text-sm text-gray-600 text-center">{formData.commune}</p>
                )}
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                )}
              </div>

              <div>
                <label htmlFor="destination" className="block text-center mb-2 font-medium">
                  Aéroport de destination :
                </label>
                <select
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleFieldChange('destination', e.target.value)}
                  className={getInputClasses('destination')}
                  aria-label="Sélectionnez votre aéroport"
                  required
                >
                  <option value="">Sélectionnez votre aéroport</option>
                  <optgroup label="Aéroports principaux">
                    <option value="BRU">Bruxelles-Zaventem (BRU)</option>
                    <option value="CRL">Charleroi Brussels South (CRL)</option>
                    <option value="CDG">Paris Charles de Gaulle (CDG)</option>
                    <option value="CGN">Cologne (CGN)</option>
                    <option value="DUS">Düsseldorf (DUS)</option>
                    <option value="AMS">Amsterdam Schiphol (AMS)</option>
                    <option value="LIL">Lille (LIL)</option>
                  </optgroup>
                  <optgroup label="Autres destinations">
                    <option value="ZYR">Gare de Bruxelles-Midi</option>
                    <option value="ORY">Paris Orly (ORY)</option>
                    <option value="LUX">Luxembourg (LUX)</option>
                  </optgroup>
                </select>
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Calculer le prix de votre navette aéroport"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Calcul en cours...
                  </span>
                ) : (
                  <>
                    <span className="mr-2">CALCULER LE TARIF</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Nous desservons tous les aéroports européens sur demande
            </p>
          </div>
        </section>

        {/* === HERO SECTION === */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-spero mb-4 text-center">
            Navette Aéroport Charleroi - Bruxelles - Paris
          </h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-4">
            Service professionnel de navette aéroport depuis le <strong>Grand Charleroi</strong> et tout le Hainaut
          </p>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            Transport 24h/7j vers Bruxelles-Zaventem, Charleroi, Paris CDG, Cologne, Düsseldorf, Amsterdam et Lille
          </p>
        </section>

        {/* === ZONES DESSERVIES === */}
        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Votre navette aéroport depuis votre commune
          </h2>
          <div className="text-center">
            <p className="mb-3 text-lg">
              <strong>Zones principales desservies :</strong>
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Grand Charleroi • Pont-à-Celles • Courcelles • Fontaine-l'Évêque • Fleurus • 
              Basse Sambre • Sambreville • Gerpinnes • Ham-sur-Heure • Thuin • Beaumont • 
              Rance • Chimay • Couvin • Philippeville • Walcourt • <strong>et toutes les autres communes du Hainaut</strong>
            </p>
          </div>
        </section>

        {/* === AVANTAGES CLÉS === */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Pourquoi choisir Spero Navette pour vos transferts aéroport ?
          </h2>
          <div className="features-grid">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Clock className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Service 24h/7j</h3>
              <p className="text-gray-700">Navettes disponibles à toute heure pour tous vos vols</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <MapPin className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Prise en charge à domicile</h3>
              <p className="text-gray-700">Nous venons vous chercher directement chez vous</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Shield className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ponctualité garantie</h3>
              <p className="text-gray-700">Suivi des vols en temps réel, jamais de retard</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Navette privée ou partagée</h3>
              <p className="text-gray-700">Choisissez selon vos besoins et votre budget</p>
            </div>
          </div>
        </section>

        {/* === SERVICES PAR AÉROPORT === */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Nos principales liaisons navette aéroport
          </h2>
          
          <div className="services-grid mb-10">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-spero">
                Navette Aéroport de Bruxelles-Zaventem
              </h3>
              <p className="text-gray-700 mb-4">
                Service de navette quotidien entre le Hainaut et l'aéroport de Bruxelles. 
                Idéal pour vos vols internationaux et européens.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trajet direct depuis votre domicile</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Durée moyenne: 50-70 minutes depuis Charleroi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dépose directe au terminal de départ</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-spero">
                Navette Aéroport de Charleroi Brussels South
              </h3>
              <p className="text-gray-700 mb-4">
                L'aéroport le plus proche pour les habitants du Hainaut. 
                Parfait pour vos vols low-cost et destinations européennes.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Service express depuis tout le Hainaut</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Durée: 20-45 minutes selon votre commune</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Idéal pour Ryanair, Wizz Air, etc.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-spero">
                Navette Aéroport Paris CDG
              </h3>
              <p className="text-gray-700 mb-4">
                Service de navette longue distance vers le principal aéroport parisien. 
                Confort optimal pour ce trajet de 3h environ.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Véhicules confortables pour longs trajets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Départ très tôt possible (vols matinaux)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Alternative économique au train/avion</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-spero">
                Navettes Cologne, Düsseldorf & Amsterdam
              </h3>
              <p className="text-gray-700 mb-4">
                Liaisons régulières vers les aéroports allemands et néerlandais. 
                Service porte-à-porte sans correspondance.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cologne: environ 2h30 de trajet</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Amsterdam Schiphol: environ 2h45</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Prix compétitifs vs train/location voiture</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* === TÉMOIGNAGES === */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Nos clients témoignent
          </h2>
          <div className="testimonials-grid">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Première expérience et nous avons été très satisfait. Départ à l'heure et il nous attendait à la sortie de l'aéroport. Que demander de mieux! Merci"
              </p>
              <p className="font-medium">- Bénédicte V. de Couvin</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Vous recherchez une navette de confiance ?? Alors n'hésitez plus... Nous avons réservé chez spero navette en précisant qu'on décollait de bxl airport le 29/04 jour de "greve". Annoncée grève générale la veille à 18h!!! Patron plus qu'humain, d'une gentillesse et hyper arrangeant, nous vous remercions pour tout et ne manqueront pas de revenir vers vous à chaque fois 😊"
              </p>
              <p className="font-medium">- Mélissa K. de Mettet</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Très contents de notre prise en charge pour un transfert aller/retour sur l'aéroport de Charleroi, d'autant que notre demande est intervenue un peu tard. Les horaires étaient respectés, le trajet sympathique. Nous recommandons et repasserons par SPERO pour de futurs voyages!"
              </p>
              <p className="font-medium">- Sindy D. de Fosses-la-Ville</p>
            </div>
          </div>
                    <div className="mt-8 text-center">
            <div className="bg-spero/5 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-700 mb-4">
                <strong>Note moyenne : 5.0/5</strong> basée sur plus de 40 avis clients vérifiés
              </p>
              <a 
                href="/avis" 
                className="inline-flex items-center bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-medium"
              >
                <Star className="h-5 w-5 mr-2 fill-current" />
                Voir tous nos avis clients (40+)
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </section>





        {/* === AUTRES SERVICES === */}
        <section className="mb-16 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Autres services de transport</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            En plus de nos navettes aéroport, nous proposons également des services de transport pour mariages, événements d'entreprise, concerts et sorties diverses. 
            <a href="mailto:info@spero-navette.be" className="text-spero hover:underline ml-1">Contactez-nous pour plus d'informations</a>.
          </p>
        </section>

        {/* === CONTACT RAPIDE === */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-spero mb-6">
            Réservez votre navette aéroport maintenant
          </h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Service disponible 24h/24 et 7j/7 pour tous les aéroports
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#calculator" className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
              <span className="mr-2">Calculer mon tarif</span>
              <ArrowRight size={18} />
            </a>
            <a href="tel:+32490197914" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center">
              <Phone size={18} className="mr-2" />
              <span>0490 19 79 14</span>
            </a>
            <a href="mailto:info@spero-navette.be" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center">
              <Mail size={18} className="mr-2" />
              <span>Demander un devis</span>
            </a>
          </div>
        </section>

        {/* === FAQ RAPIDE === */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Questions fréquentes sur nos navettes aéroport
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Combien de temps à l'avance dois-je réserver ma navette aéroport ?
                </h3>
                <p className="text-gray-700">
                  Nous recommandons de réserver au moins 48h à l'avance. Pour les réservations de dernière minute (moins de 24h), 
                  appelez-nous directement au 0490 19 79 14 pour vérifier les disponibilités.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Que se passe-t-il si mon vol a du retard ?
                </h3>
                <p className="text-gray-700">
                  Nos chauffeurs suivent les vols en temps réel. En cas de retard, votre chauffeur adaptera automatiquement 
                  l'heure de prise en charge. Vous n'avez rien à faire, nous nous occupons de tout.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Proposez-vous des sièges enfant pour les navettes ?
                </h3>
                <p className="text-gray-700">
                  Oui, nous fournissons gratuitement des sièges enfant et réhausseurs sur demande. 
                  Merci de préciser l'âge et le nombre d'enfants lors de votre réservation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Quelle est la différence entre navette privée et partagée ?
                </h3>
                <p className="text-gray-700">
                  La navette privée est exclusivement pour vous, trajet direct sans arrêt. 
                  La navette partagée peut inclure d'autres passagers avec des arrêts supplémentaires, mais reste très confortable et plus économique.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a href="/#/faq" className="text-spero font-medium hover:underline">
                Voir toutes les questions fréquentes →
              </a>
            </div>
          </div>
        </section>

        {/* === RÉSEAUX SOCIAUX === */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-spero mb-4">Suivez-nous</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com/speronavette" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/speronavette" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <defs>
                  <radialGradient id="instagramGradient" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <path fill="url(#instagramGradient)" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.218-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default memo(Home);