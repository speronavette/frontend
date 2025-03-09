import React, { useState, useEffect } from 'react';
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

function Home() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [commune, setCommune] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.updatePageTitle("Navette Aéroport Bruxelles et Charleroi depuis votre domicile");
  }, []);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-spero mb-8 text-center">Navette Aéroport Bruxelles, Charleroi et autres destinations</h1>
      
      {/* Calculateur avec largeur réduite */}
      <div id="calculator" className="max-w-md mx-auto mb-12">
        <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Calculez votre tarif</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <button
                type="submit"
                className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg"
              >
                CALCULER VOTRE NAVETTE
              </button>
            </form>
          </div>
        </div>
      </div>

      <section className="mb-12" id="services">
        <h2 className="text-3xl font-semibold text-spero mb-6 text-center">Nos services de navette aéroport</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Navette Aéroport de Bruxelles</h3>
            <p>Service de navette premium entre votre domicile et l'aéroport de Bruxelles Zaventem. Ponctualité et confort garantis pour tous vos vols.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Navette Aéroport de Charleroi</h3>
            <p>Transport à la demande depuis toutes les communes vers l'aéroport de Charleroi. Service personnalisé adapté à vos horaires de vol.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Navette Autres Destinations</h3>
            <p>Desservant également Paris CDG, Orly, Lille, Amsterdam et plusieurs autres aéroports internationaux. Une solution pour toutes vos destinations.</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-spero mb-6 text-center">Pourquoi choisir Spero Navette ?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Transport personnalisé</h3>
            <p className="mb-4">Notre service de navette s'adapte à vos besoins spécifiques. Que vous voyagiez seul, en famille ou en groupe, nous proposons des solutions sur mesure.</p>
            
            <h3 className="text-xl font-semibold mb-3">Navette domicile-aéroport</h3>
            <p>Fini le stress des transports en commun ou du stationnement à l'aéroport. Nous venons vous chercher directement chez vous et vous déposons au terminal de votre vol.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Tarifs compétitifs</h3>
            <p className="mb-4">Nos prix sont transparents et calculés en fonction de la distance, sans frais cachés. Possibilité de navette partagée pour des économies supplémentaires.</p>
            
            <h3 className="text-xl font-semibold mb-3">Fiabilité et ponctualité</h3>
            <p>Nos chauffeurs suivent en temps réel l'évolution de votre vol pour s'adapter aux éventuels retards. Vous ne serez jamais laissé sans solution.</p>
          </div>
        </div>
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-spero mb-6">Prêt à réserver votre navette aéroport ?</h2>
        <p className="mb-6 text-lg">Calculez votre tarif et réservez directement en ligne, ou contactez-nous pour toute demande spécifique.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" onClick={e => {e.preventDefault(); document.querySelector('form').scrollIntoView({behavior: 'smooth'})}} className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
            Calculer mon trajet
          </a>
          <a href="tel:+32490197914" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors">
            Nous appeler : +32 490 197 914
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;