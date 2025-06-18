import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Phone, Mail, ArrowLeft } from 'lucide-react';

function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingRef = searchParams.get('ref');
  const amount = searchParams.get('amount');
  const email = searchParams.get('email');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Booking Confirmed - Spero Navette';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Request Received!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing Spero Navette
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Booking Details
          </h2>
          
          <div className="space-y-3">
            {bookingRef && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Booking Reference:</span>
                <span className="font-bold text-spero text-lg">{bookingRef}</span>
              </div>
            )}
            
            {amount && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600">{amount}</span>
              </div>
            )}
            
            {email && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Confirmation Email:</span>
                <span className="font-medium text-gray-800">{email}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Status:</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Pending Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            What happens next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                1
              </div>
              <p className="text-blue-800">
                <strong>Payment Secured:</strong> Your card has been pre-authorized. No charge will be made until your transfer is confirmed.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                2
              </div>
              <p className="text-blue-800">
                <strong>Review Process:</strong> Our team will review your booking request and check availability.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                3
              </div>
              <p className="text-blue-800">
                <strong>Confirmation Call:</strong> We will contact you within 24 hours to confirm your transfer details.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                4
              </div>
              <p className="text-blue-800">
                <strong>Final Confirmation:</strong> Once confirmed, you'll receive all transfer details and your payment will be processed.
              </p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Your card will only be charged after we confirm your transfer
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              If we cannot accommodate your request, no payment will be taken
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              Please keep your booking reference for future correspondence
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              You will receive an email confirmation once your transfer is confirmed
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Need to contact us?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-spero mr-3" />
              <span className="text-gray-600 mr-2">Phone:</span>
              <a href="tel:+32490197914" className="text-spero font-medium hover:underline">
                +32 490 19 79 14
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-spero mr-3" />
              <span className="text-gray-600 mr-2">Email:</span>
              <a href="mailto:spero.navette@gmail.com" className="text-spero font-medium hover:underline">
                spero.navette@gmail.com
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Office Hours:</strong><br />
              Monday to Friday: 10:00 - 19:00<br />
              Saturday: 10:00 - 16:00<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/en/charleroi-airport-shuttle"
            className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shuttle Service
          </Link>
          
          <Link 
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-spero text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Additional Services */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Need a shuttle to other destinations?
          </p>
          <Link 
            to="/"
            className="text-spero font-medium hover:underline"
          >
            Explore our other shuttle services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;