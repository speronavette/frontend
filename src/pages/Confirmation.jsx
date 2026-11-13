import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Users, Calendar, MapPin, Luggage, Clock } from 'lucide-react';
import SEO from '../components/SEO'; // Importation du composant SEO
import { isTransferDeadlinePassed, TRANSFER_TEXT_STANDARD, TRANSFER_TEXT_URGENT } from '../utils/paymentDeadline';

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
    const renderPrice = () => {
        try {
            if (!booking) {
                return formatPriceToEUR(0);
            }

            // Cas d'un aller-retour
            if (booking.isRoundTrip) {
                // Récupérer le type de service (shared ou private)
                const serviceType = booking.outbound.serviceType || 'shared';
                
                // Utiliser les prix individuels si disponibles
                let outboundPrice, inboundPrice, totalPrice;
                
                // Première tentative: utiliser les prix individuels transmis directement
                if (booking.outboundPrice && booking.inboundPrice) {
                    outboundPrice = serviceType === 'private'
                        ? booking.outboundPrice.privatePrice
                        : booking.outboundPrice.sharedPrice;
                        
                    inboundPrice = serviceType === 'private'
                        ? booking.inboundPrice.privatePrice
                        : booking.inboundPrice.sharedPrice;
                }
                // Deuxième tentative: chercher les prix dans les objets journey
                else if (booking.outbound.journey?.outbound?.price && booking.inbound.journey?.inbound?.price) {
                    outboundPrice = serviceType === 'private'
                        ? booking.outbound.journey.outbound.price.privatePrice
                        : booking.outbound.journey.outbound.price.sharedPrice;
                        
                    inboundPrice = serviceType === 'private'
                        ? booking.inbound.journey.inbound.price.privatePrice
                        : booking.inbound.journey.inbound.price.sharedPrice;
                }
                // Si aucun prix individuel n'est disponible, utiliser le prix total
                else {
                    // Prix total de la réservation
                    totalPrice = serviceType === 'private'
                        ? (booking.outbound.price?.privatePrice || 0)
                        : (booking.outbound.price?.sharedPrice || 0);
                    
                    // Diviser par 2 (fallback si aucun prix individuel n'est disponible)
                    outboundPrice = totalPrice / 2;
                    inboundPrice = totalPrice / 2;
                }
                
                // Calculer ou récupérer le prix total
                totalPrice = outboundPrice + inboundPrice;
                
                return (
                    <div>
                        <div className="space-y-1 text-sm text-gray-600 mb-2">
                            <p>Prix aller : {formatPriceToEUR(outboundPrice)}</p>
                            <p>Prix retour : {formatPriceToEUR(inboundPrice)}</p>
                        </div>
                        <p className="text-2xl font-bold text-spero">
                            {formatPriceToEUR(totalPrice)}
                        </p>
                        <p className="text-sm text-gray-600">
                            {serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                        </p>
                    </div>
                );
            } 
            // Cas d'un trajet simple
            else {
                const serviceType = booking.serviceType || 'shared';
                const totalPrice = serviceType === 'private' 
                    ? Number(booking.price.privatePrice || 0) 
                    : Number(booking.price.sharedPrice || 0);

                return (
                    <div>
                        <p className="text-2xl font-bold text-spero">
                            {formatPriceToEUR(totalPrice)}
                        </p>
                        <p className="text-sm text-gray-600">
                            {serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                        </p>
                    </div>
                );
            }
        } catch (error) {
            console.error('❌ Erreur lors du rendu du prix:', error);
            console.error('Détails de l\'erreur:', error.stack);
            console.log('Structure de l\'objet booking:', booking);
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
                
            case 'card':
                return (
                    <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-spero mt-0.5" />
                        <div>
                            <p className="font-medium">Par carte au chauffeur le jour de la navette</p>
                        </div>
                    </div>
                );

            case 'transfer':
                return (
                    <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-spero mt-0.5" />
                        <div>
                            <p className="font-medium">Par virement bancaire</p>
                            <p className="mt-2 text-sm text-gray-600">
                                {isTransferDeadlinePassed([
                                    booking.journey?.outbound?.date,
                                    booking.journey?.inbound?.date,
                                    booking.outbound?.journey?.outbound?.date,
                                    booking.inbound?.journey?.inbound?.date
                                ]) ? TRANSFER_TEXT_URGENT : TRANSFER_TEXT_STANDARD}.
                            </p>
                            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-900">
                                <p className="font-medium">Ne faites pas encore de virement.</p>
                                <p>Nous vérifions d'abord la disponibilité de votre navette. Restez attentif : les coordonnées bancaires vous seront communiquées rapidement par email.</p>
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

    // Envoi des données de source de référence à Google Analytics
    useEffect(() => {
        if (booking && window.gtag) {
            const recommendedBy = booking.isRoundTrip 
                ? booking.outbound.recommendedBy 
                : booking.recommendedBy;
                
            const agencyName = booking.isRoundTrip 
                ? booking.outbound.agencyName 
                : booking.agencyName;
                
            if (recommendedBy) {
                const sources = {
                    'google': 'Google',
                    'facebook': 'Facebook',
                    'agency': `Agence de voyage${agencyName ? ': ' + agencyName : ''}`,
                    'recommendation': 'Recommandation d\'un proche',
                    'advertisement': 'Publicité',
                    'other': 'Autre'
                };
                
                window.gtag('event', 'referral_source', {
                    'source': sources[recommendedBy] || recommendedBy,
                    'agency': agencyName || 'Non spécifié'
                });
            }
        }
    }, [booking]);

    // Définir le titre et la balise meta pour la page
    useEffect(() => {
        document.title = "Confirmation de réservation | Spero Navette";
    }, []);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                if (!location.state) {
                    // Pas de réservation (accès direct, robot...) : pas de conversion, retour à l'accueil
                    navigate('/', { replace: true });
                    return;
                }
    
                const { 
                    isRoundTrip, 
                    outboundBooking, 
                    inboundBooking, 
                    singleBooking, 
                    outboundPrice, 
                    inboundPrice,
                    email 
                } = location.state;
    
                if (isRoundTrip && outboundBooking && inboundBooking) {
                    const bookingData = {
                        outbound: outboundBooking,
                        inbound: inboundBooking,
                        outboundPrice, // Stocker les prix individuels directement
                        inboundPrice,
                        isRoundTrip: true
                    };
                    
                    // Débogage des prix individuels
                    console.log('Prix aller:', outboundPrice);
                    console.log('Prix retour:', inboundPrice);
                    
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
    
    // ✅ TRACKING DE CONVERSION PRINCIPAL - Google Analytics 4 + Google Ads
    useEffect(() => {
        if (booking && window.gtag) {
            // Déterminer le type de réservation
            const bookingType = booking.isRoundTrip ? 'round_trip' : 'one_way';
            
            // Déterminer le type de service
            const serviceType = booking.isRoundTrip 
                ? booking.outbound.serviceType || 'shared'
                : booking.serviceType || 'shared';
                
            // Déterminer les aéroports concernés
            const airports = booking.isRoundTrip
                ? [booking.outbound.journey?.outbound?.airport, booking.inbound.journey?.inbound?.airport].filter(Boolean)
                : booking.journey?.outbound 
                    ? [booking.journey.outbound.airport]
                    : booking.journey?.inbound 
                        ? [booking.journey.inbound.airport]
                        : [];
                    
            // ✅ CALCULER LE VRAI PRIX TOTAL (au lieu de la valeur fixe de 12€)
            let totalPrice = 0;
            
            if (booking.isRoundTrip) {
                if (booking.outboundPrice && booking.inboundPrice) {
                    const outPrice = serviceType === 'private'
                        ? booking.outboundPrice.privatePrice
                        : booking.outboundPrice.sharedPrice;
                        
                    const inPrice = serviceType === 'private'
                        ? booking.inboundPrice.privatePrice
                        : booking.inboundPrice.sharedPrice;
                        
                    totalPrice = outPrice + inPrice;
                } else {
                    totalPrice = serviceType === 'private'
                        ? (booking.outbound.price?.privatePrice || 0)
                        : (booking.outbound.price?.sharedPrice || 0);
                }
            } else {
                totalPrice = serviceType === 'private'
                    ? Number(booking.price?.privatePrice || 0)
                    : Number(booking.price?.sharedPrice || 0);
            }
            
            // ID de la réservation en base : Google déduplique si la page est rechargée
            const transactionId = (booking.isRoundTrip ? booking.outbound?.bookingReference : booking.bookingReference)
                || Date.now().toString();

            // ✅ Événement GA4 "purchase" 
            window.gtag('event', 'purchase', {
                transaction_id: transactionId,
                value: totalPrice,
                currency: 'EUR',
                items: [{
                    item_name: `Navette ${serviceType === 'private' ? 'privée' : 'partagée'}`,
                    item_category: bookingType,
                    price: totalPrice,
                    quantity: 1
                }],
                booking_type: bookingType,
                service_type: serviceType,
                airports: airports.join(','),
                passengers: booking.isRoundTrip 
                    ? booking.outbound.passengers 
                    : booking.passengers
            });
            
            // ✅ Événement Google Ads "conversion"
            window.gtag('event', 'conversion', {
                'send_to': 'AW-704820281/KeZGCNiw36waELnoitAC',
                'value': totalPrice,
                'currency': 'EUR',
                'transaction_id': transactionId
            });
            
            // ✅ Événement GA4 "reservation_confirmee" (lié à Google Ads via l'import GA4)
            window.gtag('event', 'reservation_confirmee', {
                'transaction_id': transactionId,
                'value': totalPrice,
                'currency': 'EUR',
                'service_type': serviceType === 'private' ? 'Navette Privée' : 'Navette Partagée',
                'booking_type': bookingType,
                'airports': airports.join(','),
                'passengers': booking.isRoundTrip ? booking.outbound.passengers : booking.passengers
            });
            
            console.log('✅ Conversion tracked:', { 
                transactionId, 
                value: totalPrice, 
                serviceType, 
                bookingType 
            });
        }
    }, [booking]);
    
    // Construction dynamique des méta-données pour la page de confirmation
    const getMetaDescription = () => {
        if (!booking) return "Votre réservation de navette aéroport a été confirmée. Consultez les détails de votre transfert.";
        
        const client = getClientInfo();
        const destination = booking.isRoundTrip 
            ? getAirportName(booking.outbound.journey?.outbound?.airport)
            : booking.journey?.outbound 
                ? getAirportName(booking.journey.outbound.airport)
                : booking.journey?.inbound 
                    ? getAirportName(booking.journey.inbound.airport)
                    : "l'aéroport";
                    
        return `Réservation de navette confirmée pour ${client?.firstName || ''} ${client?.lastName || ''} vers ${destination}. Détails et informations concernant votre transport.`;
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-spero" />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <SEO
                    title="Erreur de confirmation"
                    description="Un problème est survenu lors de la confirmation de votre réservation de navette aéroport."
                />
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
            </>
        );
    }

    const email = location.state?.email;
    const client = getClientInfo();
    const destination = booking && (booking.isRoundTrip
        ? getAirportName(booking.outbound.journey?.outbound?.airport)
        : booking.journey?.outbound
            ? getAirportName(booking.journey.outbound.airport)
            : booking.journey?.inbound
                ? getAirportName(booking.journey.inbound.airport)
                : null);

    return (
        <>
            <SEO
                title="Demande de réservation envoyée"
                description={getMetaDescription()}
                keywords="confirmation navette, réservation aéroport, transport Bruxelles, navette Charleroi, détails transfert"
            />

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Votre demande de réservation a bien été envoyée</h2>
                        <p className="text-lg text-gray-600">
                            Nous vérifions la disponibilité et vous confirmons votre navette par email
                            dans un délai de <span className="font-semibold text-spero">24 h, généralement bien plus vite</span>.
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Un récapitulatif de votre demande vient de vous être envoyé par email.
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
                                            {client?.address?.locality && (
                                                <li>Localité: {client.address.locality}</li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Résumé du trajet */}
                                    <div className="md:col-span-2 bg-white shadow-sm rounded-lg border border-spero/20 p-4">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar className="h-5 w-5 text-spero" />
                                            <h4 className="font-medium text-lg text-spero">Résumé du trajet</h4>
                                        </div>
                                        
                                        {booking.isRoundTrip ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <h5 className="font-semibold text-spero">Aller:</h5>
                                                    <p className="text-gray-700">
                                                        {formatDate(booking.outbound.journey?.outbound?.date)} à {booking.outbound.journey?.outbound?.time}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        Vers {getAirportName(booking.outbound.journey?.outbound?.airport)}
                                                    </p>
                                                    {booking.outbound.journey?.outbound?.flightNumber && (
                                                        <p className="text-gray-700">
                                                            Numéro de vol: {booking.outbound.journey.outbound.flightNumber}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-spero">Retour:</h5>
                                                    <p className="text-gray-700">
                                                        {formatDate(booking.inbound.journey?.inbound?.date)} à {booking.inbound.journey?.inbound?.time}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        De {getAirportName(booking.inbound.journey?.inbound?.airport)}
                                                    </p>
                                                    {booking.inbound.journey?.inbound?.flightNumber && (
                                                        <p className="text-gray-700">
                                                            Numéro de vol: {booking.inbound.journey.inbound.flightNumber}
                                                        </p>
                                                    )}
                                                    {booking.inbound.journey?.inbound?.flightOrigin && (
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
                                                ) : booking.journey?.inbound ? (
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
                                                ) : (
                                                    <p className="text-gray-700">
                                                        Information de trajet non disponible
                                                    </p>
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
                                                ? (booking.outbound.options?.luggageCount || 0)
                                                : (booking.options?.luggageCount || 0)}</li>
                                            <li>Bagages à main: {booking.isRoundTrip
                                                ? (booking.outbound.options?.handLuggageCount || 0)
                                                : (booking.options?.handLuggageCount || 0)}</li>
                                            <li>Sièges enfant: {booking.isRoundTrip
                                                ? (booking.outbound.options?.childSeatsCount || 0)
                                                : (booking.options?.childSeatsCount || 0)}</li>
                                            <li>Réhausseurs: {booking.isRoundTrip
                                                ? (booking.outbound.options?.boosterSeatsCount || 0)
                                                : (booking.options?.boosterSeatsCount || 0)}</li>
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
                            
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-spero flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Prochaines étapes</h3>
                                        <ol className="space-y-2 text-gray-600 list-decimal pl-5">
                                            <li>Nous vérifions la disponibilité de votre navette.</li>
                                            <li>
                                                Vous recevez la confirmation à <span className="font-medium">{email || client?.email}</span> dans
                                                un délai de 24 h, généralement bien plus vite.
                                            </li>
                                            <li>Le jour J, votre chauffeur vient vous chercher à l'adresse indiquée.</li>
                                        </ol>
                                        <p className="mt-3 text-sm text-gray-500">
                                            Pas d'email ? Pensez à vérifier vos courriers indésirables (spams).
                                        </p>
                                        <div className="mt-4 text-sm text-gray-600">
                                            <p>Une question ? Contactez-nous :</p>
                                            <p className="font-medium">
                                                Tél : <a href="tel:+32490197914" className="text-spero underline">0490 19 79 14</a>
                                                <span className="font-normal text-gray-500"> (lun–ven 10h–19h, sam 10h–16h)</span>
                                            </p>
                                            <p className="font-medium">
                                                Email : <a href="mailto:info@spero-navette.be" className="text-spero underline">info@spero-navette.be</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 text-sm text-gray-600">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Annulation et modification</h3>
                                <ul className="space-y-1 list-disc pl-5">
                                    <li>Annulation gratuite jusqu'à 12 h avant la prise en charge.</li>
                                    <li>Moins de 12 h avant : 50 % du prix de la course, avec un minimum de 50 €.</li>
                                    <li>Absence le jour J (no-show) : le prix complet de la navette est dû.</li>
                                    <li>Modifications moins de 24 h avant le départ : selon disponibilités, non garanties.</li>
                                </ul>
                                <a href="/conditions-generales" className="inline-block mt-2 text-spero underline">Voir les conditions générales</a>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                // Suivi de l'événement de retour à l'accueil
                                if (window.gtag) {
                                    window.gtag('event', 'return_home', {
                                        'from_page': 'confirmation'
                                    });
                                }
                                navigate('/');
                            }}
                            className="px-6 py-3 bg-spero text-white rounded-md hover:bg-opacity-90 transition-colors"
                        >
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Confirmation;
