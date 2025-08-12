import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Données complètes des articles de blog
const blogPostsData = [
  {
    id: 'voyager-famille-avantages-navette',
    title: 'Voyager en famille : les avantages d\'une navette aéroport',
    excerpt: 'Découvrez pourquoi choisir une navette aéroport est la solution idéale pour les familles qui voyagent vers Bruxelles Zaventem, Charleroi ou Paris CDG. Confort, économies et tranquillité assurés.',
    date: '2025-06-14',
    readTime: '7 min',
    category: 'Famille',
    tags: ['navette aéroport', 'Zaventem', 'Charleroi', 'Paris CDG', 'voyage famille', 'enfants'],
    author: {
      name: 'Équipe Spero Navette',
      role: 'Expert en transport'
    }
  },
  {
  id: 'erreurs-frequentes-voyage-aeroport-spero-navette',
  title: 'Les 5 erreurs fréquentes quand on organise un voyage à l\'aéroport… et comment SPERO NAVETTE les évite pour vous',
  excerpt: 'Du timing mal calculé aux oublis de réservation, découvrez les 5 erreurs les plus courantes des voyageurs vers l\'aéroport et comment notre service de navette vous garantit un départ serein depuis le Hainaut.',
  date: '2025-08-12',
  readTime: '6 min',
  category: 'Conseils voyage',
  tags: ['erreurs voyage', 'navette aéroport', 'conseils pratiques', 'Zaventem', 'Charleroi', 'Paris CDG', 'organisation voyage'],
  author: {
    name: 'Équipe Spero Navette',
    role: 'Expert en transport aéroport'
  }
},
  {
    id: 'pourquoi-arriver-3-4-heures-avant-vol-ete',
    title: 'Pourquoi arriver 3 à 4 heures avant votre vol en été ? Les conseils de Spero Navette',
    excerpt: 'L\'été transforme les aéroports en véritables parcours du combattant. Découvrez pourquoi il est crucial d\'arriver 3h avant pour un vol européen et 4h pour l\'intercontinental, et comment notre service de navette vous garantit d\'être à l\'heure.',
    date: '2025-06-16',
    readTime: '5 min',
    category: 'Conseils voyage',
    tags: ['aéroport été', 'conseils voyage', 'Zaventem', 'Charleroi', 'temps arrivée', 'navette aéroport'],
    author: {
      name: 'Équipe Spero Navette',
      role: 'Expert en transport aéroport'
    }
  },
  {
    id: 'entreprises-navettes-professionnelles-tendance',
    title: 'Pourquoi de plus en plus d\'entreprises réservent des navettes professionnelles',
    excerpt: 'Transport d\'employés, clients VIP, événements d\'entreprise... Découvrez pourquoi les navettes professionnelles deviennent incontournables pour les entreprises modernes et comment elles optimisent leur image et leurs coûts.',
    date: '2025-07-20',
    readTime: '6 min',
    category: 'Business',
    tags: ['navette entreprise', 'transport professionnel', 'corporate', 'événements', 'productivité', 'image entreprise'],
    author: {
      name: 'Équipe Spero Navette',
      role: 'Expert en transport professionnel'
    }
  },
  {
    id: 'erreurs-voyageurs-comment-eviter',
    title: 'Les 10 erreurs classiques que font les voyageurs... et comment les éviter',
    excerpt: 'De l\'oubli de documents aux erreurs de timing, découvrez les pièges les plus fréquents des voyageurs vers Zaventem, Charleroi et Paris CDG. Nos conseils d\'experts pour un voyage sans accroc.',
    date: '2025-07-22',
    readTime: '8 min',
    category: 'Conseils voyage',
    tags: ['erreurs voyage', 'conseils aéroport', 'préparation voyage', 'Zaventem', 'Charleroi', 'Paris CDG'],
    author: {
      name: 'Équipe Spero Navette',
      role: 'Expert en transport aéroport'
    }
  },
  {
    id: 'reserver-navette-wallonie-avantages',
    title: 'Pourquoi réserver une navette depuis la Wallonie est plus malin qu\'on ne croit',
    excerpt: 'Contrairement aux idées reçues, faire appel à une navette depuis la Wallonie vers les aéroports belges et internationaux présente de nombreux avantages méconnus. Découvrez pourquoi c\'est souvent la solution la plus intelligente.',
    date: '2025-07-25',
    readTime: '7 min',
    category: 'Transport régional',
    tags: ['Wallonie', 'navette aéroport', 'transport régional', 'économies', 'Hainaut', 'smart travel'],
    author: {
      name: 'Équipe Spero Navette',
      role: 'Expert en transport wallon'
    }
  }
];

// Composant principal du blog
const Blog = () => {
  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour obtenir la couleur de la catégorie
  const getCategoryColor = (category) => {
    const colors = {
      'Famille': 'bg-green-500',
      'Conseils voyage': 'bg-blue-500',
      'Business': 'bg-purple-500',
      'Transport régional': 'bg-orange-500'
    };
    return colors[category] || 'bg-spero';
  };

  // Fonction pour obtenir l'icône de la catégorie
  const getCategoryIcon = (category) => {
    const icons = {
      'Famille': '👨‍👩‍👧‍👦',
      'Conseils voyage': '✈️',
      'Business': '💼',
      'Transport régional': '🗺️'
    };
    return icons[category] || '📝';
  };

  return (
    <>
      <SEO 
        title="Blog Spero Navette | Conseils pour voyager vers les aéroports de Bruxelles et Paris"
        description="Découvrez nos conseils de voyage, guides d'aéroports et astuces pour vos transferts vers Zaventem, Charleroi et Paris CDG. Blog spécialisé en navette aéroport et voyages en famille."
        keywords="navette aéroport, Zaventem, Charleroi, Paris CDG, transport aéroport, voyage famille, guide aéroport, transfert aéroport, conseils voyage, transport professionnel, Wallonie"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Bannière d'introduction */}
        <div className="bg-gradient-to-r from-spero to-purple-700 text-white rounded-lg p-8 shadow-lg mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Spero Navette</h1>
            <p className="text-xl max-w-3xl mx-auto mb-2">
              Conseils de voyage, guides d'aéroport et astuces pour vos transferts vers Bruxelles Zaventem, Charleroi et Paris CDG
            </p>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              15 ans d'expertise au service de votre confort de voyage
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/#calculator"
              className="bg-white text-spero font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Réserver une navette
            </Link>
            <Link 
              to="/contact"
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
        
        {/* Introduction textuelle */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bienvenue sur le blog de Spero Navette
          </h2>
          <p className="text-gray-600 mb-4">
            Chez Spero Navette, nous mettons notre expertise du transport aéroport à votre service. 
            Notre blog vous propose des articles pour faciliter vos voyages, de la préparation jusqu'à l'arrivée à destination.
          </p>
          <p className="text-gray-600">
            Découvrez nos conseils, guides pratiques et astuces pour rendre vos transferts vers les aéroports 
            de Bruxelles, Charleroi et Paris CDG plus agréables, économiques et sans stress.
          </p>
        </div>

        {/* Statistiques du blog */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-spero">
            <div className="text-2xl font-bold text-spero mb-1">{blogPostsData.length}</div>
            <div className="text-sm text-gray-600">Articles publiés</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600 mb-1">4</div>
            <div className="text-sm text-gray-600">Catégories</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600 mb-1">33</div>
            <div className="text-sm text-gray-600">Minutes de lecture</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-purple-600 mb-1">15</div>
            <div className="text-sm text-gray-600">Ans d'expertise</div>
          </div>
        </div>

        {/* Titre de section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-spero pb-2">
          Nos articles récents
        </h3>
        
        {/* Liste des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPostsData.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative h-40 bg-gradient-to-r from-spero/20 to-purple-300/30 flex items-center justify-center">
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block ${getCategoryColor(post.category)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {getCategoryIcon(post.category)} {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-center text-gray-800 px-4 hover:text-spero transition-colors leading-tight">
                    {post.title}
                  </h2>
                </div>
              </Link>
              
              <div className="p-5">
                <div className="text-sm text-gray-500 mb-3 flex items-center">
                  <span className="mr-3">📅 {formatDate(post.date)}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-spero hover:underline font-medium"
                  >
                    Lire l'article →
                  </Link>
                  
                  <div className="flex space-x-1">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Catégories en vedette */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Explorez nos catégories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Famille', 'Conseils voyage', 'Business', 'Transport régional'].map((category) => {
              const articleCount = blogPostsData.filter(post => post.category === category).length;
              return (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-spero"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{getCategoryIcon(category)}</div>
                    <h4 className="font-semibold text-gray-800 mb-2">{category}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {articleCount} article{articleCount > 1 ? 's' : ''}
                    </p>
                    <span className="text-spero hover:underline font-medium cursor-pointer">
                      Découvrir →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Section informative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-l-4 border-spero">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🚐</span>
              Pourquoi choisir Spero Navette?
            </h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start">
                <span className="font-bold text-spero mr-3 mt-1">✓</span>
                <span>Service porte-à-porte depuis votre domicile dans tout le Hainaut</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-spero mr-3 mt-1">✓</span>
                <span>Départs 24h/24 adaptés à vos horaires de vol, même très matinaux</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-spero mr-3 mt-1">✓</span>
                <span>Véhicules confortables avec espace pour tous vos bagages</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-spero mr-3 mt-1">✓</span>
                <span>Tarifs dégressifs pour les familles et groupes</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-spero mr-3 mt-1">✓</span>
                <span>15 ans d'expérience et ponctualité garantie</span>
              </li>
            </ul>
            <Link 
              to="/#calculator"
              className="inline-flex items-center bg-spero text-white px-4 py-2 rounded-lg hover:bg-spero/90 transition-colors"
            >
              Calculer mon tarif →
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">✈️</span>
              Destinations desservies
            </h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center">
                <span className="font-bold text-purple-600 mr-3">→</span>
                <Link to="/navette-aeroport-bruxelles-zaventem" className="hover:text-spero transition-colors">
                  Aéroport de Bruxelles-Zaventem (BRU)
                </Link>
              </li>
              <li className="flex items-center">
                <span className="font-bold text-purple-600 mr-3">→</span>
                <Link to="/navette-aeroport-charleroi" className="hover:text-spero transition-colors">
                  Aéroport de Charleroi Brussels South (CRL)
                </Link>
              </li>
              <li className="flex items-center">
                <span className="font-bold text-purple-600 mr-3">→</span>
                <Link to="/navette-aeroport-paris-cdg" className="hover:text-spero transition-colors">
                  Aéroport de Paris Charles de Gaulle (CDG)
                </Link>
              </li>
              <li className="flex items-center">
                <span className="font-bold text-purple-600 mr-3">→</span>
                <span>Aéroport d'Amsterdam Schiphol (AMS)</span>
              </li>
              <li className="flex items-center">
                <span className="font-bold text-purple-600 mr-3">→</span>
                <span>Autres destinations sur demande</span>
              </li>
            </ul>
            <Link 
              to="/services"
              className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Voir tous nos services →
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-lg mb-12 text-center border-l-4 border-indigo-500">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📬 Ne manquez aucun conseil voyage
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Recevez nos derniers articles, conseils exclusifs et offres spéciales directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              S'abonner
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Pas de spam, désinscription en un clic
          </p>
        </div>
        
        {/* CTA final */}
        <div className="bg-gradient-to-r from-spero to-purple-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🚐 Besoin d'une navette aéroport?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Que vous voyagiez seul, en couple, en famille ou en groupe professionnel, notre service de navette vers Bruxelles Zaventem, Charleroi ou Paris CDG est la solution idéale pour commencer votre voyage sereinement.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl mb-2">⏰</div>
              <div className="font-semibold">24h/24</div>
              <div className="text-sm opacity-90">Service disponible</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold">Tarifs fixes</div>
              <div className="text-sm opacity-90">Pas de surprises</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold">Ponctualité</div>
              <div className="text-sm opacity-90">Garantie</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/#calculator"
              className="bg-white text-spero px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Calculer mon tarif
            </Link>
            <a
              href="tel:+32490197914"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
            >
              📞 0490/19.79.14
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;