import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Phone, Star, Plane, Car, Mail, Info, ChevronLeft, ChevronRight } from '../components/Icons';

// Données structurées optimisées pour le SEO - Focus Wallonie vers Charleroi
// Données structurées optimisées pour le SEO - CORRIGÉES
const charleroiAirportStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Spero Navette - Navette Aéroport Charleroi",
  "image": "https://spero-navette.be/logo.png",
  "telephone": "+32490197914",
  "email": "info@spero-navette.be",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Charleroi",
    "addressRegion": "Wallonie",
    "postalCode": "6000",
    "addressCountry": "BE"
  },
  "priceRange": "€€",
  "url": "https://spero-navette.be/navette-aeroport-charleroi",
  "description": "Service de navette aéroport depuis toute la Wallonie vers Charleroi Brussels South. Transport 24h/7, chauffeurs professionnels, ponctualité garantie.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "189"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "Wallonie"
    },
    {
      "@type": "City",
      "name": "Namur"
    },
    {
      "@type": "City",
      "name": "Liège"
    },
    {
      "@type": "City",
      "name": "Mons"
    },
    {
      "@type": "City",
      "name": "Charleroi"
    }
  ],
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
  }
};

// Schema séparé pour les avis - NOUVEAU
const charleroiAirportReviews = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Spero Navette - Navette Aéroport Charleroi",
        "url": "https://spero-navette.be"
      },
      "author": {
        "@type": "Person",
        "name": "Thomas P."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-09-16",
      "reviewBody": "J'ai beaucoup apprécié la qualité du service. La voiture était très confortable, le chauffeur d'une grande gentillesse et particulièrement ponctuel."
    },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Spero Navette - Navette Aéroport Charleroi",
        "url": "https://spero-navette.be"
      },
      "author": {
        "@type": "Person",
        "name": "Corinne B."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-09-16",
      "reviewBody": "Chauffeurs très sympathiques et accueillants. Service au top!"
    },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Spero Navette - Navette Aéroport Charleroi",
        "url": "https://spero-navette.be"
      },
      "author": {
        "@type": "Person",
        "name": "Jordan L."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-08-16",
      "reviewBody": "Patron au top et très professionnel qui connaît son métier. Je recommande à 10000%"
    },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Spero Navette - Navette Aéroport Charleroi",
        "url": "https://spero-navette.be"
      },
      "author": {
        "@type": "Person",
        "name": "Anne S."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-08-16",
      "reviewBody": "Facilité de réservation, réponse rapide, chauffeurs super sympas, ponctuels, serviables."
    },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Spero Navette - Navette Aéroport Charleroi",
        "url": "https://spero-navette.be"
      },
      "author": {
        "@type": "Person",
        "name": "Grégory C."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-09-16",
      "reviewBody": "Ponctualité, confort de roulage et professionnalisme. Chauffeur de haut standing."
    }
  ]
};

// FAQ optimisée avec mots-clés géolocalisés
const charleroiAirportFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une navette vers l'aéroport de Charleroi depuis Namur, Liège ou Mons ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le tarif dépend de votre ville de départ et du nombre de passagers. Par exemple, depuis Namur comptez environ 30-40 minutes de trajet, depuis Liège 50-60 minutes, et depuis Mons 40-50 minutes. Nos prix sont fixes et communiqués dès la réservation. Utilisez notre calculateur en ligne pour obtenir un devis instantané depuis votre commune wallonne."
      }
    },
    {
      "@type": "Question",
      "name": "Desservez-vous toutes les villes de Wallonie pour aller à Charleroi Airport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, nous assurons des transferts depuis toute la Wallonie vers l'aéroport de Charleroi : Namur, Liège, Mons, Tournai, Verviers, Dinant, Couvin, Chimay, Wavre, Louvain-la-Neuve, Huy, Marche-en-Famenne et toutes les communes intermédiaires."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je réserver une navette à la dernière minute depuis la Wallonie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, nous proposons un service 24h/7, même pour les départs urgents depuis n'importe quelle ville de Wallonie, sous réserve de disponibilité."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il si mon vol depuis Charleroi est en retard ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos chauffeurs suivent les horaires de vol de Charleroi Brussels South en direct : aucun supplément ni inquiétude à avoir, même en cas de retard."
      }
    }
  ]
};

