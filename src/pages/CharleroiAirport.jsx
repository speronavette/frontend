import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Phone, Star, Plane, Car, Mail, Info } from '../components/Icons';

// Données structurées optimisées pour le SEO de Charleroi
const charleroiAirportStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Navette Aéroport Charleroi Brussels South - Spero Navette",
  "serviceType": "Navette aéroport",
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
        {"@type": "City", "name": "Pont-à-Celles"},
        {"@type": "City", "name": "Courcelles"},
        {"@type": "City", "name": "Fontaine-l'Évêque"},
        {"@type": "City", "name": "Fleurus"},
        {"@type": "City", "name": "Sambreville"},
        {"@type": "City", "name": "Gerpinnes"},
        {"@type": "City", "name": "Thuin"},
        {"@type": "City", "name": "Beaumont"},
        {"@type": "City", "name": "Chimay"},
        {"@type": "City", "name": "Couvin"},
        {"@type": "City", "name": "Philippeville"},
        {"@type": "City", "name": "Walcourt"}
      ]
    }
  ],
  "description": "Service de navette aéroport depuis le Grand Charleroi et tout le Hainaut vers l'aéroport de Charleroi Brussels South (CRL). Transport direct, ponctuel et confortable 24h/7j.",
  "serviceOutput": "Transport vers et depuis l'aéroport de Charleroi Brussels South",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.spero-navette.be",
    "servicePhone": "+32490197914",
    "serviceLocation": {
      "@type": "Place",
      "name": "Aéroport de Charleroi Brussels South",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gosselies",
        "addressRegion": "Hainaut",
        "addressCountry": "BE"
      }
    }
  }
};

// FAQ optimisée pour le SEO spécifique à l'aéroport de Charleroi
const charleroiAirportFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une navette vers l'aéroport de Charleroi depuis le centre-ville ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix d'une navette vers l'aéroport de Charleroi depuis le centre-ville varie entre 15€ et 40€ par personne selon le type de service (navette partagée ou privée) et le nombre de passagers. Utilisez notre calculateur en ligne pour obtenir un tarif précis depuis votre commune."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour aller au centre de Charleroi à l'aéroport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le trajet entre le centre de Charleroi et l'aéroport de Charleroi Brussels South dure environ 15 à 25 minutes en conditions normales de circulation. Pour les communes plus éloignées du Hainaut, comptez entre 30 et 60 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Où se trouve le point de rencontre pour les retours depuis l'aéroport de Charleroi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour les retours depuis l'aéroport de Charleroi, votre chauffeur vous attendra devant les ascenseurs au niveau du parking express. Il tiendra un panneau avec votre nom pour faciliter l'identification."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps à l'avance faut-il arriver à l'aéroport de Charleroi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour les vols depuis l'aéroport de Charleroi, il est recommandé d'arriver 2 heures avant le décollage, et 2h30 à 3h en période de forte affluence (vacances scolaires, été). Les compagnies low-cost comme Ryanair et Wizz Air peuvent être strictes sur les temps d'enregistrement."
      }
    }
  ]
};

