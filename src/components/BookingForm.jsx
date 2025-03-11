import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculatePrice, pricesDB } from '../data/prices';
import { postalCodesDB } from '../data/postalCodes';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const airports = [
 { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
 { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
 { code: 'ZYR', nom: 'Gare de Bruxelles-Midi', pays: 'Belgique' }, // Ajout de la gare
 { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
 { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
 { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
 { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' },
 { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
 { code: 'DUS', nom: 'Aéroport de Dusseldorf', pays: 'Allemagne' },
 { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' }
];

// BookingForm.jsx - Après les imports et const airports
const validateForm = (values) => {
 const errors = {};
 if (values.email && !values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
   errors.email = "Email invalide";
 
 if (values.phone && !values.phone.match(/^(\+32|0)\d{8,9}$/))
   errors.phone = "Numéro de téléphone invalide";
   
 if (values.journeyType === 'roundTrip' && 
     values.inboundJourney?.date && 
     values.outboundJourney?.date &&
     new Date(values.inboundJourney.date) <= new Date(values.outboundJourney.date)) {
   errors.inboundDate = "La date de retour doit être après la date d'aller";
 }

 return errors;
};

const getMinPickupTime = (flightTime) => {
 if (!flightTime) return '';
 const flightDate = new Date(`1970-01-01T${flightTime}`);
 const pickupDate = new Date(flightDate.getTime() - (3 * 60 * 60 * 1000));
 return pickupDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

function BookingForm() {
 const location = useLocation();
 const navigate = useNavigate();
 const formData = location.state || {};
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState('');
 const [termsAccepted, setTermsAccepted] = useState(false);

 // États principaux
 const [personalInfo, setPersonalInfo] = useState({
   firstName: '',
   lastName: '',
   phone: '',
   email: '',
   passengers: formData.passengers || '',
   street: '',
   number: '',
   postalCode: formData.postalCode || '',
   city: formData.commune || ''
 });

 const [serviceType, setServiceType] = useState('shared');
 const [journeyType, setJourneyType] = useState('roundTrip');
 const [price, setPrice] = useState(formData.prices || { sharedPrice: 0, privatePrice: 0 });

 const [outboundJourney, setOutboundJourney] = useState({
   date: '',
   time: '',
   airport: formData.destination?.code || ''
 });

 const [inboundJourney, setInboundJourney] = useState({
   date: '',
   time: '',
   flightNumber: '',
   flightOrigin: '',
   airport: formData.destination?.code || ''
 });

 const [freeOptions, setFreeOptions] = useState({
   luggageCount: 0,
   handLuggageCount: 0,
   childSeatsCount: 0,
   boosterSeatsCount: 0,
   other: ''
 });

 const [additionalInfo, setAdditionalInfo] = useState({
   recommendedBy: '',
   agencyName: '',
   paymentMethod: 'cash', // Valeur par défaut: espèces
   vatNumber: '',
   comments: ''
 });

 // Fonction de validation pour le numéro de TVA
 const validateVatNumber = (vatNumber) => {
  // Accepte n'importe quel format de numéro de TVA ou d'entreprise
  return vatNumber && vatNumber.trim().length > 0;
};

 const isPriceValid = (journeyType, postalCode, outAirport, inAirport, passengers) => {
   if (!postalCode || !passengers) return false;
 
   const checkPrice = (code, airport) => {
     if (!airport) return false;
     const key = `${code}-${airport}`;
     return pricesDB.hasOwnProperty(key);
   };
   
   switch (journeyType) {
     case 'outbound':
       return checkPrice(postalCode, outAirport);
       
     case 'inbound':
       return checkPrice(postalCode, inAirport);
       
     case 'roundTrip':
       const outValid = checkPrice(postalCode, outAirport);
       const inValid = checkPrice(postalCode, inAirport);
       
       // Si les deux aéroports ne sont pas encore sélectionnés, on retourne true
       if (!outAirport || !inAirport) return true;
       
       // Sinon on vérifie que les deux ont des prix valides
       return outValid && inValid;
       
     default:
       return false;
   }
 };

 const updatePrice = () => {
   const { postalCode, passengers } = personalInfo;
   
   if (!postalCode || !passengers) return;
 
   let newPrice = { sharedPrice: 0, privatePrice: 0 };
 
   try {
     if (journeyType === 'outbound' && outboundJourney.airport) {
       newPrice = calculatePrice(postalCode, outboundJourney.airport, Number(passengers));
     } else if (journeyType === 'inbound' && inboundJourney.airport) {
       newPrice = calculatePrice(postalCode, inboundJourney.airport, Number(passengers));
     } else if (journeyType === 'roundTrip') {
       if (outboundJourney.airport && inboundJourney.airport) {
         const outPrice = calculatePrice(postalCode, outboundJourney.airport, Number(passengers));
         const inPrice = calculatePrice(postalCode, inboundJourney.airport, Number(passengers));
         
         if (outPrice.sharedPrice === 0 || inPrice.sharedPrice === 0) {
           setPrice({ sharedPrice: 0, privatePrice: 0 });
           return;
         }
         
         newPrice = {
           sharedPrice: outPrice.sharedPrice + inPrice.sharedPrice,
           privatePrice: outPrice.privatePrice + inPrice.privatePrice
         };
       }
     }
 
     setPrice(newPrice);
   } catch (error) {
     console.error('Erreur dans le calcul du prix:', error);
     setPrice({ sharedPrice: 0, privatePrice: 0 });
   }
 };

 const [formErrors, setFormErrors] = useState({});

 useEffect(() => {
   updatePrice();
 }, [personalInfo.postalCode, personalInfo.passengers, outboundJourney.airport, inboundJourney.airport, journeyType]);

 const handlePostalCodeChange = (e) => {
   const code = e.target.value;
   if (code.length === 4) {
     const foundCommune = postalCodesDB[code];
     setPersonalInfo(prev => ({
       ...prev,
       postalCode: code,
       city: foundCommune || 'Code postal non trouvé'
     }));
   } else {
     setPersonalInfo(prev => ({
       ...prev,
       postalCode: code,
       city: ''
     }));
   }
 };

 const handlePersonalInfoChange = (e) => {
   const { name, value } = e.target;
   setPersonalInfo(prev => ({ ...prev, [name]: value }));
   
   // Validation en temps réel
   const errors = validateForm({ 
     ...personalInfo, 
     [name]: value,
     journeyType,
     inboundJourney,
     outboundJourney 
   });
   setFormErrors(prev => ({ ...prev, [name]: errors[name] }));
 };

 const handleOutboundAirportChange = (e) => {
   setOutboundJourney(prev => ({ ...prev, airport: e.target.value }));
 };

 const handleInboundAirportChange = (e) => {
   setInboundJourney(prev => ({ ...prev, airport: e.target.value }));
 };

 const handleFreeOptionsChange = (e) => {
   const { name, value } = e.target;
   const maxValues = {
     luggageCount: 12,
     handLuggageCount: 12,
     childSeatsCount: 2,
     boosterSeatsCount: 2
   };
   
   setFreeOptions(prev => ({
     ...prev,
     [name]: name === 'other' ? value : Math.min(parseInt(value) || 0, maxValues[name] || 0)
   }));
 };

 const handleAdditionalInfoChange = (e) => {
  const { name, value } = e.target;
  setAdditionalInfo(prev => ({ ...prev, [name]: value }));
 };

 const handleTermsChange = (e) => {
   setTermsAccepted(e.target.checked);
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError('');
   setIsSubmitting(true);
 
   try {
     // Construction des données de la réservation
     let bookingData;
 
     if (journeyType === 'roundTrip') {
       // Pour un aller-retour, créez une seule réservation
       bookingData = {
         client: {
           firstName: personalInfo.firstName,
           lastName: personalInfo.lastName,
           email: personalInfo.email,
           phone: personalInfo.phone,
           address: {
             street: personalInfo.street,
             number: personalInfo.number,
             postalCode: personalInfo.postalCode,
             city: personalInfo.city
           }
         },
         journey: {
           type: 'roundTrip',
           outbound: {
             date: outboundJourney.date,
             time: outboundJourney.time,
             airport: outboundJourney.airport,
             price: outPrice
           },
           inbound: {
             date: inboundJourney.date,
             time: inboundJourney.time,
             airport: inboundJourney.airport,
             flightNumber: inboundJourney.flightNumber,
             flightOrigin: inboundJourney.flightOrigin,
             price: inPrice
           }
         },
         passengers: Number(personalInfo.passengers),
         serviceType,
         price: {
           sharedPrice: price.sharedPrice,
           privatePrice: price.privatePrice
         },
         options: freeOptions,
         recommendedBy: additionalInfo.recommendedBy,
         agencyName: additionalInfo.recommendedBy === 'agency' ? additionalInfo.agencyName : '',
         paymentMethod: additionalInfo.paymentMethod,
         vatNumber: additionalInfo.paymentMethod === 'invoice' ? additionalInfo.vatNumber : '',
         status: 'pending'
       };

       // Envoi d'une seule requête à l'API
       const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
       const response = await fetch(`${baseUrl}/api/bookings`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(bookingData)
       });

       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Erreur lors de la réservation');
       }

       const data = await response.json();

       // Calcul des prix individuels pour l'affichage correct dans la page de confirmation
       const outPrice = calculatePrice(personalInfo.postalCode, outboundJourney.airport, Number(personalInfo.passengers));
       const inPrice = calculatePrice(personalInfo.postalCode, inboundJourney.airport, Number(personalInfo.passengers));

       // Navigation vers la confirmation avec les prix individuels
       navigate('/confirmation', {
         state: {
           outboundBooking: {
             ...data.data,
             journey: {
               outbound: {
                 ...data.data.journey.outbound,
                 price: outPrice  // Prix individuel de l'aller
               }
             }
           },
           inboundBooking: {
             ...data.data,
             journey: {
               inbound: {
                 ...data.data.journey.inbound,
                 price: inPrice  // Prix individuel du retour
               }
             }
           },
           outboundPrice: outPrice,  // Prix individuel de l'aller
           inboundPrice: inPrice,   // Prix individuel du retour
           email: personalInfo.email,
           isRoundTrip: true
         }
       });
      } else {
        // Pour un trajet simple (aller ou retour)
        bookingData = {
          client: {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            email: personalInfo.email,
            phone: personalInfo.phone,
            address: {
              street: personalInfo.street,
              number: personalInfo.number,
              postalCode: personalInfo.postalCode,
              city: personalInfo.city
            }
          },
          journey: {
            type: journeyType,
            outbound: journeyType === 'outbound' ? {
              date: outboundJourney.date,
              time: outboundJourney.time,
              airport: outboundJourney.airport
            } : null,
            inbound: journeyType === 'inbound' ? {
              date: inboundJourney.date,
              time: inboundJourney.time,
              airport: inboundJourney.airport,
              flightNumber: inboundJourney.flightNumber,
              flightOrigin: inboundJourney.flightOrigin
            } : null
          },
          passengers: Number(personalInfo.passengers),
          serviceType,
          price: {
            sharedPrice: price.sharedPrice,
            privatePrice: price.privatePrice
          },
          options: freeOptions,
          recommendedBy: additionalInfo.recommendedBy,
          agencyName: additionalInfo.recommendedBy === 'agency' ? additionalInfo.agencyName : '',
          paymentMethod: additionalInfo.paymentMethod,
          vatNumber: additionalInfo.paymentMethod === 'invoice' ? additionalInfo.vatNumber : '',
          status: 'pending'
        };

        // Envoi à l'API
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la réservation');
        }

        const data = await response.json();

        // Navigation vers la confirmation
        navigate('/confirmation', {
          state: {
            singleBooking: data.data,
            email: personalInfo.email,
            isRoundTrip: false
          }
        });
      }
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError(err.message || "Une erreur est survenue lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
 };
 return (
   <div className="max-w-4xl mx-auto p-6">
     <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-8">
     {error && (
       <Alert variant="destructive">
         <AlertDescription>
           {error.split('\n').map((line, index) => (
             <React.Fragment key={index}>
               {line}
               <br />
             </React.Fragment>
           ))}
         </AlertDescription>
       </Alert>
     )}
       {/* Section 1: Informations personnelles */}
       <section>
         <h2 className="text-xl font-semibold mb-6 text-spero">1. Vos informations personnelles</h2>
         <div className="grid md:grid-cols-2 gap-6">
           <div>
             <label className="block mb-2">Prénom *</label>
             <input
               type="text"
               name="firstName"
               value={personalInfo.firstName}
               onChange={handlePersonalInfoChange}
               className="w-full p-3 border rounded-md"
               required
             />
           </div>

           <div>
             <label className="block mb-2">Nom *</label>
             <input
               type="text"
               name="lastName"
               value={personalInfo.lastName}
               onChange={handlePersonalInfoChange}
               className="w-full p-3 border rounded-md"
               required
             />
           </div>

           <div>
             <label className="block mb-2">Téléphone *</label>
             <input
               type="tel"
               name="phone"
               value={personalInfo.phone}
               onChange={handlePersonalInfoChange}
               className="w-full p-3 border rounded-md"
               required
             />
           </div>

           <div>
             <label className="block mb-2">Email *</label>
             <input
               type="email"
               name="email"
               value={personalInfo.email}
               onChange={handlePersonalInfoChange}
               className="w-full p-3 border rounded-md"
               required
             />
           </div>

           {/* Code postal et commune */}
           <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
             <div>
               <label className="block mb-2">Code postal *</label>
               <input
                 type="text"
                 value={personalInfo.postalCode}
                 onChange={handlePostalCodeChange}
                 className="w-full p-3 border rounded-md"
                 maxLength="4"
                 required
               />
             </div>
             <div>
               <label className="block mb-2">Commune *</label>
               <input
                 type="text"
                 value={personalInfo.city}
                 className="w-full p-3 border rounded-md bg-gray-100"
                 readOnly
               />
             </div>
           </div>

           {/* Adresse */}
           <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
             <div className="md:col-span-1">
               <label className="block mb-2">Rue *</label>
               <input
                 type="text"
                 name="street"
                 value={personalInfo.street}
                 onChange={handlePersonalInfoChange}
                 className="w-full p-3 border rounded-md"
                 required
               />
             </div>
             <div>
               <label className="block mb-2">Numéro *</label>
               <input
                 type="text"
                 name="number"
                 value={personalInfo.number}
                 onChange={handlePersonalInfoChange}
                 className="w-full p-3 border rounded-md"
                 required
               />
             </div>
           </div>

{/* Note sur les adresses multiples */}
<div className="md:col-span-2 mt-2">
 <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
   <p className="text-sm text-blue-800">
     <strong>Note :</strong> Si vous avez besoin d'effectuer plusieurs arrêts ou si vous avez plusieurs adresses sur votre trajet, 
     veuillez nous contacter à <span className="font-medium">spero.navette@gmail.com</span> pour recevoir un devis personnalisé.
   </p>
 </div>
</div>

           <div>
             <label className="block mb-2">Nombre de personnes *</label>
             <select
               name="passengers"
               value={personalInfo.passengers}
               onChange={handlePersonalInfoChange}
               className="w-full p-3 border rounded-md"
               required
             >
               <option value="">Sélectionnez</option>
               {[1,2,3,4,5,6,7,8].map(num => (
                 <option key={num} value={num}>{num}</option>
               ))}
             </select>
           </div>
         </div>
       </section>

       {/* Section 2: Type de trajet */}
       <section>
         <h2 className="text-xl font-semibold mb-6 text-spero">2. Type de trajet</h2>
         <div className="space-y-6">
           <div className="flex gap-4">
             <button
               type="button"
               onClick={() => setJourneyType('outbound')}
               className={`flex-1 px-6 py-2 rounded-md ${
                 journeyType === 'outbound'
                   ? 'bg-spero text-white'
                   : 'border border-spero text-spero hover:bg-spero/5'
               }`}
             >
               Aller simple
             </button>
             <button
               type="button"
               onClick={() => setJourneyType('inbound')}
               className={`flex-1 px-6 py-2 rounded-md ${
                 journeyType === 'inbound'
                   ? 'bg-spero text-white'
                   : 'border border-spero text-spero hover:bg-spero/5'
               }`}
             >
               Retour simple
             </button>
             <button
               type="button"
               onClick={() => setJourneyType('roundTrip')}
               className={`flex-1 px-6 py-2 rounded-md ${
                 journeyType === 'roundTrip'
                   ? 'bg-spero text-white'
                   : 'border border-spero text-spero hover:bg-spero/5'
               }`}
             >
               Aller-retour
             </button>
           </div>

           {/* Trajet Aller */}
           {(journeyType === 'outbound' || journeyType === 'roundTrip') && (
             <div className="mt-4 p-6 border-2 border-spero/20 rounded-lg bg-white shadow-sm">
               <h3 className="font-semibold text-lg mb-4 text-spero">Trajet aller *</h3>
               <div className="grid md:grid-cols-3 gap-4">
                 <div>
                   <label className="block mb-2">Date de départ</label>
                   <input
                     type="date"
                     value={outboundJourney.date}
                     onChange={(e) => setOutboundJourney(prev => ({ ...prev, date: e.target.value }))}
                     className="w-full p-3 border rounded-md"
                     required
                   />
                 </div>
                 <div>
                   <label className="block mb-2">Heure de décollage de l'avion</label>
                   <input
                     type="time"
                     value={outboundJourney.time}
                     onChange={(e) => setOutboundJourney(prev => ({ ...prev, time: e.target.value }))}
                     className="w-full p-3 border rounded-md"
                     required
                   />
                 </div>
                 <div>
                   <label className="block mb-2">Aéroport de destination</label>
                   <select
                     value={outboundJourney.airport}
                     onChange={handleOutboundAirportChange}
                     className="w-full p-3 border rounded-md"
                     required
                   >
                     <option value="">Sélectionnez</option>
                     {airports.map(airport => (
                       <option key={airport.code} value={airport.code}>
                         {airport.nom}
                       </option>
                     ))}
                   </select>
                 </div>
               </div>
             </div>
           )}

           {/* Trajet Retour */}
           {(journeyType === 'inbound' || journeyType === 'roundTrip') && (
             <div className="mt-6 p-6 border-2 border-spero/20 rounded-lg bg-white shadow-sm">
               <h3 className="font-semibold text-lg mb-4 text-spero">Trajet retour *</h3>
               <div className="grid md:grid-cols-3 gap-4">
                 <div>
                   <label className="block mb-2">Date de retour</label>
                   <input
                     type="date"
                     value={inboundJourney.date}
                     onChange={(e) => setInboundJourney(prev => ({ ...prev, date: e.target.value }))}
                     className="w-full p-3 border rounded-md"
                     required
                   />
                 </div>
                 <div>
                   <label className="block mb-2">Heure d'atterrissage de l'avion</label>
                   <input
                     type="time"
                     value={inboundJourney.time}
                     onChange={(e) => setInboundJourney(prev => ({ ...prev, time: e.target.value }))}
                     className="w-full p-3 border rounded-md"
                     required
                   />
                 </div>
                 <div>
                   <label className="block mb-2">Aéroport de départ</label>
                   <select
                     value={inboundJourney.airport}
                     onChange={handleInboundAirportChange}
                     className="w-full p-3 border rounded-md"
                     required
                   >
                     <option value="">Sélectionnez</option>
                     {airports.map(airport => (
                       <option key={airport.code} value={airport.code}>
                         {airport.nom}
                       </option>
                     ))}
                   </select>
                 </div>
                 <div className="md:col-span-3 grid md:grid-cols-2 gap-4">
                   <div>
                     <label className="block mb-2">Numéro de vol</label>
                     <input
                       type="text"
                       value={inboundJourney.flightNumber}
                       onChange={(e) => setInboundJourney(prev => ({ ...prev, flightNumber: e.target.value }))}
                       className="w-full p-3 border rounded-md"
                       required
                     />
                   </div>
                   <div>
                     <label className="block mb-2">Provenance du vol</label>
                     <input
                       type="text"
                       value={inboundJourney.flightOrigin}
                       onChange={(e) => setInboundJourney(prev => ({ ...prev, flightOrigin: e.target.value }))}
                       className="w-full p-3 border rounded-md"
                       required
                     />
                   </div>
                 </div>
               </div>
             </div>
           )}
         </div>
       </section>

       {/* Section 3: Type de service et prix */}
       <section>
         <h2 className="text-xl font-semibold mb-6 text-spero">3. Type de service</h2>
         <div className="space-y-6">
           <div className="flex gap-4">
             <button
               type="button"
               onClick={() => setServiceType('shared')}
               className={`flex-1 px-6 py-2 rounded-md ${
                 serviceType === 'shared'
                   ? 'bg-spero text-white'
                   : 'border border-spero text-spero hover:bg-spero/5'
               }`}
             >
               Navette partagée
             </button>
             <button
               type="button"
               onClick={() => setServiceType('private')}
               className={`flex-1 px-6 py-2 rounded-md ${
                 serviceType === 'private'
                   ? 'bg-spero text-white'
                   : 'border border-spero text-spero hover:bg-spero/5'
               }`}
             >
               Navette privée
             </button>
           </div>

           {/* Affichage du prix */}
           <div className="mt-4 py-4 border-t border-b">
             <div className="text-center">
               <h3 className="text-xl font-semibold mb-2">Prix total</h3>
               {!isPriceValid(journeyType, personalInfo.postalCode, outboundJourney.airport, inboundJourney.airport, personalInfo.passengers) ? (
                 <div className="space-y-2">
                   <p className="text-lg text-gray-700">
                     Pour cette destination, merci de nous contacter directement pour obtenir un devis personnalisé.
                   </p>
                   <p className="text-spero font-semibold">
                     Tél : 0490/19.79.14<br />
                     Email : info@spero-navette.be
                   </p>
                 </div>
) : (
  <>
    {journeyType === 'roundTrip' ? (
      <>
        <div className="space-y-2 mb-4 text-gray-600">
          <p>
            Trajet aller {personalInfo.city} → {airports.find(a => a.code === outboundJourney.airport)?.nom}:
            <span className="font-bold text-black"> {calculatePrice(personalInfo.postalCode, outboundJourney.airport, Number(personalInfo.passengers))?.[serviceType === 'private' ? 'privatePrice' : 'sharedPrice']} €</span>
          </p>
          <p>
            Trajet retour {airports.find(a => a.code === inboundJourney.airport)?.nom} → {personalInfo.city}:
            <span className="font-bold text-black"> {calculatePrice(personalInfo.postalCode, inboundJourney.airport, Number(personalInfo.passengers))?.[serviceType === 'private' ? 'privatePrice' : 'sharedPrice']} €</span>
          </p>
        </div>
        <p className="text-3xl text-spero font-bold">
          {serviceType === 'private' ? price.privatePrice : price.sharedPrice} €
        </p>
         <p className="text-sm text-gray-600 mt-1">(Total aller-retour)</p>
       </>
     ) : (
       <p className="text-3xl text-spero font-bold">
         {serviceType === 'private' ? price.privatePrice : price.sharedPrice} €
       </p>
     )}
   </>
 )}
</div>
</div>
</div>
</section>

{/* Section 4: Options gratuites */}
<section>
<h2 className="text-xl font-semibold mb-6 text-spero">4. Options gratuites</h2>
<div className="grid md:grid-cols-2 gap-6">
<div>
<label className="block mb-2">Valises en soute (max. 12)</label>
<input
 type="number"
 name="luggageCount"
 value={freeOptions.luggageCount}
 onChange={handleFreeOptionsChange}
 className="w-full p-3 border rounded-md"
 min="0"
 max="12"
/>
</div>

<div>
<label className="block mb-2">Bagages à main (max. 12)</label>
<input
 type="number"
 name="handLuggageCount"
 value={freeOptions.handLuggageCount}
 onChange={handleFreeOptionsChange}
 className="w-full p-3 border rounded-md"
 min="0"
 max="12"
/>
</div>

<div>
<label className="block mb-2">Sièges enfants (max. 2)</label>
<input
 type="number"
 name="childSeatsCount"
 value={freeOptions.childSeatsCount}
 onChange={handleFreeOptionsChange}
 className="w-full p-3 border rounded-md"
 min="0"
 max="2"
/>
</div>

<div>
<label className="block mb-2">Réhausseurs (max. 2)</label>
<input
 type="number"
 name="boosterSeatsCount"
 value={freeOptions.boosterSeatsCount}
 onChange={handleFreeOptionsChange}
 className="w-full p-3 border rounded-md"
 min="0"
 max="2"
/>
</div>

<div className="md:col-span-2">
<label className="block mb-2">Autres</label>
<textarea
 name="other"
 value={freeOptions.other}
 onChange={handleFreeOptionsChange}
 className="w-full p-3 border rounded-md"
 rows="2"
/>
</div>
</div>
</section>

{/* Section 5: Informations complémentaires */}
<section>
<h2 className="text-xl font-semibold mb-6 text-spero">5. Informations complémentaires</h2>
<div className="grid md:grid-cols-1 gap-6">
<div>
<label className="block mb-2">Par qui avez-vous connu notre société?</label>
<select
name="recommendedBy"
value={additionalInfo.recommendedBy}
onChange={handleAdditionalInfoChange}
className="w-full p-3 border rounded-md"
>
<option value="">Sélectionnez</option>
<option value="google">Google</option>
<option value="facebook">Facebook</option>
<option value="agency">Agence de voyage</option>
<option value="recommendation">Recommandation d'un proche</option>
<option value="advertisement">Publicité</option>
<option value="other">Autre</option>
</select>
</div>

{additionalInfo.recommendedBy === 'agency' && (
<div>
<label className="block mb-2">Quelle agence?</label>
<input
type="text"
name="agencyName"
value={additionalInfo.agencyName}
onChange={handleAdditionalInfoChange}
className="w-full p-3 border rounded-md"
placeholder="Nom de l'agence de voyage"
required
/>
</div>
)}
</div>
</section>

<div className="mt-6">
<label className="block mb-2 font-medium">Méthode de paiement *</label>
<div className="space-y-2">
<div className="flex items-center">
<input
type="radio"
id="payment-cash"
name="paymentMethod"
value="cash"
checked={additionalInfo.paymentMethod === 'cash'}
onChange={handleAdditionalInfoChange}
className="mr-2"
required
/>
<label htmlFor="payment-cash">En espèces au chauffeur le jour de la navette</label>
</div>

<div className="flex items-center">
<input
type="radio"
id="payment-transfer"
name="paymentMethod"
value="transfer"
checked={additionalInfo.paymentMethod === 'transfer'}
onChange={handleAdditionalInfoChange}
className="mr-2"
/>
<label htmlFor="payment-transfer">Par virement bancaire maximum 5 jours avant la prise en charge</label>
</div>

<div className="flex items-center">
<input
type="radio"
id="payment-invoice"
name="paymentMethod"
value="invoice"
checked={additionalInfo.paymentMethod === 'invoice'}
onChange={handleAdditionalInfoChange}
className="mr-2"
/>
<label htmlFor="payment-invoice">Par facturation (uniquement pour les professionnels)</label>
</div>
</div>

{/* Champ conditionnel pour le numéro de TVA */}
{additionalInfo.paymentMethod === 'invoice' && (
<div className="mt-4">
<label className="block mb-2">Votre numéro de TVA/d'entreprise *</label>
<input
type="text"
name="vatNumber"
value={additionalInfo.vatNumber}
onChange={handleAdditionalInfoChange}
className="w-full p-3 border rounded-md"
placeholder="Exemple: 'BE0123456789' ou 'Facture à l'agence'"
required
/>
</div>
)}
</div>

{/* Acceptation des conditions générales */}
<div className="mt-6 flex items-start gap-2">
<input
type="checkbox"
id="termsAccepted"
checked={termsAccepted}
onChange={handleTermsChange}
className="mt-1"
required
/>
<label htmlFor="termsAccepted" className="text-sm">
J'ai lu et accepté les{' '}
<a
href="/conditions-generales"
target="_blank"
className="text-spero underline"
>
conditions générales
</a>
.
</label>
</div>

{/* Bouton de soumission */}
<div className="mt-8 flex justify-center">
<button
type="submit"
disabled={
isSubmitting || 
(serviceType === 'private' ? price.privatePrice : price.sharedPrice) === 0 ||
!termsAccepted
}
className={`px-8 py-3 rounded-md transition-colors ${
isSubmitting || 
(serviceType === 'private' ? price.privatePrice : price.sharedPrice) === 0 ||
!termsAccepted
 ? 'bg-gray-400 cursor-not-allowed'
 : 'bg-spero text-white hover:bg-opacity-90'
}`}
>
{isSubmitting ? (
<>
 <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
 Traitement en cours...
</>
) : (
'Envoyer la réservation'
)}
</button>
</div>
</form>
</div>
);
}

export default BookingForm;