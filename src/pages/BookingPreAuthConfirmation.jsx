// 
// FICHIER : pages/BookingPreAuthConfirmation.jsx
// À CRÉER dans votre dossier pages/
// 

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, CreditCard, Mail, Phone, ArrowLeft, Info } from 'lucide-react';

function BookingPreAuthConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingRef = searchParams.get('ref');
  const amount = searchParams.get('amount');
  const email = searchParams.get('email');
  const paymentIntentId = searchParams.get('payment_intent');

  const [currentStep, setCurrentStep] = useState(1);

  // Animation des étapes
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(2);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Header avec navigation */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-spero hover:text-opacity-80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* En-tête avec succès */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-white">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
              <h1 className="text-3xl font-bold mb-2">
                Booking Secured!
              </h1>
              <p className="text-green-100 text-lg">
                Your shuttle reservation has been pre-authorized
              </p>
            </div>
          </div>

          <div className="px-8 py-6">
            
            {/* Détails de la réservation */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-600 font-medium">Reference Number</p>
                  <p className="text-blue-900 font-bold text-lg">{bookingRef}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Amount Pre-authorized</p>
                  <p className="text-blue-900 font-bold text-lg">{amount}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending Confirmation
                  </span>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Email</p>
                  <p className="text-blue-900">{email}</p>
                </div>
              </div>
              {paymentIntentId && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-blue-600 font-medium text-xs">Payment ID</p>
                  <p className="font-mono text-xs text-blue-800 break-all">{paymentIntentId}</p>
                </div>
              )}
            </div>

            {/* Processus étape par étape */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h3>
              
              <div className="space-y-6">
                {/* Étape 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep >= 1 ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">1</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium transition-colors ${
                      currentStep >= 1 ? 'text-green-700' : 'text-gray-900'
                    }`}>
                      Payment Pre-authorized ✅
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      We've secured {amount} on your card but haven't charged you yet. 
                      Your money is safe and will only be charged if we confirm your shuttle.
                    </p>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep >= 2 ? 'bg-yellow-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium transition-colors ${
                      currentStep >= 2 ? 'text-yellow-700' : 'text-gray-900'
                    }`}>
                      Checking Availability
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Our team is checking shuttle availability for your requested time and route. 
                      We'll confirm within 24 hours.
                    </p>
                    {currentStep >= 2 && (
                      <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                        <p className="text-yellow-800 text-xs">
                          ⏱️ <strong>Expected response:</strong> Within 24 hours (usually much faster)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Final Confirmation</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      You'll receive confirmation by email or phone. Your card will only be charged 
                      if we confirm your shuttle is available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information importante */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-800 mb-2">Important Information</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• <strong>No charge yet:</strong> Your card is only pre-authorized, not charged</li>
                <li>• <strong>Automatic release:</strong> If not confirmed, the pre-authorization expires after 7 days</li>
                <li>• <strong>Email confirmation:</strong> Check your inbox at <strong>{email}</strong></li>
                <li>• <strong>Phone contact:</strong> We may call you to confirm details</li>
                <li>• <strong>Cancellation:</strong> Free cancellation if we can't provide the service</li>
              </ul>
            </div>

            {/* Prochaines étapes */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 className="font-medium text-gray-900 mb-3">While you wait...</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p>✉️ <strong>Check your email</strong></p>
                  <p>We've sent a confirmation to {email}</p>
                </div>
                <div>
                  <p>📱 <strong>Keep your phone nearby</strong></p>
                  <p>We may call to confirm details</p>
                </div>
                <div>
                  <p>🧳 <strong>Prepare for your trip</strong></p>
                  <p>Have your booking reference ready: <strong>{bookingRef}</strong></p>
                </div>
                <div>
                  <p>❓ <strong>Questions?</strong></p>
                  <p>Don't hesitate to contact us</p>
                </div>
              </div>
            </div>

            {/* Contact et support */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Need help or have questions?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+32490197914"
                  className="flex items-center justify-center px-6 py-3 bg-spero text-white rounded-md hover:bg-opacity-90 transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call +32 490 19 79 14
                </a>
                <a
                  href={`mailto:spero.navette@gmail.com?subject=Booking Inquiry - ${bookingRef}&body=Hello,%0A%0AI have a question about my booking:%0A%0AReference: ${bookingRef}%0AAmount: ${amount}%0A%0AQuestion:%0A%0A`}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-md"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </a>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Available 7 days a week • Response within 24 hours</p>
              </div>
            </div>

            {/* Référence pour le support */}
            <div className="mt-8 p-4 bg-gray-100 border-l-4 border-gray-400 rounded-r">
              <p className="text-sm text-gray-700">
                <strong>For all communications, please reference:</strong> <span className="font-bold text-gray-900">{bookingRef}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-spero bg-white border-spero hover:bg-spero hover:text-white transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingPreAuthConfirmation;