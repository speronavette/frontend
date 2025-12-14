import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatePrice } from '../data/prices';
import { postalCodesDB } from '../data/postalCodes';

const airports = [
  { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
  { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
  { code: 'ZYR', nom: 'Gare de Bruxelles-Midi', pays: 'Belgique' },
  { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
  { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
  { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
  { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' },
  { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
  { code: 'DUS', nom: 'Aéroport de Dusseldorf', pays: 'Allemagne' },
  { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' }
];

function PriceCalculator() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [commune, setCommune] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState({});

  const handlePostalCodeChange = (e) => {
    const code = e.target.value;
    setPostalCode(code);
    
    if (code.length === 4) {
      const foundCommune = postalCodesDB[code];
      setCommune(foundCommune || 'Code postal non trouvé');
    } else {
      setCommune('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!passengers) {
      newErrors.passengers = "Veuillez sélectionner le nombre de passagers";
    }
    
    if (!postalCode || postalCode.length !== 4) {
      newErrors.postalCode = "Veuillez entrer un code postal valide";
    }
    
    if (!destination) {
      newErrors.destination = "Veuillez sélectionner une destination";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const prices = calculatePrice(postalCode, destination, passengers);
  
    // Si aucun prix n'est trouvé
    if (prices.sharedPrice === 0 && prices.privatePrice === 0) {
      navigate('/result', {
        state: {
          passengers,
          postalCode,
          commune,
          destination: {
            code: destination,
            nom: airports.find(a => a.code === destination)?.nom
          },
          prices,
          noPriceFound: true
        }
      });
      return;
    }

    // Navigation normale avec prix trouvé
    navigate('/result', {
      state: {
        passengers,
        postalCode,
        commune,
        destination: {
          code: destination,
          nom: airports.find(a => a.code === destination)?.nom
        },
        prices
      }
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Calculez votre tarif</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre de personnes */}
            <div>
              <label className="block text-center mb-2">
                Nombre de personnes :
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className={`w-full p-2 border ${errors.passengers ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                required
              >
                <option value="">Sélectionnez</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {errors.passengers && (
                <p className="mt-1 text-sm text-red-500">{errors.passengers}</p>
              )}
            </div>

            {/* Code postal */}
            <div>
              <label className="block text-center mb-2">
                Code postal de départ :
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={handlePostalCodeChange}
                className={`w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                maxLength="4"
                required
              />
              {commune && (
                <p className="mt-1 text-sm text-gray-600 text-center">{commune}</p>
              )}
              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="block text-center mb-2">
                Destination :
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`w-full p-2 border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                required
              >
                <option value="">Sélectionnez</option>
                {airports.map(airport => (
                  <option key={airport.code} value={airport.code}>
                    {airport.nom} ({airport.code})
                  </option>
                ))}
              </select>
              {errors.destination && (
                <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
              )}
            </div>

            {/* Bouton Calculer */}
            <button
              type="submit"
              className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg"
            >
              CALCULER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PriceCalculator;;