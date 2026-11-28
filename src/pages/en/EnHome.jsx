import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import EnBookingForm from '../../components/en/EnBookingForm';
import { EN_DESTINATIONS, EN_PHONE, EN_PHONE_HREF } from '../../data/enTransfers';
import { WhyUs, PriceTable, Cancellation, Faq, faqJsonLd } from './EnShared';

const EnHome = () => (
  <>
    <SEO
      title="Charleroi Airport Private Transfers to Brussels, Bruges, Ghent, Antwerp, Namur"
      description="Private transfer from Charleroi Airport (CRL) to Brussels, Bruges, Ghent, Antwerp and Namur. Fixed price per vehicle, driver waiting with your name, no night surcharge. Book and pay online."
      keywords="Charleroi airport transfer, Charleroi airport to Brussels, Charleroi airport to Bruges, Charleroi airport taxi, private transfer Belgium"
      canonicalUrl="https://spero-navette.be/en"
      isEnglish
    >
      <html lang="en" />
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
