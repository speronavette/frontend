import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatePrice } from '../data/prices';
import { postalCodesDB } from '../data/postalCodes';

// OPTIMISATION: Données statiques constantes (pas de re-création)
const AIRPORTS = [
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

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

function PriceCalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passengers: '',
    postalCode: '',
    commune: '',
    destination: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OPTIMISATION: Memoized handlers pour éviter re-renders
  const handlePostalCodeChange = useCallback((e) => {
    const code = e.target.value;
    const commune = code.length === 4 ? (postalCodesDB[code] || 'Code postal non trouvé') : '';
    
    setFormData(prev => ({
      ...prev,
      postalCode: code,
      commune
    }));
    
    // Clear error si code valide
    if (code.length === 4 && postalCodesDB[code]) {
      setErrors(prev => ({ ...prev, postalCode: null }));
    }
  }, []);

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  // OPTIMISATION: Validation memoized
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.passengers) {
      newErrors.passengers = "Veuillez sélectionner le nombre de passagers";
    }
    
    if (!formData.postalCode || formData.postalCode.length !== 4) {
      newErrors.postalCode = "Veuillez entrer un code postal valide";
    } else if (!postalCodesDB[formData.postalCode]) {
      newErrors.postalCode = "Code postal non trouvé dans notre base";
    }
    
    if (!formData.destination) {
      newErrors.destination = "Veuillez sélectionner une destination";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // OPTIMISATION: Submit handler optimisé
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const prices = calculatePrice(formData.postalCode, formData.destination, formData.passengers);
      
      const navigationState = {
        passengers: formData.passengers,
        postalCode: formData.postalCode,
        commune: formData.commune,
        destination: {
          code: formData.destination,
          nom: AIRPORTS.find(a => a.code === formData.destination)?.nom
        },
        prices,
        noPriceFound: prices.sharedPrice === 0 && prices.privatePrice === 0
      };

      navigate('/result', { state: navigationState });
    } catch (error) {
      console.error('Error calculating price:', error);
      setErrors({ general: 'Erreur lors du calcul. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, isSubmitting, navigate]);

  // OPTIMISATION: Memoized options pour éviter re-renders
  const passengerOptions = useMemo(() => 
    PASSENGER_OPTIONS.map(num => (
      <option key={num} value={num}>{num}</option>
    )), []);

  const airportOptions = useMemo(() => 
    AIRPORTS.map(airport => (
      <option key={airport.code} value={airport.code}>
        {airport.nom} ({airport.code})
      </option>
    )), []);

  // OPTIMISATION: Memoized input classes
  const getInputClasses = useCallback((fieldName) => 
    `w-full p-2 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero transition-colors`,
    [errors]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Calculez votre tarif
          </h2>
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre de personnes */}
            <div>
              <label className="block text-center mb-2">
                Nombre de personnes :
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => handleFieldChange('passengers', e.target.value)}
                className={getInputClasses('passengers')}
                required
                aria-describedby={errors.passengers ? 'passengers-error' : undefined}
              >
                <option value="">Sélectionnez</option>
                {passengerOptions}
              </select>
              {errors.passengers && (
                <p id="passengers-error" className="mt-1 text-sm text-red-500">
                  {errors.passengers}
                </p>
              )}
            </div>

            {/* Code postal */}
            <div>
              <label className="block text-center mb-2">
                Code postal de départ :
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={handlePostalCodeChange}
                className={getInputClasses('postalCode')}
                maxLength="4"
                pattern="[0-9]{4}"
                placeholder="1000"
                required
                aria-describedby={`${formData.commune ? 'commune-info' : ''} ${errors.postalCode ? 'postal-error' : ''}`.trim() || undefined}
              />
              {formData.commune && (
                <p id="commune-info" className="mt-1 text-sm text-gray-600 text-center">
                  {formData.commune}
                </p>
              )}
              {errors.postalCode && (
                <p id="postal-error" className="mt-1 text-sm text-red-500">
                  {errors.postalCode}
                </p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="block text-center mb-2">
                Destination :
              </label>
              <select
                value={formData.destination}
                onChange={(e) => handleFieldChange('destination', e.target.value)}
                className={getInputClasses('destination')}
                required
                aria-describedby={errors.destination ? 'destination-error' : undefined}
              >
                <option value="">Sélectionnez</option>
                {airportOptions}
              </select>
              {errors.destination && (
                <p id="destination-error" className="mt-1 text-sm text-red-500">
                  {errors.destination}
                </p>
              )}
            </div>

            {/* Bouton Calculer */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Calcul en cours...
                </span>
              ) : (
                'CALCULER'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PriceCalculator;