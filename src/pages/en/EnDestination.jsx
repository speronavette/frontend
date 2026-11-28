import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import EnBookingForm from '../../components/en/EnBookingForm';
import { EN_LIVE } from '../../data/enTransfers';
import { EN_DESTINATIONS, EN_PHONE, EN_PHONE_HREF } from '../../data/enTransfers';
import { WhyUs, PriceTable, Cancellation, Faq, faqJsonLd } from './EnShared';

const EnDestination = () => {
  const { route } = useParams();
  const slug = (route || '').replace(/^charleroi-airport-to-/, '');
  const d = route?.startsWith('charleroi-airport-to-') ? EN_DESTINATIONS.find((x) => x.slug === slug) : null;
  if (!d) return <Navigate to="/en" replace />;
  const url = `https://spero-navette.be/en/charleroi-airport-to-${d.slug}`;

  return (
    <>
      <SEO
        title={`Charleroi Airport to ${d.name} Private Transfer from €${d.small}`}
        description={`Private transfer from Charleroi Airport (CRL) to ${d.name}: €${d.small} for 1–4 passengers, €${d.large} for 5–8, per vehicle. Driver waiting with your name, ${d.travelTime}. Book and pay online.`}
        keywords={`Charleroi airport to ${d.name}, Charleroi airport ${d.name} transfer, taxi Charleroi airport ${d.name}, CRL ${d.name}`}
        canonicalUrl={url}
        isEnglish
      >
        <html lang="en" />
      {!EN_LIVE && <meta name="robots" content="noindex, nofollow" />}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd())}</script>
      </SEO>

      <div className="max-w-6xl mx-auto py-8 space-y-10">
        <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
          <Link to="/en" className="underline">Charleroi Airport transfers</Link> › {d.name}
        </nav>

        <header className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Charleroi Airport to {d.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{d.intro}</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {d.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
          <div className="bg-white rounded-lg border-2 border-spero/30 p-6">
            <p className="text-sm text-gray-700">Private transfer, price per vehicle</p>
            <div className="grid grid-cols-2 gap-4 my-3">
              <div><p className="text-sm text-gray-700">1–4 passengers</p><p className="text-3xl font-bold">€{d.small}</p></div>
              <div><p className="text-sm text-gray-700">5–8 passengers</p><p className="text-3xl font-bold">€{d.large}</p></div>
            </div>
            <p className="text-sm text-gray-700">Travel time {d.travelTime} · luggage included · no night surcharge · same price both ways</p>
            <a href="#book" className="inline-block mt-4 px-6 py-3 rounded-md bg-spero text-white font-semibold">Book now</a>
          </div>
        </header>

        <WhyUs />

        <section id="book" className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 md:p-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-6">Book your transfer to {d.name}</h2>
          <EnBookingForm key={d.key} defaultDestination={d.key} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Other destinations</h2>
          <PriceTable />
        </section>

        <Cancellation />
        <Faq />

        <p className="text-center text-gray-700">
          Questions? Call us on <a className="text-spero underline" href={EN_PHONE_HREF}>{EN_PHONE}</a>.
        </p>
      </div>
    </>
  );
};

export default EnDestination;
