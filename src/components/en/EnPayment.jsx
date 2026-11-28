import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

function PayForm({ amount, bookingReference, onPaid, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setError('');
    const { error: err, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/en/booking-confirmed?ref=${encodeURIComponent(bookingReference)}` },
      redirect: 'if_required'
    });
    if (err) {
      setError(err.message || 'Payment failed. Please try another card.');
      setBusy(false);
      return;
    }
    if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
      onPaid(paymentIntent.status);
    } else {
      setError('Payment was not completed. Please try again.');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
        <button type="button" onClick={onBack} disabled={busy} className="px-5 py-3 rounded-md border-2 border-spero text-spero font-semibold">
          Back
        </button>
        <button type="submit" disabled={!stripe || busy} className="px-6 py-3 rounded-md bg-spero text-white font-semibold disabled:opacity-60">
          {busy ? 'Processing…' : `Pay €${amount}`}
        </button>
      </div>
    </form>
  );
}

export default function EnPayment({ clientSecret, amount, bookingReference, onPaid, onBack }) {
  if (!stripePromise) {
    return <p className="text-red-700">Online payment is not available yet. Please call us to book.</p>;
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, locale: 'en', appearance: { theme: 'stripe', variables: { colorPrimary: '#B4513F' } } }}>
      <PayForm amount={amount} bookingReference={bookingReference} onPaid={onPaid} onBack={onBack} />
    </Elements>
  );
}
