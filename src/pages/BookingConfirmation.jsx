import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Phone, Mail, ArrowLeft } from '../components/Icons';

function BookingConfirmation() {
  const location = useLocation();
  const { singleBooking, outboundBooking, inboundBooking, email, isRoundTrip } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Réservation Confirmée - Spero Navette';
  }, []);

  // Extraire les informations selon le type de réservation
  const booking = singleBooking || outboundBooking;
  const bookingRef = booking?._id;
  const clientEmail = email || booking?.client?.email;
  
  // Calculer le montant total
  let totalAmount = 0;
  let serviceType = booking?.serviceType || 'shared';
  
  if (isRoundTrip && outboundBooking && inboundBooking) {
    // Pour un aller-retour, additionner les deux prix
    totalAmount = serviceType === 'shared' 
      ? outboundBooking.price.sharedPrice + inboundBooking.price.sharedPrice
      : outboundBooking.price.privatePrice + inboundBooking.price.privatePrice;
  } else if (singleBooking) {
    // Pour un trajet simple
    totalAmount = serviceType === 'shared' 
      ? singleBooking.price.sharedPrice 
      : singleBooking.price.privatePrice;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Demande de réservation reçue !
          </h1>
          <p className="text-lg text-gray-600">
            Merci d'avoir choisi Spero Navette
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Détails de votre réservation
          </h2>
          
          <div className="space-y-3">
            {bookingRef && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Référence de réservation :</span>
                <span className="font-bold text-spero text-lg">{bookingRef.substring(0, 8).toUpperCase()}</span>
              </div>
            )}
            
            {/* Badge Promo */}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Promotion appliquée :</span>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                🎉 Promo Hiver (valable du 18/11/2025 au 31/12/2025)
              </span>
            </div>
            
            {totalAmount > 0 && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Montant total :</span>
                <span className="font-semibold text-green-600 text-xl">{totalAmount.toFixed(0)} €</span>
              </div>
            )}
            
            {clientEmail && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Email de confirmation :</span>
                <span className="font-medium text-gray-800">{clientEmail}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Statut :</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                En attente de confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Journey Details */}
        {booking && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Détails du trajet
            </h2>
            
            <div className="space-y-4">
              {/* Client Info */}
              <div className="pb-4 border-b">
                <p className="text-sm text-gray-600">Passager</p>
                <p className="font-medium">{booking.client?.firstName} {booking.client?.lastName}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {booking.passengers} {booking.passengers > 1 ? 'personnes' : 'personne'}
                </p>
              </div>

              {/* Outbound Journey */}
              {booking.journey?.outbound && (
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-2">Trajet aller</p>
                  <p className="font-medium">
                    {booking.client?.address?.city} → Aéroport
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Date : {new Date(booking.journey.outbound.date).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Heure de vol : {booking.journey.outbound.time}
                  </p>
                </div>
              )}

              {/* Inbound Journey */}
              {booking.journey?.inbound && (
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-2">Trajet retour</p>
                  <p className="font-medium">
                    Aéroport → {booking.client?.address?.city}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Date : {new Date(booking.journey.inbound.date).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Heure d'atterrissage : {booking.journey.inbound.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    Vol : {booking.journey.inbound.flightNumber}
                  </p>
                </div>
              )}

              {/* Service Type */}
              <div>
                <p className="text-sm text-gray-600">Type de service</p>
                <p className="font-medium">
                  {serviceType === 'shared' ? 'Navette partagée' : 'Navette privée'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What Happens Next */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Que se passe-t-il maintenant ?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                1
              </div>
              <p className="text-blue-800">
                <strong>Demande enregistrée :</strong> Votre demande de réservation a été enregistrée avec succès.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                2
              </div>
              <p className="text-blue-800">
                <strong>Vérification :</strong> Notre équipe va vérifier votre demande et la disponibilité.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                3
              </div>
              <p className="text-blue-800">
                <strong>Confirmation :</strong> Nous vous contacterons sous 24h pour confirmer votre trajet.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                4
              </div>
              <p className="text-blue-800">
                <strong>Email de confirmation :</strong> Vous recevrez tous les détails par email une fois confirmé.
              </p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">
            Informations importantes
          </h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Le paiement sera effectué selon la méthode choisie lors de la réservation
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Si nous ne pouvons pas accommoder votre demande, aucun frais ne vous sera facturé
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Conservez votre référence de réservation pour toute correspondance future
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Vous recevrez un email de confirmation une fois votre trajet confirmé
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Besoin de nous contacter ?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-spero mr-3" />
              <span className="text-gray-600 mr-2">Téléphone :</span>
              <a href="tel:+32490197914" className="text-spero font-medium hover:underline">
                +32 490 19 79 14
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-spero mr-3" />
              <span className="text-gray-600 mr-2">Email :</span>
              <a href="mailto:info@spero-navette.be" className="text-spero font-medium hover:underline">
                info@spero-navette.be
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Horaires d'ouverture :</strong><br />
              Lundi au vendredi : 10:00 - 19:00<br />
              Samedi : 10:00 - 16:00<br />
              Dimanche : Fermé
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
          
          <Link 
            to="/calculateur"
            className="flex items-center justify-center px-6 py-3 bg-spero text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Nouvelle réservation
          </Link>
        </div>

        {/* Additional Services */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Besoin d'une navette vers d'autres destinations ?
          </p>
          <Link 
            to="/"
            className="text-spero font-medium hover:underline"
          >
            Découvrez nos autres services de navette
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;