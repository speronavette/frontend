import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Calendar, CreditCard, Phone, Star, Plane, Car, Mail, Info } from 'lucide-react';

// Données structurées optimisées pour le SEO de Bruxelles-Zaventem
const brusselsAirportStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Navette Aéroport Bruxelles-Zaventem - Spero Navette",
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
  "description": "Service de navette aéroport depuis le Grand Charleroi et tout le Hainaut vers l'aéroport de Bruxelles-Zaventem (BRU). Transport direct, ponctuel et confortable 24h/7j.",
  "serviceOutput": "Transport vers et depuis l'aéroport de Bruxelles-Zaventem",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.spero-navette.be",
    "servicePhone": "+32490197914",
    "serviceLocation": {
      "@type": "Place",
      "name": "Aéroport de Bruxelles-Zaventem",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zaventem",
        "addressRegion": "Brabant Flamand",
        "addressCountry": "BE"
      }
    }
  }
};

// FAQ optimisée pour le SEO spécifique à l'aéroport de Bruxelles
const brusselsAirportFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix d'une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi varie entre 25€ et 70€ par personne selon le type de service (navette partagée ou privée) et le nombre de passagers. Utilisez notre calculateur en ligne pour obtenir un tarif précis depuis votre commune."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour aller de Charleroi à l'aéroport de Bruxelles-Zaventem ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le trajet entre Charleroi et l'aéroport de Bruxelles-Zaventem dure environ 50 à 70 minutes en conditions normales de circulation. Nos chauffeurs connaissent les meilleurs itinéraires et nous adaptons l'heure de départ en fonction des conditions de trafic prévues."
      }
    },
    {
      "@type": "Question",
      "name": "Où se trouve le point de rencontre pour les retours depuis l'aéroport de Bruxelles-Zaventem ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour les retours depuis l'aéroport de Bruxelles-Zaventem, votre chauffeur vous attendra dans le hall des arrivées, devant le café JAVA (sur votre droite en sortant). Il tiendra un panneau avec votre nom pour faciliter l'identification."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous des navettes tôt le matin pour les vols au départ de Bruxelles-Zaventem ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, notre service de navette fonctionne 24h/24 et 7j/7. Nous proposons des départs très matinaux, même à 3h du matin si nécessaire, pour vous permettre d'arriver à temps pour les vols les plus tôt de Bruxelles-Zaventem."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps à l'avance faut-il arriver à l'aéroport de Bruxelles-Zaventem ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour les vols depuis Bruxelles-Zaventem, il est recommandé d'arriver 2 heures avant le décollage pour les destinations ne nécessitant pas de passeport, et 3 heures pour les destinations avec passeport. En été (juillet/août), prévoyez 3 heures sans passeport et 4 heures avec passeport en raison de l'affluence."
      }
    }
  ]
};

