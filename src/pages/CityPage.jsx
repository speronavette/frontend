import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { CITY_PAGES, CITY_AIRPORTS } from '../data/cityPages';
import { pricesDB } from '../data/prices';
import { isPromoActive, applyPromo, PROMO } from '../data/promo';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../data/business';

// Prix « à partir de » depuis la commune (navette partagée, 1-2 personnes)
const fromPrice = (codes, airport) => {
  const values = codes.map((c) => pricesDB[`${c}-${airport}`]).filter(Boolean);
  return values.length ? Math.min(...values) : null;
};

const CityPage = ({ slug }) => {
  const city = CITY_PAGES.find((c) => c.slug === slug);
  if (!city) return <Navigate to="/" replace />;

  const promo = isPromoActive();
  const rows = CITY_AIRPORTS
    .map((a) => ({ ...a, price: fromPrice(city.postalCodes, a.code) }))
    .filter((a) => a.price);
  const crl = rows.find((r) => r.code === 'CRL');
  const bru = rows.find((r) => r.code === 'BRU');
  const shown = (p) => (promo ? applyPromo(p) : p);
  const url = `https://spero-navette.be/navette-aeroport-depuis-${city.slug}`;
  const others = CITY_PAGES.filter((c) => c.slug !== city.slug);

  const faq = [
    [`Combien coûte une navette de ${city.name} à l'aéroport de Charleroi ?`,
      `À partir de ${crl.price} € en navette partagée pour 1 à 2 personnes${promo ? ` (${applyPromo(crl.price)} € en prix promo pour toute navette jusqu'au 31/03/2027, réservée à partir du 26/11/2026)` : ''}. Le prix exact dépend de votre adresse, du nombre de passagers et des options.`],
    [`Combien coûte une navette de ${city.name} à l'aéroport de Bruxelles-Zaventem ?`,
      `À partir de ${bru.price} € en navette partagée pour 1 à 2 personnes${promo ? ` (${applyPromo(bru.price)} € en prix promo)` : ''}.`],
    ['Venez-vous me chercher à domicile ?',
      `Oui, à votre adresse à ${city.fullName || city.name} et dans les villages de l'entité : ${city.localities.join(', ')}.`],
    ['Comment payer ?',
      'En navette partagée, en espèces ou par carte au chauffeur. En navette privée, par virement bancaire. Facturation possible pour les entreprises.']
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      name: `Navette aéroport depuis ${city.name}`,
      url,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Spero Navette',
        telephone: '+32490197914',
        url: 'https://spero-navette.be',
        address: { '@type': 'PostalAddress', streetAddress: 'Rue du Centenaire 87', postalCode: '6032', addressLocality: 'Mont-sur-Marchienne', addressCountry: 'BE' }
      },
      areaServed: city.localities.map((l) => ({ '@type': 'Place', name: l })),
      offers: rows.map((r) => ({ '@type': 'Offer', name: `${city.name} – ${r.name}`, price: r.price, priceCurrency: 'EUR' }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    }
  ];

  return (
    <>
      <SEO
        title={`Navette aéroport depuis ${city.name} dès ${shown(crl.price)} €`}
        description={`Navette aéroport à domicile depuis ${city.name} vers Charleroi (dès ${shown(crl.price)} €), Bruxelles-Zaventem (dès ${shown(bru.price)} €) et Paris. 24h/24, ${GOOGLE_RATING}/5 sur Google.`}
        keywords={`navette aéroport ${city.name}, taxi aéroport ${city.name}, navette ${city.name} Charleroi aéroport, navette ${city.name} Zaventem, transfert aéroport ${city.name}`}
        canonicalUrl={url}
      >
        {jsonLd.map((j, i) => <script key={i} type="application/ld+json">{JSON.stringify(j)}</script>)}
      </SEO>

      <div className="max-w-5xl mx-auto py-8 px-4 space-y-10">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-spero mb-4">Navette aéroport depuis {city.name}</h1>
          <p className="text-lg text-gray-700">{city.intro}</p>
          <p className="mt-3 text-gray-700">
            <strong>{GOOGLE_RATING}/5</strong> sur <Link to="/avis" className="text-spero underline">{GOOGLE_REVIEW_COUNT} avis Google</Link> · prise en charge à domicile · navettes 24h/24, 7j/7
          </p>
          <a href="/#calculator" className="inline-block mt-5 px-6 py-3 rounded-md bg-spero text-white font-semibold">
            Calculer mon prix et réserver
          </a>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Prix d'une navette aéroport depuis {city.name}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white rounded-lg border border-gray-200">
              <caption className="sr-only">Prix à partir de, navette partagée pour 1 à 2 personnes</caption>
              <thead className="bg-gray-50 text-sm text-gray-700">
                <tr>
                  <th scope="col" className="p-3">Depuis {city.name} vers</th>
                  <th scope="col" className="p-3">Navette partagée, 1-2 pers.</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.code} className="border-t border-gray-100">
                    <th scope="row" className="p-3 font-medium">
                      {r.link ? <Link to={r.link} className="text-spero hover:underline">{r.name}</Link> : r.name}
                    </th>
                    <td className="p-3">
                      {promo ? (
                        <>
                          <strong>à partir de {applyPromo(r.price)} €</strong>{' '}
                          <span className="text-sm text-gray-500 line-through">{r.price} €</span>
                        </>
                      ) : (
                        <strong>à partir de {r.price} €</strong>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Prix par véhicule, selon votre adresse exacte. Supplément à partir de la 3e personne et pour la navette privée.
            {promo && ` ${PROMO.label}.`}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Nous venons vous chercher à</h2>
            <ul className="grid grid-cols-2 gap-1 list-disc pl-6 text-gray-700">
              {city.localities.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Comment ça se passe ?</h2>
            <ol className="list-decimal pl-6 space-y-1 text-gray-700">
              <li>Vous réservez en ligne en indiquant votre adresse et votre vol.</li>
              <li>Nous vous confirmons votre réservation et l'heure de prise en charge.</li>
              <li>Le chauffeur vient vous chercher à votre porte et charge vos bagages.</li>
              <li>Au retour, il vous attend à l'aéroport, même si votre vol a du retard.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Questions fréquentes</h2>
          <div className="space-y-3">
            {faq.map(([q, a]) => (
              <details key={q} className="bg-white rounded-lg border border-gray-200 p-4">
                <summary className="font-medium cursor-pointer">{q}</summary>
                <p className="mt-2 text-gray-700">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Nous desservons aussi</h2>
          <p className="text-gray-700">
            {others.map((o, i) => (
              <React.Fragment key={o.slug}>
                {i > 0 && ' · '}
                <Link to={`/navette-aeroport-depuis-${o.slug}`} className="text-spero underline">Navette aéroport depuis {o.name}</Link>
              </React.Fragment>
            ))}
          </p>
        </section>
      </div>
    </>
  );
};

export default CityPage;