// Composant Carousel d'avis Google intégré
const GoogleReviewsCarousel = () => {
  // Avis Google réels anonymisés
  const reviews = [
    {
      id: 1,
      author: "Thomas P.",
      rating: 5,
      text: "J'ai beaucoup apprécié la qualité du service. La voiture était très confortable, le chauffeur d'une grande gentillesse et particulièrement ponctuel. Tout s'est déroulé dans les meilleures conditions, ce qui a rendu le trajet très agréable et sans stress. Je recommande vivement ce service à toute personne recherchant confort, fiabilité et professionnalisme.",
      date: "Il y a 1 mois"
    },
    {
      id: 2,
      author: "Corinne B.",
      rating: 5,
      text: "Chauffeurs très sympathiques et accueillants. Service au top! Ils trouvent des solutions dès qu'il y a un petit souci. Un véritable confort et une sérénité pour tous les voyages.",
      date: "Il y a 1 mois"
    },
    {
      id: 3,
      author: "Jordan L.",
      rating: 5,
      text: "Patron au top et très professionnel qui connaît son métier. Employés à son image qui rassurent les clients et font passer le stress du transfert en un moment de joie pour toute la famille. Aidant et arrangeant. Je recommande à 10000%",
      date: "Il y a 2 mois"
    },
    {
      id: 4,
      author: "Anne S.",
      rating: 5,
      text: "Facilité de réservation, réponse rapide, chauffeurs super sympas, ponctuels, serviables et conduite fluide. Que du bonheur et no stress durant le trajet. Je recommande !",
      date: "Il y a 2 mois"
    },
    {
      id: 5,
      author: "Grégory C.",
      rating: 5,
      text: "Ponctualité, confort de roulage et professionnalisme. Chauffeur de haut standing. Politesse, courtoisie. Merci à l'équipe",
      date: "Il y a 1 mois"
    },
    {
      id: 6,
      author: "Anne B.",
      rating: 5,
      text: "Un personnel sympathique, très ponctuel avec accompagnement et aide pour les bagages jusqu'à la porte d'entrée de l'aéroport et idem au retour! Je recommande vivement.",
      date: "Il y a 4 mois"
    },
    {
      id: 7,
      author: "Stéphanie M.",
      rating: 5,
      text: "Service impeccable ! Chauffeur ponctuel, courtois et conduite très agréable. Trajet aéroport de Bruxelles jusqu'à chez moi sans stress.",
      date: "Il y a 1 mois"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Afficher 3 avis à la fois sur desktop
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full">
      {/* En-tête avec note globale */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex">{renderStars(5)}</div>
          <span className="text-2xl font-bold text-gray-800">4,9/5</span>
        </div>
        <p className="text-gray-600">Basé sur 189 avis Google</p>
        <a
          href="https://www.google.com/maps/place/Spero+Navette" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
        >
          Voir tous les avis sur Google →
        </a>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Boutons de navigation */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
          aria-label="Avis précédent"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
          aria-label="Avis suivant"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>

        {/* Grille des avis - 3 colonnes sur desktop, 1 sur mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 md:px-8">
          {getVisibleReviews().map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Étoiles */}
              <div className="flex mb-3">{renderStars(review.rating)}</div>

              {/* Texte de l'avis */}
              <p className="text-gray-700 mb-4 leading-relaxed min-h-[100px] text-sm">
                "{review.text}"
              </p>

              {/* Auteur */}
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-800">{review.author}</p>
                <p className="text-xs text-gray-400 mt-1">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-spero'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à l'avis ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Badge Google */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border border-gray-200">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Avis Google</span>
        </div>
      </div>
    </div>
  );
};

const CharleroiAirport = () => {
  return (
    <>
<SEO
  title="Navette Aéroport Charleroi depuis Wallonie | Namur, Liège, Mons - Spero"
  description="Navette aéroport Charleroi depuis toute la Wallonie : Namur (30min), Liège (50min), Mons (40min). Service 24h/7, prix fixes, transferts directs. Réservez maintenant !"
  keywords="navette aéroport charleroi wallonie, transfert charleroi depuis namur, navette charleroi liège, taxi aéroport charleroi mons, transport charleroi brussels south, navette charleroi tournai"
  canonicalUrl="https://spero-navette.be/navette-aeroport-charleroi"
>
  <script type="application/ld+json">
    {JSON.stringify(charleroiAirportStructuredData)}
  </script>
  <script type="application/ld+json">
    {JSON.stringify(charleroiAirportReviews)}
  </script>
  <script type="application/ld+json">
    {JSON.stringify(charleroiAirportFAQ)}
  </script>
</SEO>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Optimisé SEO */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-spero mb-6 text-center leading-tight">
              Navette Aéroport Charleroi – Transfert 24/7 depuis toute la Wallonie (Namur, Liège, Mons, …)
            </h1>
            
            {/* Breadcrumb invisible mais SEO */}
            <div className="sr-only">
              Accueil &gt; Navette Aéroport &gt; Charleroi depuis Wallonie
            </div>
            
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6 leading-relaxed">
              <strong>Vous partez en voyage depuis l'aéroport de Charleroi Brussels South ?</strong> SPERO NAVETTE vous propose un service de <strong>navette privée depuis toute la Wallonie</strong> : que vous soyez à <strong>Namur</strong> (30 min), <strong>Liège</strong> (50 min), <strong>Mons</strong> (40 min), <strong>Tournai</strong>, <strong>Verviers</strong> ou ailleurs, nos chauffeurs professionnels vous conduisent directement à l'aéroport de Charleroi, 24 heures sur 24 et 7 jours sur 7.
            </p>
            
            <div className="bg-spero/5 border-l-4 border-spero p-4 mb-6 rounded">
              <p className="text-gray-800">
                ✈️ <strong>Service express depuis toute la Wallonie vers Charleroi Airport</strong> • Prix fixes sans supplément • Prise en charge à domicile • Suivi des vols en temps réel
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+32490197914" className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center font-semibold">
                <Phone className="h-5 w-5 mr-2" />
                Réserver : 0490 19 79 14
              </a>
              <Link to="/#calculator" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center font-semibold">
                <ArrowRight className="h-5 w-5 mr-2" />
                Calculer mon tarif depuis ma ville
              </Link>
            </div>
          </div>
        </section>

        {/* Pourquoi choisir SPERO NAVETTE */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center">
              Pourquoi choisir SPERO NAVETTE pour votre trajet vers Charleroi Airport ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-spero/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-spero" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ponctualité garantie</h3>
                  <p className="text-gray-700">
                    Nous suivons en temps réel l'horaire de votre vol à Charleroi Brussels South pour ajuster votre prise en charge depuis n'importe quelle ville de Wallonie.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-spero/10 rounded-full flex items-center justify-center">
                    <Car className="h-6 w-6 text-spero" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Confort</h3>
                  <p className="text-gray-700">
                    Véhicules récents et climatisés pour un trajet agréable jusqu'à Charleroi.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-spero/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-spero" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Prix fixes et transparents</h3>
                  <p className="text-gray-700">
                    Aucun supplément caché, même de nuit ou le week-end. Le prix affiché est le prix payé, quelle que soit votre ville de départ en Wallonie.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-spero/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-spero" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Chauffeurs professionnels et expérimentés</h3>
                  <p className="text-gray-700">
                    Votre sécurité et votre tranquillité d'esprit sont nos priorités. Nos chauffeurs connaissent parfaitement tous les trajets wallons vers Charleroi.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-spero/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-spero" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Service porte-à-porte</h3>
                  <p className="text-gray-700">
                    Prise en charge directe à votre domicile, à l'hôtel ou sur votre lieu de travail, partout en Wallonie.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-spero/10 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6 text-spero" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Disponible 24h/7</h3>
                  <p className="text-gray-700">
                    Service disponible jour et nuit, parfait pour les vols tôt le matin ou tard le soir depuis Charleroi Brussels South.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avis Google Carousel - Intégré */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center flex items-center justify-center">
              <Star className="h-8 w-8 mr-3 text-yellow-500" />
              Ce que disent nos clients wallons
            </h2>
            
            <GoogleReviewsCarousel />
          </div>
        </section>

        {/* Temps de trajet depuis les villes wallonnes - Section SEO clé */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-spero/5 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center">
              Navette depuis votre ville wallonne vers l'Aéroport de Charleroi
            </h2>
            <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              <strong>SPERO NAVETTE dessert toute la Wallonie</strong> pour vos transferts vers l'aéroport de Charleroi Brussels South. Découvrez les temps de trajet estimés depuis les principales villes :
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Province de Namur */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-spero mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Depuis Namur et Province
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Charleroi centre → Airport</strong>
                      <p className="text-sm text-gray-600">15-20 minutes • 10 km</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Couvin / Chimay → Airport</strong>
                      <p className="text-sm text-gray-600">50-70 minutes • 65-80 km</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Brabant Wallon */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-spero mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Depuis Brabant Wallon
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Wavre → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">35-45 minutes • 45 km</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Louvain-la-Neuve → Airport</strong>
                      <p className="text-sm text-gray-600">30-40 minutes • 40 km</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Province de Luxembourg */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-spero mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Depuis Province Luxembourg
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Marche-en-Famenne → Airport</strong>
                      <p className="text-sm text-gray-600">60-70 minutes • 80 km</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Saint-Hubert → Airport</strong>
                      <p className="text-sm text-gray-600">70-80 minutes • 95 km</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Autres communes */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-spero mb-4 flex items-center">
                  <Plane className="h-6 w-6 mr-2" />
                  Autres communes wallonnes
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Péruwelz / Dour / Ath</strong>
                      <p className="text-sm text-gray-600">50-70 minutes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Mouscron → Airport</strong>
                      <p className="text-sm text-gray-600">70-80 minutes • 90 km</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-spero">
              <h3 className="font-bold text-lg mb-3 text-spero">
                📍 Votre ville n'est pas listée ?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Nous desservons TOUTES les communes de Wallonie</strong> pour vos transferts vers l'aéroport de Charleroi Brussels South. Utilisez notre calculateur en ligne pour obtenir le temps de trajet et le tarif exact depuis votre adresse.
              </p>
              <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors font-semibold">
                Calculer depuis ma commune →
              </Link>
            </div>
          </div>
        </section>

        {/* Comment fonctionne notre service */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-8 text-center">
              Comment réserver votre navette depuis la Wallonie vers Charleroi ?
            </h2>
            
            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-spero text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Réservez</h3>
                <p className="text-gray-700 text-sm">En ligne ou par téléphone, indiquez votre ville de départ</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-spero text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Confirmation</h3>
                <p className="text-gray-700 text-sm">Recevez votre confirmation avec le tarif fixe</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-spero text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Prise en charge</h3>
                <p className="text-gray-700 text-sm">À domicile, partout en Wallonie</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-spero text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Transfert direct</h3>
                <p className="text-gray-700 text-sm">Trajet confortable vers Charleroi</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-spero text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  5
                </div>
                <h3 className="font-semibold mb-2">Arrivée</h3>
                <p className="text-gray-700 text-sm">Assistance et service retour</p>
              </div>
            </div>

            <p className="text-center text-gray-700 mt-8 max-w-3xl mx-auto">
              Chaque trajet est planifié avec soin afin de garantir votre confort, votre sécurité et votre ponctualité.
            </p>
          </div>
        </section>

        {/* Tarifs */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center">
              Tarifs navette Charleroi depuis la Wallonie : Prix fixes et transparents
            </h2>
            <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
              Nos tarifs pour la navette vers l'aéroport de Charleroi sont calculés à l'avance selon votre ville de départ en Wallonie et le nombre de passagers. 
              <strong> Aucun frais caché ou supplément de bagage.</strong> Que vous partiez de Namur, Liège, Mons ou ailleurs, le prix affiché est le prix final.
            </p>
            
            <div className="bg-spero/5 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-4 text-center">💰 Exemples de tarifs indicatifs</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-spero">Namur → Charleroi</p>
                  <p className="text-sm text-gray-600">À partir de 35€/pers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-spero">Liège → Charleroi</p>
                  <p className="text-sm text-gray-600">À partir de 55€/pers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-spero">Mons → Charleroi</p>
                  <p className="text-sm text-gray-600">À partir de 40€/pers</p>
                </div>
              </div>
              <p className="text-xs text-center text-gray-600 mt-4">
                *Tarifs indicatifs pour navette partagée. Prix définitif selon nombre de passagers et options.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold text-center">
                Calculer mon tarif depuis ma ville
              </Link>
              <a href="tel:+32490197914" className="inline-block bg-white border-2 border-spero text-spero px-8 py-3 rounded-md hover:bg-spero/5 transition-colors font-semibold text-center">
                Obtenir un devis par téléphone
              </a>
            </div>
          </div>
        </section>

        {/* Avantages navette vs autres options */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center">
              Pourquoi choisir une navette plutôt que d'autres options ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-spero/20 hover:border-spero transition-all">
                <h3 className="text-lg font-bold mb-4 text-spero">🚗 vs Voiture personnelle</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas de frais de parking à Charleroi (8-15€/jour)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas de stress de conduite ni de recherche de place</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Économies sur le carburant (essence + péages)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pas d'usure de votre véhicule</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-spero/20 hover:border-spero transition-all">
                <h3 className="text-lg font-bold mb-4 text-spero">🚌 vs Transport en commun (TEC/Bus)</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Service direct sans arrêts multiples</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Disponible 24h/7 (bus limités la nuit)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prise en charge à domicile en Wallonie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Confort avec bagages (pas de correspondances)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-spero/20 hover:border-spero transition-all">
                <h3 className="text-lg font-bold mb-4 text-spero">🚕 vs Taxi standard</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prix fixe connu à l'avance (pas de compteur)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Réservation garantie (pas d'attente)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Suivi de vol inclus en cas de retard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Service spécialisé aéroport depuis toute la Wallonie</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Info sur Charleroi Airport */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center">
              L'Aéroport de Charleroi Brussels South (CRL)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Plane className="h-6 w-6 text-spero mr-2" />
                  À propos de l'aéroport
                </h3>
                <p className="text-gray-700 mb-4">
                  L'aéroport de Charleroi Brussels South est le <strong>deuxième aéroport de Belgique</strong> et un hub majeur pour 
                  les compagnies low-cost. Situé à Gosselies, à environ 7 km au nord de Charleroi et 46 km au sud de Bruxelles, 
                  il est facilement accessible depuis toute la Wallonie.
                </p>
                <p className="text-gray-700 mb-4">
                  Particulièrement prisé pour ses vols économiques vers l'Europe, l'Afrique du Nord et le Moyen-Orient, 
                  cet aéroport est la base principale de <strong>Ryanair en Belgique</strong> et accueille également des compagnies comme 
                  Wizz Air, TUI fly et Air Corsica.
                </p>

                <h4 className="font-semibold mt-6 mb-3">Principales compagnies aériennes</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Ryanair</strong> - Nombreuses destinations européennes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Wizz Air</strong> - Europe de l'Est, Balkans, Turquie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>TUI fly</strong> - Destinations vacances, Méditerranée</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="bg-red-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Info className="h-5 w-5 text-red-600 mr-2" />
                    Temps d'arrivée recommandés à Charleroi
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
                        <span className="font-medium">Période d'affluence (vacances, été) :</span> 2h30 à 3 heures avant
                      </div>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    💡 Depuis la Wallonie, nous calculons automatiquement l'heure de départ idéale en fonction de votre ville 
                    et des conditions de circulation prévues.
                  </p>
                </div>

                <div className="bg-spero/10 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <MapPin className="h-5 w-5 text-spero mr-2" />
                    Point de rencontre pour les retours
                  </h3>
                  <p className="text-gray-700">
                    Pour les retours depuis l'aéroport de Charleroi vers la Wallonie, votre chauffeur vous attendra 
                    <strong> devant les ascenseurs au niveau du parking express</strong> avec un panneau à votre nom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section optimisée SEO */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-8 text-center">
              Questions fréquentes - Navette Charleroi depuis la Wallonie
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Combien coûte une navette vers l'aéroport de Charleroi depuis Namur, Liège ou Mons ?
                </h3>
                <p className="text-gray-700">
                  Le tarif dépend de votre ville de départ et du nombre de passagers. Par exemple, depuis <strong>Namur</strong> comptez environ 30-40 minutes de trajet, 
                  depuis <strong>Liège</strong> 50-60 minutes, et depuis <strong>Mons</strong> 40-50 minutes. Nos prix sont fixes et communiqués dès la réservation. 
                  Utilisez notre calculateur en ligne pour obtenir un devis instantané depuis votre commune wallonne.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Desservez-vous toutes les villes de Wallonie pour aller à Charleroi Airport ?
                </h3>
                <p className="text-gray-700">
                  Oui, nous assurons des transferts depuis <strong>toute la Wallonie</strong> vers l'aéroport de Charleroi : Namur, Liège, Mons, Tournai, Verviers, 
                  Dinant, Couvin, Chimay, Wavre, Louvain-la-Neuve, Huy, Marche-en-Famenne et toutes les communes intermédiaires. 
                  Aucune ville n'est trop éloignée pour notre service de navette.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Puis-je réserver une navette à la dernière minute depuis la Wallonie ?
                </h3>
                <p className="text-gray-700">
                  Oui, nous proposons un service 24h/7, même pour les départs urgents depuis n'importe quelle ville de Wallonie, 
                  sous réserve de disponibilité. Appelez-nous au 0490 19 79 14 pour une réservation immédiate.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Que se passe-t-il si mon vol depuis Charleroi est en retard ?
                </h3>
                <p className="text-gray-700">
                  Nos chauffeurs suivent les horaires de vol de Charleroi Brussels South en direct : aucun supplément ni inquiétude à avoir, 
                  même en cas de retard. Vous serez pris en charge dès votre arrivée pour votre retour en Wallonie.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Proposez-vous aussi des navettes vers d'autres aéroports depuis la Wallonie ?
                </h3>
                <p className="text-gray-700">
                  Oui, en plus de Charleroi, nous assurons des transferts depuis toute la Wallonie vers <strong>Zaventem</strong> (Bruxelles), 
                  <strong> Liège Airport</strong>, <strong>Luxembourg</strong>, <strong>Ostende</strong> et même <strong>Paris Charles-de-Gaulle</strong>.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/faq" className="text-spero font-semibold hover:underline text-lg">
                Voir toutes nos questions fréquentes →
              </Link>
            </div>
          </div>
        </section>

        {/* Call to action final */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-spero to-blue-700 text-white rounded-lg p-10 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Réservez votre navette depuis la Wallonie vers Charleroi !
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-lg">
              Que vous partiez de <strong>Namur, Liège, Mons, Tournai</strong> ou ailleurs en Wallonie, 
              réservez dès aujourd'hui votre navette vers l'aéroport de Charleroi Brussels South avec SPERO NAVETTE.
            </p>
            <p className="mb-8 text-white/90">
              ✅ Service disponible 24h/7 depuis toute la Wallonie<br/>
              ✅ Tarifs fixes et transparents<br/>
              ✅ Confort premium et chauffeurs professionnels<br/>
              ✅ Prise en charge à domicile
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/#calculator" className="inline-block bg-white text-spero px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
                <span className="mr-2">Calculer mon tarif depuis ma ville</span>
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