import React, { lazy, Suspense, useMemo, useState } from 'react';
import { EN_DESTINATIONS, EN_MIN_HOURS_AHEAD, EN_PHONE, EN_PHONE_HREF, getEnPrice } from '../../data/enTransfers';

const EnPayment = lazy(() => import('./EnPayment'));

const field = 'w-full p-3 border border-gray-300 rounded-md bg-white';
const label = 'block mb-1 text-sm font-medium text-gray-800';

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function EnBookingForm({ defaultDestination = 'brussels' }) {
  const [form, setForm] = useState({
    direction: 'fromAirport',
    destination: defaultDestination,
    passengers: 2,
    date: '',
    time: '',
    flightNumber: '',
    street: '', number: '', postalCode: '', city: '',
    firstName: '', lastName: '', email: '', phone: '',
    luggageCount: 2, childSeatsCount: 0, boosterSeatsCount: 0,
    notes: '',
    acceptTerms: false
  });
  const [step, setStep] = useState('details'); // details | payment | done
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState(null);

  const price = useMemo(() => getEnPrice(form.destination, form.passengers), [form.destination, form.passengers]);
  const dest = EN_DESTINATIONS.find((d) => d.key === form.destination);
  const fromAirport = form.direction === 'fromAirport';

  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/transfers/payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          direction: form.direction,
          destination: form.destination,
          passengers: Number(form.passengers),
          date: form.date,
          time: form.time,
          flightNumber: form.flightNumber,
          client: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
          address: { street: form.street, number: form.number, postalCode: form.postalCode, city: form.city },
          luggageCount: Number(form.luggageCount),
          childSeatsCount: Number(form.childSeatsCount),
          boosterSeatsCount: Number(form.boosterSeatsCount),
          notes: form.notes,
          acceptTerms: form.acceptTerms
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.clientSecret) throw new Error(data.message || 'Something went wrong. Please try again.');
      setPayment({ clientSecret: data.clientSecret, amount: data.amount, bookingReference: data.bookingReference });
      setStep('payment');
      window.scrollTo({ top: document.getElementById('book')?.offsetTop || 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (step === 'done') {
    return (
      <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50 text-green-900" role="status">
        <h3 className="text-xl font-bold mb-2">{payment.status === 'processing' ? 'Thank you — your payment is being processed' : 'Thank you — your transfer is booked'}</h3>
        <p>{payment.status === 'processing' ? `Your payment of €${payment.amount} is being confirmed by your bank.` : `Your payment of €${payment.amount} has been received.`} Booking reference: <strong>{payment.bookingReference}</strong>.</p>
        <p className="mt-2">A confirmation e-mail is on its way to <strong>{form.email}</strong>. If you don&apos;t see it within a few minutes, check your spam folder or call us on <a className="underline" href={EN_PHONE_HREF}>{EN_PHONE}</a>.</p>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-sm">
          <p className="font-semibold text-base mb-1">
            {fromAirport ? `Charleroi Airport → ${dest.name}` : `${dest.name} → Charleroi Airport`} · €{payment.amount}
          </p>
          <p>{form.date} at {form.time} · {form.passengers} passenger(s) · ref. {payment.bookingReference}</p>
        </div>
        <Suspense fallback={<p>Loading secure payment…</p>}>
          <EnPayment
            clientSecret={payment.clientSecret}
            amount={payment.amount}
            bookingReference={payment.bookingReference}
            onPaid={(status) => { setPayment((p) => ({ ...p, status })); setStep('done'); }}
            onBack={() => setStep('details')}
          />
        </Suspense>
        <p className="text-xs text-gray-600">Payments are processed securely by Stripe. We never see or store your card details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className={label}>Direction</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[['fromAirport', 'From Charleroi Airport'], ['toAirport', 'To Charleroi Airport']].map(([v, l]) => (
            <label key={v} className={`flex items-center gap-2 p-3 border-2 rounded-md cursor-pointer ${form.direction === v ? 'border-spero bg-spero/5' : 'border-gray-200'}`}>
              <input type="radio" name="direction" value={v} checked={form.direction === v} onChange={set} />
              {l}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="destination" className={label}>{fromAirport ? 'Destination' : 'Pick-up city'}</label>
          <select id="destination" name="destination" value={form.destination} onChange={set} className={field}>
            {EN_DESTINATIONS.map((d) => <option key={d.key} value={d.key}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="passengers" className={label}>Passengers</label>
          <select id="passengers" name="passengers" value={form.passengers} onChange={set} className={field}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={label}>{fromAirport ? 'Arrival date' : 'Flight date'}</label>
          <input id="date" type="date" name="date" min={tomorrow()} value={form.date} onChange={set} required className={field} />
        </div>
        <div>
          <label htmlFor="time" className={label}>{fromAirport ? 'Scheduled landing time (local time)' : 'Flight departure time (local time)'}</label>
          <input id="time" type="time" name="time" value={form.time} onChange={set} required className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="flightNumber" className={label}>Flight number</label>
          <input id="flightNumber" name="flightNumber" value={form.flightNumber} onChange={set} required maxLength={10} placeholder="e.g. FR1234" className={field} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>{fromAirport ? `Drop-off address in ${dest.name} area` : `Pick-up address in ${dest.name} area`}</legend>
        <div className="grid grid-cols-6 gap-3">
          <input aria-label="Street" name="street" value={form.street} onChange={set} required placeholder="Street" className={`${field} col-span-4`} />
          <input aria-label="Number" name="number" value={form.number} onChange={set} required placeholder="No." className={`${field} col-span-2`} />
          <input aria-label="Postcode" name="postalCode" value={form.postalCode} onChange={set} required pattern="\d{4}" inputMode="numeric" placeholder="Postcode" className={`${field} col-span-3`} />
          <input aria-label="City" name="city" value={form.city} onChange={set} required placeholder="City" className={`${field} col-span-3`} />
        </div>
        <p className="text-xs text-gray-600 mt-1">Your hotel or accommodation address in Belgium.</p>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label htmlFor="firstName" className={label}>First name</label><input id="firstName" name="firstName" value={form.firstName} onChange={set} required className={field} /></div>
        <div><label htmlFor="lastName" className={label}>Last name</label><input id="lastName" name="lastName" value={form.lastName} onChange={set} required className={field} /></div>
        <div><label htmlFor="email" className={label}>E-mail</label><input id="email" type="email" name="email" value={form.email} onChange={set} required className={field} /></div>
        <div><label htmlFor="phone" className={label}>Mobile phone (with country code)</label><input id="phone" type="tel" name="phone" value={form.phone} onChange={set} required placeholder="+44 …" className={field} /></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="luggageCount" className={label}>Suitcases</label>
          <select id="luggageCount" name="luggageCount" value={form.luggageCount} onChange={set} className={field}>
            {Array.from({ length: 13 }, (_, i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="childSeatsCount" className={label}>Child seats</label>
          <select id="childSeatsCount" name="childSeatsCount" value={form.childSeatsCount} onChange={set} className={field}>
            {[0, 1, 2].map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="boosterSeatsCount" className={label}>Booster seats</label>
          <select id="boosterSeatsCount" name="boosterSeatsCount" value={form.boosterSeatsCount} onChange={set} className={field}>
            {[0, 1, 2].map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={label}>Anything we should know? (optional)</label>
        <textarea id="notes" name="notes" rows="2" maxLength={500} value={form.notes} onChange={set} className={field} />
      </div>

      <div className="p-4 rounded-lg bg-spero/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-sm text-gray-700">Private transfer · price per vehicle · {Number(form.passengers) <= 4 ? '1–4 passengers' : '5–8 passengers'}</p>
          <p className="text-2xl font-bold text-gray-900">€{price}</p>
        </div>
        <p className="text-sm text-gray-700">No night surcharge · luggage included</p>
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="acceptTerms" checked={form.acceptTerms} onChange={set} required className="mt-1 h-4 w-4" />
        <span>
          I accept the cancellation policy: full refund more than 48 hours before pick-up, 50% refund between 48 and 24 hours,
          no refund less than 24 hours before pick-up or in case of no-show.
        </span>
      </label>

      {error && <p className="text-sm text-red-700" role="alert">{error}</p>}

      <button type="submit" disabled={busy} className="w-full sm:w-auto px-8 py-3 rounded-md bg-spero text-white font-semibold text-lg disabled:opacity-60">
        {busy ? 'Please wait…' : `Continue to payment — €${price}`}
      </button>
      <p className="text-xs text-gray-600">Online bookings at least {EN_MIN_HOURS_AHEAD} hours before pick-up. Last-minute transfer? Call <a className="underline" href={EN_PHONE_HREF}>{EN_PHONE}</a>.</p>
    </form>
  );
}
