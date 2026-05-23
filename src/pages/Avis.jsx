import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, ExternalLink, Filter, ChevronDown } from 'lucide-react';

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

const googleAvis = [
  { id: 1, author: "Cornelia Reeling", date: "il y a 15 minutes", rating: 5, comment: "Organisation au top. Paiement Bancontact très facile. Personnel très sympa." },
  { id: 2, author: "Philippe Salmon", date: "il y a 20 minutes", rating: 5, comment: "Ponctualité et sérieux à l'aller comme au retour, service au top. Merci pour vos bons soins." },
  { id: 3, author: "CLIENT", date: "il y a 3 semaines", rating: 5, comment: "Nous sommes allés à Paris ce week-end avec la navette de monsieur SPIRO. Tout était parfait : navette à l'heure, chauffeur charmant et impeccable. Je ferais de nouveau appel à vos services." },
  { id: 4, author: "Manon Collot", date: "il y a un mois", rating: 5, comment: "Très bonne expérience, chauffeur ponctuel et sympathique. Ils valent leurs 5 étoiles." },
  { id: 5, author: "BERNADETTE VANDEVELDE", date: "il y a 2 mois", rating: 5, comment: "Ponctualité et prise en charge comme prévu, conduite des chauffeurs impeccable, qualité du véhicule super. À recommander absolument, encore merci !" },
  { id: 6, author: "Ginette Rolland", date: "il y a 2 mois", rating: 5, comment: "Service parfait : ponctualité, amabilité, professionnalisme. Vraiment bravo !" },
  { id: 7, author: "Raffaele Barbera", date: "il y a 2 mois", rating: 5, comment: "J'utilise systématiquement Spero Navette pour me rendre à l'aéroport de Zaventem. J'apprécie la qualité du service et en particulier sa fiabilité." },
  { id: 8, author: "Annie Debroux", date: "il y a 2 mois", rating: 5, comment: "Très satisfaite des services, toujours bien à l'heure, chauffeurs très agréables." },
  { id: 9, author: "Rudy Lottin", date: "il y a 2 mois", rating: 5, comment: "Super expérience, chauffeurs très agréables et à l'heure aussi bien au départ qu'à l'arrivée." },
  { id: 10, author: "pascal cheruy", date: "il y a 3 mois", rating: 5, comment: "Très content du service, véhicule très confortable, chauffeur ponctuel et sympathique. C'est la troisième fois que j'utilisais leur service et sûrement pas la dernière." },
  { id: 11, author: "laurent buffo", date: "il y a 2 mois", rating: 5, comment: "Service très sérieux, à temps et à l'heure. Véhicules très propres et spacieux, chauffeur très sympa. Sans hésiter je retournerai vers eux dès besoin." },
  { id: 12, author: "Mick3147", date: "il y a 4 mois", rating: 5, comment: "Que dire de plus qu'amabilité, ponctualité, prix raisonnables. N'hésitez pas à réserver votre transport chez Spero Navette — pour avoir utilisé plusieurs fois leurs services, je vous les recommande." },
  { id: 13, author: "Murielle Eeckhout", date: "il y a 4 mois", rating: 5, comment: "Quel bonheur. Service topissime. Ponctuel. Personnel très agréable. Je recommande mille fois." },
  { id: 14, author: "Sarah Djeddane", date: "il y a 6 mois", rating: 5, comment: "Service impeccable, ponctuel et sérieux. Quel plaisir de voyager sans se soucier des trajets aller-retour vers l'aéroport. Je recommande vivement !" },
  { id: 15, author: "Marie Anne Betermier", date: "il y a 6 mois", rating: 5, comment: "Parfait ! Ponctualité, amabilité : tout y est ! Leurs tarifs sont compétitifs et la communication avant le départ est irréprochable." },
  { id: 16, author: "Annie Michaux", date: "il y a 2 mois", rating: 5, comment: "Très satisfaite de Spero Navette, je n'ai rien de négatif à dire. Très professionnels, ils respectent leurs engagements et sont ponctuels. J'ai eu besoin de leurs services plusieurs fois, toujours satisfaite. Bravo !" },
  { id: 17, author: "Corinne Bauthiere", date: "il y a 8 mois", rating: 5, comment: "Chauffeurs très sympathiques et accueillants. Service au top ! Ils trouvent des solutions dès qu'il y a un petit souci. Un véritable confort et une sérénité pour tous les voyages." },
  { id: 18, author: "Rudy Danese", date: "il y a 8 mois", rating: 5, comment: "Chauffeur Adrien exceptionnel, conduite parfaite, véhicule ultra confortable, retour de Bruxelles vers notre domicile en VIP ! Que du bonheur, merci Adrien !" },
  { id: 19, author: "jordan lechien", date: "il y a 9 mois", rating: 5, comment: "Patron au top et très professionnel qui connaît son métier. Employés à son image qui rassurent les clients et font passer le stress du transfert en un moment de joie pour toute la famille." },
  { id: 20, author: "Alan Vixon", date: "il y a 8 mois", rating: 5, comment: "La navette était au rendez-vous tant à l'aller qu'au retour de Zaventem. Chauffeur très sympathique comme à l'accoutumée. Toujours satisfait de Spero Navette d'année en année." },
  { id: 21, author: "Grégory CHARLES", date: "il y a 8 mois", rating: 5, comment: "Ponctualité, confort de roulage et professionnalisme. Chauffeur de haut standing. Politesse, courtoisie. Merci à l'équipe." },
  { id: 22, author: "Anne Staquet", date: "il y a 9 mois", rating: 5, comment: "Facilité de réservation, réponse rapide, chauffeurs super sympa, ponctuels, serviables et conduite fluide. Que du bonheur et no stress durant le trajet. Je recommande !" },
  { id: 23, author: "Pascal Stiernon", date: "il y a 9 mois", rating: 5, comment: "Super chauffeurs très sympa et professionnels. Le patron pense à tout car ils nous déposent à l'abri, ponctuels et message à l'arrivée. Très très content." },
  { id: 24, author: "Josiane K", date: "il y a 10 mois", rating: 5, comment: "Nous ne pouvons qu'être satisfaits de vos services tant sur le plan de la communication, du sérieux et de la ponctualité de la prise en charge à l'aéroport. N'oublions pas la gentillesse et le professionnalisme du chauffeur." },
  { id: 25, author: "fabio faieta", date: "il y a 11 mois", rating: 5, comment: "Super expérience ! Très rassurant pour un premier voyage avec vous. Le chauffeur au retour était d'une sympathie inégalée !" },
  { id: 26, author: "Pascal Geerinckx", date: "il y a 11 mois", rating: 5, comment: "J'ai utilisé ce service de navette pour mes dernières vacances et je suis vraiment ravi. Le chauffeur était ponctuel, très professionnel et sympathique. Le véhicule était propre et confortable, ce qui a rendu le trajet très agréable." },
  { id: 27, author: "Anne Bernimont", date: "il y a 11 mois", rating: 5, comment: "Un personnel sympathique, très ponctuel, avec accompagnement et aide pour les bagages jusqu'à la porte d'entrée de l'aéroport et idem au retour !" },
  { id: 28, author: "Sebastien Formato", date: "il y a 11 mois", rating: 5, comment: "Un service au top. Une erreur d'encodage au retour a été réglée rapidement par échange de messages. Chauffeur sympathique, véhicule confortable." },
  { id: 29, author: "Jacky Soetens", date: "il y a 11 mois", rating: 5, comment: "Cela fait près de 3 ans que nous faisons confiance à Spero Navette. Les réponses rapides et claires font référence à un professionnalisme au top. Que ce soit pour Charleroi ou Zaventem, toujours impeccable." },
  { id: 30, author: "Guy Minten", date: "il y a 6 mois", rating: 5, comment: "Excellent service, chauffeur ponctuel, voiture confortable. À recommander pour un départ et un retour de vacances sans stress." },
  { id: 31, author: "Philippe Tubello", date: "il y a un an", rating: 5, comment: "Super service et à l'heure. Très honnête : Mr Sperolini a accepté de nous prendre en charge 2 jours plus tard sans frais supplémentaires suite à la grève à l'aéroport de Charleroi. Un grand merci !!" },
  { id: 32, author: "Angelo Taverna", date: "il y a 10 mois", rating: 5, comment: "Cela fait deux ans que je fais appel aux services de Spero Navette. Une société à la hauteur de vos attentes, personnel très aimable, ponctuel, voiture toujours clean, aux petits soins." },
  { id: 33, author: "Jean-Michel Dehon", date: "il y a un an", rating: 5, comment: "C'est toujours un plaisir de faire appel à leur service de navette. Ponctuel, sympathique et tarifs tout à fait compétitifs. Un vrai partenaire pour nos futurs déplacements vers l'aéroport." },
  { id: 34, author: "Genevieve Depotte", date: "il y a un an", rating: 5, comment: "Top 👌 services irréprochables ! Envoi d'informations claires et précises par mail et par SMS. Ponctualité, serviabilité, gentillesse… Je recommande vivement !" },
  { id: 35, author: "Alison Troclet", date: "il y a 9 mois", rating: 5, comment: "Service plus qu'au top ! Rien à dire tellement tout était parfait de l'aller jusqu'au retour ! Chauffeurs très sympathiques. Je recommande +++" },
  { id: 36, author: "nat bully", date: "il y a 11 mois", rating: 5, comment: "Comme d'habitude un sans-faute à l'aller comme à mon retour. Ponctualité, efficacité, respect et prudence et jovialité des chauffeurs. Merci à M. Sperolini pour nous fournir une équipe efficace à toute heure." },
  { id: 37, author: "Séverine De Boe", date: "il y a un an", rating: 5, comment: "Bien à l'heure, SMS de rappel de l'heure de prise en charge la veille. Très contents du service. Nous recommandons." },
  { id: 38, author: "Melissa Kinet", date: "il y a un an", rating: 5, comment: "Vous recherchez une navette de confiance ? N'hésitez plus... Nous avons réservé chez Spero Navette et quelle belle organisation ! Je recommande les yeux fermés." },
  { id: 39, author: "Guy Leroy", date: "il y a 11 mois", rating: 5, comment: "Irréprochable, toujours à l'heure, les chauffeurs très aimables et avenants. Je connais MAMU depuis des années... Je vous recommande vivement cette société de navette." },
  { id: 40, author: "Jean Rigotti", date: "il y a 6 mois", rating: 5, comment: "Grande qualité de service : ponctualité, amabilité et serviabilité. À recommander." },
  { id: 41, author: "Etienne Zajega", date: "il y a 2 ans", rating: 5, comment: "Dommage que M. Manu n'a pas encore d'avion dans son parc de véhicules (toujours bien entretenus), sinon on partirait avec lui en vacances !" },
  { id: 42, author: "Jean-Louis Colard", date: "il y a 3 ans", rating: 5, comment: "Je suis enchanté de la navette Spero, ponctualité et sérieux. Manu est particulièrement agréable et sympathique. Attentionné et animé d'un esprit spécifiquement orienté vers le meilleur service au client. À recommander sans modération." },
  { id: 43, author: "Herold Cargnelutti", date: "il y a 3 ans", rating: 5, comment: "MAGNIFIQUE expérience avec Spero Navette. Contactés suite aux recommandations de notre agence de voyage et quelle belle surprise ! Tellement ravis de leur service. Ponctualité, gentillesse... on reviendra !" },
  { id: 44, author: "carole drugmand", date: "il y a 2 ans", rating: 5, comment: "Service navette que nous prenons depuis des années. Ponctuel et toujours avec le sourire 🙂 nous en sommes très contents ! Nous recommandons sans hésiter !" },
  { id: 45, author: "A D", date: "il y a 2 ans", rating: 5, comment: "Un service extra, une disponibilité à toute épreuve, le tout avec des chauffeurs qui aiment leur métier. Que demander de plus ? Je recommande vivement !" },
  { id: 46, author: "Alex", date: "il y a 3 ans", rating: 5, comment: "J'ai pris contact avec SPERO navette en dernière minute afin de trouver un transport pour récupérer des amis à Zaventem à 2h30 du matin. Ils ont répondu présents malgré ma démarche tardive ! Je recommande +++, professionnalisme et sérieux !" },
  { id: 47, author: "Mickhael Capuzzimati", date: "il y a 3 ans", rating: 5, comment: "Notre vol a eu 10h de retard et malgré un planning chargé, en pleine saison, Spero Navette a réussi à trouver une solution pour nous prendre en charge. Service exceptionnel !" },
  { id: 48, author: "isabelle simoes loureiro", date: "il y a 3 ans", rating: 5, comment: "Encore une chouette expérience (cette fois en famille avec deux enfants) avec Spero Navette ! Ponctualité, gentillesse, et professionnalisme ! Tout autant de qualités qui rendent si agréable le service proposé !" },
];

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

  const totalGoogle = googleAvis.length;
  const fiveStar = googleAvis.filter(a => a.rating === 5).length;
  const fourStar = googleAvis.filter(a => a.rating === 4).length;

  return (
    <>
      <title>Avis Clients Spero Navette | Témoignages Navette Aéroport</title>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-spero mb-4">
              Avis de nos clients
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Découvrez les témoignages de nos clients satisfaits
            </p>

            {/* Score card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-spero mb-2">4.9</div>
                  <StarRating rating={5} size="w-6 h-6" />
                  <p className="text-gray-600 mt-2">
                    Basé sur 222 avis Google My Business
                  </p>
                </div>
              </div>

              {/* Distribution des notes */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="w-3 text-gray-600 text-right">5</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mx-1" />
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-spero h-2 rounded-full" style={{ width: `${Math.round(fiveStar / totalGoogle * 100)}%` }} />
                  </div>
                  <span className="w-8 text-gray-600">{fiveStar}</span>
                </div>
                {fourStar > 0 && (
                  <div className="flex items-center text-sm">
                    <span className="w-3 text-gray-600 text-right">4</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mx-1" />
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-spero h-2 rounded-full" style={{ width: `${Math.round(fourStar / totalGoogle * 100)}%` }} />
                    </div>
                    <span className="w-8 text-gray-600">{fourStar}</span>
                  </div>
                )}
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
                  {currentList.length} avis clients vérifiés
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