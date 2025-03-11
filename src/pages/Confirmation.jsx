import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Users, Calendar, MapPin, Luggage, Clock } from 'lucide-react';

function Confirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fonction de formatage du prix en euros
    const formatPriceToEUR = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    // Fonction de formatage de la date
    const formatDate = (dateString) => {
        if (!dateString) return 'Date non disponible';
        try {
            return new Date(dateString).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Erreur de formatage de date:', error);
            return 'Date non disponible';
        }
    };

// Fonction pour obtenir le nom complet de l'aéroport à partir du code
const getAirportName = (code) => {
    const airports = {
      'BRU': 'Aéroport de Bruxelles',
      'CRL': 'Aéroport de Charleroi',
      'ZYR': 'Gare de Bruxelles-Midi',
      'CDG': 'Aéroport de Paris Charles de Gaulle',
      'ORY': 'Aéroport de Paris Orly',
      'LIL': 'Aéroport de Lille',
      'LUX': 'Aéroport de Luxembourg',
      'AMS': "Aéroport d'Amsterdam",
      'DUS': 'Aéroport de Dusseldorf',
      'CGN': 'Aéroport de Cologne'
    };
    
    return airports[code] || code;
  };

    // Fonction de calcul du prix d'une réservation
    const calculatePrice = (booking) => {
        try {
            if (!booking?.price) {
                console.log('❌ Prix manquant pour la réservation:', booking);
                return 0;
            }

            const serviceType = booking.serviceType || 'shared';
            const price = serviceType === 'private'
                ? Number(booking.price.privatePrice || 0)
                : Number(booking.price.sharedPrice || 0);

            return price;
        } catch (error) {
            console.error('❌ Erreur lors du calcul du prix:', error);
            return 0;
        }
    };

    // Fonction de rendu du prix
// Modification de la fonction renderPrice dans Confirmation.jsx
// Remplacez la fonction renderPrice actuelle par celle-ci :

