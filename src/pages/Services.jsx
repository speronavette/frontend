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
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
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
                  <span>Attente pendant l'événement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">•</span>
                  <span>Retour à l'heure convenue</span>
                </li>
              </ul>
              <div className="text-right">
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
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
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
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
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
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
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
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
                <a href="mailto:contact@spero-navette.be" className="text-spero font-medium text-sm hover:underline flex items-center justify-end">
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

        {/* Widgets sociaux */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Suivez-nous sur les réseaux sociaux</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="w-full md:w-1/2 max-w-md mx-auto overflow-hidden rounded-lg shadow-md">
            <iframe
  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsperonavette&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
  width="100%"
  height="400"
  style={{border: 'none', overflow: 'hidden'}} 
  scrolling="no" 
  frameBorder="0" 
  allowFullScreen={true} 
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  title="Facebook feed"
></iframe>
            </div>
            <div className="w-full md:w-1/2 max-w-md mx-auto overflow-hidden rounded-lg shadow-md">
              <iframe 
                src="https://www.instagram.com/speronavette/embed" 
                width="100%" 
                height="400" 
                frameBorder="0" 
                scrolling="no" 
                allowTransparency={true}
                title="Instagram feed"
              ></iframe>
            </div>
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
                  <span>Berlines confortables pour 1-3 passagers</span>
                </li>
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
                  <span>WiFi gratuit sur demande</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Sièges confortables et espace généreux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Sièges enfant et réhausseurs disponibles sur demande</span>
                </li>
                <li className="flex items-start">
                  <span className="text-spero mr-2">✓</span>
                  <span>Bouteilles d'eau pour les longs trajets</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Témoignages clients */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">Témoignages de nos clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Service parfait pour notre team building ! Nous avons réservé pour transporter notre équipe de 15 personnes et tout s'est déroulé parfaitement. Ponctualité, confort et professionnalisme. Merci beaucoup !"</p>
              <p className="font-medium">- Sophie L., Responsable RH</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Nous avons utilisé Spero Navette pour notre mariage. Service impeccable, le chauffeur était très élégant et ponctuel. Tous nos invités ont apprécié le confort du véhicule. Je recommande vivement !"</p>
              <p className="font-medium">- Marie et Jean D., Bruxelles</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Excellent service pour nos sorties au restaurant. Plus besoin de se soucier de qui conduit ou du stationnement. Le chauffeur était très professionnel et sympathique. À recommander sans hésiter !"</p>
              <p className="font-medium">- François et Claire M., Charleroi</p>
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
                <p className="text-gray-700">Pour réserver un transport pour un événement spécial (mariage, concert, soirée, etc.), contactez-nous par email à contact@spero-navette.be en précisant la date, l'heure, le lieu, le nombre de personnes et toute exigence particulière. Nous vous enverrons un devis personnalisé.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Quels types de véhicules proposez-vous pour les mariages ?</h3>
                <p className="text-gray-700">Pour les mariages, nous proposons des véhicules confortables et élégants pouvant être décorés sur demande. Notre flotte comprend des berlines premium et des monospaces adaptés au transport des mariés et/ou des invités.</p>
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
            <a href="mailto:contact@spero-navette.be" className="inline-block bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
              Demander un devis pour un événement
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Services;