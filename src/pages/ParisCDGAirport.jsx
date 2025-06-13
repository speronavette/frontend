import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Phone, Star, Plane, Car, Mail, Info } from 'lucide-react';

// Données structurées optimisées pour le SEO de Paris CDG
const parisCDGAirportStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Navette Aéroport Paris Charles de Gaulle - Spero Navette",
  "serviceType": "Navette aéroport longue distance",
  "provider": {
    "@type": "Organization",
    "name": "Spero Navette",
    "telephone": "+32490197914",
    "email": "info@spero-navette.be"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "Hainaut",
      "containsPlace": [
        {"@type": "City", "name": "Charleroi"},
        {"@type": "City", "name": "Mons"},
        {"@type": "City", "name": "Thuin"},
        {"@type": "City", "name": "Chimay"},
        {"@type": "City", "name": "Tournai"}
      ]
    }
  ],
  "description": "Service de navette aéroport longue distance depuis le Grand Charleroi et tout le Hainaut vers l'aéroport de Paris Charles de Gaulle (CDG). Transport direct, confortable et économique 24h/7j.",
  "serviceOutput": "Transport vers et depuis l'aéroport de Paris Charles de Gaulle",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.spero-navette.be",
    "servicePhone": "+32490197914",
    "serviceLocation": {
      "@type": "Place",
      "name": "Aéroport de Paris Charles de Gaulle",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Roissy-en-France",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      }
    }
  }
};

// FAQ optimisée pour le SEO spécifique à l'aéroport de Paris CDG
const parisCDGAirportFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une navette vers l'aéroport de Paris CDG depuis le Hainaut ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix d'une navette vers l'aéroport de Paris CDG depuis le Hainaut varie entre 60€ et 120€ par personne selon le type de service (navette partagée ou privée) et le nombre de passagers. Pour un groupe de 4 personnes ou plus, notre service devient souvent plus économique que le train ou l'avion."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour aller de Charleroi à l'aéroport de Paris CDG ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le trajet entre Charleroi et l'aéroport de Paris Charles de Gaulle dure environ 3 heures à 3h30 en conditions normales de circulation. Nos chauffeurs connaissent les meilleurs itinéraires et planifient le départ en fonction des conditions de circulation prévues."
      }
    },
    {
      "@type": "Question",
      "name": "Où se trouve le point de rencontre pour les retours depuis l'aéroport de Paris CDG ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour les retours depuis l'aéroport de Paris CDG, votre chauffeur vous attendra au dépose-minute des départs du terminal concerné. Il tiendra un panneau avec votre nom pour faciliter l'identification. La coordination exacte se fait par téléphone à l'arrivée."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi choisir une navette plutôt que le train pour aller à Paris CDG ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre navette offre un service porte-à-porte sans correspondances ni transferts, idéal avec des bagages. Pour 2 personnes ou plus, elle devient souvent plus économique que le train (qui nécessite souvent des transferts). Elle est disponible 24h/24 pour tous les vols et offre un confort supérieur pour ce trajet de 3h."
      }
    }
  ]
};

