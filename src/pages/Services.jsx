import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO'; // Importation du composant SEO

// Données structurées pour la page services
const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service de Navette Aéroport",
  "provider": {
    "@type": "Organization",
    "name": "Spero Navette"
  },
  "serviceType": "Transport aéroport",
  "areaServed": [
    {
      "@type": "City",
      "name": "Bruxelles"
    },
    {
      "@type": "City",
      "name": "Charleroi"
    },
    {
      "@type": "City",
      "name": "Paris"
    },
    {
      "@type": "City",
      "name": "Amsterdam"
    }
  ],
  "description": "Service de navette aéroport depuis votre domicile vers Bruxelles, Charleroi, Paris CDG et autres destinations internationales. Disponible 24h/24 et 7j/7.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.spero-navette.be/",
    "servicePhone": "+32490197914",
    "serviceSmsNumber": "+32490197914"
  }
};

function Services() {
  return (
    <>
      <SEO 
        title="Services de Navette Aéroport | Bruxelles, Charleroi et autres destinations"
        description="Découvrez nos services de navette aéroport premium entre votre domicile et les aéroports de Bruxelles, Charleroi, Paris et autres destinations internationales."
        keywords="service navette aéroport, transport Bruxelles Zaventem, navette Charleroi, navette Paris CDG, transport domicile aéroport, navette Gare du Midi"
      >
        <script type="application/ld+json">
          {JSON.stringify(servicesStructuredData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-spero mb-6 text-center">Services de Navette Aéroport</h1>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Spero Navette propose un service complet de transport entre votre domicile et les principaux aéroports et gares de Belgique et des pays limitrophes.
        </p>

        {/* Section Navette Bruxelles */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-6">Navette Aéroport de Bruxelles (Zaventem)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Notre service premium de navette pour l'aéroport de Bruxelles-Zaventem (BRU) vous offre un transport confortable et ponctuel depuis votre domicile jusqu'au terminal de départ.
              </p>
              <p className="mb-4">
                L'aéroport de Bruxelles-Zaventem est le principal aéroport international de Belgique, desservant plus de 200 destinations à travers le monde. Situé à environ 12 km au nord-est de Bruxelles, cet aéroport accueille plus de 25 millions de passagers par an.
              </p>
              <p className="mb-4">
                Avec notre service de navette, vous n'aurez plus à vous soucier du stationnement coûteux ou des transports en commun encombrés. Notre chauffeur vous récupère à l'heure convenue directement à votre adresse et vous dépose devant votre terminal.
              </p>
              <h3 className="text-xl font-semibold mb-2">Points de rencontre</h3>
              <p className="mb-2">À l'arrivée à l'aéroport de Bruxelles : En arrivant dans le hall des arrivées sur votre droite, devant le café JAVA.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Caractéristiques principales</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Trajet direct entre votre domicile et l'aéroport de Bruxelles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Service disponible 24h/24 et 7j/7, adapté aux horaires de tous les vols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Véhicules spacieux et confortables pour vous et vos bagages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Chauffeurs professionnels connaissant parfaitement l'aéroport</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Possibilité de navette partagée pour réduire les coûts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Suivi en temps réel des retards de vol</span>
                </li>
              </ul>
              <div className="mt-4 text-center">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
    Calculer votre tarif
  </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Navette Charleroi */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-6">Navette Aéroport de Charleroi (Brussels South)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Notre service de navette pour l'aéroport de Charleroi (CRL) vous garantit un transport sans stress depuis votre domicile, quelle que soit votre commune de départ en Belgique.
              </p>
              <p className="mb-4">
                L'aéroport de Charleroi, également connu sous le nom de Brussels South Charleroi Airport, est situé à environ 46 km au sud de Bruxelles. Cet aéroport est particulièrement prisé pour les vols low-cost et dessert de nombreuses destinations européennes.
              </p>
              <p className="mb-4">
                Notre service de navette vous permet de rejoindre facilement cet aéroport, sans les contraintes des transports en commun qui peuvent être limités en fonction des horaires.
              </p>
              <h3 className="text-xl font-semibold mb-2">Points de rencontre</h3>
              <p className="mb-2">À l'arrivée à l'aéroport de Charleroi : Devant les ascenseurs au niveau du parking express.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Caractéristiques principales</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Transport direct de votre domicile à l'aéroport de Charleroi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Service disponible pour tous les vols, y compris les départs matinaux et arrivées tardives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Véhicules confortables pouvant accueillir jusqu'à 8 passagers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Chauffeurs expérimentés connaissant les meilleures routes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Options de siège enfant et réhausseur disponibles sur demande</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Suivi des vols et adaptation en cas de retard</span>
                </li>
              </ul>
              <div className="mt-4 text-center">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
    Calculer votre tarif
  </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Gare du Midi */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-6">Navette Gare de Bruxelles-Midi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Spero Navette assure également un service de transport vers la Gare de Bruxelles-Midi (ZYR), principal hub ferroviaire international de Belgique.
              </p>
              <p className="mb-4">
                La Gare de Bruxelles-Midi est le point de départ et d'arrivée des trains internationaux comme le Thalys, l'Eurostar et l'ICE, reliant Bruxelles à Paris, Londres, Amsterdam, Cologne et d'autres grandes villes européennes.
              </p>
              <p className="mb-4">
                Notre service de navette vous permet d'arriver sereinement à la gare, sans vous soucier des correspondances en transports en commun ou du stationnement.
              </p>
              <h3 className="text-xl font-semibold mb-2">Points de rencontre</h3>
              <p className="mb-2">À la Gare de Bruxelles-Midi : Devant le comptoir d'enregistrement AirFrance, côté rue de France.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Caractéristiques principales</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Transport direct entre votre domicile et la Gare de Bruxelles-Midi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Service adapté aux horaires des trains internationaux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Prise en charge de vos bagages jusqu'au point de dépose à la gare</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Parfait pour les voyages d'affaires ou de loisirs en train</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Option idéale pour les correspondances avec les vols partant d'autres villes</span>
                </li>
              </ul>
              <div className="mt-4 text-center">
              <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
    Calculer votre tarif
  </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Autres destinations */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-6">Navettes vers d'autres aéroports internationaux</h2>
          <p className="mb-6">
            Spero Navette ne se limite pas aux aéroports belges. Nous proposons également des services de navette vers plusieurs aéroports internationaux proches de la Belgique.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">Paris Charles de Gaulle (CDG)</h3>
              <p className="mb-2">Principal aéroport international de Paris, desservant des destinations mondiales.</p>
              <p className="text-sm text-gray-600">Point de rencontre : Au dépose minute des départs.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">Paris Orly (ORY)</h3>
              <p className="mb-2">Deuxième aéroport parisien, idéal pour les vols européens et domestiques.</p>
              <p className="text-sm text-gray-600">Point de rencontre : Au dépose minute.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">Amsterdam Schiphol (AMS)</h3>
              <p className="mb-2">L'un des plus grands hubs aéroportuaires d'Europe, offrant des connexions mondiales.</p>
              <p className="text-sm text-gray-600">Point de rencontre : Au dépose minute des départs.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">Lille Lesquin (LIL)</h3>
              <p className="mb-2">Aéroport régional du nord de la France, à proximité de la frontière belge.</p>
              <p className="text-sm text-gray-600">Point de rencontre : Au dépose minute.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">Luxembourg (LUX)</h3>
              <p className="mb-2">Aéroport international du Grand-Duché de Luxembourg.</p>
              <p className="text-sm text-gray-600">Point de rencontre : Dans le parking face à l'entrée.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">Düsseldorf (DUS)</h3>
              <p className="mb-2">Important aéroport allemand desservant la région de la Rhénanie.</p>
              <p className="text-sm text-gray-600">Point de rencontre : Au dépose minute des départs.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Pourquoi choisir nos navettes longue distance ?</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Prix compétitifs par rapport aux autres moyens de transport</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Confort optimal pendant tout le trajet</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Pas de changements ni correspondances nécessaires</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Départ et arrivée à l'adresse de votre choix</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Service porte-à-porte personnalisé</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Chauffeurs expérimentés pour les longs trajets</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-spero/10 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-3xl font-semibold text-spero mb-6">Réservez votre navette aéroport dès maintenant</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Que vous voyagiez depuis ou vers Bruxelles, Charleroi ou une autre destination, notre service de navette aéroport vous garantit un transport confortable, ponctuel et sans stress.
          </p>
          <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
    Calculer votre tarif
  </Link>
        </section>
      </div>
    </>
  );
}

export default Services;