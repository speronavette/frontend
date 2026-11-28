// Transferts privés pour visiteurs étrangers (pages anglaises /en).
// Prix par véhicule, identiques dans les deux sens. Doivent rester identiques à
// backend/src/config/transferPrices.js (c'est le serveur qui fixe le montant payé).

// Mettre à true quand Stripe est validé et les vraies clés en place :
// affiche le lien EN dans le menu et laisse Google indexer les pages anglaises.
export const EN_LIVE = false;

export const EN_DESTINATIONS = [
  {
    key: 'brussels',
    distanceKm: 70,
    areas: [
      'Grand-Place and the historic centre',
      'European Quarter (EU institutions)',
      'Brussels-Midi / Brussels-South station',
      'Louise, Ixelles and Saint-Gilles',
      'Brussels Expo and Heysel'
    ],
    publicTransport: 'An airport shuttle bus runs to Brussels-Midi station, or you can take a local bus to Charleroi-Central station and then a train. Either way, you still need to get from the station to your hotel.',
    tip: 'On weekdays, traffic around the Brussels ring road (R0) can be heavy at rush hour. Your driver plans the route accordingly — the price stays the same.',
    slug: 'brussels',
    name: 'Brussels',
    small: 115,
    large: 150,
    travelTime: '50–60 min',
    intro: 'Door-to-door from Charleroi Airport to your hotel, apartment or office anywhere in Brussels — no bus to Brussels-Midi, no metro with your suitcases.',
    highlights: ['Any address in the 19 Brussels municipalities', 'Grand-Place, EU district, Brussels-Midi station', 'Perfect for late-night arrivals when buses stop']
  },
  {
    key: 'bruges',
    distanceKm: 150,
    areas: [
      'Markt and the Belfry',
      'Burg square and the canals',
      'Bruges railway station area',
      'Hotels inside the historic ring (the "egg")',
      'Zeebrugge and the coast on request'
    ],
    publicTransport: 'By public transport you need a bus to Charleroi-Central, a train to Brussels, then a second train to Bruges — usually with luggage on several platforms.',
    tip: 'Parts of Bruges\' historic centre have restricted car access. Your driver drops you as close as possible to your hotel entrance.',
    slug: 'bruges',
    name: 'Bruges',
    small: 210,
    large: 245,
    travelTime: '1h30–1h45',
    intro: 'Go straight from your plane to the medieval centre of Bruges, with no train changes in Brussels and no luggage on cobblestones.',
    highlights: ['Drop-off at your hotel in the historic centre', 'No change of train in Brussels', 'Ideal for families and groups up to 8']
  },
  {
    key: 'ghent',
    distanceKm: 110,
    areas: [
      'Korenmarkt and Graslei',
      'Gravensteen castle area',
      'Gent-Sint-Pieters station',
      'University and Citadelpark area',
      'Ghent Expo (Flanders Expo)'
    ],
    publicTransport: 'By public transport you need a bus to Charleroi-Central and at least one train change, often in Brussels, before reaching Ghent.',
    tip: 'Ghent city centre has a traffic circulation plan with car-free zones. Your driver knows the access routes to hotels in the centre.',
    slug: 'ghent',
    name: 'Ghent',
    small: 150,
    large: 185,
    travelTime: '1h15',
    intro: 'A direct private transfer from Charleroi Airport to Ghent, at a fixed price per vehicle — not per person.',
    highlights: ['Drop-off at your door in Ghent', 'Fixed price, whatever the traffic', 'Ideal for families and groups up to 8']
  },
  {
    key: 'antwerp',
    distanceKm: 100,
    areas: [
      'Antwerpen-Centraal station and the Diamond district',
      'Grote Markt and the Cathedral',
      'Het Eilandje and the MAS museum',
      'Port of Antwerp and business areas',
      'Zuid district'
    ],
    publicTransport: 'By public transport you need a bus to Charleroi-Central and a train journey with a change, usually in Brussels, before reaching Antwerp.',
    tip: 'Allow extra time at rush hour on the Brussels and Antwerp ring roads. Your driver adapts the route — the price is fixed in advance.',
    slug: 'antwerp',
    name: 'Antwerp',
    small: 150,
    large: 185,
    travelTime: '1h15–1h30',
    intro: 'From Charleroi Airport to Antwerp without changing buses or trains: your driver takes you directly to your address.',
    highlights: ['Hotels, Antwerp-Central station, port and business areas', 'Fixed price, whatever the traffic', 'Ideal for families and groups up to 8']
  },
  {
    key: 'namur',
    distanceKm: 40,
    areas: [
      'Namur city centre and the station',
      'The Citadel of Namur',
      'Jambes and the Meuse riverside',
      'Dinant and the Meuse valley on request',
      'Hotels and holiday homes in the Ardennes on request'
    ],
    publicTransport: 'By public transport you need a bus to Charleroi-Central and then a train to Namur — easy for one traveller, less so for a family with suitcases.',
    tip: 'Namur is the gateway to the Meuse valley and the Ardennes. Ask us for a quote if you are staying further away, in Dinant, Durbuy or the Ardennes.',
    slug: 'namur',
    name: 'Namur',
    small: 102,
    large: 122,
    travelTime: '35 min',
    intro: 'The quickest way from Charleroi Airport to Namur and the Meuse valley, with a local driver who knows the region.',
    highlights: ['Namur city centre, Citadel and surroundings', 'Local drivers based near the airport', 'Ideal for families and groups up to 8']
  }
];

export const EN_MIN_HOURS_AHEAD = 24;
export const EN_ROUND_TRIP_DISCOUNT = 0.05;

export const getEnPrice = (key, passengers) => {
  const d = EN_DESTINATIONS.find((x) => x.key === key);
  const n = Number(passengers);
  if (!d || !n) return null;
  return n <= 4 ? d.small : d.large;
};

// Aller-retour : 2 trajets -5 %, arrondi à l'euro inférieur (identique au serveur)
export const getEnTotal = (key, passengers, roundTrip) => {
  const one = getEnPrice(key, passengers);
  if (one === null) return null;
  return roundTrip ? Math.floor(Math.round(one * 2 * (1 - EN_ROUND_TRIP_DISCOUNT) * 100) / 100) : one;
};

export const EN_PHONE = '+32 490 19 79 14';
export const EN_PHONE_HREF = 'tel:+32490197914';
export const EN_EMAIL = 'info@spero-navette.be';
export const EN_WHATSAPP_HREF = 'https://wa.me/32490197914';
