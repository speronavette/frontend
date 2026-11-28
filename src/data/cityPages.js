// Pages « Navette aéroport depuis … » pour les communes d'où viennent la plupart des clients.
// Les prix sont lus dans la grille (prices.js) : ils se mettent à jour tout seuls.

export const CITY_PAGES = [
  {
    slug: 'charleroi',
    name: 'Charleroi',
    postalCodes: ['6000', '6001', '6010', '6020', '6030', '6031', '6032', '6040', '6041', '6042', '6043', '6044', '6060', '6061'],
    localities: ['Charleroi centre', 'Marcinelle', 'Couillet', 'Dampremy', 'Marchienne-au-Pont', 'Monceau-sur-Sambre', 'Mont-sur-Marchienne', 'Jumet', 'Gosselies', 'Lodelinsart', 'Ransart', 'Roux', 'Gilly', 'Montignies-sur-Sambre'],
    intro: "Spero Navette est installée à Mont-sur-Marchienne : le Grand Charleroi, c'est chez nous. Nous venons vous chercher à votre porte, dans toutes les sections de Charleroi, pour vous conduire à l'aéroport de Charleroi, de Bruxelles-Zaventem ou de Paris."
  },
  {
    slug: 'nalinnes',
    name: 'Nalinnes',
    fullName: 'Ham-sur-Heure-Nalinnes',
    postalCodes: ['6120'],
    localities: ['Nalinnes', 'Ham-sur-Heure', 'Jamioulx', 'Marbaix-la-Tour', 'Cour-sur-Heure'],
    intro: "Depuis Nalinnes et toute l'entité de Ham-sur-Heure-Nalinnes, nous vous conduisons à l'aéroport sans que vous ayez à prendre votre voiture ni à payer de parking."
  },
  {
    slug: 'gerpinnes',
    name: 'Gerpinnes',
    postalCodes: ['6280'],
    localities: ['Gerpinnes', 'Acoz', 'Gougnies', 'Joncret', 'Loverval', 'Villers-Poterie', 'Hymiée', 'Fromiée'],
    intro: "Depuis Gerpinnes, Loverval, Acoz et les villages de l'entité, nous venons vous chercher à domicile et vous déposons devant votre terminal."
  },
  {
    slug: 'couvin',
    name: 'Couvin',
    postalCodes: ['5660'],
    localities: ['Couvin', 'Mariembourg', 'Nismes', 'Pesche', 'Frasnes', 'Petigny', 'Cul-des-Sarts', 'Brûly', 'Dailly', 'Boussu-en-Fagne'],
    intro: "Depuis Couvin et toute la Botte du Hainaut, la route vers l'aéroport est longue : laissez-nous conduire. Prise en charge à domicile, même pour les vols très tôt le matin."
  },
  {
    slug: 'chimay',
    name: 'Chimay',
    postalCodes: ['6460', '6461', '6462', '6463', '6464'],
    localities: ['Chimay', 'Virelles', 'Vaulx-lez-Chimay', 'Lompret', 'Baileux', 'Bourlers', 'Salles', 'Forges'],
    intro: "Depuis Chimay et ses villages, nous assurons vos trajets vers les aéroports de Charleroi, Bruxelles et Paris, à prix fixe et à toute heure."
  }
];

// Aéroports affichés sur les pages de commune
export const CITY_AIRPORTS = [
  { code: 'CRL', name: 'Aéroport de Charleroi', link: '/navette-aeroport-charleroi' },
  { code: 'BRU', name: 'Aéroport de Bruxelles-Zaventem', link: '/navette-aeroport-bruxelles-zaventem' },
  { code: 'CDG', name: 'Paris Charles-de-Gaulle', link: '/navette-aeroport-paris-cdg' },
  { code: 'ORY', name: 'Paris Orly' },
  { code: 'LGG', name: 'Aéroport de Liège' }
];
