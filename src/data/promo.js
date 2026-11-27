// ---------------------------------------------------------------------------
// PROMO : prix promo (-6,6 %) sur toute navette dont la date est au plus tard le 31/03/2027
// (106 € → 99 € pour Zaventem). Le pourcentage n'est pas affiché sur le site.
// (prix arrondi à l'euro inférieur). Pour arrêter ou modifier la promo,
// changer uniquement PROMO ci-dessous.
// ---------------------------------------------------------------------------
export const PROMO = {
  rate: 0.066,
  endDate: '2027-03-31', // date de la navette (incluse)
  label: "Prix promo pour toute navette jusqu'au 31/03/2027 (réservations à partir du 26/11/2026)"
};

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// La promo est-elle encore en cours aujourd'hui ?
export const isPromoActive = () => todayKey() <= PROMO.endDate;

// La promo s'applique-t-elle à une navette à cette date ?
// Sans date (pas encore choisie), on applique la promo tant qu'elle est en cours.
export const isPromoDate = (date) => {
  if (!isPromoActive()) return false;
  if (!date) return true;
  return String(date).slice(0, 10) <= PROMO.endDate;
};

// Prix après remise, arrondi à l'euro inférieur
export const applyPromo = (price) => {
  if (!price) return 0;
  const discountedCents = Math.round(price * (1 - PROMO.rate) * 100);
  return Math.floor(discountedCents / 100);
};

// Petite mention promo discrète à côté d'un prix "à partir de" (vide si la promo est terminée)
export const promoNote = (price) =>
  isPromoActive() ? ` (${applyPromo(price)} € en prix promo pour toute navette jusqu'au 31/03/2027, réservée à partir du 26/11/2026)` : '';
