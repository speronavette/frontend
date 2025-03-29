import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO'; // Importation du composant SEO
import { calculatePrice } from '../data/prices';
import { postalCodesDB } from '../data/postalCodes';
import { ArrowRight, Clock, Users, MapPin, CheckCircle, Music, Heart, Briefcase, Utensils, Activity } from 'lucide-react';

const airports = [
  { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
  { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
  { code: 'ZYR', nom: 'Gare de Bruxelles-Midi', pays: 'Belgique' },
  { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
  { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
  { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
  { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' },
  { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
  { code: 'DUS', nom: 'Aéroport de Dusseldorf', pays: 'Allemagne' },
  { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' }
];

// Données structurées pour Schema.org
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Spero Navette",
  "image": "https://www.spero-navette.be/images/logo.jpg",
  "url": "https://www.spero-navette.be/",
  "telephone": "+32490197914",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue du Centenaire 87",
    "addressLocality": "Mont-sur-Marchienne",
    "postalCode": "6032",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.8503,
    "longitude": 4.3517
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "$$",
  "description": "Service de navette aéroport et transport événementiel entre votre domicile et les aéroports de Bruxelles, Charleroi, Paris CDG et autres destinations. Transport confortable et ponctuel 24h/7j. Également disponible pour mariages, concerts, sorties restaurant et événements d'entreprise."
};

// Données structurées pour le service de navette (product)
const navetteFAQData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment fonctionne votre service de transport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre chauffeur vient vous chercher à l'adresse et à l'heure convenues, puis vous conduit directement à votre destination. Pour les retours d'aéroport, nous vous attendons après l'atterrissage de votre vol."
      }
    },
    {
      "@type": "Question",
      "name": "Quels types d'événements couvrez-vous en dehors des navettes aéroport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous proposons des services de transport pour les sorties au restaurant, les mariages, les team buildings, les concerts, les visites médicales et les réunions professionnelles."
      }
    },
    {
      "@type": "Question",
      "name": "Comment puis-je réserver une navette ou un service de transport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vous pouvez calculer votre tarif et réserver directement sur notre site pour les navettes aéroport, ou nous contacter par téléphone au +32 490 197 914 ou par email pour une réservation personnalisée pour tout type de transport."
      }
    }
  ]
};

function Home() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [commune, setCommune] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState({});

  const handlePostalCodeChange = (e) => {
    const code = e.target.value;
    setPostalCode(code);
    
    if (code.length === 4) {
      const foundCommune = postalCodesDB[code];
      setCommune(foundCommune || 'Code postal non trouvé');
    } else {
      setCommune('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!passengers) {
      newErrors.passengers = "Veuillez sélectionner le nombre de passagers";
    }
    
    if (!postalCode || postalCode.length !== 4) {
      newErrors.postalCode = "Veuillez entrer un code postal valide";
    }
    
    if (!destination) {
      newErrors.destination = "Veuillez sélectionner une destination";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const prices = calculatePrice(postalCode, destination, passengers);
  
    if (prices.sharedPrice === 0 && prices.privatePrice === 0) {
      navigate('/result', {
        state: {
          passengers,
          postalCode,
          commune,
          destination: {
            code: destination,
            nom: airports.find(a => a.code === destination)?.nom
          },
          prices,
          noPriceFound: true
        }
      });
      return;
    }

    navigate('/result', {
      state: {
        passengers,
        postalCode,
        commune,
        destination: {
          code: destination,
          nom: airports.find(a => a.code === destination)?.nom
        },
        prices
      }
    });
  };

  // Grouper les aéroports par pays pour un affichage organisé
  const airportsByCountry = airports.reduce((acc, airport) => {
    if (!acc[airport.pays]) {
      acc[airport.pays] = [];
    }
    acc[airport.pays].push(airport);
    return acc;
  }, {});

  return (
    <>
      <SEO
        title="Navette Aéroport et Transport Événementiel | Bruxelles, Charleroi"
        description="Service de navette aéroport à Bruxelles, Charleroi et Paris depuis votre domicile. Transport privé et partagé 24h/7j. Transport pour événements, mariages, sorties, concerts et réunions professionnelles."
        keywords="navette aéroport, transport Bruxelles Zaventem, navette Charleroi, Brussels airport, transport aéroport Paris, navette domicile aéroport, transport mariage, transport événementiel"
        canonicalUrl="https://www.spero-navette.be/">
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(navetteFAQData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-spero mb-4 text-center">Navette Aéroport et Transport Événementiel</h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-8">
            Transport privé et navette partagée depuis votre domicile vers tous les aéroports.
            Service disponible 24h/24 et 7j/7 pour tous vos déplacements et événements.
          </p>
          
          {/* Widgets sociaux */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-md">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsperonavette&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="100%" 
                height="300" 
                style={{border: 'none', overflow: 'hidden'}} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook feed"
              ></iframe>
            </div>
            <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-md">
              <iframe 
                src="https://www.instagram.com/speronavette/embed" 
                width="100%" 
                height="300" 
                frameBorder="0" 
                scrolling="no" 
                allowTransparency={true}
                title="Instagram feed"
              ></iframe>
            </div>
          </div>
        </section>
        
        {/* Calculateur de prix */}
        <section id="calculator" className="max-w-md mx-auto mb-16 scroll-mt-24">
          <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-center mb-6">Calculez votre tarif de navette</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="passengers" className="block text-center mb-2 font-medium">
                    Nombre de personnes :
                  </label>
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className={`w-full p-2 border ${errors.passengers ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                    aria-label="Sélectionnez le nombre de passagers"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
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
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    className={`w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                    maxLength="4"
                    inputMode="numeric"
                    aria-label="Entrez votre code postal"
                    required
                  />
                  {commune && (
                    <p className="mt-1 text-sm text-gray-600 text-center">{commune}</p>
                  )}
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="destination" className="block text-center mb-2 font-medium">
                    Destination :
                  </label>
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={`w-full p-2 border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                    aria-label="Sélectionnez votre destination"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    {Object.entries(airportsByCountry).map(([country, airportList]) => (
                      <optgroup key={country} label={country}>
                        {airportList.map(airport => (
                          <option key={airport.code} value={airport.code}>
                            {airport.nom} ({airport.code})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                  aria-label="Calculer le prix de votre navette"
                >
                  <span className="mr-2">CALCULER VOTRE NAVETTE</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Nos services */}
        <section className="mb-16" id="services">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Nos services de transport</h2>
          
          {/* Navettes aéroport */}
          <h3 className="text-2xl font-semibold mb-6 text-spero">Navettes aéroport</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-4 text-spero">Navette Aéroport de Bruxelles</h4>
              <p className="text-gray-700 mb-4">Service de navette premium entre votre domicile et l'aéroport de Bruxelles Zaventem (BRU). Transport confortable avec chauffeurs professionnels pour tous vos vols internationaux et européens.</p>
              <div className="flex items-center text-spero">
                <Clock size={18} className="mr-2" />
                <p className="text-sm font-medium">Service 24h/24 et 7j/7</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-4 text-spero">Navette Aéroport de Charleroi</h4>
              <p className="text-gray-700 mb-4">Transport à la demande depuis toutes les communes vers l'aéroport de Charleroi (CRL). Idéal pour les vols low-cost, notre service s'adapte parfaitement aux horaires matinaux ou tardifs.</p>
              <div className="flex items-center text-spero">
                <MapPin size={18} className="mr-2" />
                <p className="text-sm font-medium">Prise en charge à domicile</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-4 text-spero">Navette Autres Destinations</h4>
              <p className="text-gray-700 mb-4">Desservant également Paris CDG, Paris Orly, Lille, Amsterdam et plusieurs autres aéroports internationaux. Une solution complète pour tous vos besoins de transport aéroportuaire.</p>
              <div className="flex items-center text-spero">
                <Users size={18} className="mr-2" />
                <p className="text-sm font-medium">Navettes privées ou partagées</p>
              </div>
            </div>
          </div>
          
          {/* Transport événementiel - NOUVELLE SECTION */}
          <h3 className="text-2xl font-semibold mb-6 text-spero">Transport pour événements</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Heart size={22} className="text-spero mr-2" />
                <h4 className="text-xl font-semibold text-spero">Mariages</h4>
              </div>
              <p className="text-gray-700 mb-4">Transport élégant et ponctuel pour votre jour J. Service personnalisé pour les mariés et leurs invités avec véhicules confortables pour tous vos déplacements entre les différents lieux de célébration.</p>
              <div className="flex justify-end">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline">Demander un devis</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Music size={22} className="text-spero mr-2" />
                <h4 className="text-xl font-semibold text-spero">Concerts & Sorties</h4>
              </div>
              <p className="text-gray-700 mb-4">Profitez pleinement de vos soirées sans vous soucier du transport. Service de navette pour concerts, spectacles et sorties culturelles, avec prise en charge et retour à domicile.</p>
              <div className="flex justify-end">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline">Demander un devis</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Utensils size={22} className="text-spero mr-2" />
                <h4 className="text-xl font-semibold text-spero">Sorties Restaurant</h4>
              </div>
              <p className="text-gray-700 mb-4">Profitez pleinement de vos sorties gastronomiques sans vous soucier de conduire. Service de navette pour vos dîners et soirées entre amis ou en couple, en toute sécurité.</p>
              <div className="flex justify-end">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline">Demander un devis</a>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Activity size={22} className="text-spero mr-2" />
                <h4 className="text-xl font-semibold text-spero">Team Building</h4>
              </div>
              <p className="text-gray-700 mb-4">Transport de groupes pour vos activités de team building et sorties d'entreprise. Véhicules spacieux et confortables pouvant accueillir plusieurs équipes.</p>
              <div className="flex justify-end">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline">Demander un devis</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Briefcase size={22} className="text-spero mr-2" />
                <h4 className="text-xl font-semibold text-spero">Réunions Professionnelles</h4>
              </div>
              <p className="text-gray-700 mb-4">Transport professionnel pour vos déplacements d'affaires, réunions et rendez-vous importants. Ponctualité et discrétion garanties pour tous vos besoins professionnels.</p>
              <div className="flex justify-end">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline">Demander un devis</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Activity size={22} className="text-spero mr-2" />
                <h4 className="text-xl font-semibold text-spero">Visites Médicales</h4>
              </div>
              <p className="text-gray-700 mb-4">Transport confortable pour vos rendez-vous médicaux. Notre service s'adapte à vos besoins spécifiques avec une attention particulière avant et après vos consultations.</p>
              <div className="flex justify-end">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline">Demander un devis</a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a href="mailto:contact@spero-navette.be" className="inline-block bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
              Demander un devis pour vos événements
            </a>
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Pourquoi choisir Spero Navette ?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <CheckCircle size={20} className="mr-2 text-spero" />
                  Transport personnalisé
                </h3>
                <p className="text-gray-700">Notre service s'adapte à vos besoins spécifiques. Que vous voyagiez seul, en famille ou en groupe, nous proposons des solutions sur mesure pour tous vos déplacements vers les aéroports et pour vos événements spéciaux.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <CheckCircle size={20} className="mr-2 text-spero" />
                  Service porte-à-porte
                </h3>
                <p className="text-gray-700">Fini le stress des transports en commun ou du stationnement. Nous venons vous chercher directement chez vous et vous déposons à votre destination, que ce soit un aéroport, un restaurant ou une salle de réception.</p>
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <CheckCircle size={20} className="mr-2 text-spero" />
                  Tarifs compétitifs
                </h3>
                <p className="text-gray-700">Nos prix sont transparents et calculés en fonction de la distance, sans frais cachés. Possibilité de navette partagée pour réduire le coût de votre transport vers l'aéroport et tarifs groupés pour les événements.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <CheckCircle size={20} className="mr-2 text-spero" />
                  Fiabilité et ponctualité
                </h3>
                <p className="text-gray-700">Nos chauffeurs suivent en temps réel l'évolution de votre vol pour s'adapter aux éventuels retards. Un service fiable et ponctuel pour tous vos déplacements, qu'il s'agisse d'un vol ou d'un événement important.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages clients */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Ce que disent nos clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Un service de grande qualité. Après un voyage fatiguant, il est bon de pouvoir compter sur une personne attentive et prudente pour nous ramener à la maison, de plus de nuit.
              Nous recommandons vivement ce service."</p>
              <p className="font-medium">- Nicolas B., Nalinnes</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Que ce soit pour l'aller ou le retour nous avons été super ravis. Ils sont super sympa! Navette impeccable et propre. Sincèrement je vous les conseille les yeux fermés. N'hésitez plus et le prix est vraiment correct. Milles merci pour votre sympatie. A l'année prochaine."</p>
              <p className="font-medium">- Jennifer C., Forchies-la-Marche</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"C'est toujours un plaisir de faire appel à leur service de navette. Ponctuel, sympathique et tarifs tout à fait compétitifs. Un vrai partenaire pour nos futurs déplacements vers l'aéroport."</p>
              <p className="font-medium">- Jean-Michel D., Gozée</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mb-16 text-center bg-spero/10 p-8 rounded-lg">
          <h2 className="text-3xl font-semibold text-spero mb-6">Prêt à réserver votre transport ?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">Calculez votre tarif pour une navette aéroport directement en ligne, ou contactez-nous pour tout service de transport événementiel ou personnel.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#calculator" className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
              <span className="mr-2">Calculer ma navette aéroport</span>
              <ArrowRight size={18} />
            </a>
            <a href="tel:+32490197914" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
              Nous appeler : +32 490 197 914
            </a>
            <a href="mailto:contact@spero-navette.be" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
              Demander un devis
            </a>
          </div>
        </section>

        {/* FAQ rapide */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Questions fréquentes</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Comment fonctionne votre service de transport ?</h3>
                <p className="text-gray-700">Notre chauffeur vient vous chercher à l'adresse et à l'heure convenues, puis vous conduit directement à votre destination. Pour les retours d'aéroport, nous vous attendons après l'atterrissage de votre vol.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Quels types d'événements couvrez-vous en dehors des navettes aéroport ?</h3>
                <p className="text-gray-700">Nous proposons des services de transport pour les sorties au restaurant, les mariages, les team buildings, les concerts, les visites médicales et les réunions professionnelles.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Comment puis-je réserver un transport pour un événement spécial ?</h3>
                <p className="text-gray-700">Pour les événements spéciaux, envoyez-nous un email à contact@spero-navette.be avec les détails de votre demande ou appelez-nous au +32 490 197 914 pour une réservation personnalisée.</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a href="/faq" className="text-spero font-medium hover:underline">Voir toutes les questions fréquentes</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;