const renderPrice = () => {
    try {
        if (!booking) {
            return formatPriceToEUR(0);
        }

        if (booking.isRoundTrip) {
            // Pour un aller-retour, utilisez directement le prix total stocké 
            // au lieu de recalculer la somme des deux trajets
            const totalPrice = booking.outbound.price.sharedPrice || booking.outbound.price.privatePrice || 0;
            
            return (
                <div>
                    <div className="space-y-1 text-sm text-gray-600 mb-2">
                        <p>Prix aller : {formatPriceToEUR(totalPrice / 2)}</p>
                        <p>Prix retour : {formatPriceToEUR(totalPrice / 2)}</p>
                    </div>
                    <p className="text-2xl font-bold text-spero">
                        {formatPriceToEUR(totalPrice)}
                    </p>
                    <p className="text-sm text-gray-600">
                        {booking.outbound.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                    </p>
                </div>
            );
        } else {
            const totalPrice = calculatePrice(booking);

            return (
                <div>
                    <p className="text-2xl font-bold text-spero">
                        {formatPriceToEUR(totalPrice)}
                    </p>
                    <p className="text-sm text-gray-600">
                        {booking.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                    </p>
                </div>
            );
        }
    } catch (error) {
        console.error('❌ Erreur lors du rendu du prix:', error);
        return formatPriceToEUR(0);
    }
};

    // Récupération des informations client
    const getClientInfo = () => {
        if (!booking) return null;
        return booking.isRoundTrip ? booking.outbound.client : booking.client;
    };

    // Déterminer la méthode de paiement
    const renderPaymentMethod = () => {
        if (!booking) return null;
        
        const paymentMethod = booking.isRoundTrip 
            ? booking.outbound.paymentMethod 
            : booking.paymentMethod;
        
        const vatNumber = booking.isRoundTrip 
            ? booking.outbound.vatNumber 
            : booking.vatNumber;
            
        const client = getClientInfo();
            
        switch(paymentMethod) {
            case 'cash':
                return (
                    <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-spero mt-0.5" />
                        <div>
                            <p className="font-medium">En espèces au chauffeur le jour de la navette</p>
                        </div>
                    </div>
                );
                
            case 'transfer':
                return (
                    <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-spero mt-0.5" />
                        <div>
                            <p className="font-medium">Par virement bancaire</p>
                            <p className="mt-2 text-sm text-gray-600">Veuillez effectuer le paiement au moins 5 jours avant la date du transfert.</p>
                            <div className="mt-3 p-3 bg-gray-50 rounded">
                                <p className="font-medium">Coordonnées bancaires:</p>
                                <p>Compte: BE64 3630 0968 1852</p>
                                <p>Bénéficiaire: Spero Navette SRL</p>
                                <p>Communication: "{client.lastName} {client.firstName} {client.address.postalCode}"</p>
                            </div>
                        </div>
                    </div>
                );
                
            case 'invoice':
                return (
                    <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-spero mt-0.5" />
                        <div>
                            <p className="font-medium">Par facturation</p>
                            {vatNumber && (
                                <p className="mt-2">N° TVA/Entreprise: <span className="font-medium">{vatNumber}</span></p>
                            )}
                            <p className="mt-2 text-sm text-gray-600">
                                Une facture vous sera envoyée dans les plus brefs délais.
                            </p>
                        </div>
                    </div>
                );
                
            default:
                return <p>Méthode de paiement non spécifiée</p>;
        }
    };

    // Rendu de la source de référence
    const renderReferralSource = () => {
        if (!booking) return null;
        
        const recommendedBy = booking.isRoundTrip 
            ? booking.outbound.recommendedBy 
            : booking.recommendedBy;
            
        const agencyName = booking.isRoundTrip 
            ? booking.outbound.agencyName 
            : booking.agencyName;
            
        if (!recommendedBy) return null;
        
        const sources = {
            'google': 'Google',
            'facebook': 'Facebook',
            'agency': `Agence de voyage${agencyName ? ': ' + agencyName : ''}`,
            'recommendation': 'Recommandation d\'un proche',
            'advertisement': 'Publicité',
            'other': 'Autre'
        };
        
        return (
            <div className="flex items-center gap-2">
                <p>{sources[recommendedBy] || recommendedBy}</p>
            </div>
        );
    };

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                if (!location.state) {
                    throw new Error('Aucune donnée de réservation trouvée');
                }

                const { isRoundTrip, outboundBooking, inboundBooking, singleBooking, email } = location.state;

                if (isRoundTrip && outboundBooking && inboundBooking) {
                    const bookingData = {
                        outbound: outboundBooking,
                        inbound: inboundBooking,
                        isRoundTrip: true
                    };
                    setBooking(bookingData);
                    return;
                }

                if (singleBooking) {
                    setBooking({
                        ...singleBooking,
                        isRoundTrip: false
                    });
                    return;
                }

                throw new Error('Aucune information de réservation valide trouvée');

            } catch (err) {
                console.error('Erreur dans fetchBookingDetails:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [location.state]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-spero" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-spero text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    const email = location.state?.email;
    const client = getClientInfo();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Merci pour votre confiance</h2>
                    <p className="text-lg text-gray-600">
                        Votre demande de réservation a été envoyée avec succès.
                    </p>
                </div>

                {booking && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Détails de votre réservation</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Informations personnelles */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="h-5 w-5 text-spero" />
                                        <p className="font-medium">Informations personnelles</p>
                                    </div>
                                    <ul className="mt-2 space-y-1 text-gray-600 pl-7">
                                        <li>Nom: {client?.firstName} {client?.lastName}</li>
                                        <li>Email: {client?.email}</li>
                                        <li>Téléphone: {client?.phone}</li>
                                    </ul>
                                </div>

                                {/* Adresse */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="h-5 w-5 text-spero" />
                                        <p className="font-medium">Adresse de prise en charge</p>
                                    </div>
                                    <ul className="mt-2 space-y-1 text-gray-600 pl-7">
                                        <li>{client?.address?.street} {client?.address?.number}</li>
                                        <li>{client?.address?.postalCode} {client?.address?.city}</li>
                                    </ul>
                                </div>

                                {/* Résumé du trajet */}
                                <div className="col-span-2 bg-white shadow-sm rounded-lg border border-spero/20 p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calendar className="h-5 w-5 text-spero" />
                                        <h4 className="font-medium text-lg text-spero">Résumé du trajet</h4>
                                    </div>
                                    
                                    {booking.isRoundTrip ? (
  <div className="space-y-4">
    <div>
      <h5 className="font-semibold text-spero">Aller:</h5>
      <p className="text-gray-700">
        {formatDate(booking.outbound.journey.outbound.date)} à {booking.outbound.journey.outbound.time}
      </p>
      <p className="text-gray-700">
        Vers {getAirportName(booking.outbound.journey.outbound.airport)}
      </p>
      {booking.outbound.journey.outbound.flightNumber && (
        <p className="text-gray-700">
          Numéro de vol: {booking.outbound.journey.outbound.flightNumber}
        </p>
      )}
    </div>
    <div>
      <h5 className="font-semibold text-spero">Retour:</h5>
      <p className="text-gray-700">
        {formatDate(booking.inbound.journey.inbound.date)} à {booking.inbound.journey.inbound.time}
      </p>
      <p className="text-gray-700">
        De {getAirportName(booking.inbound.journey.inbound.airport)}
      </p>
      {booking.inbound.journey.inbound.flightNumber && (
        <p className="text-gray-700">
          Numéro de vol: {booking.inbound.journey.inbound.flightNumber}
        </p>
      )}
      {booking.inbound.journey.inbound.flightOrigin && (
        <p className="text-gray-700">
          Origine du vol: {booking.inbound.journey.inbound.flightOrigin}
        </p>
      )}
    </div>
  </div>
) : (
  <div>
    {booking.journey?.outbound ? (
      <div>
        <h5 className="font-semibold text-spero">Aller:</h5>
        <p className="text-gray-700">
          {formatDate(booking.journey.outbound.date)} à {booking.journey.outbound.time}
        </p>
        <p className="text-gray-700">
          Vers {getAirportName(booking.journey.outbound.airport)}
        </p>
        {booking.journey.outbound.flightNumber && (
          <p className="text-gray-700">
            Numéro de vol: {booking.journey.outbound.flightNumber}
          </p>
        )}
      </div>
    ) : (
      <div>
        <h5 className="font-semibold text-spero">Retour:</h5>
        <p className="text-gray-700">
          {formatDate(booking.journey.inbound.date)} à {booking.journey.inbound.time}
        </p>
        <p className="text-gray-700">
          De {getAirportName(booking.journey.inbound.airport)}
        </p>
        {booking.journey.inbound.flightNumber && (
          <p className="text-gray-700">
            Numéro de vol: {booking.journey.inbound.flightNumber}
          </p>
        )}
        {booking.journey.inbound.flightOrigin && (
          <p className="text-gray-700">
            Origine du vol: {booking.journey.inbound.flightOrigin}
          </p>
        )}
      </div>
    )}
  </div>
)}
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-gray-700">
                                            <span className="font-medium">
                                                <Users className="inline h-4 w-4 mr-1" />
                                                Nombre de passagers:
                                            </span> {booking.isRoundTrip ? booking.outbound.passengers : booking.passengers}
                                        </p>
                                    </div>
                                </div>

                                {/* Options */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Luggage className="h-5 w-5 text-spero" />
                                        <p className="font-medium">Options</p>
                                    </div>
                                    <ul className="mt-2 space-y-1 text-gray-600 pl-7">
                                        <li>Bagages en soute: {booking.isRoundTrip
                                            ? booking.outbound.options.luggageCount
                                            : booking.options.luggageCount}</li>
                                        <li>Bagages à main: {booking.isRoundTrip
                                            ? booking.outbound.options.handLuggageCount
                                            : booking.options.handLuggageCount}</li>
                                        <li>Sièges enfant: {booking.isRoundTrip
                                            ? booking.outbound.options.childSeatsCount
                                            : booking.options.childSeatsCount}</li>
                                        <li>Réhausseurs: {booking.isRoundTrip
                                            ? booking.outbound.options.boosterSeatsCount
                                            : booking.options.boosterSeatsCount}</li>
                                    </ul>
                                </div>

                                {/* Prix */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CreditCard className="h-5 w-5 text-spero" />
                                        <p className="font-medium">Prix total</p>
                                    </div>
                                    {renderPrice()}
                                </div>
                            </div>
                        </div>
                        
                        {/* Section méthode de paiement */}
                        <div className="bg-white shadow-md p-6 rounded-lg border border-spero/10">
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Méthode de paiement</h3>
                            {renderPaymentMethod()}
                        </div>
                        
                        {/* Comment nous avez-vous connu */}
                        {(booking.isRoundTrip ? booking.outbound.recommendedBy : booking.recommendedBy) && (
                            <div className="bg-white shadow-md p-6 rounded-lg border border-spero/10">
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Comment nous avez-vous connu?</h3>
                                {renderReferralSource()}
                            </div>
                        )}

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-spero flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Prochaines étapes</h3>
                                    <p className="text-gray-600">
                                        Nous vous enverrons un email de confirmation à <span className="font-medium">{email}</span> lorsque notre équipe aura examiné et validé votre demande.
                                    </p>
                                    <div className="mt-4 text-sm text-gray-600">
                                        <p>Pour toute question, vous pouvez nous contacter :</p>
                                        <p className="font-medium">Tél : 0490/19.79.14</p>
                                        <p className="font-medium">Email : spero.navette@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-spero text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;