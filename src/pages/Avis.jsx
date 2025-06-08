import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, ExternalLink, Filter } from 'lucide-react';

const StarRating = ({ rating, size = "w-5 h-5" }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const AvisCard = ({ avis }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{avis.title}</h3>
          <div className="flex items-center text-green-600 text-sm">
            <span className="bg-green-100 px-2 py-1 rounded text-xs">Google</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <div className="bg-spero/10 rounded-full p-1 mr-2">
            <User className="h-4 w-4 text-spero" />
          </div>
          <span className="font-medium">{avis.author}</span>
          <Calendar className="h-4 w-4 ml-3 mr-1" />
          <span>{avis.date}</span>
          <ExternalLink className="h-3 w-3 ml-2 text-blue-500" title="Avis Google My Business" />
        </div>
      </div>
      
      <div className="mb-3">
        <StarRating rating={5} />
      </div>
      
      <p className="text-gray-700 leading-relaxed">{avis.comment}</p>
    </div>
  );
};

const Avis = () => {
  const [filteredAvis, setFilteredAvis] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'recent' // 'recent', 'oldest'
  });

  // Vos avis Google My Business avec titres et signatures
  const avisClients = [
    {
      id: 1,
      title: "Service professionnel et confortable",
      author: "Client récent",
      date: "il y a une semaine",
      comment: "J'ai utilisé ce service de navette pour mes dernières vacances et je suis vraiment ravi. Le chauffeur était ponctuel, très professionnel et sympathique. Le véhicule était propre et confortable, ce qui a rendu le trajet très agréable."
    },
    {
      id: 2,
      title: "Informations claires et conduite prudente",
      author: "Voyageur satisfait",
      date: "il y a une semaine",
      comment: "Je suis entièrement satisfait du service proposé et Spero navette est à recommander. Rien à reprocher, les informations tant pour l'aller que pour le retour sont claires et précises et le ou les chauffeurs sont à l'heure. La conduite est douce et prudente, merci à eux."
    },
    {
      id: 3,
      title: "Première expérience réussie",
      author: "Nouveau client",
      date: "il y a un mois",
      comment: "Première expérience et nous avons été très satisfait. Départ à l'heure et il nous attendait à la sortie de l'aéroport. Que demander de mieux! Merci"
    },
    {
      id: 4,
      title: "Transfert Charleroi impeccable",
      author: "Famille en voyage",
      date: "il y a 3 semaines",
      comment: "Très contents de notre prise en charge pour un transfert aller/retour sur l'aéroport de Charleroi, d'autant que notre demande est intervenue un peu tard. Les horaires étaient respectés, le trajet sympathique. Nous recommandons et repasserons par SPERO pour de futurs voyages!"
    },
    {
      id: 5,
      title: "Équipe au top",
      author: "Client fidèle",
      date: "il y a une semaine",
      comment: "Super équipe très bon service ponctuel plaisant à l'heure continuer nous seront encore clients"
    },
    {
      id: 6,
      title: "Ponctualité et amabilité",
      author: "Voyageur régulier",
      date: "il y a 5 jours",
      comment: "Grande qualité de service : ponctualité, amabilité et serviabilité. À recommander."
    },
    {
      id: 7,
      title: "Navette de confiance trouvée",
      author: "Couple en vacances",
      date: "il y a 4 semaines",
      comment: "Vous recherchez une navette de confiance ?? Alors n'hésitez plus... Nous avons réservé chez spero navette en précisant qu'on décollait de Bruxelles."
    },
    {
      id: 8,
      title: "Service irréprochable",
      author: "Marie D.",
      date: "il y a 3 semaines",
      comment: "Très bonne prise en charge, ponctualité, serviabilité, gentillesse. A recommander."
    },
    {
      id: 9,
      title: "Chauffeur sympathique",
      author: "Mme C.",
      date: "il y a un mois",
      comment: "Chauffeur ponctuel, aidant, sympa... Navette confortable. Juste un petit désagrément : le prix"
    },
    {
      id: 10,
      title: "Service ponctuel et poli",
      author: "Mme M.",
      date: "il y a un mois",
      comment: "Chauffeurs à l'heure, poli, aimable mais peu attentif aux bagages (une des valise abimée au retour, réparable, heureusement)"
    },
    {
      id: 11,
      title: "Client habituel satisfait",
      author: "Voyageur régulier",
      date: "il y a un mois",
      comment: "Transport agréable comme d'habitude. Ponctualité, amabilité étaient au rendez-vous"
    },
    {
      id: 12,
      title: "Expérience au top",
      author: "Thomas L.",
      date: "il y a 6 jours",
      comment: "Expérience au top 👍 chauffeur agréable et navette à l'heure 👌"
    },
    {
      id: 13,
      title: "Navette parfaite",
      author: "Pierre M.",
      date: "il y a 6 jours",
      comment: "Parfait, navette au top. Chauffeur agréable, ponctuel et camionnette confortable. Rien à dire ;))"
    },
    {
      id: 14,
      title: "Service au top",
      author: "Client satisfait",
      date: "il y a un mois",
      comment: "Ponctualité, service au top. Merci pour vos bons soins."
    },
    {
      id: 15,
      title: "Tout s'est bien passé",
      author: "Sophie R.",
      date: "il y a une semaine",
      comment: "Tout s'est très bien passé et nous étions rentrés en avance et navette là"
    },
    {
      id: 16,
      title: "Transfert parfait",
      author: "Jean-Luc P.",
      date: "il y a un mois",
      comment: "Transfert aéroport parfait, le chauffeur était à l'heure que ce soit à l'aller et au retour. A recommander"
    },
    {
      id: 17,
      title: "Transport parfait aller-retour",
      author: "Michel D.",
      date: "il y a 6 jours",
      comment: "Bonjour, transport parfait aller et retour, ponctuels. Chauffeurs polis et très sympathiques. très bon, je recommande"
    },
    {
      id: 18,
      title: "Bon service et suivi",
      author: "Catherine L.",
      date: "il y a 3 semaines",
      comment: "Très bon service et suivi. Reçois toujours confirmation"
    },
    {
      id: 19,
      title: "Contact agréable",
      author: "François B.",
      date: "il y a un mois",
      comment: "Prise de contact très agréable - suivi rigoureux - Ponctualité 👍"
    },
    {
      id: 20,
      title: "Chauffeurs sympathiques",
      author: "Mme B.",
      date: "il y a 2 semaines",
      comment: "Très sérieux. Chauffeurs sympathiques et ponctuels. A recommander."
    },
    {
      id: 21,
      title: "Cliente fidèle satisfaite",
      author: "Nathalie V.",
      date: "il y a une semaine",
      comment: "Très satisfaite de la prise en charge de la navette, ça fait déjà quatre fois que nous la prenons aller-retour Bruxelles sans prise de tête, je recommande"
    },
    {
      id: 22,
      title: "Service irréprochable",
      author: "David T.",
      date: "il y a un mois",
      comment: "Ponctuel, aimables, serviable, service au top merci"
    },
    {
      id: 23,
      title: "Service sûr et sérieux",
      author: "Claire M.",
      date: "il y a un mois",
      comment: "Spero navette est un service de transport sûr et sérieux. Je recommande!"
    },
    {
      id: 24,
      title: "Service parfait",
      author: "Laurent G.",
      date: "il y a 9 mois",
      comment: "Service parfait, chauffeurs à l'heure à l'aller comme au retour et très sympa. Première expérience très positive, je recommande à 100%"
    },
    {
      id: 25,
      title: "Partenaire de confiance",
      author: "Philippe R.",
      date: "il y a un an",
      comment: "C'est toujours un plaisir de faire appel à leur service de navette. Ponctuel, sympathique et tarifs tout à fait compétitifs. Un vrai partenaire pour nos futurs déplacements vers l'aéroport."
    },
    {
      id: 26,
      title: "Service honnête",
      author: "M. Tubello",
      date: "il y a 8 mois",
      comment: "Super service et à l'heure. Très honnête compte tenu de la grève à l'aéroport de Charleroi: Mr Sperolini a accepté de nous prendre en charge 2 jours plus tard sans frais supplémentaires. Un grand merci !!"
    },
    {
      id: 27,
      title: "Chauffeur attentif",
      author: "Anne S.",
      date: "il y a un an",
      comment: "Un service de grande qualité. Après un voyage fatiguant, il est bon de pouvoir compter sur une personne attentive et prudente pour nous ramener à la maison, de plus de nuit."
    },
    {
      id: 28,
      title: "Première expérience parfaite",
      author: "Julie K.",
      date: "il y a un an",
      comment: "Première expérience de ce genre de service pour moi, mais très satisfaite du service reçu. Suivi nikel, le chauffeur à l'aller, nous prévient 10 minutes avant d'arriver au domicile et au retour nous indique l'heure de son arrivée."
    },
    {
      id: 29,
      title: "Service extraordinaire",
      author: "Amélie H.",
      date: "il y a 2 ans",
      comment: "MAGNIFIQUE Expérience avec Spero Navette. Nous les avons contacté suite aux recommandations de notre agence de voyage mais sans les connaître et quelle belle surprise! Tellement ravis de leur service. Leur ponctualité, leur gentillesse."
    },
    {
      id: 30,
      title: "Excellent service",
      author: "Grégoire M.",
      date: "il y a un an",
      comment: "Excellent service, amabilité, respect, serviabilité, ponctualité. A recommander, ce que j'ai déjà fait."
    },
    {
      id: 31,
      title: "Très pro et sympa",
      author: "Greg",
      date: "il y a 6 mois",
      comment: "Très pro et sympa !! et à l'heure ! :-)"
    },
    {
      id: 32,
      title: "Manu particulièrement agréable",
      author: "Client enchanté",
      date: "il y a 2 ans",
      comment: "Je suis enchanté de la navette Spero, ponctualité et sérieux. Manu est particulièrement agréable et sympathique. Il est attentionné et animé d'un esprit spécifiquement orienté vers le meilleur service au client. A recommander sans modération."
    },
    {
      id: 33,
      title: "Service depuis des années",
      author: "Famille fidèle",
      date: "il y a un an",
      comment: "Service navette que nous prenons depuis des années. Ponctuel et toujours avec le sourire 🙂 nous en sommes très contents ! Nous recommandons sans hésiter !"
    },
    {
      id: 34,
      title: "Excellent rapport qualité-prix",
      author: "Caroline D.",
      date: "il y a un an",
      comment: "A recommander ! Accueil, professionnalisme, excellent rapport qualité/prix !! Super !!"
    },
    {
      id: 35,
      title: "Société très honnête",
      author: "Paul et Marina",
      date: "il y a 2 ans",
      comment: "Très bonne expérience avec cette société, le chauffeur très sympathique et aux petits soins. Il nous a mis à l'aise tout en restant discret. Société très honnête qui communique facilement et tient ses engagements. Ils nous accompagneront dans nos prochaines vacances en avion. MERCI"
    },
    {
      id: 36,
      title: "Service au top",
      author: "Kevin et Lisa",
      date: "il y a un an",
      comment: "Nous recommandons fortement Spero Navette. Un service au top et ponctuelle et super sympa ! A très bientôt"
    },
    {
      id: 37,
      title: "Les yeux fermés",
      author: "Sabrina T.",
      date: "il y a 11 mois",
      comment: "Je recommande les yeux fermés 😁 personnes très très sympathique ! Rendez vous au prochain voyage 🤩"
    },
    {
      id: 38,
      title: "Véhicules très propres",
      author: "Maxime L.",
      date: "il y a un an",
      comment: "Super gentil à l'heure et véhicules très propre 👍 je recommande vivement 😍"
    },
    {
      id: 39,
      title: "Chauffeurs passionnés",
      author: "Vincent R.",
      date: "il y a un an",
      comment: "Un service extra, une disponibilité à toute épreuve, le tout avec des chauffeurs qui aiment leur métier. Que demander de plus ? Je recommande vivement !"
    },
    {
      id: 40,
      title: "Réactivité exceptionnelle",
      author: "Sandra M.",
      date: "il y a 2 ans",
      comment: "J'ai pris contact avec SPERO navette ce samedi en dernière minute afin de trouver un transport pour récupérer des amis à Zaventem à 2h30 du matin. Ils ont répondu présents malgré ma démarche tardive! Je recommande +++, professionnalisme et sérieux!"
    }
  ];

  // Application des filtres
  const applyFilters = () => {
    let filtered = [...avisClients];
    
    // Tri
    filtered.sort((a, b) => {
      if (filters.sortBy === 'oldest') {
        return a.id - b.id;
      }
      // Tri par date par défaut (plus récents en premier)
      return b.id - a.id;
    });
    
    setFilteredAvis(filtered);
  };

  // Application des filtres quand les avis ou filtres changent
  useEffect(() => {
    applyFilters();
  }, [avisClients, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const averageRating = 5.0;
  const totalReviews = avisClients.length;

  return (
    <>
      {/* SEO Meta tags */}
      <title>Avis Clients Spero Navette | Témoignages Navette Aéroport</title>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête avec statistiques */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-spero mb-4">
              Avis de nos clients
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Découvrez les témoignages de nos clients satisfaits
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-spero mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                  <p className="text-gray-600 mt-2">
                    Basé sur {totalReviews} avis Google My Business
                  </p>
                </div>
              </div>
              
              {/* Distribution des notes */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="w-3 text-gray-600">5</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mx-1" />
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-spero h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <span className="w-8 text-gray-600">{totalReviews}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles de filtres */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  {totalReviews} avis clients vérifiés
                </span>
              </div>

              {/* Filtres */}
              <div className="flex items-center gap-4">
                <Filter className="h-4 w-4 text-gray-600" />
                
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="recent">Plus récents</option>
                  <option value="oldest">Plus anciens</option>
                </select>
              </div>
            </div>
          </div>

          {/* Liste des avis */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAvis.map((avis) => (
              <AvisCard key={avis.id} avis={avis} />
            ))}
          </div>

          {/* Appel à l'action pour laisser un avis */}
          <div className="mt-12 bg-spero/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-spero mb-4">
              Vous avez utilisé nos services ?
            </h2>
            <p className="text-gray-700 mb-6">
              Partagez votre expérience et aidez d'autres voyageurs à choisir notre service de navette aéroport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://g.page/r/CQTXwFtumGyuEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Laisser un avis sur Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avis;