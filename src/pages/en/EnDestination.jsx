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
  const perPerson4 = (d.small / 4).toFixed(2).replace(/\.00$/, '');
  const perPerson8 = (d.large / 8).toFixed(2).replace(/\.00$/, '');
  const others = EN_DESTINATIONS.filter((x) => x.key !== d.key);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `Private transfer Charleroi Airport – ${d.name}`,
    url,
    provider: { '@type': 'LocalBusiness', name: 'Spero Navette', telephone: '+32490197914', url: 'https://spero-navette.be' },
    areaServed: [{ '@type': 'City', name: d.name }, { '@type': 'Airport', name: 'Brussels South Charleroi Airport', iataCode: 'CRL' }],
    offers: [
      { '@type': 'Offer', name: '1–4 passengers', price: d.small, priceCurrency: 'EUR' },
      { '@type': 'Offer', name: '5–8 passengers', price: d.large, priceCurrency: 'EUR' }
    ]
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Charleroi Airport transfers', item: 'https://spero-navette.be/en' },
      { '@type': 'ListItem', position: 2, name: d.name, item: url }
    ]
  };

  return (
    <>
      <SEO
        title={`Charleroi Airport to ${d.name} Transfer from €${d.small}`}
        description={`Private transfer from Charleroi Airport (CRL) to ${d.name}: €${d.small} for 1–4 passengers, €${d.large} for 5–8, per vehicle. Your driver waits for you. Book online.`}
        keywords={`Charleroi airport to ${d.name}, Charleroi airport ${d.name} transfer, taxi Charleroi airport ${d.name}, CRL ${d.name}`}
        canonicalUrl={url}
        isEnglish
      >
        <html lang="en" />
      {!EN_LIVE && <meta name="robots" content="noindex, nofollow" />}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd())}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
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

        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-3">How to get from Charleroi Airport to {d.name}</h2>
            <p className="text-gray-700 mb-3">
              {d.name} is about {d.distanceKm} km from Charleroi Airport (CRL), roughly {d.travelTime} by road. {d.publicTransport}
            </p>
            <p className="text-gray-700">
              With a private transfer, your driver takes you straight from the airport to your door in {d.name}, with your luggage,
              at any time of day or night.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Price per vehicle, not per person</h2>
            <p className="text-gray-700 mb-3">
              The price covers the whole vehicle: €{d.small} for 1 to 4 passengers, €{d.large} for 5 to 8 passengers.
              For a group of 4, that is about €{perPerson4} per person; for a group of 8, about €{perPerson8} per person — luggage included.
            </p>
            <p className="text-gray-700">
              No night surcharge, no surge pricing, and the same price in both directions. Book your return trip together and save 5%.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Popular drop-off areas in {d.name}</h2>
          <ul className="grid gap-2 sm:grid-cols-2 list-disc pl-6 text-gray-700">
            {d.areas.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <p className="text-gray-700 mt-3">{d.tip}</p>
        </section>

        <section id="book" className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 md:p-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-6">Book your transfer to {d.name}</h2>
          <EnBookingForm key={d.key} defaultDestination={d.key} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Other destinations from Charleroi Airport</h2>
          <p className="text-gray-700 mb-4">
            We also drive to {others.map((o, i) => (
              <React.Fragment key={o.key}>
                {i > 0 && (i === others.length - 1 ? ' and ' : ', ')}
                <Link to={`/en/charleroi-airport-to-${o.slug}`} className="text-spero underline">{o.name}</Link>
              </React.Fragment>
            ))}.
          </p>
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
