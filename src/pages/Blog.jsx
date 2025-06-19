import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Données des articles de blog - uniquement ceux qui sont rédigés
const blogPostsData = [
  {
    id: 'voyager-famille-avantages-navette',
    title: 'Voyager en famille : les avantages d\'une navette aéroport',
    excerpt: 'Découvrez pourquoi choisir une navette aéroport est la solution idéale pour les familles qui voyagent vers Bruxelles Zaventem, Charleroi ou Paris CDG. Confort, économies et tranquillité assurés.',
    date: '2025-06-14',
    readTime: '7 min',
    category: 'Famille',
    tags: ['navette aéroport', 'Zaventem', 'Charleroi', 'Paris CDG', 'voyage famille', 'enfants']
  },
  {
    id: 'pourquoi-arriver-3-4-heures-avant-vol-ete',
    title: 'Pourquoi arriver 3 à 4 heures avant votre vol en été ? Les conseils de Spero Navette',
    excerpt: 'L\'été transforme les aéroports en véritables parcours du combattant. Découvrez pourquoi il est crucial d\'arriver 3h avant pour un vol européen et 4h pour l\'intercontinental, et comment notre service de navette vous garantit d\'être à l\'heure.',
    date: '2025-06-16',
    readTime: '5 min',
    category: 'Conseils voyage',
    tags: ['aéroport été', 'conseils voyage', 'Zaventem', 'Charleroi', 'temps arrivée', 'navette aéroport']
  },
  {
    id: 'vol-annule-retarde-droits-flexibilite-spero',
    title: 'Vol annulé ou retardé : vos droits et notre flexibilité',
    excerpt: 'Votre vol est annulé ou retardé ? Découvrez vos droits selon le règlement européen et comment Spero Navette s\'adapte à ces imprévus avec une politique d\'annulation flexible et humaine.',
    date: '2024-06-20',
    readTime: '8 min',
    category: 'Conseils voyage',
    tags: ['vol annulé', 'vol retardé', 'droits passagers', 'règlement européen', 'politique annulation', 'flexibilité transport']
  },
  {
    id: 'transport-aeroport-professionnels-entreprises',
    title: 'Transport aéroport pour vos déplacements professionnels : Spero Navette, votre partenaire fiable',
    excerpt: 'Que vous soyez entrepreneur, commercial ou consultant, découvrez comment notre service de navette aéroport répond parfaitement aux besoins des professionnels. Même qualité, même fiabilité, sans surcoût.',
    date: '2024-06-23',
    readTime: '6 min',
    category: 'Professionnel',
    tags: ['navette business', 'déplacement professionnel', 'transport entreprise', 'Zaventem business', 'Charleroi business']
  },
  {
    id: 'au-dela-aeroport-tous-nos-services-transport',
    title: 'Au-delà de l\'aéroport : découvrez tous les services de transport Spero Navette',
    excerpt: 'Mariages, concerts, rendez-vous médicaux, vacances en Belgique... Découvrez comment Spero Navette vous accompagne dans tous vos déplacements importants, pas seulement vers l\'aéroport.',
    date: '2024-06-25',
    readTime: '7 min',
    category: 'Services',
    tags: ['transport mariage', 'navette concert', 'transport médical', 'vacances Belgique', 'services transport']
  }
  // Les autres articles seront ajoutés au fur et à mesure de leur rédaction
];

// Composant principal du blog (version simplifiée)
const Blog = () => {
  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <>
      <SEO 
        title="Blog Spero Navette | Conseils pour voyager vers les aéroports de Bruxelles et Paris"
        description="Découvrez nos conseils de voyage, guides d'aéroports et astuces pour vos transferts vers Zaventem, Charleroi et Paris CDG. Blog spécialisé en navette aéroport et voyages en famille."
        keywords="navette aéroport, Zaventem, Charleroi, Paris CDG, transport aéroport, voyage famille, guide aéroport, transfert aéroport"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Bannière d'introduction */}
        <div className="bg-gradient-to-r from-spero to-purple-700 text-white rounded-lg p-8 shadow-lg mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Spero Navette</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Conseils de voyage, guides d'aéroport et astuces pour vos transferts vers Bruxelles Zaventem, Charleroi et Paris CDG
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link 
              to="/#calculator"
              className="bg-white text-spero font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors mr-4"
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
        
        {/* Liste des articles */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Nos articles récents
        </h3>
        
        {blogPostsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPostsData.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="relative h-40 bg-gradient-to-r from-spero/20 to-purple-300/30 flex items-center justify-center">
                    <div className="absolute top-2 right-2">
                      <span className="inline-block bg-spero text-white text-xs px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-800 px-4 hover:text-spero transition-colors">
                        {post.title}
                    </h2>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="text-sm text-gray-500 mb-3">
                    <span>📅 {formatDate(post.date)} • ⏱️ {post.readTime} de lecture</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-spero hover:underline"
                    >
                      Lire l'article →
                    </Link>
                    
                    <div className="flex space-x-1">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
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
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center mb-12">
            <h3 className="text-xl font-semibold mb-2">Nouveaux articles bientôt disponibles</h3>
            <p className="text-gray-600 mb-4">
              Nous préparons actuellement de nouveaux articles pour vous aider dans vos voyages. 
              Revenez bientôt pour découvrir notre contenu!
            </p>
          </div>
        )}
        
        {/* Section informative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Pourquoi choisir Spero Navette?</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex">
                <span className="font-bold text-spero mr-2">✓</span>
                <span>Service porte-à-porte depuis votre domicile</span>
              </li>
              <li className="flex">
                <span className="font-bold text-spero mr-2">✓</span>
                <span>Départs 24h/24 adaptés à vos horaires de vol</span>
              </li>
              <li className="flex">
                <span className="font-bold text-spero mr-2">✓</span>
                <span>Véhicules confortables avec espace pour tous vos bagages</span>
              </li>
              <li className="flex">
                <span className="font-bold text-spero mr-2">✓</span>
                <span>Tarifs dégressifs pour les familles et groupes</span>
              </li>
            </ul>
            <Link 
              to="/#calculator"
              className="inline-flex items-center text-spero hover:underline"
            >
              Calculer mon tarif →
            </Link>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Destinations desservies</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex">
                <span className="font-bold text-spero mr-2">→</span>
                <Link to="/navette-aeroport-bruxelles-zaventem" className="hover:text-spero">
                  Aéroport de Bruxelles-Zaventem
                </Link>
              </li>
              <li className="flex">
                <span className="font-bold text-spero mr-2">→</span>
                <Link to="/navette-aeroport-charleroi" className="hover:text-spero">
                  Aéroport de Charleroi (Brussels South)
                </Link>
              </li>
              <li className="flex">
                <span className="font-bold text-spero mr-2">→</span>
                <Link to="/navette-aeroport-paris-cdg" className="hover:text-spero">
                  Aéroport de Paris Charles de Gaulle
                </Link>
              </li>
              <li className="flex">
                <span className="font-bold text-spero mr-2">→</span>
                <span>Aéroport d'Amsterdam Schiphol</span>
              </li>
            </ul>
            <Link 
              to="/services"
              className="inline-flex items-center text-spero hover:underline"
            >
              Voir tous nos services →
            </Link>
          </div>
        </div>
        
        {/* CTA final */}
        <div className="bg-spero text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Besoin d'une navette aéroport?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Que vous voyagiez seul, en couple ou en famille, notre service de navette vers Bruxelles Zaventem, Charleroi ou Paris CDG est la solution idéale pour commencer votre voyage sereinement.
          </p>
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