import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Users, MapPin, CheckCircle, Phone, Mail, Shield, Star } from 'lucide-react';

// Import conditionnel pour éviter les erreurs
let SEO = () => null;
let calculatePrice = () => ({ sharedPrice: 0, privatePrice: 0 });
let postalCodesDB = {};

try {
  SEO = require('../components/SEO').default;
} catch (e) {
  console.warn('SEO component not found');
}

try {
  const prices = require('../data/prices');
  calculatePrice = prices.calculatePrice;
} catch (e) {
  console.warn('Prices module not found');
}

try {
  const postal = require('../data/postalCodes');
  postalCodesDB = postal.postalCodesDB;
} catch (e) {
  console.warn('Postal codes module not found');
}

const airports = [
  { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
  { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
  { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
  { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' },
  { code: 'DUS', nom: 'Aéroport de Dusseldorf', pays: 'Allemagne' },
  { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
  { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
  { code: 'ZYR', nom: 'Gare de Bruxelles-Midi', pays: 'Belgique' },
  { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
  { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' }
];

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passengers: '',
    postalCode: '',
    commune: '',
    destination: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    
    if (field === 'postalCode' && value.length === 4) {
      newData.commune = postalCodesDB[value] || 'Code postal non trouvé';
    } else if (field === 'postalCode') {
      newData.commune = '';
    }
    
    setFormData(newData);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.passengers) {
      newErrors.passengers = "Veuillez sélectionner le nombre de passagers";
    }
    if (!formData.postalCode || formData.postalCode.length !== 4) {
      newErrors.postalCode = "Veuillez entrer un code postal valide";
    }
    if (!formData.destination) {
      newErrors.destination = "Veuillez sélectionner une destination";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const prices = calculatePrice(formData.postalCode, formData.destination, formData.passengers);
    const selectedAirport = airports.find(a => a.code === formData.destination);
    
    navigate('/result', {
      state: {
        passengers: formData.passengers,
        postalCode: formData.postalCode,
        commune: formData.commune,
        destination: {
          code: formData.destination,
          nom: selectedAirport?.nom || ''
        },
        prices,
        noPriceFound: prices.sharedPrice === 0 && prices.privatePrice === 0
      }
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Spero Navette - Service de Navette Aéroport",
    "url": "https://www.spero-navette.be/",
    "telephone": "+32490197914"
  };

  return (
    <>
      <SEO
        title="Navette Aéroport Charleroi Bruxelles | Transport 24h/7j | Spero Navette"
        description="Service de navette aéroport depuis le Grand Charleroi et environs vers Bruxelles-Zaventem, Charleroi, Paris CDG"
        keywords="navette aéroport Charleroi, navette aéroport Bruxelles"
        canonicalUrl="https://www.spero-navette.be/">
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-spero mb-4 text-center">
            Navette Aéroport Charleroi - Bruxelles - Paris
          </h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
            Service professionnel de navette aéroport depuis le <strong>Grand Charleroi</strong> et tout le Hainaut
          </p>
        </section>

        {/* Calculateur de prix */}
        <section id="calculator" className="max-w-md mx-auto mb-16">
          <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Calculez le prix de votre navette aéroport
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre de passagers */}
              <div>
                <label htmlFor="passengers" className="block text-center mb-2 font-medium">
                  Nombre de personnes :
                </label>
                <select
                  id="passengers"
                  value={formData.passengers}
                  onChange={(e) => handleInputChange('passengers', e.target.value)}
                  className={`w-full p-2 border ${errors.passengers ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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
                <label htmlFor="postalCode" className="block text-center mb-2 font-medium">
                  Code postal de départ :
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className={`w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  maxLength="4"
                  placeholder="Ex: 6000"
                  required
                />
                {formData.commune && (
                  <p className="mt-1 text-sm text-gray-600 text-center">{formData.commune}</p>
                )}
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                )}
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="destination" className="block text-center mb-2 font-medium">
                  Aéroport de destination :
                </label>
                <select
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className={`w-full p-2 border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  required
                >
                  <option value="">Sélectionnez votre aéroport</option>
                  <option value="BRU">Bruxelles-Zaventem (BRU)</option>
                  <option value="CRL">Charleroi Brussels South (CRL)</option>
                  <option value="CDG">Paris Charles de Gaulle (CDG)</option>
                  <option value="CGN">Cologne (CGN)</option>
                  <option value="DUS">Düsseldorf (DUS)</option>
                  <option value="AMS">Amsterdam Schiphol (AMS)</option>
                  <option value="LIL">Lille (LIL)</option>
                  <option value="ZYR">Gare de Bruxelles-Midi</option>
                  <option value="ORY">Paris Orly (ORY)</option>
                  <option value="LUX">Luxembourg (LUX)</option>
                </select>
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">CALCULER LE TARIF</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </section>

        {/* Zones desservies */}
        <section className="mb-16 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Votre navette aéroport depuis votre commune
          </h2>
          <p className="text-center text-gray-700">
            Grand Charleroi • Pont-à-Celles • Courcelles • Fontaine-l'Évêque • Fleurus • 
            Basse Sambre • Sambreville • Gerpinnes • Ham-sur-Heure • Thuin • Beaumont • 
            Rance • Chimay • Couvin • Philippeville • Walcourt
          </p>
        </section>

        {/* Avantages */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Pourquoi choisir Spero Navette ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Clock className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Service 24h/7j</h3>
              <p className="text-gray-700">Navettes disponibles à toute heure</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <MapPin className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Prise en charge à domicile</h3>
              <p className="text-gray-700">Nous venons vous chercher chez vous</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Shield className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ponctualité garantie</h3>
              <p className="text-gray-700">Suivi des vols en temps réel</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="h-12 w-12 text-spero mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Navette privée ou partagée</h3>
              <p className="text-gray-700">Selon vos besoins et votre budget</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-spero mb-6">
            Réservez votre navette maintenant
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+32490197914" 
              className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center"
            >
              <Phone size={18} className="mr-2" />
              <span>0490 19 79 14</span>
            </a>
            <a 
              href="mailto:info@spero-navette.be" 
              className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center"
            >
              <Mail size={18} className="mr-2" />
              <span>Email</span>
            </a>
          </div>
        </section>

        {/* Témoignages */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
            Nos clients témoignent
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Première expérience et nous avons été très satisfait. Départ à l'heure!"
              </p>
              <p className="font-medium">- Bénédicte V.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Navette de confiance. Patron très gentil et arrangeant!"
              </p>
              <p className="font-medium">- Mélissa K.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Très contents de notre prise en charge. Les horaires étaient respectés."
              </p>
              <p className="font-medium">- Sindy D.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;