const CharleroiAirport = () => {
  return (
    <>
      <SEO 
        title="Navette Aéroport Charleroi Brussels South | Transport depuis le Hainaut"
        description="Service de navette aéroport Charleroi Brussels South depuis tout le Hainaut. Transport direct 24h/7j, tarifs compétitifs, idéal pour vols low-cost. ☎ 0490/19.79.14"
        keywords="navette aéroport Charleroi, transport Brussels South, navette Gosselies, transfert aéroport CRL, taxi Hainaut Charleroi, Ryanair Charleroi"
      >
        <script type="application/ld+json">
          {JSON.stringify(charleroiAirportStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(charleroiAirportFAQ)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-spero mb-4 text-center">
              Navette Aéroport Charleroi Brussels South
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-6">
              Service de transport professionnel depuis <strong>tout le Hainaut</strong> vers l'aéroport de Charleroi Brussels South
            </p>
            <div className="flex justify-center mb-8">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Service disponible 24h/24 et 7j/7 - Idéal pour les vols low-cost
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
              L'Aéroport de Charleroi Brussels South (CRL)
            </h2>
            <p className="text-gray-700 mb-4">
              L'aéroport de Charleroi Brussels South est le deuxième aéroport de Belgique et un hub majeur pour 
              les compagnies low-cost. Il est situé à Gosselies, à environ 7 km au nord de Charleroi et à 46 km 
              au sud de Bruxelles.
            </p>
            <p className="text-gray-700 mb-6">
              Particulièrement prisé pour ses vols économiques vers l'Europe, l'Afrique du Nord et le Moyen-Orient, 
              cet aéroport est la base principale de Ryanair en Belgique et accueille également des compagnies comme 
              Wizz Air, TUI fly et Air Corsica.
            </p>

            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Info className="h-5 w-5 text-red-600 mr-2" />
                Temps d'arrivée recommandés
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Période normale :</span> 2 heures avant le décollage
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Période d'affluence (vacances, été) :</span> 2h30 à 3 heures avant le décollage
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                Notre service de navette calcule automatiquement l'heure de départ idéale en fonction 
                de ces recommandations et des conditions de circulation prévues.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Principales compagnies aériennes</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ryanair (principale compagnie, nombreuses destinations européennes)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Wizz Air (Europe de l'Est, Balkans, Turquie)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>TUI fly (destinations vacances, Méditerranée)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Air Corsica, Air Algérie, et autres compagnies saisonnières</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Notre service de navette */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 flex items-center">
              <Car className="h-6 w-6 mr-3" />
              Notre service de navette vers Charleroi Brussels South
            </h2>
            <p className="text-gray-700 mb-6">
              Spero Navette vous propose un service de transport rapide et économique depuis votre domicile dans 
              le Hainaut vers l'aéroport de Charleroi. Notre proximité avec cet aéroport nous permet d'offrir 
              des tarifs particulièrement avantageux et des temps de trajet courts.
            </p>

            <h3 className="font-semibold mb-3">Pourquoi choisir notre navette ?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Service express depuis tout le Hainaut</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Tarifs définis, sans surprise</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Idéal pour les vols low-cost tôt le matin ou tard le soir</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Durée du trajet: 15-40 minutes selon votre commune</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Parfaite connaissance de l'aéroport et de ses procédures</span>
              </li>
            </ul>

            <div className="bg-spero/10 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 text-spero mr-2" />
                Point de rencontre pour les retours
              </h3>
              <p className="text-gray-700">
                Pour les retours depuis l'aéroport de Charleroi, votre chauffeur vous attendra 
                <strong> devant les ascenseurs au niveau du parking express</strong>.
                Merci de vous rendre joignable dès votre atterrissage.
              </p>
            </div>

            <div className="text-center">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer le tarif de ma navette
              </Link>
            </div>
          </div>
        </section>

        {/* Durées de trajet */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Temps de trajet vers l'aéroport de Charleroi
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-spero mr-2" />
                  Durées estimées depuis votre commune
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Charleroi centre</h4>
                    <p className="text-gray-700">15-20 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Fontaine-l'Évêque</h4>
                    <p className="text-gray-700">20-25 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Fleurus</h4>
                    <p className="text-gray-700">15-20 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Thuin</h4>
                    <p className="text-gray-700">30-35 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Chimay</h4>
                    <p className="text-gray-700">60-70 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Mons</h4>
                    <p className="text-gray-700">35-45 minutes</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Avantages de notre navette</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Par rapport au bus TEC</strong> : Direct sans arrêts, disponible 24h/24, prise en charge à domicile</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Par rapport à la voiture personnelle</strong> : Pas de frais de parking (8-15€/jour), pas de stress de conduite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Par rapport au taxi standard</strong> : Réservation à l'avance garantie</span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Idéal pour les vols matinaux</h4>
                  <p className="text-gray-700">
                    Notre service est particulièrement apprécié pour les vols Ryanair tôt le matin 
                    (5h-7h), lorsque les transports en commun ne sont pas encore disponibles. 
                    Nous assurons votre arrivée à l'heure, quel que soit l'horaire de votre vol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Options de service */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
            Nos formules de navette vers Charleroi Brussels South
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-spero relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-spero text-white text-sm font-medium px-4 py-1 rounded-full">
                  Plus populaire
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Navette Partagée</h3>
                <p className="text-gray-700">
                  Solution économique avec d'autres passagers
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Tarif sans surprise</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Plus de flexibilité demandée</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Idéal pour les petits budgets</span>
                </li>
              </ul>
              <div className="text-center">
                <Link to="/#calculator" className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Calculer mon tarif
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-spero transition-colors">
              <div className="text-center mb-6">
                <div className="bg-spero/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-spero" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Navette Privée</h3>
                <p className="text-gray-700">
                  Transport exclusif et direct pour vous
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trajet direct sans détour ni arrêt</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Véhicule exclusif pour votre groupe</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Flexibilité totale sur les horaires</span>
                </li>
              </ul>
              <div className="text-center">
                <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                  Calculer mon tarif
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section simplifiée */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Questions fréquentes sur notre navette vers Charleroi
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien coûte une navette vers l'aéroport de Charleroi depuis le centre-ville ?
                </h3>
                <p className="text-gray-700">
                  Le prix d'une navette vers l'aéroport de Charleroi depuis le centre-ville varie en fonction du nombre de passagers et du type de service (navette partagée ou privée). Utilisez notre calculateur 
                  en ligne pour obtenir un tarif précis depuis votre commune.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Où se trouve le point de rencontre pour les retours depuis l'aéroport de Charleroi ?
                </h3>
                <p className="text-gray-700">
                  Pour les retours depuis l'aéroport de Charleroi, votre chauffeur vous attendra devant les ascenseurs 
                  au niveau du parking express. Il tiendra un panneau avec votre nom pour faciliter l'identification.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien de temps à l'avance faut-il arriver à l'aéroport de Charleroi ?
                </h3>
                <p className="text-gray-700">
                  Pour les vols depuis l'aéroport de Charleroi, il est recommandé d'arriver 2 heures avant le décollage, 
                  et 2h30 à 3h en période de forte affluence (vacances scolaires, été). Les compagnies low-cost comme 
                  Ryanair et Wizz Air peuvent être strictes sur les temps d'enregistrement.
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
              Réservez votre navette vers Charleroi Brussels South
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              Transport rapide et économique depuis votre domicile dans le Hainaut vers l'aéroport de Charleroi. 
              Service disponible 24h/24 et 7j/7 pour tous vos vols.
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

export default CharleroiAirport;