const BrusselsAirport = () => {
  return (
    <>
      <SEO
  title="Navette Aéroport Bruxelles-Zaventem depuis Charleroi | Dès 45€"
  description="Navette vers l'aéroport de Bruxelles-Zaventem depuis le Hainaut. Trajet 50-70 min, service 24/7, dès 45€. Évitez le stress du parking et des transports."
  keywords="navette bruxelles zaventem, transport zaventem charleroi, navette aéroport bruxelles, taxi zaventem hainaut, transfert bru airport, navette zaventem pas cher"
  canonicalUrl="https://www.spero-navette.be/navette-aeroport-bruxelles-zaventem"
      >
        <script type="application/ld+json">
          {JSON.stringify(brusselsAirportStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(brusselsAirportFAQ)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-spero mb-4 text-center">
              Navette Aéroport Bruxelles-Zaventem
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-6">
              Service de transport professionnel depuis <strong>Charleroi et tout le Hainaut</strong> vers l'aéroport de Bruxelles
            </p>
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Service disponible 24h/24 et 7j/7
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
              L'Aéroport de Bruxelles-Zaventem (BRU)
            </h2>
            <p className="text-gray-700 mb-4">
              L'aéroport de Bruxelles-Zaventem est le principal hub aérien de Belgique, desservant plus de 200 destinations 
              dans le monde. Situé à environ 11 km au nord-est de Bruxelles, c'est la porte d'entrée internationale 
              du pays et le siège de Brussels Airlines.
            </p>
            <p className="text-gray-700 mb-6">
              Il se compose d'un terminal principal divisé en trois piers (A, B et T) avec des installations modernes 
              et de nombreux services pour les voyageurs : restaurants, boutiques, salons, WiFi gratuit et bien plus encore.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                Temps d'arrivée recommandés
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vols sans passeport :</span>
                    <ul className="mt-1 ml-1">
                      <li>• Hors saison : 2 heures avant le décollage</li>
                      <li>• En été (juillet/août) : 3 heures avant le décollage</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vols avec passeport :</span>
                    <ul className="mt-1 ml-1">
                      <li>• Hors saison : 3 heures avant le décollage</li>
                      <li>• En été (juillet/août) : 4 heures avant le décollage</li>
                    </ul>
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
              <p className="text-gray-700">
                Brussels Airlines, Ryanair, TUI fly, Lufthansa, Air France, KLM, British Airways, 
                Turkish Airlines, Emirates, Qatar Airways et bien d'autres opèrent depuis cet aéroport.
              </p>
            </div>
          </div>

          {/* Notre service de navette */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 flex items-center">
              <Car className="h-6 w-6 mr-3" />
              Notre service de navette vers Bruxelles-Zaventem
            </h2>
            <p className="text-gray-700 mb-6">
              Spero Navette vous propose un service de transport fiable et confortable depuis votre domicile dans 
              le Hainaut vers l'aéroport de Bruxelles-Zaventem. Notre objectif est de vous permettre de commencer 
              votre voyage sans stress et en toute sérénité.
            </p>

            <h3 className="font-semibold mb-3">Pourquoi choisir notre navette ?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Prise en charge à domicile d'où vous le souhaitez</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Dépose au plus près du terminal de départ</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Service disponible 24h/24, même pour les vols très matinaux</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Suivi des vols en temps réel pour les retours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Véhicules confortables et chauffeurs professionnels</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span>Tarifs compétitifs et transparents</span>
              </li>
            </ul>

            <div className="bg-spero/10 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 text-spero mr-2" />
                Point de rencontre pour les retours
              </h3>
              <p className="text-gray-700">
                Pour les retours depuis l'aéroport de Bruxelles-Zaventem, votre chauffeur vous attendra 
                <strong> dans le hall des arrivées, devant le café JAVA</strong> (sur votre droite en sortant).
                Il tiendra un panneau avec votre nom pour faciliter l'identification.
              </p>
            </div>

            <div className="text-center">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer le tarif de ma navette
              </Link>
            </div>
          </div>
        </section>

        {/* Trajet et temps de parcours */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Trajet vers l'aéroport de Bruxelles-Zaventem
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-spero mr-2" />
                  Temps de trajet estimés
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Depuis Charleroi :</span> 50-70 minutes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Depuis Mons :</span> 60-80 minutes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Depuis Thuin :</span> 65-85 minutes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Depuis Chimay :</span> 100-120 minutes
                    </div>
                  </li>
                </ul>
                <p className="text-gray-700 text-sm">
                  Ces durées sont données à titre indicatif et peuvent varier selon les conditions de circulation.
                  Nous ajoutons toujours une marge de sécurité pour vous garantir une arrivée à l'heure à l'aéroport.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-spero mr-2" />
                  Itinéraire et autoroutes
                </h3>
                <p className="text-gray-700 mb-4">
                  Le trajet depuis le Hainaut vers l'aéroport de Bruxelles-Zaventem emprunte principalement :
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>L'autoroute E19 puis le Ring de Bruxelles (R0)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Alternative possible par E429 selon la circulation</span>
                  </li>
                </ul>
                <p className="text-gray-700 text-sm">
                  Nos chauffeurs connaissent parfaitement les différentes routes et choisissent
                  toujours l'itinéraire le plus rapide en fonction des conditions de circulation en temps réel.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-center">Avantages par rapport aux autres moyens de transport</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-center">Par rapport à voiture personnelle</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pas de frais de parking (10-20€/jour)</li>
                    <li>• Pas de stress de conduite</li>
                    <li>• Dépose directe au terminal</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-center">Par rapport au train</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pas de correspondances</li>
                    <li>• Service porte-à-porte</li>
                    <li>• Disponible à toute heure</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-center">Par rapport au taxi standard</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Tarifs plus avantageux</li>
                    <li>• Réservation à l'avance</li>
                    <li>• Service spécialisé aéroport</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Options de service */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
            Nos formules de navette vers Bruxelles-Zaventem
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-spero transition-colors">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Navette Privée</h3>
                <p className="text-gray-700">
                  Transport exclusif et direct pour vous
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trajet direct sans détour ni arrêt</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Véhicule exclusif pour votre groupe</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Flexibilité sur les horaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Confidentialité et confort maximum</span>
                </li>
              </ul>
              <div className="text-center">
                <Link to="/#calculator" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Calculer mon tarif
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-spero relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-spero text-white text-sm font-medium px-4 py-1 rounded-full">
                  Recommandé
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="bg-spero/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-spero" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Navette Partagée</h3>
                <p className="text-gray-700">
                  Solution économique avec d'autres passagers
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Tarif avantageux peu importe l'horaire</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maximum 3-4 arrêts supplémentaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Idéal pour les voyageurs économes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regroupement possible avec d'autres passagers</span>
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

        {/* Expériences clients */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
            Ce que disent nos clients
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Service impeccable pour notre transfert vers Bruxelles. Chauffeur à l'heure, voiture confortable et propre. Nous avons pu commencer notre voyage sans stress. Je recommande vivement !"
              </p>
              <p className="font-medium">- Michel D. de Charleroi</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Prise en charge à 4h du matin pour un vol tôt depuis Bruxelles, chauffeur ponctuel et très professionnel. Le retour était tout aussi parfait malgré le retard de notre vol. Service au top !"
              </p>
              <p className="font-medium">- Sophie L. de Thuin</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "J'utilise régulièrement Spero Navette pour mes déplacements professionnels via Bruxelles. Service fiable, ponctuel et bien moins cher qu'un taxi. La réservation est simple et l'équipe très réactive."
              </p>
              <p className="font-medium">- Jean-Marc B. de Mons</p>
            </div>
          </div>
        </section>

{/* FAQ section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Questions fréquentes sur notre navette vers Bruxelles-Zaventem
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien coûte une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi ?
                </h3>
                <p className="text-gray-700">
                  Le prix d'une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi varie en fonctiondu nombre de personnes et du type de service (navette partagée ou privée). Utilisez notre calculateur 
                  en ligne pour obtenir un tarif précis depuis votre commune.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien de temps faut-il pour aller de Charleroi à l'aéroport de Bruxelles-Zaventem ?
                </h3>
                <p className="text-gray-700">
                  Le trajet entre Charleroi et l'aéroport de Bruxelles-Zaventem dure environ 50 à 70 minutes en conditions normales 
                  de circulation. Nos chauffeurs connaissent les meilleurs itinéraires et adaptent le parcours en fonction 
                  des conditions de trafic en temps réel.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Où se trouve le point de rencontre pour les retours depuis l'aéroport de Bruxelles-Zaventem ?
                </h3>
                <p className="text-gray-700">
                  Pour les retours depuis l'aéroport de Bruxelles-Zaventem, votre chauffeur vous attendra dans le hall des arrivées, 
                  devant le café JAVA (sur votre droite en sortant). Il tiendra un panneau avec votre nom pour faciliter l'identification.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Proposez-vous des navettes tôt le matin pour les vols au départ de Bruxelles-Zaventem ?
                </h3>
                <p className="text-gray-700">
                  Oui, notre service de navette fonctionne 24h/24 et 7j/7. Nous proposons des départs très matinaux, 
                  même à 3h du matin si nécessaire, pour vous permettre d'arriver à temps pour les vols les plus tôt 
                  de Bruxelles-Zaventem.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien de temps à l'avance faut-il arriver à l'aéroport de Bruxelles-Zaventem ?
                </h3>
                <p className="text-gray-700">
                  Pour les vols depuis Bruxelles-Zaventem, il est recommandé d'arriver :
                </p>
                <ul className="mt-2 ml-6 list-disc text-gray-700 space-y-1">
                  <li>Pour les destinations <strong>sans passeport</strong> : 2 heures avant le décollage (3 heures en juillet/août)</li>
                  <li>Pour les destinations <strong>avec passeport</strong> : 3 heures avant le décollage (4 heures en juillet/août)</li>
                </ul>
                <p className="mt-2 text-gray-700">
                  Notre service de navette calcule automatiquement l'heure de départ optimale en fonction de ces recommandations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Puis-je emmener des bagages supplémentaires dans la navette ?
                </h3>
                <p className="text-gray-700">
                  Oui, nos véhicules sont spacieux et peuvent accommoder plusieurs bagages par personne. 
                  Pour les équipements volumineux (équipement de sport, poussettes, etc.), 
                  merci de nous en informer lors de votre réservation afin que nous puissions prévoir un véhicule adapté.
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

        {/* Conseils aux voyageurs */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Conseils pour votre voyage via Bruxelles-Zaventem
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-spero mr-2" />
                  Optimiser votre temps à l'aéroport
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Enregistrez-vous en ligne quand c'est possible pour gagner du temps</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Vérifiez le terminal de départ avant de partir (A, B ou T)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Renseignez-vous sur les procédures de sécurité spécifiques à votre destination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Préparez votre documentation de voyage à l'avance (passeport, visa, etc.)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-spero mr-2" />
                  Services disponibles à l'aéroport
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>WiFi gratuit dans tout l'aéroport</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Nombreux restaurants et boutiques duty-free</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Salons business (accessibles selon votre billet ou contre paiement)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Services de change et distributeurs automatiques</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-center">Astuce pour le retour</h3>
              <p className="text-gray-700 text-center">
                Pour les retours, n'oubliez pas de nous communiquer votre numéro de vol afin que nous puissions 
                suivre d'éventuels retards. En cas de retard important, votre chauffeur ajustera automatiquement 
                l'heure de prise en charge sans frais supplémentaires.
              </p>
            </div>
          </div>
        </section>

        {/* Zones desservies */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Zones desservies pour nos navettes vers Bruxelles-Zaventem
            </h2>
            
            <p className="text-center text-gray-700 mb-6">
              Notre service de navette aéroport couvre tout le Hainaut avec une attention particulière pour les régions suivantes :
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Grand Charleroi</h3>
                <p className="text-sm text-gray-600">Charleroi, Gosselies, Jumet, Montignies-sur-Sambre</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Région Centre</h3>
                <p className="text-sm text-gray-600">La Louvière, Binche, Morlanwelz, Manage</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Région de Mons</h3>
                <p className="text-sm text-gray-600">Mons, Frameries, Jemappes, Quévy</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Botte du Hainaut</h3>
                <p className="text-sm text-gray-600">Chimay, Momignies, Sivry-Rance</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Entre-Sambre-et-Meuse</h3>
                <p className="text-sm text-gray-600">Walcourt, Philippeville, Florennes</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Région de Thuin</h3>
                <p className="text-sm text-gray-600">Thuin, Lobbes, Beaumont, Ham-sur-Heure</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Basse-Sambre</h3>
                <p className="text-sm text-gray-600">Sambreville, Jemeppe-sur-Sambre, Floreffe</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium">Région de Tournai</h3>
                <p className="text-sm text-gray-600">Tournai, Péruwelz, Antoing, Leuze</p>
              </div>
            </div>
            
            <p className="text-center text-gray-700 mb-4">
              Vous ne trouvez pas votre commune ? Pas d'inquiétude ! Notre service couvre l'ensemble du Hainaut 
              et bien au-delà. N'hésitez pas à nous contacter pour vérifier notre disponibilité dans votre région.
            </p>
            
            <div className="text-center">
              <a href="tel:+32490197914" className="inline-block bg-spero text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                <Phone className="inline-block h-4 w-4 mr-2" />
                Nous appeler : 0490 19 79 14
              </a>
            </div>
          </div>
        </section>

        {/* Comparaison avec autres moyens de transport */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Pourquoi choisir notre navette plutôt que d'autres options ?
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-spero text-white">
                    <th className="p-3 text-left">Critère</th>
                    <th className="p-3 text-center">Navette Spero</th>
                    <th className="p-3 text-center">Voiture personnelle</th>
                    <th className="p-3 text-center">Train</th>
                    <th className="p-3 text-center">Taxi standard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Prix</td>
                    <td className="p-3 text-center bg-green-50">Compétitif, sans surprise</td>
                    <td className="p-3 text-center">+ Coût parking (10-20€/jour)</td>
                    <td className="p-3 text-center">Variable, + transferts locaux</td>
                    <td className="p-3 text-center">Très élevé (souvent plus de 175€)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Confort</td>
                    <td className="p-3 text-center bg-green-50">Véhicules confortables</td>
                    <td className="p-3 text-center">Dépend de votre voiture</td>
                    <td className="p-3 text-center">Limité, souvent bondé</td>
                    <td className="p-3 text-center">Bon</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Stress</td>
                    <td className="p-3 text-center bg-green-50">Aucun, tout est géré</td>
                    <td className="p-3 text-center">Conduite, stationnement</td>
                    <td className="p-3 text-center">Correspondances, retards</td>
                    <td className="p-3 text-center">Faible</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Porte-à-porte</td>
                    <td className="p-3 text-center bg-green-50">Oui</td>
                    <td className="p-3 text-center">Non (parking éloigné)</td>
                    <td className="p-3 text-center">Non</td>
                    <td className="p-3 text-center">Oui</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Disponibilité</td>
                    <td className="p-3 text-center bg-green-50">24h/24 et 7j/7</td>
                    <td className="p-3 text-center">Dépend de vous</td>
                    <td className="p-3 text-center">Horaires limités</td>
                    <td className="p-3 text-center">Variable selon zone</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Bagages</td>
                    <td className="p-3 text-center bg-green-50">Aucune limite</td>
                    <td className="p-3 text-center">Limité à votre coffre</td>
                    <td className="p-3 text-center">Difficile à gérer</td>
                    <td className="p-3 text-center">Limité selon véhicule</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-spero/10 p-6 rounded-lg text-center">
              <h3 className="font-semibold mb-2">Le meilleur rapport qualité/prix pour votre transfert aéroport</h3>
              <p className="text-gray-700 mb-4">
                Notre navette vers Bruxelles-Zaventem combine confort, tranquillité d'esprit et tarifs compétitifs 
                pour vous offrir la meilleure expérience possible.
              </p>
              <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer maintenant le prix de ma navette
              </Link>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mb-8">
          <div className="bg-spero text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Réservez votre navette vers Bruxelles-Zaventem maintenant
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              Transport fiable et confortable depuis votre domicile dans le Hainaut vers l'aéroport de Bruxelles-Zaventem. 
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
              <a href="mailto:info@spero-navette.be" className="inline-block bg-white/20 border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/30 transition-colors font-semibold">
                <Mail className="inline h-5 w-5 mr-2" />
                <span>Demander un devis</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BrusselsAirport;