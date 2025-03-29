import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO'; // Importation du composant SEO
import { ArrowRight, CheckCircle, Heart, Music, Briefcase, Utensils, Activity } from 'lucide-react';

// Données structurées pour la page services
const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service de Navette Aéroport et Transport Événementiel",
  "provider": {
    "@type": "Organization",
    "name": "Spero Navette"
  },
  "serviceType": "Transport personnalisé",
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
  "description": "Service de navette aéroport et transport événementiel depuis votre domicile vers Bruxelles, Charleroi, Paris CDG et autres destinations internationales. Transport pour mariages, sorties restaurant, concerts, team buildings et réunions professionnelles.",
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
        title="Services de Navette Aéroport & Transport Événementiel | Spero Navette"
        description="Découvrez nos services de navette aéroport et transport événementiel. Transport pour mariages, sorties restaurant, concerts, team buildings et réunions professionnelles."
        keywords="service navette aéroport, transport Bruxelles Zaventem, navette Charleroi, navette Paris CDG, transport mariage, concert, transport événementiel, team building"
      >
        <script type="application/ld+json">
          {JSON.stringify(servicesStructuredData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-spero mb-6 text-center">Nos Services de Transport</h1>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Spero Navette propose un service complet de transport entre votre domicile et les principaux aéroports, ainsi que des solutions de transport pour tous vos événements professionnels et personnels.
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

        {/* NOUVELLE SECTION: Services de Transport Événementiel */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8">Services de Transport Événementiel</h2>
          <p className="mb-6">
            En plus de nos navettes aéroport, Spero Navette vous propose des services de transport personnalisés pour tous vos événements et sorties. Nous sommes à votre disposition pour vos déplacements professionnels et privés.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Heart size={22} className="text-spero mr-3" />
                <h3 className="text-xl font-semibold">Transport de Mariage</h3>
              </div>
              <p className="mb-3">Service de transport élégant pour votre jour J. Nous prenons en charge les déplacements des mariés et de leurs invités.</p>
              <ul className="space-y-1 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Transport des mariés entre les différents lieux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Navette pour les invités</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Chauffeur en tenue formelle</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:info@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
                  Demander un devis <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Music size={22} className="text-spero mr-3" />
                <h3 className="text-xl font-semibold">Concerts & Spectacles</h3>
              </div>
              <p className="mb-3">Profitez pleinement de vos sorties culturelles sans vous soucier du transport ou du stationnement.</p>
              <ul className="space-y-1 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Prise en charge à domicile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Retour à l'heure convenue</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:info@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
                  Demander un devis <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Utensils size={22} className="text-spero mr-3" />
                <h3 className="text-xl font-semibold">Sorties Restaurant</h3>
              </div>
              <p className="mb-3">Profitez de vos soirées gastronomiques sans les contraintes de la conduite. Idéal pour les dîners arrosés.</p>
              <ul className="space-y-1 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Transport sécurisé pour vos soirées</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Service pour couples et groupes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Discrétion et ponctualité</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:info@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
                  Demander un devis <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Activity size={22} className="text-spero mr-3" />
                <h3 className="text-xl font-semibold">Team Building</h3>
              </div>
              <p className="mb-3">Transport de groupes pour vos activités d'entreprise. Une solution simple pour déplacer vos équipes.</p>
              <ul className="space-y-1 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Véhicules adaptés pour les groupes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Service de navette pour toute la journée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Facturation entreprise</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:info@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
                  Demander un devis <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Briefcase size={22} className="text-spero mr-3" />
                <h3 className="text-xl font-semibold">Réunions Professionnelles</h3>
              </div>
              <p className="mb-3">Transport pour vos rendez-vous d'affaires et réunions importantes. Arrivez détendu et concentré à vos rendez-vous.</p>
              <ul className="space-y-1 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Ponctualité garantie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Chauffeur discret et professionnel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Possibilité de facturation professionnelle</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:info@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
                  Demander un devis <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Activity size={22} className="text-spero mr-3" />
                <h3 className="text-xl font-semibold">Visites Médicales</h3>
              </div>
              <p className="mb-3">Transport confortable pour vos rendez-vous médicaux. Un service adapté à vos besoins spécifiques.</p>
              <ul className="space-y-1 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Chauffeur attentionné et patient</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Aide pour entrer et sortir du véhicule</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Attente pendant la consultation</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:info@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
                  Demander un devis <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Pourquoi choisir notre service de transport événementiel ?</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Service personnalisé selon vos besoins spécifiques</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Confort optimal pendant tout le trajet</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Chauffeurs professionnels, courtois et discrets</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Départ et arrivée à l'adresse de votre choix</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Véhicules adaptés à tous types d'événements</span>
              </li>
              <li className="flex items-start">
                <span className="text-spero mr-2">✓</span>
                <span>Tarifs personnalisés sur devis</span>
              </li>
            </ul>
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

        <section className="mb-12 text-center">
  <h2 className="text-2xl font-semibold text-spero mb-4">Suivez-nous sur les réseaux sociaux</h2>
  <div className="flex justify-center space-x-6">
    <a href="https://www.facebook.com/speronavette" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
      {/* Logo Facebook avec couleur bleue */}
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    </a>
    <a href="https://www.instagram.com/speronavette" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
      {/* Logo Instagram avec dégradé de couleurs */}
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

        {/* Notre flotte */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Notre Flotte</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Véhicules premium</h3>
              <p className="mb-4">
                Nous disposons d'une flotte moderne de véhicules confortables pouvant accueillir de 1 à 8 passagers. Tous nos véhicules sont régulièrement entretenus et offrent un confort optimal pour tous vos déplacements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Monospaces pour 4-6 passagers avec bagages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Minibus pour 7-8 passagers et événements de groupe</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Équipements et services</h3>
              <p className="mb-4">
                Pour votre confort, tous nos véhicules sont équipés de :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Climatisation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Sièges confortables et espace généreux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Sièges enfant et réhausseurs disponibles sur demande</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Questions fréquentes</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Comment réserver un transport pour un événement spécial ?</h3>
                <p className="text-gray-700">Pour réserver un transport pour un événement spécial (mariage, concert, soirée, etc.), contactez-nous par email à info@spero-navette.be en précisant la date, l'heure, le lieu, le nombre de personnes et toute exigence particulière. Nous vous enverrons un devis personnalisé.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Quels types de véhicules proposez-vous pour les mariages ?</h3>
                <p className="text-gray-700">Pour les mariages, nous proposons des véhicules confortables et élégants.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Est-il possible de réserver un chauffeur pour toute une soirée ?</h3>
                <p className="text-gray-700">Oui, nous proposons des forfaits à l'heure ou à la soirée pour vos événements. Votre chauffeur restera à votre disposition pendant toute la durée convenue, assurant vos déplacements en toute sécurité.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Proposez-vous des tarifs spéciaux pour les entreprises ?</h3>
                <p className="text-gray-700">Nous offrons des tarifs préférentiels pour les entreprises avec des contrats réguliers ou des événements corporate. Contactez-nous pour discuter de vos besoins spécifiques et obtenir une offre adaptée.</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/faq" className="text-spero font-medium hover:underline">Voir toutes les questions fréquentes</Link>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-spero/10 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-3xl font-semibold text-spero mb-6">Réservez votre transport dès maintenant</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Que vous voyagiez depuis ou vers un aéroport, ou que vous ayez besoin d'un transport pour un événement spécial, notre service de navette vous garantit un transport confortable, ponctuel et sans stress.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
              Calculer votre tarif de navette aéroport
            </Link>
            <a href="mailto:info@spero-navette.be" className="inline-block bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
              Demander un devis pour un événement
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Services;