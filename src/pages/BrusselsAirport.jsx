import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Phone, Star, Plane, Car, Mail, Info, ChevronDown, ChevronUp } from 'lucide-react';

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
        {"@type": "City", "name": "Nivelles"},
        {"@type": "City", "name": "Chapelle-lez-Herlaimont"},
        {"@type": "City", "name": "Sambreville"},
        {"@type": "City", "name": "Thuin"},
        {"@type": "City", "name": "Chimay"},
        {"@type": "City", "name": "La Louvière"}
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

// FAQ optimisée pour le SEO
const brusselsAirportFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix d'une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi commence à partir de 96€ pour un transfert privé. Le tarif varie en fonction du nombre de personnes et du type de service (navette partagée ou privée)."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour aller de Charleroi à l'aéroport de Bruxelles-Zaventem ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le trajet entre Charleroi et l'aéroport de Bruxelles-Zaventem dure environ 50 à 70 minutes en conditions normales de circulation."
      }
    }
  ]
};

// Schema LocalBusiness
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Spero Navette",
  "image": "https://spero-navette.be/logo.png",
  "@id": "https://spero-navette.be",
  "url": "https://spero-navette.be",
  "telephone": "+32490197914",
  "email": "info@spero-navette.be",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Charleroi",
    "addressRegion": "Hainaut",
    "postalCode": "6000",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.4108,
    "longitude": 4.4446
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Schema Reviews
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Review",
      "position": 1,
      "author": {"@type": "Person", "name": "Thomas P."},
      "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
      "reviewBody": "J'ai beaucoup apprécié la qualité du service. La voiture était très confortable, le chauffeur d'une grande gentillesse et particulièrement ponctuel.",
      "itemReviewed": {"@type": "Service", "name": "Navette Aéroport Bruxelles-Zaventem - Spero Navette"}
    },
    {
      "@type": "Review",
      "position": 2,
      "author": {"@type": "Person", "name": "Jordan L."},
      "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
      "reviewBody": "Patron au top et très professionnel qui connaît son métier. Je recommande à 10000%",
      "itemReviewed": {"@type": "Service", "name": "Navette Aéroport Bruxelles-Zaventem - Spero Navette"}
    }
  ]
};

