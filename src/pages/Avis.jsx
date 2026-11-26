import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, ExternalLink, Filter, ChevronDown } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/googleReviews';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_MAPS_URL } from '../data/business';

const GOOGLE_REVIEW_URL = "https://g.page/r/CQTXwFtumGyuEBM/review";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/Spero.Navette?locale=fr_FR";
const INITIAL_COUNT = 15;
const LOAD_MORE_COUNT = 9;

const StarRating = ({ rating, size = "w-5 h-5" }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${size} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2" className="inline-block">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const googleAvis = GOOGLE_REVIEWS;

const facebookAvis = [
  { id: 101, author: "Jennifer Cargnelutti", date: "il y a un an", rating: 5, comment: "Que ce soit pour l'aller ou le retour nous avons été super ravis. Ils sont super sympa ! Navette impeccable et propre. Je vous les conseille les yeux fermés. Le prix est vraiment correct. Mille merci pour votre sympathie. À l'année prochaine." },
  { id: 102, author: "MC DA", date: "il y a 3 ans", rating: 5, comment: "Excellent service. Répond directement et agréablement à toutes vos questions. J'ai reçu une confirmation par mail et par SMS. Le chauffeur m'a prévenue 10 min avant son arrivée. Très ponctuel, sympathique. Je conseille vivement." },
  { id: 103, author: "Catherine Pire", date: "il y a 2 ans", rating: 5, comment: "Très bonne expérience avec cette société, le chauffeur très sympathique et aux petits soins. Il nous a mis à l'aise tout en restant discret. Société très honnête qui communique facilement et tient ses engagements." },
  { id: 104, author: "Stephane May", date: "il y a 3 ans", rating: 5, comment: "Super équipe, rien à dire. Pour le départ comme décrit le chauffeur est à l'heure et au retour c'est lui-même qui nous contacte. De plus très courtois. Encore merci. À bientôt assurément." },
  { id: 105, author: "Françoise Riéga", date: "il y a 3 ans", rating: 5, comment: "Pour les navettes aéroports je vous conseille Spero Navette. Manu et Jean-François sont des personnes ponctuelles et très sympathiques. J'ai déjà réservé pour notre prochain voyage, merci à vous et bonne continuation !" },
  { id: 106, author: "Pascal Dardenne", date: "il y a 3 ans", rating: 5, comment: "Service impeccable, ponctualité, convivialité, un grand merci pour votre gentillesse. Prix très correct. Voyage et chauffeur super agréable, véhicule très confortable." },
];

const AvisCard = ({ avis, source }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="mb-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center text-sm text-gray-600">
          <div className="bg-spero/10 rounded-full p-1 mr-2">
            <User className="h-4 w-4 text-spero" />
          </div>
          <span className="font-semibold text-gray-800">{avis.author}</span>
        </div>
        {source === 'google' ? (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
            <GoogleIcon /> Google
          </span>
        ) : (
          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
            <FacebookIcon /> Facebook
          </span>
        )}
      </div>
      <div className="flex items-center text-sm text-gray-500 ml-7">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{avis.date}</span>
      </div>
    </div>

    <div className="mb-3">
      <StarRating rating={avis.rating} />
    </div>

    <p className="text-gray-700 leading-relaxed text-sm">{avis.comment}</p>
  </div>
);

const Avis = () => {
  const [tab, setTab] = useState('google');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [sortBy, setSortBy] = useState('recent');

  const currentList = tab === 'google' ? googleAvis : facebookAvis;

  const sortedList = [...currentList].sort((a, b) =>
    sortBy === 'oldest' ? a.id - b.id : b.id - a.id
  );

  const visibleAvis = sortedList.slice(0, visibleCount);
  const hasMore = visibleCount < currentList.length;
  const remaining = currentList.length - visibleCount;

  const handleTabChange = (t) => {
    setTab(t);
    setVisibleCount(INITIAL_COUNT);
  };


  return (
    <>
      <title>Avis Clients Spero Navette | Témoignages Navette Aéroport</title>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="mb-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-spero mb-3">
                Avis de nos clients
              </h1>
              <p className="text-lg text-gray-600">
                Ce que disent les voyageurs qui nous confient leurs trajets vers l'aéroport
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 md:p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="text-center md:text-left flex-shrink-0">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-gray-600 mb-2">
                  <GoogleIcon /> Note Google
                </div>
                <div className="flex items-end justify-center md:justify-start gap-2">
                  <span className="text-6xl font-bold text-gray-900 leading-none">{GOOGLE_RATING}</span>
                  <span className="text-xl text-gray-500 mb-1">/5</span>
                </div>
                <div className="mt-2 flex justify-center md:justify-start">
                  <StarRating rating={5} size="w-6 h-6" />
                </div>
                <p className="text-gray-700 mt-2">
                  <strong>{GOOGLE_REVIEW_COUNT} avis</strong> sur Google
                </p>
              </div>

              <div className="hidden md:block w-px self-stretch bg-gray-200" aria-hidden="true" />

              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-700 mb-5">
                  Ponctualité, gentillesse des chauffeurs, aide pour les bagages et message de rappel la veille : ce sont les points que nos clients citent le plus souvent.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-spero text-spero px-5 py-2.5 rounded-md font-semibold hover:bg-spero hover:text-white transition-colors"
                  >
                    Voir tous les avis sur Google
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-spero text-white px-5 py-2.5 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Laisser un avis
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets Google / Facebook */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleTabChange('google')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                tab === 'google'
                  ? 'bg-spero text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:border-spero hover:text-spero'
              }`}
            >
              <GoogleIcon />
              Google
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'google' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {googleAvis.length}
              </span>
            </button>
            <button
              onClick={() => handleTabChange('facebook')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                tab === 'facebook'
                  ? 'bg-spero text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:border-spero hover:text-spero'
              }`}
            >
              <FacebookIcon />
              Facebook
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'facebook' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {facebookAvis.length}
              </span>
            </button>
          </div>

          {/* Barre filtre */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  {tab === 'google' ? `${currentList.length} avis affichés sur les ${GOOGLE_REVIEW_COUNT} de notre fiche Google` : `${currentList.length} avis`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Filter className="h-4 w-4 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="recent">Plus récents</option>
                  <option value="oldest">Plus anciens</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grille d'avis */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleAvis.map((avis) => (
              <AvisCard key={avis.id} avis={avis} source={tab} />
            ))}
          </div>

          {/* Bouton Voir plus */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(v => v + LOAD_MORE_COUNT)}
                className="inline-flex items-center gap-2 border-2 border-spero text-spero px-8 py-3 rounded-md font-semibold hover:bg-spero hover:text-white transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
                Voir plus d'avis ({remaining} restants)
              </button>
            </div>
          )}

          {/* CTA laisser un avis */}
          <div className="mt-12 bg-spero/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-spero mb-4">
              Vous avez utilisé nos services ?
            </h2>
            <p className="text-gray-700 mb-6">
              Partagez votre expérience et aidez d'autres voyageurs à choisir notre service de navette aéroport.
            </p>
            <div className="flex justify-center">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-medium"
              >
                <GoogleIcon />
                Laisser un avis Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Avis;