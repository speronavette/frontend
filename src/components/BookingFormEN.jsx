import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// ✅ CHANGEMENT : Utiliser StripePreAuthWrapper au lieu de StripePaymentForm
import StripePreAuthWrapper from './StripePreAuthWrapper';

// Mapping des codes postaux pour les destinations CRL
const CRL_DESTINATIONS_POSTAL_CODES = {
  'Brussels': '1000',
  'Bruges': '8000',
  'Ghent': '9000',
  'Antwerp': '2000',
  'Dinant': '5500',
  'Namur': '5000',
  'Liège': '4000',
  'Eupen': '4700',
  'Malmedy': '4960',
  'Durbuy': '6940',
  'Spa': '4900',
  'Bouillon': '6830'
};

// Fonction pour obtenir le bon code postal
const getDestinationPostalCode = (routeString) => {
  if (!routeString) return '1000';
  
  const destination = routeString.split('→')[1]?.trim();
  if (!destination) return '1000';
  
  if (destination.includes('Hautes Fagnes (Eupen)')) return CRL_DESTINATIONS_POSTAL_CODES['Eupen'];
  if (destination.includes('Hautes Fagnes (Malmedy)')) return CRL_DESTINATIONS_POSTAL_CODES['Malmedy'];
  
  for (const [city, postalCode] of Object.entries(CRL_DESTINATIONS_POSTAL_CODES)) {
    if (destination.includes(city)) {
      return postalCode;
    }
  }
  
  return '1000';
};

// Fonction pour obtenir la ville de destination
const getDestinationCity = (routeString) => {
  if (!routeString) return 'Brussels';
  
  const destination = routeString.split('→')[1]?.trim();
  if (!destination) return 'Brussels';
  
  if (destination.includes('Hautes Fagnes (Eupen)')) return 'Eupen';
  if (destination.includes('Hautes Fagnes (Malmedy)')) return 'Malmedy';
  
  return destination;
};

