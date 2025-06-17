import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, Clock, MapPin, Shield, Users, Calendar, CreditCard, Phone, Star, Plane, Car, Mail } from 'lucide-react';

// Données structurées optimisées pour le SEO
const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Spero Navette - Services de Transport Aéroport",
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
  "description": "Service professionnel de navette aéroport depuis le Grand Charleroi et tout le Hainaut. Transport direct vers Bruxelles-Zaventem, Charleroi Brussels South, Paris CDG, Amsterdam Schiphol, Cologne, Düsseldorf et tous les aéroports européens.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "offerCount": "2",
    "offers": [
      {
        "@type": "Offer",
        "name": "Navette partagée",
        "description": "Service économique avec d'autres passagers"
      },
      {
        "@type": "Offer",
        "name": "Navette privée",
        "description": "Transport exclusif et direct"
      }
    ]
  }
};

function Services() {
  return (
    <>
      <SEO 
        title="Services Navette Aéroport Charleroi Bruxelles Paris | Transport 24h/7j"
        description="Découvrez nos services de navette aéroport depuis le Grand Charleroi et le Hainaut vers Bruxelles-Zaventem, Charleroi Brussels South, Paris CDG, Amsterdam, Cologne. Transport privé ou partagé, ponctualité garantie."
        keywords="service navette aéroport, transport Bruxelles Zaventem, navette Charleroi aéroport, navette Paris CDG, transport aéroport privé, navette partagée, navette aéroport Hainaut"
      >
        <script type="application/ld+json">
          {JSON.stringify(servicesStructuredData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-spero mb-6 text-center">
          Services de Navette Aéroport Professionnels
        </h1>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Transport fiable et ponctuel depuis le <strong>Grand Charleroi et tout le Hainaut</strong> vers tous les aéroports européens. 
          Service disponible 24h/24 et 7j/7.
        </p>

        {/* Bannière zones desservies */}
        <section className="mb-12 bg-spero text-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Service de navette dans tout le Hainaut
          </h2>
          <p className="text-center max-w-4xl mx-auto">
            <strong>Zones desservies :</strong> Grand Charleroi • Pont-à-Celles • Courcelles • Fontaine-l'Évêque • 
            Fleurus • Basse Sambre • Sambreville • Gerpinnes • Ham-sur-Heure • Thuin • Beaumont • 
            Rance • Chimay • Couvin • Philippeville • Walcourt • et toutes les communes environnantes
          </p>
        </section>

        {/* Types de services */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Choisissez votre type de navette aéroport
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-spero transition-colors">
              <div className="text-center mb-6">
                <Users className="h-16 w-16 text-spero mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Navette Privée</h3>
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
                  <span>Flexibilité sur les horaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Parfait pour voyageurs préssés</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Confidentialité et confort maximum</span>
                </li>
              </ul>
              <div className="text-center border-t pt-6">
                <p className="text-lg text-gray-600 mb-4">Confort optimal</p>
                <Link to="/#calculator" className="inline-block bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
                  Calculer mon tarif
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-spero relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-spero text-white text-sm font-medium px-4 py-1 rounded-full">
                  Plus populaire
                </span>
              </div>
              <div className="text-center mb-6">
                <Car className="h-16 w-16 text-spero mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Navette Partagée</h3>
                <p className="text-gray-700">
                  Solution économique avec d'autres passagers
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Prix attractif</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maximum 3-4 arrêts supplémentaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Idéal pour les voyageurs flexibles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Même confort et ponctualité garantie</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                  <span>Rencontrez d'autres voyageurs</span>
                </li>
              </ul>
              <div className="text-center border-t pt-6">
                <p className="text-lg text-gray-600 mb-4">Tarif économique</p>
                <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                  Calculer mon tarif
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services par aéroport */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Nos principales destinations aéroport
          </h2>

          {/* Bruxelles-Zaventem */}
          <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Plane className="mr-3" />
                Navette Aéroport de Bruxelles-Zaventem (BRU)
              </h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4 text-gray-700">
                    L'aéroport de Bruxelles-Zaventem est le principal hub aérien de Belgique, 
                    desservant plus de 200 destinations dans le monde. Notre service de navette 
                    depuis le Grand Charleroi et tout le Hainaut vous garantit un transport 
                    confortable et ponctuel pour tous vos vols.
                  </p>
                  <p className="mb-4 text-gray-700">
                    Que vous voyagiez pour affaires ou loisirs, nos chauffeurs expérimentés 
                    connaissent parfaitement les meilleurs itinéraires pour vous assurer 
                    d'arriver à temps à l'aéroport.
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 mt-6">Pourquoi choisir notre navette ?</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Service porte-à-porte depuis votre domicile</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Évitez les frais de parking coûteux</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pas de stress avec les transports en commun</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">📍 Informations pratiques</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Service disponible 24h/24 et 7j/7</span>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Point de rencontre retour : Devant le café JAVA</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Capacité de 1 à 8 passagers</span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Chauffeurs professionnels et assurés</span>
                      </li>
                    </ul>
                  </div>
                  
<div className="mt-6 text-center">
  <Link to="/#calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
    Réserver ma navette vers Bruxelles
  </Link>
  <Link to="/navette-aeroport-bruxelles-zaventem" className="block mt-3 text-blue-600 hover:underline">
    En savoir plus sur notre service navette vers Bruxelles-Zaventem →
  </Link>
</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charleroi */}
          <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Plane className="mr-3" />
                Navette Aéroport de Charleroi Brussels South (CRL)
              </h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4 text-gray-700">
                    L'aéroport de Charleroi Brussels South est idéalement situé pour les habitants 
                    du Hainaut. Principal hub des compagnies low-cost en Belgique, il offre 
                    d'excellentes connexions vers toute l'Europe.
                  </p>
                  <p className="mb-4 text-gray-700">
                    Notre service de navette est parfaitement adapté aux horaires parfois matinaux 
                    ou tardifs de ces compagnies. Nous garantissons votre arrivée à temps, 
                    même pour les vols les plus matinaux.
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 mt-6">Avantages spécifiques</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Aéroport le plus proche du Hainaut</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Service adapté aux vols low-cost</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Départs possibles dès 3h du matin</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">✈️ Compagnies aériennes</h4>
                    <p className="text-gray-700 mb-4">
                      Ryanair, Wizz Air, Pegasus Airlines, TUI fly et bien d'autres compagnies 
                      desservent Charleroi avec des vols vers plus de 100 destinations.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Point de rencontre : Parking express</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Service 24h/24 pour tous les horaires</span>
                      </li>
                    </ul>
                  </div>
                  
<div className="mt-6 text-center">
  <Link to="/#calculator" className="inline-block bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors">
    Réserver ma navette vers Charleroi
  </Link>
  <Link to="/navette-aeroport-charleroi" className="block mt-3 text-red-600 hover:underline">
    En savoir plus sur notre service navette vers Charleroi →
  </Link>
</div>
                </div>
              </div>
            </div>
          </div>

          {/* Paris CDG */}
          <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Plane className="mr-3" />
                Navette Aéroport Paris Charles de Gaulle (CDG)
              </h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4 text-gray-700">
                    Paris CDG est l'un des plus grands aéroports d'Europe et une plaque tournante 
                    majeure pour les vols intercontinentaux. Notre service de navette longue 
                    distance vous offre une alternative confortable et économique au train.
                  </p>
                  <p className="mb-4 text-gray-700">
                    Avec un départ depuis votre domicile, vous évitez les correspondances 
                    compliquées, particulièrement pénibles avec des bagages. Nos véhicules 
                    sont spécialement équipés pour assurer votre confort pendant le trajet.
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 mt-6">Avantages par rapport au train</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Porte-à-porte sans correspondance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Plus économique pour 2 personnes ou plus</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pas de limite de bagages</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">🚗 Services inclus</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Pause confort possible sur demande</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Aide pour trouver le bon terminal</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Véhicules confortables longue distance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Chauffeurs habitués au trajet</span>
                      </li>
                    </ul>
                  </div>
                  
<div className="mt-6 text-center">
  <Link to="/#calculator" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition-colors">
    Réserver ma navette vers Paris CDG
  </Link>
  <Link to="/navette-aeroport-paris-cdg" className="block mt-3 text-purple-600 hover:underline">
    En savoir plus sur notre service navette vers Paris CDG →
  </Link>
</div>
                </div>
              </div>
            </div>
          </div>

          {/* Autres destinations */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Autres aéroports desservis
            </h3>
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              Notre service de navette aéroport s'étend bien au-delà des destinations principales. 
              Nous desservons tous les aéroports européens depuis le Grand Charleroi et le Hainaut.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 text-center">
                <Plane className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Amsterdam Schiphol</h4>
                <p className="text-sm text-gray-700">
                  Hub majeur KLM, connexions mondiales
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Plane className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Cologne-Bonn</h4>
                <p className="text-sm text-gray-700">
                  Porte d'entrée vers l'Allemagne
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Plane className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Düsseldorf</h4>
                <p className="text-sm text-gray-700">
                  3ème aéroport allemand
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Plane className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Lille-Lesquin</h4>
                <p className="text-sm text-gray-700">
                  Proche de la frontière belge
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Plane className="h-12 w-12 text-teal-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Luxembourg</h4>
                <p className="text-sm text-gray-700">
                  Aéroport du Grand-Duché
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Plane className="h-12 w-12 text-pink-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Et bien d'autres...</h4>
                <p className="text-sm text-gray-700">
                  Paris Orly, Frankfurt, Eindhoven...
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                Vous ne trouvez pas votre aéroport ? Nous desservons TOUTES les destinations !
              </p>
              <Link to="/#calculator" className="inline-block bg-spero text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer mon tarif personnalisé
              </Link>
            </div>
          </div>
        </section>

        {/* Processus de réservation */}
        <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Comment réserver votre navette aéroport ?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-spero text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Calculez votre tarif</h3>
              <p className="text-sm text-gray-700">
                Entrez votre code postal et destination
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-spero text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Complétez vos infos</h3>
              <p className="text-sm text-gray-700">
                Coordonnées et détails de vol
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-spero text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Confirmation rapide</h3>
              <p className="text-sm text-gray-700">
                Email immédiat et SMS de rappel
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-spero text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-semibold mb-2">Voyagez serein</h3>
              <p className="text-sm text-gray-700">
                Votre chauffeur vous attend
              </p>
            </div>
          </div>
          
          <div className="bg-spero/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-center">Réservation simple et rapide</h3>
            <p className="text-gray-700 text-center mb-4">
              Notre système de réservation en ligne est disponible 24h/24. Pour une réservation 
              de dernière minute ou des besoins spécifiques, n'hésitez pas à nous appeler directement.
            </p>
            <div className="flex justify-center gap-4">
<Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Réserver en ligne
              </Link>
              <a href="tel:+32490197914" className="inline-block bg-white border-2 border-spero text-spero px-6 py-2 rounded-md hover:bg-spero/5 transition-colors">
                <Phone className="inline h-4 w-4 mr-2" />
                0490 19 79 14
              </a>
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Pourquoi choisir Spero Navette ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="bg-spero/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-spero" />
                </div>
              </div>
              <h3 className="font-semibold text-center mb-3">Ponctualité garantie</h3>
              <p className="text-sm text-gray-700 text-center">
                Nous calculons précisément les temps de trajet et ajoutons une marge de sécurité. 
                Votre chauffeur arrive toujours à l'heure convenue.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="bg-spero/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-spero" />
                </div>
              </div>
              <h3 className="font-semibold text-center mb-3">Service professionnel</h3>
              <p className="text-sm text-gray-700 text-center">
                Chauffeurs expérimentés, véhicules entretenus, assurance complète. 
                Nous garantissons un service de qualité irréprochable.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="bg-spero/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-spero" />
                </div>
              </div>
              <h3 className="font-semibold text-center mb-3">Flexibilité maximale</h3>
              <p className="text-sm text-gray-700 text-center">
                Navette privée ou partagée, paiement flexible, adaptation aux changements 
                d'horaire. Nous nous adaptons à vos besoins.
              </p>
            </div>
          </div>
        </section>

        {/* Options de paiement */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Modes de paiement flexibles
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-center mb-3">Paiement au chauffeur</h3>
              <p className="text-sm text-gray-700 text-center mb-4">
                Le plus simple et le plus populaire
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Espèces acceptées</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bancontact disponible</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reçu immédiat</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-center mb-3">Virement bancaire</h3>
              <p className="text-sm text-gray-700 text-center mb-4">
                Pour payer à l'avance en toute tranquillité
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Paiement sécurisé</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Confirmation par email</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>IBAN fourni après réservation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-center mb-3">Facturation entreprise</h3>
              <p className="text-sm text-gray-700 text-center mb-4">
                Service dédié aux professionnels
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Facture avec TVA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Paiement différé</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Compte entreprise</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nos garanties */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Nos engagements qualité
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-spero mr-2" />
                  Service ponctuel et fiable
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>SMS de rappel la veille du départ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Suivi des vols en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Chauffeurs toujours à l'heure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Adaptation aux imprévus</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-6 w-6 text-spero mr-2" />
                  Confort et sécurité
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Véhicules récents et entretenus</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Sièges enfant gratuits sur demande</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Assurance passagers complète</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
                    <span>Espace bagages généreux</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Service client disponible 7j/7
              </h3>
              <p className="text-center text-gray-700 mb-6">
                Notre équipe est à votre écoute pour toutes vos questions, 
                réservations ou urgences de dernière minute.
              </p>
              <div className="flex justify-center gap-6">
                <a href="tel:+32490197914" className="flex items-center text-spero hover:underline">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="font-semibold">0490 19 79 14</span>
                </a>
                <a href="mailto:info@spero-navette.be" className="flex items-center text-spero hover:underline">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="font-semibold">info@spero-navette.be</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages clients */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Très satisfaite de la prise en charge de la navette, ça fait déjà quatre fois 
                que nous la prenons aller-retour Bruxelles sans prise de tête,je recommande"
              </p>
              <p className="font-medium">- Fabienne D. de Walcourt</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Ponctuel, sympathique et même une erreur sur l'heure de retour de ma part.
                Ils ont corrigé le problème sans supplément merci. C'est la deuxième fois, je recommande à 💯. …"
              </p>
              <p className="font-medium">- Olivier B. de Bouffloulx</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Transfert aéroport parfait, le chauffeur était à l'heure que ce soit à l'aller et au retour. A recommander"
              </p>
              <p className="font-medium">- Manu B. de Philippeville</p>
            </div>
          </div>
        </section>

        {/* FAQ courte */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Combien de temps avant mon vol dois-je réserver ?
                </h3>
                <p className="text-gray-700">
                  Nous recommandons de réserver au moins 48h à l'avance pour garantir la disponibilité. 
                  Pour les réservations de dernière minute, appelez-nous directement au 0490 19 79 14.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Que faire si mon vol a du retard ?
                </h3>
                <p className="text-gray-700">
                  Nos chauffeurs suivent les vols en temps réel. En cas de retard, votre chauffeur 
                  adaptera automatiquement l'heure de prise en charge. Vous n'avez rien à faire.
                </p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">
                  Proposez-vous des sièges enfant ?
                </h3>
                <p className="text-gray-700">
                  Oui, nous fournissons gratuitement des sièges enfant et réhausseurs. 
                  Merci de préciser l'âge des enfants lors de votre réservation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Puis-je annuler ma réservation ?
                </h3>
                <p className="text-gray-700">
                  Les annulations sont possibles jusqu'à 12h avant le départ. Au-delà, 
                  des frais d'annulation peuvent s'appliquer selon nos conditions générales.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/faq" className="text-spero font-medium hover:underline">
                Voir toutes les questions fréquentes →
              </Link>
            </div>
          </div>
        </section>

        {/* Informations importantes */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Informations importantes pour votre navette aéroport
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Clock className="h-5 w-5 text-spero mr-2" />
                Horaires recommandés
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Vols européens : arrivée 2h avant le décollage (3h en été)</li>
                <li>• Vols intercontinentaux : arrivée 3h avant le décollage</li>
                <li>• Vols low-cost : respectez les horaires de la compagnie</li>
                <li>• Nous calculons l'heure de départ optimale</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 text-spero mr-2" />
                Points de rencontre aéroports
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Bruxelles :</strong> Devant le café JAVA (arrivées)</li>
                <li>• <strong>Charleroi :</strong> Niveau parking express</li>
                <li>• <strong>Paris CDG :</strong> Dépose minute des départs</li>
                <li>• <strong>Autres :</strong> Communiqué lors de la réservation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Autres services minimaliste */}
        <section className="mb-16 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Autres services de transport disponibles
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            En complément de nos navettes aéroport, nous proposons également des services 
            de transport pour événements spéciaux : mariages, concerts, sorties d'entreprise, 
            événements familiaux. 
            <a href="mailto:info@spero-navette.be" className="text-spero hover:underline ml-1">
              Contactez-nous pour un devis personnalisé
            </a>.
          </p>
        </section>

        {/* Call to action final */}
        <section className="bg-spero text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Réservez votre navette aéroport maintenant
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg">
            Service professionnel de navette aéroport depuis le Grand Charleroi et tout le Hainaut. 
            Calculez votre tarif en ligne en quelques clics ou appelez-nous directement.
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
          
          <div className="mt-8 text-white/80">
            <p className="text-sm">
              Service disponible 24h/24 et 7j/7 • Réservation rapide • Paiement flexible
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Services;