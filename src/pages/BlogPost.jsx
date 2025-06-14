import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { CalendarDays, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

// Données des articles de blog (la suite du précédent artifact)
const blogPostsData = [
  // L'article précédent sur le voyage en famille est déjà défini dans l'autre artifact
  {
    id: 'conseils-voyage-aerien-2025',
    title: 'Les meilleurs conseils pour voyager en avion en 2025',
    excerpt: 'Découvrez nos astuces pour rendre votre voyage aérien plus confortable et moins stressant.',
    date: '2025-06-10',
    readTime: '6 min',
    image: '/images/blog/air-travel-tips.jpg',
    category: 'Conseils',
    tags: ['voyage', 'avion', 'confort', 'astuces', 'navette aéroport'],
    author: {
      name: 'Sophie Dubois',
      role: 'Experte en voyage',
      image: '/images/team/sophie.jpg'
    },
    content: `
      <h2>Se préparer avant le vol</h2>
      <p>La préparation est la clé d'un voyage aérien réussi. En 2025, avec l'augmentation constante du nombre de voyageurs, prendre quelques précautions avant votre départ peut faire toute la différence.</p>
      <p>Commencez par vérifier les dernières exigences de votre compagnie aérienne concernant les bagages. Les politiques ont considérablement évolué ces dernières années, avec des restrictions plus strictes sur les dimensions et le poids des bagages à main. Utilisez une application de liste de contrôle pour vous assurer de n'avoir oublié aucun essentiel.</p>
      
      <h2>Optimiser votre temps à l'aéroport</h2>
      <p>L'enregistrement en ligne est devenu la norme, mais saviez-vous que de nombreux aéroports proposent désormais des services premium accessibles à tous les voyageurs moyennant un supplément raisonnable ? Des files d'attente express aux salons tranquilles, ces options peuvent transformer votre expérience à l'aéroport.</p>
      <p>Pour les voyageurs réguliers, investir dans un programme de voyageur de confiance peut vous faire économiser des heures cumulées d'attente aux contrôles de sécurité.</p>
    `
  },
  // Autres articles peuvent être ajoutés ici
];

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    // Trouver l'article correspondant à l'ID
    const foundPost = blogPostsData.find(p => p.id === postId);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Trouver des articles connexes basés sur les tags ou la catégorie
      const related = blogPostsData
        .filter(p => p.id !== postId && (
          p.category === foundPost.category || 
          p.tags.some(tag => foundPost.tags.includes(tag))
        ))
        .slice(0, 3); // Limiter à 3 articles connexes
      
      setRelatedPosts(related);
      
      // Définir le titre de la page
      document.title = `${foundPost.title} | Blog Spero Navette`;
    } else {
      // Rediriger vers la page blog si l'article n'existe pas
      navigate('/blog');
    }
  }, [postId, navigate]);
  
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-spero border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <>
      <SEO 
        title={`${post.title} | Blog Spero Navette`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-spero hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} de lecture</span>
            </div>
            <div className="mb-2">
              <span className="inline-block bg-spero text-white text-xs px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Image de l'article */}
        <div className="mb-8">
          <img 
            src={post.image || '/images/blog/placeholder.jpg'} 
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
            style={{ maxHeight: '500px' }}
            onError={(e) => {
              e.target.src = '/images/blog/placeholder.jpg';
            }}
          />
        </div>
        
        {/* Auteur */}
        <div className="mb-8 flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img 
              src={post.author?.image || '/images/team/default.jpg'} 
              alt={post.author?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/team/default.jpg';
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.author?.name || 'Équipe Spero Navette'}</p>
            <p className="text-sm text-gray-600">{post.author?.role || 'Expert en transport'}</p>
          </div>
        </div>
        
        {/* Contenu de l'article */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link 
                key={tag}
                to={`/blog?tag=${tag}`}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Partage */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Partager cet article
          </h3>
          <div className="flex space-x-3">
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              aria-label="Partager sur Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"
              aria-label="Partager sur Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`J'ai pensé que cet article pourrait t'intéresser : ${window.location.href}`)}`}
              className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
              aria-label="Partager par email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Articles connexes */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/blog/${relatedPost.id}`} className="block">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedPost.image || '/images/blog/placeholder.jpg'} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 hover:text-spero transition-colors">{relatedPost.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(relatedPost.date)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA */}
        <div className="bg-spero text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Besoin d'une navette aéroport?</h2>
          <p className="mb-6">
            Que vous voyagiez seul, en couple ou en famille, notre service de navette vers Bruxelles Zaventem, Charleroi ou Paris CDG est la solution idéale pour commencer votre voyage sereinement.
          </p>
          <Link 
            to="/#calculator"
            className="inline-block bg-white text-spero px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Calculer mon tarif
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogPost;