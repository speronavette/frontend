// ==========================================
// FICHIER : components/StripePreAuthWrapper.jsx
// Version complète corrigée pour Spero Navette
// ==========================================

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ==========================================
// STYLES POUR LE CARD ELEMENT
// ==========================================
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4',
      },
      iconColor: '#666EE8',
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true, // ✅ CHANGEMENT : Masquer le code postal
};

// ==========================================
// COMPOSANT PRINCIPAL DE PAIEMENT
// ==========================================
function StripePreAuthForm({ amount, bookingData, onPaymentSuccess, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [cardComplete, setCardComplete] = useState(false);

  // Générer référence booking
  const generateBookingRef = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `CRL${timestamp}${random}`;
  };

  const bookingRef = generateBookingRef();

  // ==========================================
  // CRÉER LE PAYMENT INTENT DE PRÉ-AUTORISATION
  // ==========================================
  useEffect(() => {
    if (!amount || !bookingData) return;

    const createPaymentIntent = async () => {
      try {
        console.log('🚀 Création PaymentIntent pour:', {
          amount,
          bookingRef,
          customer: `${bookingData.firstName} ${bookingData.lastName}`
        });

        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/stripe/create-payment-intent-preauth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseInt(amount.replace('€', '')),
            currency: 'eur',
            bookingData,
            bookingReference: bookingRef
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to create payment intent');
        }

        const data = await response.json();
        
        if (data.success) {
          setClientSecret(data.client_secret);
          setPaymentIntentId(data.payment_intent_id);
          console.log('✅ PaymentIntent pré-auth créé:', data.payment_intent_id);
        } else {
          throw new Error(data.error || 'Failed to create payment intent');
        }

      } catch (error) {
        console.error('❌ Erreur création PaymentIntent:', error);
        setPaymentError('Unable to initialize payment. Please try again.');
      }
    };

    createPaymentIntent();
  }, [amount, bookingData]);

  // ==========================================
  // GÉRER LES CHANGEMENTS DU CARD ELEMENT
  // ==========================================
  const handleCardChange = (event) => {
    if (event.error) {
      setPaymentError(event.error.message);
    } else {
      setPaymentError('');
    }
    setCardComplete(event.complete);
  };

  // ==========================================
  // TRAITEMENT DU FORMULAIRE DE PAIEMENT - VERSION CORRIGÉE
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setPaymentError('Payment system not ready. Please wait.');
      return;
    }

    if (!cardComplete) {
      setPaymentError('Please complete your card information.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      console.log('💳 Confirmation avec CardElement...');
      
      // ✅ RÉCUPÉRER L'ÉLÉMENT CARD
      const cardElement = elements.getElement(CardElement);

      // ✅ APPROCHE CORRIGÉE : Utiliser confirmCardPayment avec client_secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
            phone: `${bookingData.countryCode === 'other' ? bookingData.customCountryCode : bookingData.countryCode} ${bookingData.phoneNumber}`
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('✅ Paiement confirmé:', paymentIntent.id);
      console.log('💰 Statut:', paymentIntent.status);

      if (paymentIntent.status === 'requires_capture') {
        // ✅ PRÉ-AUTORISATION RÉUSSIE
        console.log('🎉 Pré-autorisation réussie - argent gelé mais pas débité');
        
        // Appeler le callback de succès avec les infos de pré-auth
        onPaymentSuccess(paymentIntent.payment_method, bookingRef, {
          paymentIntentId: paymentIntent.id,
          status: 'pre_authorized',
          amount: amount,
          requiresCapture: true
        });
      } else if (paymentIntent.status === 'succeeded') {
        // Cas où le paiement a été immédiatement capturé (ne devrait pas arriver)
        console.log('⚠️ Paiement immédiatement capturé au lieu de pré-autorisé');
        onPaymentSuccess(paymentIntent.payment_method, bookingRef, {
          paymentIntentId: paymentIntent.id,
          status: 'captured',
          amount: amount,
          requiresCapture: false
        });
      } else {
        throw new Error(`Unexpected payment status: ${paymentIntent.status}`);
      }

    } catch (error) {
      console.error('❌ Erreur paiement:', error);
      setPaymentError(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // ==========================================
  // RENDU DU COMPOSANT
  // ==========================================
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Informations sur la pré-autorisation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Secure Payment Process
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                We will pre-authorize <strong>{amount}</strong> on your card to secure your booking.
                You will only be charged once we confirm your shuttle availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé de la réservation */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Booking Summary</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Reference:</p>
            <p className="font-medium">{bookingRef}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount:</p>
            <p className="font-medium text-spero">{amount}</p>
          </div>
          <div>
            <p className="text-gray-500">Route:</p>
            <p className="font-medium">{bookingData.route1}</p>
          </div>
          <div>
            <p className="text-gray-500">Passengers:</p>
            <p className="font-medium">{bookingData.passengers}</p>
          </div>
          {bookingData.needsReturn === 'yes' && (
            <div className="col-span-2">
              <p className="text-gray-500">Return route:</p>
              <p className="font-medium">{bookingData.route2}</p>
            </div>
          )}
        </div>
      </div>

      {/* Champ de carte */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
          <CardElement
            options={cardElementOptions}
            onChange={handleCardChange}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          🔒 Your card information is secured by Stripe
        </p>
      </div>

      {/* Message d'erreur */}
      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{paymentError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Boutons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret || !cardComplete}
          className="w-1/2 bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Secure Booking'
          )}
        </button>
      </div>
      
      {/* Notice de sécurité */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>🔒 Your payment is secured by Stripe</p>
        <p>💳 No charges until shuttle confirmation</p>
        <p>⏰ Pre-authorization expires automatically after 7 days</p>
      </div>
    </form>
  );
}

// ==========================================
// WRAPPER AVEC STRIPE ELEMENTS
// ==========================================
function StripePreAuthWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <StripePreAuthForm {...props} />
    </Elements>
  );
}

export default StripePreAuthWrapper;