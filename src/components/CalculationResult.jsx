import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Importez la liste des aéroports
const airports = [
  { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
  { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
  { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
  { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
  { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
  { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' },
  { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
  { code: 'DUS', nom: 'Aéroport de Dusseldorf', pays: 'Allemagne' },
  { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' }
];

function CalculationResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { passengers, postalCode, commune, destination, prices, noPriceFound } = location.state || {};
  const { sharedPrice, privatePrice } = prices || { sharedPrice: 0, privatePrice: 0 };

  // Fonction pour arrondir à l'euro supérieur
  const arrondirAEuroSuperieur = (prix) => {
    return Math.ceil(prix);
  };

  // Calcul des prix PARTAGÉS avec réduction de 7%
  const prixPartageAvantArrondi = sharedPrice * 0.93; // Prix partagé avec 7% de réduction
  const prixPartageReduit = arrondirAEuroSuperieur(prixPartageAvantArrondi); // Arrondi à l'euro supérieur
  const economiePartage = sharedPrice - prixPartageReduit; // Montant réellement économisé
  const prixPartageReduitAllerRetour = prixPartageReduit * 2;
  const economiePartageAllerRetour = (sharedPrice * 2) - prixPartageReduitAllerRetour;

  // Calcul des prix PRIVÉS avec réduction de 7%
  const prixPriveAvantArrondi = privatePrice * 0.93; // Prix privé avec 7% de réduction
  const prixPriveReduit = arrondirAEuroSuperieur(prixPriveAvantArrondi); // Arrondi à l'euro supérieur

  // Si aucun prix n'est trouvé
  if (noPriceFound) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-8">Demande de devis</h2>
          
          <div className="mb-8">
            <p className="text-center text-lg mb-4">
              De {commune} ({postalCode}) vers {destination?.nom}
            </p>
            <p className="text-center text-gray-600 mb-8">
              {passengers} {Number(passengers) > 1 ? 'personnes' : 'personne'}
            </p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              Pour cette destination, merci de nous contacter directement pour obtenir un devis personnalisé.
            </p>
            <p className="text-spero font-semibold">
              Tél : 0490/19.79.14<br />
              Email : info@spero-navette.be
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border-2 border-spero text-spero rounded-md hover:bg-spero/5 font-medium"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Votre trajet</h2>
        
        <div className="mb-8">
          <p className="text-center text-lg mb-4">
            De {commune} ({postalCode}) vers {destination?.nom}
          </p>
          <p className="text-center text-gray-600 mb-8">
            {passengers} {Number(passengers) > 1 ? 'personnes' : 'personne'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Trajet simple */}
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-spero/20">
            {/* Badge Promo */}
            <div className="flex justify-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full inline-flex items-center">
                🎉 🎉 Promo Hiver (valable du 18/11/2025 au 31/12/2025)
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-4">Trajet simple</h3>
            
            <div className="text-center">
              {/* Prix original barré */}
              <p className="text-xl text-gray-400 line-through mb-2">
                {sharedPrice.toFixed(2)} €
              </p>
              
              {/* Nouveau prix */}
              <p className="text-4xl text-spero font-bold mb-3">
                {prixPartageReduit.toFixed(0)} €
              </p>
              
              {/* Économie */}
              <p className="text-sm text-green-600 font-medium">
                Vous économisez {economiePartage.toFixed(2)} €
              </p>
            </div>
          </div>

          {/* Aller-retour */}
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-spero/20">
            {/* Badge Promo */}
            <div className="flex justify-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full inline-flex items-center">
                🎉 🎉 Promo Hiver (valable du 18/11/2025 au 31/12/2025)
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-4">Aller-retour</h3>
            
            <div className="text-center">
              {/* Prix original barré */}
              <p className="text-xl text-gray-400 line-through mb-2">
                {(sharedPrice * 2).toFixed(2)} €
              </p>
              
              {/* Nouveau prix */}
              <p className="text-4xl text-spero font-bold mb-3">
                {prixPartageReduitAllerRetour.toFixed(0)} €
              </p>
              
              {/* Économie */}
              <p className="text-sm text-green-600 font-medium">
                Vous économisez {economiePartageAllerRetour.toFixed(2)} €
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border-2 border-spero text-spero rounded-md hover:bg-spero/5 font-medium"
          >
            Modifier
          </button>

          <button
            onClick={() => navigate('/reservation', {
              state: {
                ...location.state,
                prices: {
                  sharedPrice: prixPartageReduit,    // Prix d'UN trajet
                  privatePrice: prixPriveReduit       // Prix privé d'UN trajet
                }
              }
            })}
            className="px-6 py-2 bg-spero text-white rounded-md hover:bg-opacity-90 font-medium"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalculationResult;