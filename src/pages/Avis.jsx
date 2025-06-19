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
            <span className={`px-2 py-1 rounded text-xs ${
              avis.platform === 'Facebook' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              {avis.platform}
            </span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <div className="bg-spero/10 rounded-full p-1 mr-2">
            <User className="h-4 w-4 text-spero" />
          </div>
          <span className="font-medium">{avis.author}</span>
          <Calendar className="h-4 w-4 ml-3 mr-1" />
          <span>{avis.date}</span>
          <ExternalLink className="h-3 w-3 ml-2 text-blue-500" title={`Avis ${avis.platform}`} />
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

  // Tous les avis classés par ordre chronologique (plus récents en premier)
  const avisClients = [
    {
      id: 1,
      title: "Ponctualité, gentillesse, professionnalisme",
      author: "Jacqueline G.",
      date: "3 juin 2025",
      dateSort: "2025-06-03",
      platform: "Facebook",
      comment: "Nous avons fait appel à Spero navette pour nos vacances en mai. Ponctualité, gentillesse, professionnalisme... un seul mot : Parfait. Nous referons appel à vous au plus vite. Bravo et merci"
    },
    {
      id: 2,
      title: "Service de navette vraiment ravi",
      author: "Pascal G.",
      date: "26 mai 2025",
      dateSort: "2025-05-26",
      platform: "Facebook",
      comment: "J'ai utilisé ce service de navette pour mes dernières vacances et je suis vraiment ravi. Le chauffeur était ponctuel, très professionnel et sympathique. Le véhicule était propre et confortable, ce qui a rendu le trajet très agréable. En plus, le prix était vraiment correct pour la qualité du service proposé, ce qui est rare de nos jours ! Je recommande sans hésiter ce service à toute personne cherchant une solution fiable, pratique et... En voir plus"
    },
    {
      id: 3,
      title: "Service impeccable jusqu'à chez moi",
      author: "Client habituel",
      date: "il y a 19 heures",
      dateSort: "2025-06-18",
      platform: "Google",
      comment: "Service impeccable ! Chauffeur ponctuel, courtois et conduite très agréable. Trajet aéroport de Bruxelles jusqu'à chez moi sans stress. Je recommande à 100 %"
    },
    {
      id: 4,
      title: "Comme à l'habitude un sans faute",
      author: "Client fidèle",
      date: "il y a 19 heures",
      dateSort: "2025-06-18",
      platform: "Google",
      comment: "Comme à l'habitude un sans faute à l'aller comme à l'retour. Ponctualité, efficacité, respect et prudence et jovialité des chauffeurs. Merci à Monsieur Sperolini pour nous fournir une équipe efficace à toute heure en en toute occasion. Je recommande les Navettes Spéro, les yeux fermés et d'ailleurs on sera encore client pour le prochain voyage en septembre 😊 pour mon part."
    },
    {
      id: 5,
      title: "Service impeccable à l'aller comme au retour",
      author: "Véronique D.",
      date: "il y a 2 jours",
      dateSort: "2025-06-17",
      platform: "Google",
      comment: "Service impeccable à l'aller comme au retour! Aller retour sans souci, c'est notre spécialité ! À bientôt pour un nouveau voyage tout confort 😊"
    },
    {
      id: 6,
      title: "Chauffeurs ponctuels et très professionnels",
      author: "Morgane M.",
      date: "il y a 3 jours",
      dateSort: "2025-06-16",
      platform: "Google",
      comment: "Chauffeurs ponctuels et très professionnels. Je vous recommande sans hésitation."
    },
    {
      id: 7,
      title: "Personnel sympathique et très ponctuel",
      author: "Anne B.",
      date: "il y a 3 jours",
      dateSort: "2025-06-16",
      platform: "Google",
      comment: "Un personnel sympathique et très ponctuel. Avec accompagnement et aide pour les bagages jusqu'à la porte d'entrée de l'aéroport et idem au retour!! Et cerise sur le gâteau, des véhicules propres, bien entretenus. Seul point négatif : rien ! Je recommande à 100% pour voyager l'esprit serein!"
    },
    {
      id: 8,
      title: "Super expérience très rassurant",
      author: "Fabio F.",
      date: "il y a 3 jours",
      dateSort: "2025-06-16",
      platform: "Google",
      comment: "Super expérience ! Très rassurant pour un premier voyage avec vous . Le chauffeur au retour était d'une sympathie inégalée ! Merci. Je recommande ++"
    },
    {
      id: 9,
      title: "Service au top réservé par l'agence de voyage",
      author: "Olivier B.",
      date: "il y a 5 jours",
      dateSort: "2025-06-14",
      platform: "Google",
      comment: "Un service au top, réservé par l'agence de voyage, nous nous sommes rendu compte d'une erreur d'horaire en sortant de l'aéroport. Après un échange de message tout à été réglé et nous avons une navette retour à la bonne heure... 👍"
    },
    {
      id: 10,
      title: "Expérience au top",
      author: "Thomas L.",
      date: "il y a 6 jours",
      dateSort: "2025-06-13",
      platform: "Google",
      comment: "Expérience au top 👍 chauffeur agréable et navette à l'heure 👌"
    },
    {
      id: 11,
      title: "Navette parfaite",
      author: "Pierre M.",
      date: "il y a 6 jours",
      dateSort: "2025-06-13",
      platform: "Google",
      comment: "Parfait, navette au top. Chauffeur agréable, ponctuel et camionnette confortable. Rien à dire ;))"
    },
    {
      id: 12,
      title: "Transport parfait aller-retour",
      author: "Michel D.",
      date: "il y a 6 jours",
      dateSort: "2025-06-13",
      platform: "Google",
      comment: "Bonjour, transport parfait aller et retour, ponctuels. Chauffeurs polis et très sympathiques. très bon, je recommande"
    },
    {
      id: 13,
      title: "Ponctualité et amabilité",
      author: "Voyageur régulier",
      date: "il y a 5 jours",
      dateSort: "2025-06-14",
      platform: "Google",
      comment: "Grande qualité de service : ponctualité, amabilité et serviabilité. À recommander."
    },
    {
      id: 14,
      title: "Service professionnel et confortable",
      author: "Client récent",
      date: "il y a une semaine",
      dateSort: "2025-06-12",
      platform: "Google",
      comment: "J'ai utilisé ce service de navette pour mes dernières vacances et je suis vraiment ravi. Le chauffeur était ponctuel, très professionnel et sympathique. Le véhicule était propre et confortable, ce qui a rendu le trajet très agréable."
    },
    {
      id: 15,
      title: "Informations claires et conduite prudente",
      author: "Voyageur satisfait",
      date: "il y a une semaine",
      dateSort: "2025-06-12",
      platform: "Google",
      comment: "Je suis entièrement satisfait du service proposé et Spero navette est à recommander. Rien à reprocher, les informations tant pour l'aller que pour le retour sont claires et précises et le ou les chauffeurs sont à l'heure. La conduite est douce et prudente, merci à eux."
    },
    {
      id: 16,
      title: "Équipe au top",
      author: "Client fidèle",
      date: "il y a une semaine",
      dateSort: "2025-06-12",
      platform: "Google",
      comment: "Super équipe très bon service ponctuel plaisant à l'heure continuer nous seront encore clients"
    },
    {
      id: 17,
      title: "Tout s'est bien passé",
      author: "Sophie R.",
      date: "il y a une semaine",
      dateSort: "2025-06-12",
      platform: "Google",
      comment: "Tout s'est très bien passé et nous étions rentrés en avance et navette là"
    },
    {
      id: 18,
      title: "Cliente fidèle satisfaite",
      author: "Nathalie V.",
      date: "il y a une semaine",
      dateSort: "2025-06-12",
      platform: "Google",
      comment: "Très satisfaite de la prise en charge de la navette, ça fait déjà quatre fois que nous la prenons aller-retour Bruxelles sans prise de tête, je recommande"
    },
    {
      id: 19,
      title: "Chauffeurs sympathiques",
      author: "Mme B.",
      date: "il y a 2 semaines",
      dateSort: "2025-06-05",
      platform: "Google",
      comment: "Très sérieux. Chauffeurs sympathiques et ponctuels. A recommander."
    },
    {
      id: 20,
      title: "Bon service et suivi",
      author: "Catherine L.",
      date: "il y a 3 semaines",
      dateSort: "2025-05-29",
      platform: "Google",
      comment: "Très bon service et suivi. Reçois toujours confirmation"
    },
    {
      id: 21,
      title: "Transfert Charleroi impeccable",
      author: "Famille en voyage",
      date: "il y a 3 semaines",
      dateSort: "2025-05-29",
      platform: "Google",
      comment: "Très contents de notre prise en charge pour un transfert aller/retour sur l'aéroport de Charleroi, d'autant que notre demande est intervenue un peu tard. Les horaires étaient respectés, le trajet sympathique. Nous recommandons et repasserons par SPERO pour de futurs voyages!"
    },
    {
      id: 22,
      title: "Service irréprochable",
      author: "Marie D.",
      date: "il y a 3 semaines",
      dateSort: "2025-05-29",
      platform: "Google",
      comment: "Très bonne prise en charge, ponctualité, serviabilité, gentillesse. A recommander."
    },
    {
      id: 23,
      title: "Navette de confiance trouvée",
      author: "Couple en vacances",
      date: "il y a 4 semaines",
      dateSort: "2025-05-22",
      platform: "Google",
      comment: "Vous recherchez une navette de confiance ?? Alors n'hésitez plus... Nous avons réservé chez spero navette en précisant qu'on décollait de Bruxelles."
    },
    {
      id: 24,
      title: "Première expérience réussie",
      author: "Nouveau client",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Première expérience et nous avons été très satisfait. Départ à l'heure et il nous attendait à la sortie de l'aéroport. Que demander de mieux! Merci"
    },
    {
      id: 25,
      title: "Chauffeur sympathique",
      author: "Mme C.",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Chauffeur ponctuel, aidant, sympa... Navette confortable. Juste un petit désagrément : le prix"
    },
    {
      id: 26,
      title: "Service ponctuel et poli",
      author: "Mme M.",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Chauffeurs à l'heure, poli, aimable mais peu attentif aux bagages (une des valise abimée au retour, réparable, heureusement)"
    },
    {
      id: 27,
      title: "Client habituel satisfait",
      author: "Voyageur régulier",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Transport agréable comme d'habitude. Ponctualité, amabilité étaient au rendez-vous"
    },
    {
      id: 28,
      title: "Service au top",
      author: "Client satisfait",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Ponctualité, service au top. Merci pour vos bons soins."
    },
    {
      id: 29,
      title: "Transfert parfait",
      author: "Jean-Luc P.",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Transfert aéroport parfait, le chauffeur était à l'heure que ce soit à l'aller et au retour. A recommander"
    },
    {
      id: 30,
      title: "Service irréprochable",
      author: "David T.",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Ponctuel, aimables, serviable, service au top merci"
    },
    {
      id: 31,
      title: "Service sûr et sérieux",
      author: "Claire M.",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Spero navette est un service de transport sûr et sérieux. Je recommande!"
    },
    {
      id: 32,
      title: "Contact agréable",
      author: "François B.",
      date: "il y a un mois",
      dateSort: "2025-05-19",
      platform: "Google",
      comment: "Prise de contact très agréable - suivi rigoureux - Ponctualité 👍"
    },
    {
      id: 33,
      title: "Véhicule de confort",
      author: "Thomas B.",
      date: "12 juillet 2024",
      dateSort: "2024-07-12",
      platform: "Facebook",
      comment: "Véhicule de confort. Chauffeur d'une gentillesse ponctuelle sur l'heure d'arrivée ou de départ, je recommande vraiment."
    },
    {
      id: 34,
      title: "Très pro et sympa",
      author: "Greg",
      date: "il y a 6 mois",
      dateSort: "2024-12-19",
      platform: "Google",
      comment: "Très pro et sympa !! et à l'heure ! :-)"
    },
    {
      id: 35,
      title: "Service parfait",
      author: "Laurent G.",
      date: "il y a 9 mois",
      dateSort: "2024-09-19",
      platform: "Google",
      comment: "Service parfait, chauffeurs à l'heure à l'aller comme au retour et très sympa. Première expérience très positive, je recommande à 100%"
    },
    {
      id: 36,
      title: "Service honnête",
      author: "M. Tubello",
      date: "il y a 8 mois",
      dateSort: "2024-10-19",
      platform: "Google",
      comment: "Super service et à l'heure. Très honnête compte tenu de la grève à l'aéroport de Charleroi: Mr Sperolini a accepté de nous prendre en charge 2 jours plus tard sans frais supplémentaires. Un grand merci !!"
    },
    {
      id: 37,
      title: "Personnel hyper sympa et très ponctuel",
      author: "Loretta C.",
      date: "30 mars 2024",
      dateSort: "2024-03-30",
      platform: "Facebook",
      comment: "Très très bien ! Très réactif aux messages, personnel hyper sympa et très ponctuel. Je recommande vivement"
    },
    {
      id: 38,
      title: "Service au top! je recommande",
      author: "Lina R.",
      date: "29 juillet 2023",
      dateSort: "2023-07-29",
      platform: "Facebook",
      comment: "Service au top! je recommande 👍"
    },
    {
      id: 39,
      title: "Super expérience! Chauffeurs ultra ponctuels",
      author: "Gioia B.",
      date: "2 novembre 2022",
      dateSort: "2022-11-02",
      platform: "Facebook",
      comment: "Super expérience ! -Chauffeurs ultra ponctuels -Très très sympa -Service haut de gamme et véhicules tout confort !... En voir plus"
    },
    {
      id: 40,
      title: "Je recommande à 100000%",
      author: "Manu S.",
      date: "18 septembre 2022",
      dateSort: "2022-09-18",
      platform: "Facebook",
      comment: "C est un peu par hasard, que je me suis tournée vers Spero Navette et je recommande à 100000%. Très réactif lorsque j'ai envoyé un mail, personne 1000% sérieuse et très sympathique. Je recommande et je ferai appel à eux lors de mes prochains voyages."
    },
    {
      id: 41,
      title: "Échange téléphonique sympa, services sérieux",
      author: "Amélie V.",
      date: "5 août 2022",
      dateSort: "2022-08-05",
      platform: "Facebook",
      comment: "C'est par hasard que je me tourne vers cette société de navette ... à la dernière minute 😱 Échange téléphonique sympa, services sérieux. N'hésitez pas, pour nous c'est notre navette attitrée pour les prochaines vacances 🌴"
    },
    {
      id: 42,
      title: "Spero Navette a été super réactif",
      author: "Virginie P.",
      date: "24 juillet 2022",
      dateSort: "2022-07-24",
      platform: "Facebook",
      comment: "Partir au milieu de la nuit... changer l'heure 2 jours avant 😅. Spero Navette a été super réactif et à l'écoute. Je recommande à 100%. Merci pour votre professionnalisme et votre gentillesse. En résumé : que du positif 😊"
    },
    {
      id: 43,
      title: "Réactif ponctuel et très sympa",
      author: "Katia I.",
      date: "16 juin 2022",
      dateSort: "2022-06-16",
      platform: "Facebook",
      comment: "Réactif ponctuel et très sympa merci pour le service 🙌"
    },
    {
      id: 44,
      title: "Partenaire de confiance",
      author: "Philippe R.",
      date: "il y a un an",
      dateSort: "2024-06-19",
      platform: "Google",
      comment: "C'est toujours un plaisir de faire appel à leur service de navette. Ponctuel, sympathique et tarifs tout à fait compétitifs. Un vrai partenaire pour nos futurs déplacements vers l'aéroport."
    },
    {
      id: 45,
      title: "Chauffeur attentif",
      author: "Anne S.",
      date: "il y a un an",
      dateSort: "2024-06-19",
      platform: "Google",
      comment: "Un service de grande qualité. Après un voyage fatiguant, il est bon de pouvoir compter sur une personne attentive et prudente pour nous ramener à la maison, de plus de nuit."
    },
    {
      id: 46,
      title: "Première expérience parfaite",
      author: "Julie K.",
      date: "il y a un an",
      dateSort: "2024-06-19",
      platform: "Google",
      comment: "Première expérience de ce genre de service pour moi, mais très satisfaite du service reçu. Suivi nikel, le chauffeur à l'aller, nous prévient 10 minutes avant d'arriver au domicile et au retour nous indique l'heure de son arrivée."
    },
    {
      id: 47,
      title: "Excellent service",
      author: "Grégoire M.",
      date: "il y a un an",
      dateSort: "2024-06-19",
      platform: "Google",
      comment: "Excellent service, amabilité, respect, serviabilité, ponctualité. A recommander, ce que j'ai déjà fait."
    },
    {
      id: 48,
      title: "Service depuis des années",
      author: "Famille fidèle",
      date: "il y a un an",
      dateSort: "2024-06-19",
      platform: "Google",
      comment: "Service navette que nous prenons depuis des années. Ponctuel et toujours avec le sourire 🙂 nous en sommes très contents ! Nous recommandons sans hésiter !"
    },
    {
      id: 49,
      title: "Service extraordinaire",
      author: "Amélie H.",
      date: "il y a 2 ans",
      dateSort: "2023-06-19",
      platform: "Google",
      comment: "MAGNIFIQUE Expérience avec Spero Navette. Nous les avons contacté suite aux recommandations de notre agence de voyage mais sans les connaître et quelle belle surprise! Tellement ravis de leur service. Leur ponctualité, leur gentillesse."
    },
    {
      id: 50,
      title: "Manu particulièrement agréable",
      author: "Client enchanté",
      date: "il y a 2 ans",
      dateSort: "2023-06-19",
      platform: "Google",
      comment: "Je suis enchanté de la navette Spero, ponctualité et sérieux. Manu est particulièrement agréable et sympathique. Il est attentionné et animé d'un esprit spécifiquement orienté vers le meilleur service au client. A recommander sans modération."
    }
  ];

  // Application des filtres
  const applyFilters = () => {
    let filtered = [...avisClients];
    
    // Tri par date
    filtered.sort((a, b) => {
      if (filters.sortBy === 'oldest') {
        return new Date(a.dateSort) - new Date(b.dateSort);
      }
      // Tri par date par défaut (plus récents en premier)
      return new Date(b.dateSort) - new Date(a.dateSort);
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
                    Basé sur {totalReviews} avis Google My Business et Facebook
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
              <a 
                href="https://facebook.com/speronavette"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Laisser un avis sur Facebook
              </a>
            </div>
          </div>

          {/* Note sur la publication des avis */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              Avis clients authentiques publiés sur Google My Business et Facebook - Dernière mise à jour : 19 juin 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avis;

