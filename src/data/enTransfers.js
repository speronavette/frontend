// Transferts privés pour visiteurs étrangers (pages anglaises /en).
// Prix par véhicule, identiques dans les deux sens. Doivent rester identiques à
// backend/src/config/transferPrices.js (c'est le serveur qui fixe le montant payé).

export const EN_DESTINATIONS = [
  {
    key: 'brussels',
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