const BrusselsAirport = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Combien coûte une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi ?",
      answer: "Le prix d'une navette vers l'aéroport de Bruxelles-Zaventem depuis Charleroi commence à partir de 96€ pour un transfert privé. Le tarif varie en fonction du nombre de personnes et du type de service (navette partagée ou privée). Utilisez notre calculateur en ligne pour obtenir un tarif précis depuis votre commune."
    },
    {
      question: "Combien de temps faut-il pour aller de Charleroi à l'aéroport de Bruxelles-Zaventem ?",
      answer: "Le trajet entre Charleroi et l'aéroport de Bruxelles-Zaventem dure environ 50 à 70 minutes en conditions normales de circulation. Nos chauffeurs connaissent les meilleurs itinéraires et nous adaptons l'heure de départ en fonction des conditions de trafic prévues."
    },
    {
      question: "Où se trouve le point de rencontre pour les retours depuis l'aéroport de Bruxelles-Zaventem ?",
      answer: "Pour les retours depuis l'aéroport de Bruxelles-Zaventem, votre chauffeur vous attendra dans le hall des arrivées avec une pancarte à votre nom. Il sera facilement identifiable pour faciliter votre prise en charge."
    },
    {
      question: "Proposez-vous des navettes tôt le matin pour les vols au départ de Bruxelles-Zaventem ?",
      answer: "Oui, notre service de navette fonctionne 24h/24 et 7j/7. Nous proposons des départs très matinaux, même à 3h du matin si nécessaire, pour vous permettre d'arriver à temps pour les vols les plus tôt de Bruxelles-Zaventem."
    },
    {
      question: "Combien de temps à l'avance faut-il arriver à l'aéroport de Bruxelles-Zaventem ?",
      answer: "Pour les vols depuis Bruxelles-Zaventem, il est recommandé d'arriver 2 heures avant le décollage pour les vols Schengen (sans passeport), et 3 heures pour les vols internationaux hors Schengen. En période estivale (juillet/août), prévoyez 3h à 4h avant le décollage. Notre service calcule automatiquement l'heure de départ optimale."
    },
    {
      question: "Puis-je emmener des bagages supplémentaires dans la navette ?",
      answer: "Oui, nos véhicules sont spacieux et peuvent accommoder plusieurs bagages par personne. Pour les équipements volumineux (sport, poussettes, skis, vélos, etc.), merci de nous en informer lors de votre réservation afin que nous puissions prévoir un véhicule adapté."
    },
    {
      question: "Puis-je réserver une navette de dernière minute ?",
      answer: "Oui, nous acceptons les réservations de dernière minute sous réserve de disponibilité. Appelez-nous au 0490 19 79 14 et nous ferons notre maximum pour vous trouver une solution."
    },
    {
      question: "Que se passe-t-il si mon vol est retardé ou annulé ?",
      answer: "Nous suivons votre vol en temps réel. Si votre vol retour vers la Belgique est retardé, votre chauffeur ajuste automatiquement son heure d'arrivée. En cas d'annulation, contactez-nous pour reprogrammer votre transfert."
    },
    {
      question: "Proposez-vous des sièges bébé ou rehausseurs ?",
      answer: "Oui, nous mettons à disposition gratuitement des sièges auto pour bébés et enfants. Indiquez l'âge et le poids de votre enfant lors de la réservation."
    },
    {
      question: "Puis-je payer par carte bancaire ?",
      answer: "Oui, nous acceptons les paiements en espèces et par carte bancaire. Le paiement peut se faire avant ou après le trajet selon votre préférence."
    }
  ];

  const testimonials = [
    {
      text: "J'ai beaucoup apprécié la qualité du service. La voiture était très confortable, le chauffeur d'une grande gentillesse et particulièrement ponctuel. Tout s'est déroulé dans les meilleures conditions, ce qui a rendu le trajet très agréable et sans stress. Je recommande vivement ce service à toute personne recherchant confort, fiabilité et professionnalisme.",
      author: "Thomas P.",
      city: "Charleroi"
    },
    {
      text: "Patron au top et très professionnel qui connaît son métier. Employés à son image qui rassurent les clients et font passer le stress du transfert en un moment de joie pour toute la famille. Aidant et arrangeant. Je recommande à 10000%",
      author: "Jordan L.",
      city: "Région de Charleroi"
    },
    {
      text: "La navette était au rendez-vous tant à l'aller qu'au retour de Zaventem. Chauffeur très sympathique comme à l'accoutumée. Toujours satisfait de la Navette d'année en année.",
      author: "Alan V.",
      city: "Hainaut"
    },
    {
      text: "J'ai utilisé ce service de navette pour mes dernières vacances et je suis vraiment ravi. Le chauffeur était ponctuel, très professionnel et sympathique. Le véhicule était propre et confortable, ce qui a rendu le trajet très agréable. De plus, le prix était très correct pour la qualité du service proposé, ce qui est rare de nos jours ! Je recommande sans hésiter ce service à toute personne cherchant une solution fiable, pratique et abordable pour ses déplacements.",
      author: "Pascal G.",
      city: "Hainaut"
    },
    {
      text: "Un service au top, réservé par l'agence de voyage. Nous nous sommes rendu compte d'une erreur d'encodage pour le retour, après un échange de message tout à été réglé pour avoir une navette retour à la bonne heure, et pour notre bonheur ! Des chauffeurs ultra sympathique et très serviable ! Réellement je recommande vivement Spero navette à vous tous voyageur tranquille.",
      author: "Sebastiano F.",
      city: "Hainaut"
    }
  ];

  const zones = [
    { name: "Grand Charleroi", communes: "Charleroi, Gosselies, Jumet, Marcinelle, Montignies-sur-Sambre, Couillet, Dampremy, Goutroux" },
    { name: "Région de Nivelles", communes: "Nivelles, Braine-l'Alleud, Waterloo, Genappe" },
    { name: "Thudinie", communes: "Thuin, Lobbes, Erquelinnes, Ham-sur-Heure-Nalinnes" },
    { name: "Sambreville", communes: "Sambreville, Auvelais, Tamines, Jemeppe-sur-Sambre, Floreffe" },
    { name: "Entre-Sambre-et-Meuse", communes: "Walcourt, Philippeville, Florennes, Beaumont, Couvin" },
    { name: "Botte du Hainaut", communes: "Chimay, Momignies, Sivry-Rance, Froidchapelle" },
    { name: "Région Centre", communes: "La Louvière, Chapelle-lez-Herlaimont" }
  ];

  const trajets = [
    { ville: "Charleroi", distance: "75 km", tarif: "à partir de 96€", temps: "50-70 min" },
    { ville: "Nivelles", distance: "50 km", tarif: "à partir de 96€", temps: "45-60 min" },
    { ville: "Chapelle-lez-Herlaimont", distance: "50 km", tarif: "à partir de 96€", temps: "50-65 min" },
    { ville: "Sambreville", distance: "75 km", tarif: "à partir de 104€", temps: "55-75 min" },
    { ville: "La Louvière", distance: "65 km", tarif: "à partir de 96€", temps: "50-65 min" },
    { ville: "Thuin", distance: "85 km", tarif: "à partir de 104€", temps: "60-75 min" },
    { ville: "Chimay", distance: "115 km", tarif: "à partir de 151€", temps: "100-120 min" },
    { ville: "Couvin", distance: "110 km", tarif: "à partir de 139€", temps: "95-115 min" }
  ];

  return (
    <>
      <SEO
        title="Navette Aéroport Bruxelles-Zaventem depuis Charleroi | Dès 96€"
        description="Navette vers l'aéroport de Bruxelles-Zaventem depuis le Hainaut. Trajet 50-70 min, service 24/7, dès 96€. Évitez le stress du parking et des transports."
        keywords="navette bruxelles zaventem, transport zaventem charleroi, navette aéroport bruxelles, taxi zaventem hainaut, transfert bru airport"
        canonicalUrl="https://spero-navette.be/navette-aeroport-bruxelles-zaventem"
      >
        <script type="application/ld+json">
          {JSON.stringify(brusselsAirportStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(brusselsAirportFAQ)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(reviewsSchema)}
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
              Transfert privé et partagé depuis <strong>Charleroi, Nivelles, Chapelle-lez-Herlaimont, Sambreville</strong> et tout le Hainaut vers l'aéroport de Bruxelles-Zaventem
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

        {/* Pourquoi nous choisir */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Pourquoi choisir SPERO NAVETTE pour votre transfert vers Zaventem ?
            </h2>
            
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              Contrairement aux grandes plateformes internationales, <strong>SPERO NAVETTE est une entreprise familiale basée dans le Hainaut</strong> depuis plus de 10 ans. Nos chauffeurs connaissent parfaitement la région de Charleroi et les meilleurs itinéraires vers l'aéroport de Bruxelles-Zaventem.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Prise en charge à domicile</h3>
                    <p className="text-sm text-gray-600">Où que vous soyez dans le Hainaut</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Disponibilité 24h/24 et 7j/7</h3>
                    <p className="text-sm text-gray-600">Départs tôt le matin, tard le soir, week-ends et jours fériés</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Chauffeurs professionnels</h3>
                    <p className="text-sm text-gray-600">Ponctuels, courtois et expérimentés</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Véhicules confortables</h3>
                    <p className="text-sm text-gray-600">Mercedes Vito, Hyundai Staria, climatisation, WiFi</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Tarifs transparents</h3>
                    <p className="text-sm text-gray-600">Prix connu à l'avance, sans supplément caché</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Suivi des vols</h3>
                    <p className="text-sm text-gray-600">Adaptation automatique en cas de retard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Tarifs navette aéroport Zaventem depuis Charleroi et région
            </h2>
            
            <p className="text-center text-gray-700 mb-6">
              Nos prix sont fixes et calculés en fonction de votre commune de départ, du type de service (navette privée ou partagée) et du nombre de passagers.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-spero text-white">
                    <th className="p-3 text-left rounded-tl-lg">Ville de départ</th>
                    <th className="p-3 text-center">Distance</th>
                    <th className="p-3 text-center">Tarif</th>
                    <th className="p-3 text-center rounded-tr-lg">Temps de trajet</th>
                  </tr>
                </thead>
                <tbody>
                  {trajets.map((trajet, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="p-3 font-medium">{trajet.ville}</td>
                      <td className="p-3 text-center text-gray-600">{trajet.distance}</td>
                      <td className="p-3 text-center font-bold text-spero">{trajet.tarif}</td>
                      <td className="p-3 text-center text-gray-600">{trajet.temps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-700">
                💡 <strong>Demandez votre devis personnalisé</strong> : utilisez notre calculateur en ligne pour obtenir le prix exact depuis votre adresse.
              </p>
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
              L'aéroport de Bruxelles-Zaventem est le plus grand aéroport de Belgique et l'un des principaux hubs européens. Il accueille plus de 25 millions de passagers par an et dessert plus de 200 destinations dans le monde entier.
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
                    <span className="font-medium">Vols Schengen (sans passeport) :</span>
                    <ul className="mt-1 ml-1">
                      <li>• Hors saison : 2 heures avant le décollage</li>
                      <li>• Été (juillet/août) : 3 heures avant le décollage</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vols internationaux (avec passeport) :</span>
                    <ul className="mt-1 ml-1">
                      <li>• Hors saison : 3 heures avant le décollage</li>
                      <li>• Été (juillet/août) : 4 heures avant le décollage</li>
                    </ul>
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                SPERO NAVETTE calcule automatiquement l'heure de départ idéale en fonction de ces recommandations et des conditions de circulation prévues.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Principales compagnies aériennes</h3>
              <p className="text-gray-700 text-sm">
                Brussels Airlines, Ryanair, TUI fly, Lufthansa, Air France, KLM, British Airways, 
                Turkish Airlines, Emirates, Qatar Airways...
              </p>
            </div>
          </div>

          {/* Exemple de calcul */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3" />
              À quelle heure partir de Charleroi ?
            </h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-4 text-center">Exemple concret</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Vol à 10h depuis Zaventem</span>
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <p className="text-sm text-gray-600 mb-2">→ Arrivée recommandée à l'aéroport : <strong>8h</strong></p>
                  <p className="text-sm text-gray-600">→ Heure de départ depuis Charleroi : <strong className="text-spero">6h30</strong></p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Nos chauffeurs ajustent toujours votre heure de départ pour garantir votre arrivée à l'heure, en tenant compte :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">De la distance et du temps de trajet</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">De l'heure de votre vol</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Du trafic prévisible</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Des recommandations de l'aéroport</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Options de service */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
            Navette privée ou navette partagée : quelle formule choisir ?
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
                  <span>Idéal pour familles, groupes et voyages professionnels</span>
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
                  <span>Service porte-à-porte maintenu</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Idéal pour voyageurs seuls ou en couple</span>
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

        {/* Témoignages clients */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
            Témoignages clients : navette aéroport Charleroi - Zaventem
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm italic">"{testimonial.text}"</p>
                <p className="font-semibold text-spero">
                  - {testimonial.author} <span className="text-gray-600 font-normal">de {testimonial.city}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment réserver */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Comment réserver votre navette Charleroi - Zaventem ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-spero text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Demandez votre devis</h3>
                <p className="text-sm text-gray-600">Par téléphone (0490 19 79 14), en ligne ou par email</p>
              </div>
              <div className="text-center">
                <div className="bg-spero text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Confirmez votre réservation</h3>
                <p className="text-sm text-gray-600">Précisez adresse, heure de vol, nombre de passagers et bagages</p>
              </div>
              <div className="text-center">
                <div className="bg-spero text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Voyagez sereinement</h3>
                <p className="text-sm text-gray-600">Confirmation par SMS et email, prise en charge à l'heure</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Informations à nous communiquer :</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Votre adresse complète dans le Hainaut</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Date et heure de votre vol</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Numéro de vol et compagnie aérienne</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Nombre de passagers et de bagages</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Questions fréquentes sur notre navette vers Bruxelles-Zaventem
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left font-medium text-gray-900 hover:text-spero transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-spero flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zones desservies */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Toutes les communes desservies depuis le Hainaut vers Zaventem
            </h2>
            
            <p className="text-center text-gray-700 mb-6">
              SPERO NAVETTE couvre l'ensemble du Hainaut avec une attention particulière pour :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {zones.map((zone, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-spero mb-2">{zone.name}</h3>
                  <p className="text-sm text-gray-600">{zone.communes}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-700 mb-4">
              Votre commune n'est pas listée ? Pas d'inquiétude ! Notre service couvre l'ensemble du Hainaut 
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

        {/* Comparaison */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              Pourquoi choisir notre navette plutôt que d'autres options ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 text-center">SPERO NAVETTE vs Train</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas de correspondance à Bruxelles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Service porte-à-porte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas de portage de bagages lourds</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Horaires flexibles 24/7</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 text-center">SPERO NAVETTE vs Parking</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas de stress de stationnement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Économique pour 1 semaine+</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas de navette parking à prendre</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Retour serein après un vol fatigant</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 text-center">SPERO NAVETTE vs Uber/Taxi</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prix fixe garanti à l'avance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Spécialistes de l'aéroport</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Suivi de vol en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Service local du Hainaut</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Notre entreprise */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6 text-center">
              SPERO NAVETTE : votre partenaire de confiance depuis Charleroi
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-spero mr-2" />
                  Une entreprise familiale
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  SPERO NAVETTE est une entreprise familiale créée il y a plus de 10 ans. Basés dans la région de Charleroi, nous connaissons parfaitement le Hainaut et ses habitants.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Proximité</strong> : service local</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Fiabilité</strong> : ponctualité garantie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Transparence</strong> : tarifs clairs</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Car className="h-5 w-5 text-spero mr-2" />
                  Nos véhicules
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Flotte de véhicules modernes et confortables, régulièrement contrôlés et nettoyés :
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mercedes Vito (jusqu'à 8 passagers)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hyundai Staria (jusqu'à 8 passagers)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Climatisation et grand espace bagages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>WiFi disponible sur demande</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 text-spero mr-2" />
                  Nos chauffeurs
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Tous nos chauffeurs sont des professionnels expérimentés :
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Licence de transport de personnes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Résidents du Hainaut</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Formés au service client</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multilingues (français, anglais)</span>
                  </li>
                </ul>
              </div>
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
                <span>info@spero-navette.be</span>
              </a>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/30">
              <p className="text-sm opacity-90">
                <strong>Entreprise familiale</strong> • Plus de 10 ans d'expérience • Des milliers de clients satisfaits
              </p>
              <p className="text-xs mt-2 opacity-75">
                Charleroi • Nivelles • Sambreville • Chimay • La Louvière • Mons • Thuin • et toutes les communes du Hainaut
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BrusselsAirport;