const ParisCDGAirport = () => {
  return (
    <>
      <SEO 
        title="Navette Aéroport Paris Charles de Gaulle | Transport depuis le Hainaut"
        description="Service de navette aéroport Paris Charles de Gaulle (CDG) depuis le Hainaut. Transport direct, confortable et économique 24h/7j. Alternative au train et à l'avion. ☎ 0490/19.79.14"
        keywords="navette aéroport Paris CDG, transport Roissy, navette Belgique Paris, transfert aéroport Paris, taxi Hainaut Roissy, Charleroi Paris CDG"
      >
        <script type="application/ld+json">
          {JSON.stringify(parisCDGAirportStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(parisCDGAirportFAQ)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-spero mb-4 text-center">
              Navette Aéroport Paris Charles de Gaulle
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-6">
              Service de transport longue distance depuis <strong>tout le Hainaut</strong> vers l'aéroport de Paris CDG
            </p>
            <div className="flex justify-center mb-8">
              <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Alternative économique et confortable au train
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a href="tel:+32490197914" className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Réserver par téléphone : 0490 19 79 14
              </a>
              <Link to="/#calculator" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center">
                <ArrowRight className="h-5 w-5 mr-2" />
                Calculer mon tarif en ligne
              </Link>
            </div>
          </div>
        </section>

        {/* Info aéroport et services */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          {/* Informations sur l'aéroport */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 flex items-center">
              <Plane className="h-6 w-6 mr-3" />
              L'Aéroport de Paris Charles de Gaulle (CDG)
            </h2>
            <p className="text-gray-700 mb-4">
              L'aéroport de Paris Charles de Gaulle, également connu sous le nom de Roissy, est le plus grand aéroport 
              international de France et l'un des plus importants d'Europe. Il est situé à 25 km au nord-est de Paris.
            </p>
            <p className="text-gray-700 mb-6">
              Avec ses trois terminaux et ses nombreuses connexions internationales, CDG est une porte d'entrée 
              majeure vers l'Europe et le reste du monde, desservant plus de 300 destinations avec plus de 100 
              compagnies aériennes.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Info className="h-5 w-5 text-purple-600 mr-2" />
                Temps d'arrivée recommandés
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vols européens :</span> 3 heures avant le décollage
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vols internationaux :</span> 3 à 4 heures avant le décollage
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                Notre service de navette calcule automatiquement l'heure de départ optimale en tenant compte de 
                ces recommandations, du temps de trajet et des conditions de circulation prévues.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Structure de l'aéroport</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Terminal 1 :</strong> Structure circulaire unique, vols internationaux</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Terminal 2 (A à G) :</strong> Air France et partenaires SkyTeam</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Terminal 3 :</strong> Vols charters et compagnies low-cost</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Notre service de navette */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 flex items-center">
              <Car className="h-6 w-6 mr-3" />
              Notre service de navette vers Paris CDG
            </h2>
            <p className="text-gray-700 mb-6">
              Spero Navette vous propose un service de transport longue distance confortable et économique depuis 
              votre domicile dans le Hainaut vers l'aéroport de Paris Charles de Gaulle. Notre service est une 
              excellente alternative au train, particulièrement pour les petits groupes.
            </p>

            <h3 className="font-semibold mb-3">Pourquoi choisir notre navette ?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Service porte-à-porte sans correspondance ni transfert</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Plus économique que le train pour 6 personnes ou plus</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Idéal pour les vols tôt le matin ou tard le soir</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Véhicules confortables spécialement équipés pour les longs trajets</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Pas ou peu de limite de bagages contrairement au train ou à l'avion</span>
              </li>
            </ul>

            <div className="bg-spero/10 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 text-spero mr-2" />
                Point de rencontre pour les retours
              </h3>
              <p className="text-gray-700">
                Pour les retours depuis l'aéroport de Paris CDG, votre chauffeur vous attendra 
                <strong> au dépose-minute des départs du terminal concerné</strong>.
              </p>
            </div>

            <div className="text-center">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer le tarif de ma navette
              </Link>
            </div>
          </div>
        </section>

        {/* Comparaison avec autres moyens de transport */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Pourquoi choisir notre navette pour Paris CDG ?
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-spero text-white">
                    <th className="p-3 text-left">Critère</th>
                    <th className="p-3 text-center">Navette Spero</th>
                    <th className="p-3 text-center">Train + RER</th>
                    <th className="p-3 text-center">Avion Bruxelles-Paris</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Durée totale</td>
                    <td className="p-3 text-center bg-green-50">3h-3h30 direct</td>
                    <td className="p-3 text-center">4h-5h avec correspondances</td>
                    <td className="p-3 text-center">4h-5h avec enregistrement</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Confort</td>
                    <td className="p-3 text-center bg-green-50">Véhicule confortable, pauses possibles</td>
                    <td className="p-3 text-center">Changements avec bagages</td>
                    <td className="p-3 text-center">Files d'attente, sièges étroits</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Bagages</td>
                    <td className="p-3 text-center bg-green-50">Illimités</td>
                    <td className="p-3 text-center">Difficile à gérer</td>
                    <td className="p-3 text-center">Limités et souvent payants</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Flexibilité</td>
                    <td className="p-3 text-center bg-green-50">24h/24, horaires adaptés à votre vol</td>
                    <td className="p-3 text-center">Horaires fixes, limités la nuit</td>
                    <td className="p-3 text-center">Horaires fixes, peu de vols</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-center">Idéal pour les groupes et les familles</h3>
              <p className="text-gray-700 text-center mb-4">
                Notre service devient particulièrement avantageux dès 2 personnes voyageant ensemble. 
                Pour une famille de 8 personnes, l'économie peut atteindre plusieurs centaines d'Euros par rapport aux autres 
                moyens de transport, tout en offrant un confort supérieur.
              </p>
              <div className="text-center">
                <Link to="/#calculator" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Calculer mes économies
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Informations sur le trajet */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Informations sur le trajet vers Paris CDG
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-spero mr-2" />
                  Durée et organisation du voyage
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Durée moyenne :</span> 3h à 3h30 depuis Charleroi
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Pauses confort :</span> Possibilité d'une pause sur demande
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Itinéraire :</span> Via autoroutes E19/A2/A1
                    </div>
                  </li>
                </ul>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Confort à bord</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Véhicules spacieux et climatisés</li>
                    <li>• Eau disponible pendant le trajet</li>
                    <li>• Possibilité de charger vos appareils</li>
                    <li>• Wifi disponible sur certains véhicules</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-spero mr-2" />
                  Conseils pour votre voyage
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Pour l'aller :</strong> Prévoyez large pour tenir compte d'éventuels ralentissements autour de Paris</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Pour le retour :</strong> Fournissez votre numéro de vol pour que nous puissions suivre d'éventuels retards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Terminal :</strong> Vérifiez à l'avance votre terminal de départ/arrivée pour faciliter la coordination</span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Bon à savoir</h4>
                  <p className="text-gray-700 text-sm">
                    L'aéroport de Paris CDG est très étendu, avec des terminaux parfois éloignés les uns des autres. 
                    Notre chauffeur vous déposera directement au terminal de votre vol, ce qui représente un avantage 
                    considérable par rapport aux transports en commun qui vous laissent souvent à distance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section simplifiée */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Questions fréquentes sur notre navette vers Paris CDG
            </h2>
            <div className="space-y-6">
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien de temps faut-il pour aller de Charleroi à l'aéroport de Paris CDG ?
                </h3>
                <p className="text-gray-700">
                  Le trajet entre Charleroi et l'aéroport de Paris Charles de Gaulle dure environ 3 heures à 3h30 
                  en conditions normales de circulation. Nos chauffeurs connaissent les meilleurs itinéraires et 
                  planifient le départ en fonction des conditions de circulation prévues.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Pourquoi choisir une navette plutôt que le train pour aller à Paris CDG ?
                </h3>
                <p className="text-gray-700">
                  Notre navette offre un service porte-à-porte sans correspondances ni transferts, idéal avec des bagages. 
                  Pour 2 personnes ou plus, elle devient souvent plus économique que le train (qui nécessite souvent des 
                  transferts). Elle est disponible 24h/24 pour tous les vols et offre un confort supérieur pour ce trajet de 3h.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/faq" className="text-spero font-medium hover:underline">
                Voir toutes nos questions fréquentes →
              </Link>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mb-8">
          <div className="bg-spero text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Réservez votre navette vers Paris Charles de Gaulle
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              Transport direct et confortable depuis votre domicile dans le Hainaut vers l'aéroport de Paris CDG. 
              Alternative économique au train et à l'avion, idéale pour les groupes et les familles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/#calculator" className="inline-block bg-white text-spero px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
                <span className="mr-2">Calculer mon tarif</span>
                <ArrowRight className="inline h-5 w-5" />
              </Link>
              <a href="tel:+32490197914" className="inline-block bg-white/20 border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/30 transition-colors font-semibold">
                <Phone className="inline h-5 w-5 mr-2" />
                <span>0490 19 79 14</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ParisCDGAirport;