function BookingFormEN({ destinations }) {
  const navigate = useNavigate();
  
  const initialFormState = {
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+32',
    customCountryCode: '',
    bags: 0,
    
    // First trip
    route1: '',
    passengers: '',
    
    // First trip details (from airport)
    landingDate1: '',
    landingTime1: '',
    flightNumber1: '',
    flightOrigin1: '',
    dropoffLocation1: '',
    
    // First trip details (to airport)
    departureDate1: '',
    departureTime1: '',
    pickupLocation1: '',
    
    // Return trip
    needsReturn: null,
    route2: '',
    
    // Return trip details (from airport)
    landingDate2: '',
    landingTime2: '',
    flightNumber2: '',
    flightOrigin2: '',
    dropoffLocation2: '',
    
    // Return trip details (to airport)
    departureDate2: '',
    departureTime2: '',
    pickupLocation2: '',
    specialRequests: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [displayPrice, setDisplayPrice] = useState('');
  const [returnPrice, setReturnPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [isFromAirport1, setIsFromAirport1] = useState(true);
  const [isFromAirport2, setIsFromAirport2] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Country codes for phone numbers
  const countryCodes = [
    { code: '+32', country: 'Belgium' },
    { code: '+33', country: 'France' },
    { code: '+31', country: 'Netherlands' },
    { code: '+49', country: 'Germany' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+1', country: 'USA/Canada' },
    { code: 'other', country: 'Other' },
  ];

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update price if route or passengers change
    if (name === 'route1' || name === 'passengers') {
      updatePrice(name === 'route1' ? value : formData.route1, name === 'passengers' ? value : formData.passengers);
      
      // Check if it's from airport or to airport
      if (name === 'route1' && value) {
        setIsFromAirport1(value.includes('Charleroi Airport →'));
      }
    }
    
    // Handle return route change
    if (name === 'route2') {
      updateReturnPrice(value, formData.passengers);
      
      // Check if it's from airport or to airport
      setIsFromAirport2(value.includes('Charleroi Airport →'));
    }
    
    // Handle return trip selection
    if (name === 'needsReturn') {
      const needsReturn = value === 'yes';
      
      if (needsReturn) {
        // If selecting yes, pre-select a return route based on the first route
        let returnRoute = '';
        if (formData.route1.includes('Charleroi Airport →')) {
          // For first trip from airport, return trip should be to airport
          const destination = formData.route1.split('→')[1].trim();
          returnRoute = `${destination} → Charleroi Airport`;
        } else {
          // For first trip to airport, return trip should be from airport
          const origin = formData.route1.split('→')[0].trim();
          returnRoute = `Charleroi Airport → ${origin}`;
        }
        
        setFormData({
          ...formData,
          needsReturn: 'yes',
          route2: returnRoute
        });
        
        setIsFromAirport2(returnRoute.includes('Charleroi Airport →'));
        updateReturnPrice(returnRoute, formData.passengers);
      } else {
        setFormData({
          ...formData,
          needsReturn: 'no',
          route2: ''
        });
        setReturnPrice('');
        updateTotalPrice(displayPrice, '');
      }
    }
  };

  // Toggle between standard country code and custom country code
  const toggleCountryCodeType = () => {
    setFormData({
      ...formData,
      countryCode: formData.countryCode === 'other' ? '+32' : 'other',
      customCountryCode: ''
    });
  };

  // Special handler for route selection that handles the "other" option
  const handleRouteChange = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute === 'other') {
      // Open email client when "Other destination" is selected
      window.location.href = "mailto:spero.navette@gmail.com?subject=Inquiry about shuttle to custom destination&body=Hello,%0A%0AI would like to inquire about a shuttle service to a destination not listed on your website.%0A%0ADetails:%0A- Pickup date:%0A- Number of passengers:%0A- Destination:%0A- Special requests:%0A%0AThank you.";
      return;
    }
    
    // Check if it's from airport or to airport
    setIsFromAirport1(selectedRoute.includes('Charleroi Airport →'));
    
    setFormData({
      ...formData,
      route1: selectedRoute
    });
    
    updatePrice(selectedRoute, formData.passengers);
  };

  const updatePrice = (selectedRoute, passengerCount) => {
    if (!selectedRoute || !passengerCount) {
      setDisplayPrice('');
      updateTotalPrice('', returnPrice);
      return;
    }

    // Extract the destination name from the route value
    let destinationName = '';
    if (selectedRoute.includes('Charleroi Airport →')) {
      destinationName = selectedRoute.split('→')[1]?.trim() || '';
    } else {
      destinationName = selectedRoute.split('→')[0]?.trim() || '';
    }
    
    // Find the matching destination in the destinations array
    const destination = destinations.find(d => d.name === destinationName);
    if (!destination) {
      setDisplayPrice('');
      updateTotalPrice('', returnPrice);
      return;
    }

    let price = '';
    if (passengerCount <= 1) {
      price = destination.price1;
    } else if (passengerCount <= 4) {
      price = destination.price4;
    } else {
      price = destination.price8;
    }

    setDisplayPrice(price);
    updateTotalPrice(price, returnPrice);
  };
  
  const updateReturnPrice = (selectedRoute, passengerCount) => {
    if (!selectedRoute || !passengerCount) {
      setReturnPrice('');
      updateTotalPrice(displayPrice, '');
      return;
    }

    // Extract the destination name from the route value
    let destinationName = '';
    if (selectedRoute.includes('Charleroi Airport →')) {
      destinationName = selectedRoute.split('→')[1]?.trim() || '';
    } else {
      destinationName = selectedRoute.split('→')[0]?.trim() || '';
    }
    
    // Find the matching destination in the destinations array
    const destination = destinations.find(d => d.name === destinationName);
    if (!destination) {
      setReturnPrice('');
      updateTotalPrice(displayPrice, '');
      return;
    }

    let price = '';
    if (passengerCount <= 1) {
      price = destination.price1;
    } else if (passengerCount <= 4) {
      price = destination.price4;
    } else {
      price = destination.price8;
    }

    // Apply 10% discount for return trip
    const numericPrice = parseInt(price.replace('€', ''));
    price = `${Math.round(numericPrice * 0.9)}€`;

    setReturnPrice(price);
    updateTotalPrice(displayPrice, price);
  };
  
  const updateTotalPrice = (oneWayPrice, returnPrice) => {
    if (!oneWayPrice) {
      setTotalPrice('');
      return;
    }
    
    const oneWayNumeric = parseInt(oneWayPrice.replace('€', ''));
    
    if (!returnPrice) {
      setTotalPrice(oneWayPrice);
      return;
    }
    
    const returnNumeric = parseInt(returnPrice.replace('€', ''));
    setTotalPrice(`${oneWayNumeric + returnNumeric}€`);
  };

  // Navigate to next form step
  const goToNextStep = (e) => {
    e.preventDefault();
    setFormStep(formStep + 1);
    
    // If user selected "no" for return trip at step 4, skip to step 7 (summary)
    if (formStep === 4 && formData.needsReturn === 'no') {
      setFormStep(7);
    }
  };

  // Navigate to previous form step
  const goToPreviousStep = (e) => {
    e.preventDefault();
    setFormStep(formStep - 1);
    
    // If at step 7 and no return trip, go back to step 4
    if (formStep === 7 && formData.needsReturn === 'no') {
      setFormStep(4);
    }
  };

  // ✅ FONCTION MODIFIÉE : handlePreAuthSuccess (remplace handlePaymentSuccess)
  const handlePreAuthSuccess = async (paymentMethodId, bookingRef, preAuthDetails) => {
    console.log('✅ Pré-autorisation réussie:', { paymentMethodId, bookingRef, preAuthDetails });
    setIsSubmitting(true);
    setError('');
    
    try {
      const finalCountryCode = formData.countryCode === 'other' ? formData.customCountryCode : formData.countryCode;
      const fullAddress = isFromAirport1 ? formData.dropoffLocation1 : formData.pickupLocation1;
      
      // Obtenir le bon code postal basé sur la destination
      const correctPostalCode = getDestinationPostalCode(formData.route1);
      const destinationCity = getDestinationCity(formData.route1);
      
      const bookingData = {
        client: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: `${finalCountryCode} ${formData.phoneNumber}`,
          email: formData.email,
          address: {
            street: fullAddress,
            number: "N/A",
            postalCode: correctPostalCode,
            city: destinationCity,
            locality: destinationCity
          }
        },
        journey: (() => {
          if (formData.needsReturn === 'yes') {
            return {
              type: 'roundTrip',
              outbound: isFromAirport1 ? {
                date: formData.landingDate1,
                time: formData.landingTime1,
                airport: 'CRL',
                flightNumber: formData.flightNumber1,
                flightOrigin: formData.flightOrigin1
              } : {
                date: formData.departureDate1,
                time: formData.departureTime1,
                airport: 'CRL'
              },
              inbound: isFromAirport2 ? {
                date: formData.landingDate2,
                time: formData.landingTime2,
                airport: 'CRL',
                flightNumber: formData.flightNumber2,
                flightOrigin: formData.flightOrigin2
              } : {
                date: formData.departureDate2,
                time: formData.departureTime2,
                airport: 'CRL'
              }
            };
          } else if (isFromAirport1) {
            return {
              type: 'inbound',
              inbound: {
                date: formData.landingDate1,
                time: formData.landingTime1,
                airport: 'CRL',
                flightNumber: formData.flightNumber1,
                flightOrigin: formData.flightOrigin1
              }
            };
          } else {
            return {
              type: 'outbound',
              outbound: {
                date: formData.departureDate1,
                time: formData.departureTime1,
                airport: 'CRL'
              }
            };
          }
        })(),
        passengers: Number(formData.passengers),
        serviceType: 'shared',
        price: {
          sharedPrice: formData.needsReturn === 'yes' ? 
            parseInt(totalPrice.replace('€', '')) : 
            parseInt(displayPrice.replace('€', '')),
          privatePrice: 0
        },
        options: {
          luggageCount: formData.bags === "None" ? 0 : Number(formData.bags),
          handLuggageCount: 0,
          childSeatsCount: 0,
          boosterSeatsCount: 0,
          // ✅ NOUVEAU : Ajouter les infos de pré-autorisation
          other: `PRE-AUTH Payment | Payment ID: ${paymentMethodId} | Booking Ref: ${bookingRef} | PaymentIntent: ${preAuthDetails.paymentIntentId} | Status: ${preAuthDetails.status} | English Website | Bags: ${formData.bags} | Route: ${formData.route1}${formData.needsReturn === 'yes' ? ` + ${formData.route2}` : ''} | Full Address: ${fullAddress}${formData.specialRequests ? ` | Special Requests: ${formData.specialRequests}` : ''}`
        },
        recommendedBy: 'website_en',
        agencyName: '',
        paymentMethod: 'preauth_card', // ✅ NOUVEAU : Indiquer que c'est une pré-autorisation
        vatNumber: '',
        status: 'preauth_pending', // ✅ NOUVEAU : Statut spécial pour pré-autorisation
        // ✅ NOUVEAU : Informations de pré-autorisation
        paymentInfo: {
          paymentMethodId: paymentMethodId,
          paymentIntentId: preAuthDetails.paymentIntentId,
          bookingReference: bookingRef,
          amount: formData.needsReturn === 'yes' ? totalPrice : displayPrice,
          currency: 'EUR',
          status: preAuthDetails.status,
          requiresCapture: preAuthDetails.requiresCapture,
          preAuthDate: new Date().toISOString()
        }
      };

      console.log('📤 Données de réservation avec pré-auth:', JSON.stringify(bookingData, null, 2));
      
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.message || 'Error processing booking');
      }

      const data = await response.json();
      console.log('✅ Réservation sauvegardée:', data);

      // ✅ CHANGEMENT : Redirection vers la page de confirmation pré-autorisation
      navigate(`/booking-preauth-confirmation?ref=${bookingRef}&amount=${formData.needsReturn === 'yes' ? totalPrice : displayPrice}&email=${formData.email}&payment_intent=${preAuthDetails.paymentIntentId}`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      setError('Pre-authorization successful but booking could not be saved. Please contact us with reference: ' + bookingRef);
      setBookingReference(bookingRef);
      setBookingComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit final form (go to payment)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStep(8); // Go to payment step
  };

  // Render the current form step
  const renderFormStep = () => {
    if (bookingComplete) {
      return (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Pre-authorized!</h2>
          <p className="text-gray-600 mb-4">
            Your booking reference: <span className="font-bold text-spero">{bookingReference}</span>
          </p>
          <p className="text-gray-600 mb-6">
            We will contact you shortly to confirm the details of your transfer.
          </p>
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-blue-700 text-sm">
              Your payment has been pre-authorized and your booking has been saved. You will receive a confirmation email at {formData.email} and a confirmation call within 24 hours.
            </p>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-700 text-sm">{error}</p>
            </div>
          )}
        </div>
      );
    }

    switch (formStep) {
      case 1: // Route selection and passenger count
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Book Your Shuttle
            </h2>
            
            <form className="space-y-6" onSubmit={goToNextStep}>
              {/* Route Selection */}
              <div>
                <label htmlFor="route1" className="block mb-2 font-medium">
                  Route:
                </label>
                <select
                  id="route1"
                  name="route1"
                  value={formData.route1}
                  onChange={handleRouteChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                  required
                >
                  <option value="">Select your destination</option>
                  <option value="Charleroi Airport → Brussels">Charleroi Airport → Brussels </option>
                  <option value="Charleroi Airport → Bruges">Charleroi Airport → Bruges</option>
                  <option value="Charleroi Airport → Ghent">Charleroi Airport → Ghent</option>
                  <option value="Charleroi Airport → Antwerp">Charleroi Airport → Antwerp</option>
                  <option value="Charleroi Airport → Dinant">Charleroi Airport → Dinant</option>
                  <option value="Charleroi Airport → Namur">Charleroi Airport → Namur</option>
                  <option value="Charleroi Airport → Liège">Charleroi Airport → Liège</option>
                  <option value="Charleroi Airport → Hautes Fagnes (Eupen)">Charleroi Airport → Hautes Fagnes (Eupen)</option>
                  <option value="Charleroi Airport → Hautes Fagnes (Malmedy)">Charleroi Airport → Hautes Fagnes (Malmedy)</option>
                  <option value="Charleroi Airport → Durbuy">Charleroi Airport → Durbuy</option>
                  <option value="Charleroi Airport → Spa">Charleroi Airport → Spa</option>
                  <option value="Charleroi Airport → Bouillon">Charleroi Airport → Bouillon</option>
                  <option value="Brussels → Charleroi Airport">Brussels → Charleroi Airport</option>
                  <option value="Bruges → Charleroi Airport">Bruges → Charleroi Airport</option>
                  <option value="Ghent → Charleroi Airport">Ghent → Charleroi Airport</option>
                  <option value="Antwerp → Charleroi Airport">Antwerp → Charleroi Airport</option>
                  <option value="Dinant → Charleroi Airport">Dinant → Charleroi Airport</option>
                  <option value="Namur → Charleroi Airport">Namur → Charleroi Airport</option>
                  <option value="Liège → Charleroi Airport">Liège → Charleroi Airport</option>
                  <option value="Hautes Fagnes (Eupen) → Charleroi Airport">Hautes Fagnes (Eupen) → Charleroi Airport</option>
                  <option value="Hautes Fagnes (Malmedy) → Charleroi Airport">Hautes Fagnes (Malmedy) → Charleroi Airport</option>
                  <option value="Durbuy → Charleroi Airport">Durbuy → Charleroi Airport</option>
                  <option value="Spa → Charleroi Airport">Spa → Charleroi Airport</option>
                  <option value="Bouillon → Charleroi Airport">Bouillon → Charleroi Airport</option>
                  <option value="other">Other route (on request)</option>
                </select>
              </div>

              {/* Number of Passengers */}
              <div>
                <label htmlFor="passengers" className="block mb-2 font-medium">
                  Number of passengers:
                </label>
                <select
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                  required
                >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num}</option>
                ))}
                </select>
              </div>

              {displayPrice && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center font-medium mb-1">Your Price:</p>
                  <p className="text-center text-2xl font-bold text-spero">{displayPrice}</p>
                  <p className="text-center text-sm text-gray-500 mt-1">Fixed price, all inclusive</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                disabled={!formData.route1 || !formData.passengers}
              >
                <span className="mr-2">Continue</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Prefer to book by phone? Call us:
              </p>
              <a 
                href="tel:+32490197914" 
                className="text-spero font-medium text-lg hover:underline"
              >
                +32 490 19 79 14
              </a>
            </div>
          </>
        );

      case 2: // Personal details
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Personal Details
            </h2>
            
            <form className="space-y-6" onSubmit={goToNextStep}>
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block mb-2 font-medium">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block mb-2 font-medium">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                  placeholder="your.email@example.com"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll send your booking confirmation to this email address
                </p>
              </div>

              {/* Phone Number with Country Code */}
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 font-medium">
                  Phone Number:
                </label>
                {formData.countryCode !== 'other' ? (
                  // Standard country code selector
                  <div className="flex">
                    <select
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-1/3 p-2 border border-gray-300 rounded-l-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    >
                      {countryCodes.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.code === 'other' ? country.country : `${country.code} (${country.country})`}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="123 456 789"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-2/3 p-2 border border-gray-300 rounded-r-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                    </div>
                ) : (
                  // Custom country code input
                  <div className="flex">
                    <input
                      type="text"
                      id="customCountryCode"
                      name="customCountryCode"
                      placeholder="+xx"
                      value={formData.customCountryCode}
                      onChange={handleInputChange}
                      className="w-1/3 p-2 border border-gray-300 rounded-l-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="123 456 789"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-2/3 p-2 border border-gray-300 rounded-r-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={toggleCountryCodeType}
                  className="text-sm text-spero hover:underline mt-1"
                >
                  {formData.countryCode === 'other' ? 'Use standard country codes' : 'Enter custom country code'}
                </button>
              </div>

              {/* Number of Bags */}
              <div>
                <label htmlFor="bags" className="block mb-2 font-medium">
                  Number of bags:
                </label>
                <select
                  id="bags"
                  name="bags"
                  value={formData.bags}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                  required
                >
                  <option value="">Select</option>
                  {[{label: "None", value: 0}, 1, 2, 3, 4, 5, 6, 7, 8].map(item => {
  const isObject = typeof item === 'object';
  const value = isObject ? item.value : item;
  const label = isObject ? item.label : item;
  return <option key={value} value={value}>{label}</option>
})}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Standard cabin suitcases (up to 23kg each)
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </>
        );

      case 3: // Trip details
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Trip Details
            </h2>
            
            <form className="space-y-6" onSubmit={goToNextStep}>
              {isFromAirport1 ? (
                // FROM AIRPORT FORM
                <>
                  <h3 className="font-medium text-lg text-gray-700 mb-4">
                    Pickup from Charleroi Airport
                  </h3>
                  
                  <div>
                    <label htmlFor="landingDate1" className="block mb-2 font-medium">
                      Flight arrival date:
                    </label>
                    <input
                      type="date"
                      id="landingDate1"
                      name="landingDate1"
                      value={formData.landingDate1}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="landingTime1" className="block mb-2 font-medium">
                      Flight arrival time:
                    </label>
                    <input
                      type="time"
                      id="landingTime1"
                      name="landingTime1"
                      value={formData.landingTime1}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      We will wait 30 minutes after your scheduled arrival time
                    </p>
                  </div>

                  <div>
                    <label htmlFor="flightNumber1" className="block mb-2 font-medium">
                      Flight number:
                    </label>
                    <input
                      type="text"
                      id="flightNumber1"
                      name="flightNumber1"
                      value={formData.flightNumber1}
                      onChange={handleInputChange}
                      placeholder="e.g., FR1234"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="flightOrigin1" className="block mb-2 font-medium">
                      Flight departure city:
                    </label>
                    <input
                      type="text"
                      id="flightOrigin1"
                      name="flightOrigin1"
                      value={formData.flightOrigin1}
                      onChange={handleInputChange}
                      placeholder="e.g., Rome, Barcelona, London..."
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="dropoffLocation1" className="block mb-2 font-medium">
                      Drop-off address:
                    </label>
                    <input
                      type="text"
                      id="dropoffLocation1"
                      name="dropoffLocation1"
                      value={formData.dropoffLocation1}
                      onChange={handleInputChange}
                      placeholder="Street, number, city"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Complete address where you want to be dropped off
                    </p>
                  </div>
                </>
              ) : (
                // TO AIRPORT FORM
                <>
                  <h3 className="font-medium text-lg text-gray-700 mb-4">
                    Transfer to Charleroi Airport
                  </h3>
                  
                  <div>
                    <label htmlFor="departureDate1" className="block mb-2 font-medium">
                      Flight departure date:
                    </label>
                    <input
                      type="date"
                      id="departureDate1"
                      name="departureDate1"
                      value={formData.departureDate1}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="departureTime1" className="block mb-2 font-medium">
                      Flight departure time:
                    </label>
                    <input
                      type="time"
                      id="departureTime1"
                      name="departureTime1"
                      value={formData.departureTime1}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      We recommend arriving at the airport 2 hours before departure
                    </p>
                  </div>

                  <div>
                    <label htmlFor="pickupLocation1" className="block mb-2 font-medium">
                      Pickup address:
                    </label>
                    <input
                      type="text"
                      id="pickupLocation1"
                      name="pickupLocation1"
                      value={formData.pickupLocation1}
                      onChange={handleInputChange}
                      placeholder="Street, number, city"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Complete address where you want to be picked up
                    </p>
                  </div>
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </>
        );

      case 4: // Return trip question
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Return Trip
            </h2>
            
            <form className="space-y-6" onSubmit={goToNextStep}>
              <div className="text-center">
                <p className="text-lg mb-6">
                  Do you need a return transfer?
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Save 10% on your return trip when booking both transfers together!
                </p>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="needsReturn"
                      value="yes"
                      checked={formData.needsReturn === 'yes'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Yes, I need a return transfer (10% discount)</span>
                  </label>
                  
                  <label className="flex items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="needsReturn"
                      value="no"
                      checked={formData.needsReturn === 'no'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">No, one-way transfer only</span>
                  </label>
                </div>
              </div>

              {formData.needsReturn === 'yes' && returnPrice && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-center text-green-700 font-medium mb-2">Return trip price with 10% discount:</p>
                  <p className="text-center text-2xl font-bold text-green-600">{returnPrice}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={formData.needsReturn === null}
                  className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50"
                >
                  <span className="mr-2">Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </>
        );

      case 5: // Return trip details (only if needsReturn === 'yes')
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Return Trip Details
            </h2>
            
            <form className="space-y-6" onSubmit={goToNextStep}>
              {isFromAirport2 ? (
                // RETURN FROM AIRPORT FORM
                <>
                  <h3 className="font-medium text-lg text-gray-700 mb-4">
                    Return pickup from Charleroi Airport
                  </h3>
                  
                  <div>
                    <label htmlFor="landingDate2" className="block mb-2 font-medium">
                      Return flight arrival date:
                    </label>
                    <input
                      type="date"
                      id="landingDate2"
                      name="landingDate2"
                      value={formData.landingDate2}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="landingTime2" className="block mb-2 font-medium">
                      Return flight arrival time:
                    </label>
                    <input
                      type="time"
                      id="landingTime2"
                      name="landingTime2"
                      value={formData.landingTime2}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="flightNumber2" className="block mb-2 font-medium">
                      Return flight number:
                    </label>
                    <input
                      type="text"
                      id="flightNumber2"
                      name="flightNumber2"
                      value={formData.flightNumber2}
                      onChange={handleInputChange}
                      placeholder="e.g., FR1234"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="flightOrigin2" className="block mb-2 font-medium">
                      Return flight departure city:
                    </label>
                    <input
                      type="text"
                      id="flightOrigin2"
                      name="flightOrigin2"
                      value={formData.flightOrigin2}
                      onChange={handleInputChange}
                      placeholder="e.g., Rome, Barcelona, London..."
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="dropoffLocation2" className="block mb-2 font-medium">
                      Return drop-off address:
                    </label>
                    <input
                      type="text"
                      id="dropoffLocation2"
                      name="dropoffLocation2"
                      value={formData.dropoffLocation2}
                      onChange={handleInputChange}
                      placeholder="Street, number, city"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>
                </>
              ) : (
                // RETURN TO AIRPORT FORM
                <>
                  <h3 className="font-medium text-lg text-gray-700 mb-4">
                    Return transfer to Charleroi Airport
                  </h3>
                  
                  <div>
                    <label htmlFor="departureDate2" className="block mb-2 font-medium">
                      Return flight departure date:
                    </label>
                    <input
                      type="date"
                      id="departureDate2"
                      name="departureDate2"
                      value={formData.departureDate2}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="departureTime2" className="block mb-2 font-medium">
                      Return flight departure time:
                    </label>
                    <input
                      type="time"
                      id="departureTime2"
                      name="departureTime2"
                      value={formData.departureTime2}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pickupLocation2" className="block mb-2 font-medium">
                      Return pickup address:
                    </label>
                    <input
                      type="text"
                      id="pickupLocation2"
                      name="pickupLocation2"
                      value={formData.pickupLocation2}
                      onChange={handleInputChange}
                      placeholder="Street, number, city"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
                      required
                    />
                  </div>
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </>
        );

        case 6: // ✅ NOUVEAU : Special Requests
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Special Requests
      </h2>
      
      <form className="space-y-6" onSubmit={goToNextStep}>
        <div>
          <label htmlFor="specialRequests" className="block mb-2 font-medium">
            Any special requests or additional information?
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero"
            rows="4"
            placeholder="e.g., Child seat needed, wheelchair accessibility, large luggage, stroller, etc."
          />
          <p className="text-sm text-gray-500 mt-2">
            Please mention any special requirements such as child seats, wheelchairs, extra large luggage, strollers, or any other specific needs.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors shadow-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </>
  );

      case 7: 
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Booking Summary
            </h2>
            
            <div className="space-y-6 mb-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-medium">
                      {formData.countryCode === 'other' ? formData.customCountryCode : formData.countryCode} {formData.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Bags:</p>
                    <p className="font-medium">{formData.bags}</p>
                  </div>
                </div>
              </div>

              {/* Trip Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">Trip Information</h3>
                
                {/* First Trip */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Outbound Trip</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Route:</p>
                      <p className="font-medium">{formData.route1}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Passengers:</p>
                      <p className="font-medium">{formData.passengers}</p>
                    </div>
                    {isFromAirport1 ? (
                      <>
                        <div>
                          <p className="text-gray-600">Flight arrival:</p>
                          <p className="font-medium">{formData.landingDate1} at {formData.landingTime1}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Flight:</p>
                          <p className="font-medium">{formData.flightNumber1} from {formData.flightOrigin1}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Drop-off:</p>
                          <p className="font-medium">{formData.dropoffLocation1}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-gray-600">Flight departure:</p>
                          <p className="font-medium">{formData.departureDate1} at {formData.departureTime1}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Pickup:</p>
                          <p className="font-medium">{formData.pickupLocation1}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-lg font-bold text-spero">{displayPrice}</span>
                  </div>
                </div>

                {/* Return Trip */}
                {formData.needsReturn === 'yes' && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Return Trip</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Route:</p>
                        <p className="font-medium">{formData.route2}</p>
                      </div>
                      {isFromAirport2 ? (
                        <>
                          <div>
                            <p className="text-gray-600">Flight arrival:</p>
                            <p className="font-medium">{formData.landingDate2} at {formData.landingTime2}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Flight:</p>
                            <p className="font-medium">{formData.flightNumber2} from {formData.flightOrigin2}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Drop-off:</p>
                            <p className="font-medium">{formData.dropoffLocation2}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-gray-600">Flight departure:</p>
                            <p className="font-medium">{formData.departureDate2} at {formData.departureTime2}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Pickup:</p>
                            <p className="font-medium">{formData.pickupLocation2}</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-sm text-gray-600">Return price (10% off): </span>
                      <span className="text-lg font-bold text-green-600">{returnPrice}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="bg-spero text-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">Total Price:</h3>
                  <span className="text-2xl font-bold">{totalPrice}</span>
                </div>
                <p className="text-sm opacity-90 mt-1">Fixed price, all inclusive</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">Proceed to Payment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </>
        );

      case 8: // Payment (using StripePreAuthWrapper)
        return (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Secure Payment
            </h2>
            
            {/* ✅ CHANGEMENT : Utiliser StripePreAuthWrapper au lieu de StripePaymentForm */}
            <StripePreAuthWrapper
              amount={formData.needsReturn === 'yes' ? totalPrice : displayPrice}
              bookingData={formData}
              onPaymentSuccess={handlePreAuthSuccess}
              onBack={() => setFormStep(7)}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Progress indicator */}
      {!bookingComplete && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Step {formStep} of 8</span>
            <span className="text-sm text-gray-500">{Math.round((formStep / 8) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-spero h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(formStep / 8) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {renderFormStep()}

      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spero mx-auto mb-4"></div>
            <p className="text-gray-700">Processing your pre-authorization...</p>
            <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingFormEN;