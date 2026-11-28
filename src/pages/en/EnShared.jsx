import React from 'react';
import { Link } from 'react-router-dom';
import { EN_DESTINATIONS, EN_PHONE, EN_PHONE_HREF, EN_EMAIL, EN_WHATSAPP_HREF } from '../../data/enTransfers';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../../data/business';

export const WhyUs = () => (
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[
      ['Fixed price per vehicle', 'One price for 1–4 passengers, another for 5–8. Not per person, no surge pricing, no night surcharge.'],
      ['We wait for you', 'Your driver follows your flight and adapts to the actual landing time. If your flight is delayed, there may be a short wait once you exit.'],
      ['Easy meeting point', 'Your driver waits for you at Bingen, opposite the lifts, just after the turnstiles, with a sign showing your name, and helps with your luggage.'],
      [`${GOOGLE_RATING.replace(',', '.')}/5 on Google`, `Rated by ${GOOGLE_REVIEW_COUNT} customers for punctuality and friendly drivers.`]
    ].map(([t, d]) => (
      <div key={t} className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-1">{t}</h3>
        <p className="text-sm text-gray-700">{d}</p>
      </div>
    ))}
  </section>
);

export const PriceTable = ({ only }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left bg-white rounded-lg border border-gray-200">
      <caption className="sr-only">Private transfer prices from Charleroi Airport, per vehicle</caption>
      <thead className="bg-gray-50 text-sm text-gray-700">
        <tr>
          <th scope="col" className="p-3">Charleroi Airport ↔</th>
          <th scope="col" className="p-3">1–4 passengers</th>
          <th scope="col" className="p-3">5–8 passengers</th>
          <th scope="col" className="p-3">Travel time</th>
        </tr>
      </thead>
      <tbody>
        {EN_DESTINATIONS.filter((d) => !only || d.key === only).map((d) => (
          <tr key={d.key} className="border-t border-gray-100">
            <th scope="row" className="p-3 font-semibold">
              <Link to={`/en/charleroi-airport-to-${d.slug}`} className="text-spero hover:underline">{d.name}</Link>
            </th>
            <td className="p-3 font-bold">€{d.small}</td>
            <td className="p-3 font-bold">€{d.large}</td>
            <td className="p-3 text-gray-700">{d.travelTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="text-xs text-gray-600 mt-2">Same price in both directions. Book your return trip together and save 5%. Another destination? Ask for a quote by <a className="underline" href={`mailto:${EN_EMAIL}`}>e-mail</a> or <a className="underline" href={EN_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
  </div>
);

export const Cancellation = () => (
  <section className="bg-white rounded-lg border border-gray-200 p-6">
    <h2 className="text-xl font-semibold mb-3">Cancellation policy</h2>
    <ul className="list-disc pl-6 space-y-1 text-gray-700">
      <li>More than 48 hours before pick-up: full refund</li>
      <li>Between 48 and 24 hours before pick-up: 50% refund</li>
      <li>Less than 24 hours before pick-up or no-show: no refund</li>
    </ul>
    <p className="mt-3 text-gray-700">
      <strong>Return trips</strong> are booked as one package at a discounted price. If either transfer is cancelled less than
      24 hours before its pick-up time, or is a no-show, the whole return trip is non-refundable.
    </p>
  </section>
);

export const enFaq = [
  ['Is the price per person or per vehicle?', 'Per vehicle. One price for 1 to 4 passengers, another for 5 to 8 passengers, luggage included.'],
  ['What happens if my flight is delayed?', 'Your driver follows your flight and adapts to the actual landing time, with no maximum waiting time and no extra charge. If your flight is delayed, there may be a short wait for your driver once you exit.'],
  ['Where will I meet my driver?', 'At Charleroi Airport, at Bingen, opposite the lifts, just after the turnstiles. Your driver holds a sign with your name and contacts you by phone or text.'],
  ['Is there a night surcharge?', 'No. The price is the same day and night.'],
  ['Is there a discount for a return trip?', 'Yes. Book your arrival and departure transfers together and save 5% on the total.'],
  ['Can you take me to another destination?', `Yes, anywhere in Belgium and to neighbouring countries on request. Send us your details by e-mail (${EN_EMAIL}) or WhatsApp (${EN_PHONE}) for a fixed-price quote.`],
  ['How do I pay?', 'Online by card when you book (Visa, Mastercard and other cards accepted by our payment provider Stripe). You receive a confirmation e-mail straight away.'],
  ['Do you provide child seats?', 'Yes, free of charge. Just select them when you book.']
];

export const Faq = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
    <div className="space-y-3">
      {enFaq.map(([q, a]) => (
        <details key={q} className="bg-white rounded-lg border border-gray-200 p-4">
          <summary className="font-medium cursor-pointer">{q}</summary>
          <p className="mt-2 text-gray-700">{a}</p>
        </details>
      ))}
    </div>
  </section>
);

export const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: enFaq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
});
