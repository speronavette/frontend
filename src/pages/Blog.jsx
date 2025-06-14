import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CalendarDays, Clock, ChevronRight, Search } from 'lucide-react';

// Données des articles de blog (à remplacer par des données dynamiques provenant d'une API/base de données)
const blogPostsData = [
  {
    id: 'voyager-famille-avantages-navette',
    title: 'Voyager en famille : les avantages d\'une navette aéroport',
    excerpt: 'Découvrez pourquoi choisir une navette aéroport est la solution idéale pour les familles qui voyagent vers Bruxelles Zaventem, Charleroi ou Paris CDG. Confort, économies et tranquillité assurés.',
    date: '2025-06-14',
    readTime: '7 min',
    image: '/images/blog/family-shuttle.jpg',
    category: 'Famille',
    tags: ['navette aéroport', 'Zaventem', 'Charleroi', 'Paris CDG', 'voyage famille', 'enfants']
  },
  {
    id: 'conseils-voyage-aerien-2025',
    title: 'Les meilleurs conseils pour voyager en avion en 2025',
    excerpt: 'Découvrez nos astuces pour rendre votre voyage aérien plus confortable et moins stressant.',
    date: '2025-06-10',
    readTime: '6 min',
    image: '/images/blog/air-travel-tips.jpg',
    category: 'Conseils',
    tags: ['voyage', 'avion', 'confort', 'astuces', 'navette aéroport']
  },
  {
    id: 'guide-aeroport-charleroi',
    title: 'Guide complet de l\'aéroport de Charleroi : tout ce que vous devez savoir',
    excerpt: 'Un guide détaillé pour naviguer facilement dans l\'aéroport de Charleroi, des enregistrements jusqu\'aux meilleures options de restauration.',
    date: '2025-05-28',
    readTime: '8 min',
    image: '/images/blog/charleroi-airport.jpg',
    category: 'Guides',
    tags: ['aéroport', 'Charleroi', 'guide', 'voyage', 'navette Charleroi']
  },
  {
    id: 'economiser-transport-aeroport',
    title: 'Comment économiser sur vos transports vers l\'aéroport',
    excerpt: 'Comparez les différentes options de transport et découvrez comment réduire vos frais de déplacement vers les aéroports de Belgique.',
    date: '2025-05-15',
    readTime: '5 min',
    image: '/images/blog/airport-transport.jpg',
    category: 'Économie',
    tags: ['budget', 'transport', 'économies', 'navette aéroport', 'Zaventem', 'Charleroi']
  },
  {
    id: 'navette-vs-taxi-aeroport',
    title: 'Navette vs Taxi pour l\'aéroport : quelle est la meilleure option?',
    excerpt: 'Analyse comparative détaillée entre les services de navette et les taxis pour vos transferts aéroport. Prix, confort, et praticité.',
    date: '2025-04-22',
    readTime: '7 min',
    image: '/images/blog/shuttle-vs-taxi.jpg',
    category: 'Comparaison',
    tags: ['navette', 'taxi', 'transfert', 'aéroport', 'Zaventem', 'Paris CDG']
  },
  {
    id: 'voyage-enfants-aeroport',
    title: 'Voyager avec des enfants : guide de survie pour les aéroports',
    excerpt: 'Conseils pratiques pour faciliter le passage à l\'aéroport avec vos enfants et rendre l\'expérience moins stressante pour toute la famille.',
    date: '2025-04-05',
    readTime: '9 min',
    image: '/images/blog/family-airport.jpg',
    category: 'Famille',
    tags: ['enfants', 'famille', 'voyage', 'stress', 'navette famille']
  },
  {
    id: 'aeroports-paris-comparaison',
    title: 'CDG vs Orly : quel aéroport de Paris choisir?',
    excerpt: 'Comparaison complète entre les deux principaux aéroports parisiens pour vous aider à choisir le plus adapté à vos besoins de voyage.',
    date: '2025-03-18',
    readTime: '6 min',
    image: '/images/blog/paris-airports.jpg',
    category: 'Comparaison',
    tags: ['Paris', 'CDG', 'Orly', 'aéroport', 'navette Paris CDG']
  }
];

