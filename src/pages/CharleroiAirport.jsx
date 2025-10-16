import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Phone, Star, Plane, Car, Mail, Info } from '../components/Icons';

// Données structurées optimisées pour le SEO - Focus Wallonie vers Charleroi
// Données structurées optimisées pour le SEO - Focus Wallonie vers Charleroi
// Données structurées optimisées pour le SEO - Focus Wallonie vers Charleroi
const charleroiAirportStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Navette Aéroport Charleroi 24/7 – Depuis toute la Wallonie | Spero Navette",
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
      "name": "Wallonie"
    }
  ],
  "description": "Service de navette aéroport depuis toute la Wallonie vers Charleroi Brussels South. Transport 24h/7, chauffeurs professionnels, ponctualité garantie.",
  "serviceOutput": "Transport privé et confortable vers l’aéroport de Charleroi",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "189"
  }
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

        {/* Avis Google Carousel - Placeholder */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-spero mb-6 text-center flex items-center justify-center">
              <Star className="h-8 w-8 mr-3 text-yellow-500" />
              Ce que disent nos clients wallons
            </h2>
            
            <div className="bg-gradient-to-r from-spero/5 to-blue-50 border-2 border-dashed border-spero/30 rounded-lg p-12 text-center">
              <div className="flex items-center justify-center mb-6">
                <Star className="h-16 w-16 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Carousel d'avis Google en cours de configuration
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Les témoignages de nos clients satisfaits de Namur, Liège, Mons et toute la Wallonie apparaîtront ici dès que vous aurez configuré votre clé API Google Places.
              </p>
              <div className="bg-white rounded-lg p-6 max-w-xl mx-auto shadow-sm">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Note actuelle :</strong> 4,9/5 ⭐ basée sur 189 avis Google
                </p>
                <p className="text-xs text-gray-500 italic">
                  Pour afficher les avis en temps réel, suivez les instructions de configuration de l'API Google Places.
                </p>
              </div>
            </div>
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
                      <strong>Namur → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">30-40 minutes • 40 km</p>
                    </div>
                  </li>
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Dinant → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">45-55 minutes • 60 km</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Walcourt → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">35-40 minutes • 35 km</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Province de Liège */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-spero mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Depuis Liège et Province
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Liège → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">50-60 minutes • 75 km</p>
                    </div>
                  </li>
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Verviers → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">60-70 minutes • 90 km</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Huy → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">40-50 minutes • 55 km</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Province de Hainaut */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-spero mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Depuis Hainaut
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Mons → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">40-50 minutes • 50 km</p>
                    </div>
                  </li>
                  <li className="flex items-start border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-spero mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Tournai → Charleroi Airport</strong>
                      <p className="text-sm text-gray-600">60-70 minutes • 75 km</p>
                    </div>
                  </li>
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
                // SUITE DU CODE - À partir de la section "Tarifs"

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
                  <strong>Liège Airport</strong>, <strong>Luxembourg</strong>, <strong>Ostende</strong> et même <strong>Paris Charles-de-Gaulle</strong>.
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