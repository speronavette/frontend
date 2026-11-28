import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import { EN_PHONE, EN_PHONE_HREF } from '../../data/enTransfers';

// Page de retour Stripe quand le paiement passe par une redirection (3-D Secure, Bancontact…)
const EnBookingConfirmed = () => {
  const [params] = useSearchParams();
  const status = params.get('redirect_status');
  const ref = params.get('ref');
  const ok = status === 'succeeded' || status === 'processing';
  const processing = status === 'processing';

  return (
    <>
      <SEO title="Booking confirmation" description="Your Spero Navette transfer booking." isEnglish>
        <html lang="en" />
        <meta name="robots" content="noindex" />
      </SEO>
      <div className="max-w-2xl mx-auto py-12">
        {ok ? (
          <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50 text-green-900" role="status">
            <h1 className="text-2xl font-bold mb-2">{processing ? 'Thank you — your payment is being processed' : 'Thank you — your transfer is booked'}</h1>
            <p>{processing ? 'Your bank is confirming the payment' : 'Your payment has been received'}{ref ? <> for booking <strong>{ref}</strong></> : null}. {processing ? 'You will receive a confirmation e-mail as soon as it is confirmed.' : 'A confirmation e-mail is on its way.'}</p>
          </div>
        ) : (
          <div className="p-6 rounded-lg border-2 border-red-200 bg-red-50 text-red-900" role="alert">
            <h1 className="text-2xl font-bold mb-2">Payment not completed</h1>
            <p>Your card was not charged. Please <Link to="/en#book" className="underline">try again</Link> or call us.</p>
          </div>
        )}
        <p className="mt-6 text-gray-700">Questions? Call <a className="underline" href={EN_PHONE_HREF}>{EN_PHONE}</a>.</p>
      </div>
    </>
  );
};

export default EnBookingConfirmed;