// Composant pour les catégories et tags
const Categories = ({ categories, selectedCategory, onCategoryChange }) => {
  const allCategories = ['Tous', ...new Set(categories)];
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Catégories</h3>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category
                ? 'bg-spero text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Composant pour les tags populaires
const PopularTags = ({ tags, onTagSelect }) => {
  // Obtenir les tags uniques et les limiter à 10
  const uniqueTags = [...new Set(tags)].slice(0, 10);
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Tags populaires</h3>
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200"
            onClick={() => onTagSelect(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// Composant carte d'article de blog
const BlogCard = ({ post }) => {
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${post.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.image || '/images/blog/placeholder.jpg'} 
            alt={post.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/images/blog/placeholder.jpg';
            }}
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-spero text-white text-xs px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{formatDate(post.date)}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime} de lecture</span>
        </div>
        
        <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-spero transition-colors">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <Link 
          to={`/blog/${post.id}`}
          className="inline-flex items-center text-spero hover:underline"
        >
          Lire l'article
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </article>
  );
};

// Composant principal du blog
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [filteredPosts, setFilteredPosts] = useState(blogPostsData);
  
  // Extraire toutes les catégories des articles
  const allCategories = [...new Set(blogPostsData.map(post => post.category))];
  
  // Extraire tous les tags des articles
  const allTags = blogPostsData.reduce((tags, post) => [...tags, ...post.tags], []);
  
  // Filtrer les posts en fonction des critères
  useEffect(() => {
    let result = blogPostsData;
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(term) || 
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(result);
  }, [searchTerm, selectedCategory]);
  
  // Gestionnaire pour le clic sur un tag
  const handleTagSelect = (tag) => {
    setSearchTerm(tag);
  };
  
  return (
    <>
      <SEO 
        title="Blog Spero Navette | Conseils pour voyager vers les aéroports de Bruxelles et Paris"
        description="Découvrez nos conseils de voyage, guides d'aéroports et astuces pour vos transferts vers Zaventem, Charleroi et Paris CDG. Blog spécialisé en navette aéroport et voyages en famille."
        keywords="navette aéroport, Zaventem, Charleroi, Paris CDG, transport aéroport, voyage famille, guide aéroport, transfert aéroport"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Spero Navette</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conseils de voyage, guides d'aéroport et astuces pour vos transferts vers Bruxelles Zaventem, Charleroi et Paris CDG
          </p>
        </div>
        
        <div className="mb-10">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Rechercher dans le blog..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-spero/50 focus:border-spero pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal - Articles */}
          <div className="lg:col-span-2">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Aucun article ne correspond à votre recherche. Essayez avec d'autres termes ou catégories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Tous');
                  }}
                  className="px-4 py-2 bg-spero text-white rounded-md hover:bg-spero/90 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Categories 
                categories={allCategories} 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <div className="border-t border-gray-200 my-6 pt-6">
                <PopularTags tags={allTags} onTagSelect={handleTagSelect} />
              </div>
              
              <div className="border-t border-gray-200 my-6 pt-6">
                <h3 className="text-lg font-semibold mb-3">Articles récents</h3>
                <div className="space-y-4">
                  {blogPostsData.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-start space-x-3">
                      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={post.image || '/images/blog/placeholder.jpg'} 
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-spero"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 my-6 pt-6">
                <h3 className="text-lg font-semibold mb-3">Besoin d'une navette aéroport?</h3>
                <p className="text-gray-600 mb-4">
                  Réservez votre navette aéroport pour Bruxelles Zaventem, Charleroi ou Paris CDG et profitez d'un service de transport confortable et fiable.
                </p>
                <Link 
                  to="/#calculator"
                  className="inline-block w-full text-center bg-spero text-white px-4 py-2 rounded-md hover:bg-spero/90 transition-colors"
                >
                  Calculer mon tarif
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;