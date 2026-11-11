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
            <h3 className="text-xl font-semibold text-center mb-4">Trajet simple</h3>
            
            <div className="text-center">
              <p className="text-4xl text-spero font-bold mb-3">
                {sharedPrice.toFixed(0)} €
              </p>
            </div>
          </div>

          {/* Supplément fêtes de fin d'année */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900 text-center">
            <p className="font-semibold mb-1">🎄 Supplément de 50 % les 24-25 décembre et 31 décembre-1er janvier</p>
            <p>
              Du 24/12/2026 à partir de 14h00 au 25/12/2026 jusqu'à 23h59, et du 31/12/2026 à partir de 14h00 au 01/01/2027 jusqu'à 23h59, une surcharge de 50 % s'applique sur le prix de la navette.
            </p>
            <p className="text-xs mt-1 text-amber-800">(heure de décollage ou d'atterrissage du vol)</p>
          </div>

          {/* Aller-retour */}
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-spero/20">
            <h3 className="text-xl font-semibold text-center mb-4">Aller-retour</h3>
            
            <div className="text-center">
              <p className="text-4xl text-spero font-bold mb-3">
                {(sharedPrice * 2).toFixed(0)} €
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
                  sharedPrice: sharedPrice,
                  privatePrice: privatePrice
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
