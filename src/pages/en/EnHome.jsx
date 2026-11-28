import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import EnBookingForm from '../../components/en/EnBookingForm';
import { EN_LIVE } from '../../data/enTransfers';
import { EN_DESTINATIONS, EN_PHONE, EN_PHONE_HREF } from '../../data/enTransfers';
import { WhyUs, PriceTable, Cancellation, Faq, faqJsonLd } from './EnShared';

const EnHome = () => (
  <>
    <SEO
      title="Charleroi Airport Private Transfers"
      description="Private transfer from Charleroi Airport (CRL) to Brussels, Bruges, Ghent, Antwerp and Namur. Fixed price per vehicle, driver waiting for you, no night surcharge, 5% off return trips."
      keywords="Charleroi airport transfer, Charleroi airport to Brussels, Charleroi airport to Bruges, Charleroi airport taxi, private transfer Belgium"
      canonicalUrl="https://spero-navette.be/en"
      isEnglish
    >
      <html lang="en" />
      {!EN_LIVE && <meta name="robots" content="noindex, nofollow" />}
      <script type="application/ld+json">{JSON.stringify(faqJsonLd())}</script>
    </SEO>

    <div className="max-w-6xl mx-auto py-8 space-y-12">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your private driver from Charleroi Airport
        </h1>
        <p className="text-lg text-gray-700">
          Fixed price per vehicle to Brussels, Bruges, Ghent, Antwerp and Namur. Your driver waits for you with your name,
          even if your flight is late.
        </p>
        <a href="#book" className="inline-block mt-6 px-8 py-3 rounded-md bg-spero text-white font-semibold">Book your transfer</a>
      </header>

      <WhyUs />

      <section className="max-w-3xl mx-auto text-gray-700 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">A private transfer from Charleroi Airport (CRL)</h2>
        <p>
          Brussels South Charleroi Airport is about 70 km from Brussels and between 40 and 150 km from the main cities of Belgium.
          Public transport usually means a bus to Charleroi-Central station and one or two trains, with your luggage.
        </p>
        <p>
          Spero Navette is a local airport shuttle company based near Charleroi. Your driver meets you at the airport and takes you
          directly to your hotel, apartment or office — and back to the airport for your flight home.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Prices</h2>
        <PriceTable />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EN_DESTINATIONS.map((d) => (
          <Link key={d.key} to={`/en/charleroi-airport-to-${d.slug}`} className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-spero">
            <h3 className="font-semibold text-lg text-gray-900">Charleroi Airport → {d.name}</h3>
            <p className="text-sm text-gray-700 mt-1">{d.travelTime} · from €{d.small} per vehicle</p>
          </Link>
        ))}
      </section>

      <section id="book" className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 md:p-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-6">Book your transfer</h2>
        <EnBookingForm />
      </section>

      <Cancellation />
      <Faq />

      <p className="text-center text-gray-700">
        Questions? Call us on <a className="text-spero underline" href={EN_PHONE_HREF}>{EN_PHONE}</a>.
      </p>
    </div>
  </>
);

export default EnHome;
