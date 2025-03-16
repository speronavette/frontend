import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO'; // Importation du composant SEO

// Données structurées pour la page contact
const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Spero Navette",
  "description": "Contactez notre service de navette aéroport pour Bruxelles, Charleroi et Paris. Demandez un devis personnalisé ou réservez votre transport.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Spero Navette",
    "telephone": "+32490197914",
    "email": "info@spero-navette.be",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  }
};

function Contact() {
  return (
    <>
      <SEO 
        title="Contact | Navette Aéroport Bruxelles & Charleroi"
        description="Contactez Spero Navette pour toutes vos questions concernant nos services de transport vers les aéroports de Bruxelles, Charleroi et autres destinations."
        keywords="contact navette aéroport, téléphone transport aéroport, réservation navette Bruxelles, contact Spero Navette, devis transfert aéroport"
      >
        <script type="application/ld+json">
          {JSON.stringify(contactStructuredData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-spero mb-6 text-center">Contactez-nous</h1>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Pour toutes vos questions concernant nos services de navette aéroport, n'hésitez pas à nous contacter.
          Notre équipe est à votre disposition pour vous aider.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-spero mb-6">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Téléphone</h3>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-spero" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href="tel:+32490197914" className="hover:text-spero">+32 490 19 79 14</a>
                </p>
                <p className="text-sm text-gray-600 mt-1 ml-7">
                  Du lundi au vendredi: 10h - 19h<br />
                  Samedi: 10h - 16h<br />
                  Dimanche: Fermé
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-spero" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:info@spero-navette.be" className="hover:text-spero">info@spero-navette.be</a>
                </p>
                <p className="text-sm text-gray-600 mt-1 ml-7">
                  Nous répondons à tous les emails dans un délai de 24 heures.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-spero/10 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-spero">Réservations</h3>
              <p className="mb-4">
                Pour réserver une navette aéroport, utilisez notre calculateur en ligne ou contactez-nous directement par téléphone.
              </p>
              <Link to="/#calculator" className="inline-block bg-spero text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer votre tarif
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-spero mb-6">Destinations desservies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Belgique</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Aéroport de Bruxelles</li>
                    <li>• Aéroport de Charleroi</li>
                    <li>• Gare de Bruxelles-Midi</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">France</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Aéroport de Paris CDG</li>
                    <li>• Aéroport de Paris Orly</li>
                    <li>• Aéroport de Lille</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Pays-Bas</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Aéroport d'Amsterdam</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Autres</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Aéroport de Luxembourg</li>
                    <li>• Aéroport de Düsseldorf</li>
                    <li>• Aéroport de Cologne</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-spero mb-6">Nous sommes à votre service</h2>
              <p className="mb-4">
                Que vous ayez des questions sur nos services de navette, besoin d'un devis pour un groupe, ou pour toute autre demande, notre équipe est à votre écoute.
              </p>
              <p className="mb-4">
                Nous proposons des navettes aéroport depuis votre domicile vers toutes les destinations, avec des chauffeurs professionnels et des véhicules confortables.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-spero" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Service 24h/24 et 7j/7</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-spero" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Réservation rapide</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-spero" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ponctualité garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps (Intégration fictive) */}
        <div className="bg-gray-200 rounded-lg overflow-hidden h-96 mb-12">
          <div className="w-full h-full flex items-center justify-center bg-spero/10">
            <p className="text-center text-gray-600">
              Ici sera intégrée la carte Google Maps<br />
              <span className="text-sm">(Nécessite une clé API Google Maps)</span>
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-spero mb-4">Besoin d'un devis personnalisé?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Pour les groupes, voyages d'affaires ou demandes spécifiques, n'hésitez pas à nous contacter directement pour obtenir un devis sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+32490197914" className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
              Nous appeler : +32 490 19 79 14
            </a>
            <a href="mailto:info@spero-navette.be" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
              Nous écrire
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;