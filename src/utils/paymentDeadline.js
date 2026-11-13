// Calcul du délai de virement : 5 jours ouvrables avant la première prise en charge
// Jours ouvrables = lundi à vendredi, hors jours fériés belges.

const BUSINESS_DAYS_BEFORE = 5;

const pad = (n) => String(n).padStart(2, '0');
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Date de Pâques (algorithme de Meeus/Jones/Butcher)
const easterSunday = (year) => {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

const addDays = (date, n) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + n);
  return d;
};

const belgianHolidays = (year) => {
  const easter = easterSunday(year);
  return new Set([
    `${year}-01-01`, `${year}-05-01`, `${year}-07-21`, `${year}-08-15`,
    `${year}-11-01`, `${year}-11-11`, `${year}-12-25`,
    toKey(addDays(easter, 1)),  // Lundi de Pâques
    toKey(addDays(easter, 39)), // Ascension
    toKey(addDays(easter, 50))  // Lundi de Pentecôte
  ]);
};

const isBusinessDay = (date) => {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  return !belgianHolidays(date.getFullYear()).has(toKey(date));
};

// Accepte "YYYY-MM-DD", une date ISO ou un objet Date -> date locale à minuit
const parseDay = (value) => {
  if (!value) return null;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  const dt = new Date(value);
  if (isNaN(dt.getTime())) return null;
  const [y, m, d] = dt.toISOString().slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
};

// Date limite = 5 jours ouvrables avant la prise en charge
const getTransferDeadline = (pickupDate) => {
  let d = parseDay(pickupDate);
  if (!d) return null;
  let count = 0;
  while (count < BUSINESS_DAYS_BEFORE) {
    d = addDays(d, -1);
    if (isBusinessDay(d)) count++;
  }
  return d;
};

// true si au moins une des courses a lieu dans moins de 5 jours ouvrables
const isTransferDeadlinePassed = (pickupDates, now = new Date()) => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return (pickupDates || [])
    .map(getTransferDeadline)
    .filter(Boolean)
    .some((deadline) => today > deadline);
};

const TRANSFER_TEXT_STANDARD = 'Par virement bancaire au plus tard 5 jours ouvrables avant la prise en charge pour valider le transfert';
const TRANSFER_TEXT_URGENT = 'Virement à réaliser dès réception de la confirmation pour valider le transfert';
const TRANSFER_TEXT_STANDARD_EN = 'Bank transfer at least 5 working days before pick-up to validate the transfer';
const TRANSFER_TEXT_URGENT_EN = 'Bank transfer to be made as soon as you receive the confirmation to validate the transfer';

export { getTransferDeadline, isTransferDeadlinePassed, TRANSFER_TEXT_STANDARD, TRANSFER_TEXT_URGENT };
