import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
    tags: ['navette aéroport', 'Zaventem', 'Charleroi', 'Paris CDG', 'voyage famille', 'enfants'],
    author: {
      name: 'Équipe Spero Navette',
      role: 'Expert en transport'
    },
    content: `
      <div class="intro-paragraph bg-gray-50 p-6 rounded-lg mb-8">
        <p>Voyager avec des enfants représente un défi logistique considérable, particulièrement lorsqu'il s'agit de se rendre à l'aéroport. Entre les bagages nombreux, les poussettes, les sièges auto et les horaires parfois très matinaux ou tardifs, l'organisation peut rapidement devenir complexe et stressante.</p>
        <p class="mt-3">Les familles qui partent en vacances ont des besoins spécifiques qui ne sont pas toujours pris en compte par les modes de transport traditionnels. C'est là que le service de navette aéroport devient une solution particulièrement avantageuse.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-spero mb-4">Pourquoi choisir une navette aéroport pour voyager en famille</h2>
      <p class="mb-6">Le service de navette aéroport comme celui proposé par Spero Navette offre de nombreux avantages pour les familles se rendant à Bruxelles Zaventem, Charleroi ou Paris CDG :</p>
      
      <div class="advantage-card bg-spero/10 p-6 rounded-lg mb-8 border-l-4 border-spero">
        <h3 class="text-xl font-bold text-spero mb-3">1. Confort et espace adaptés aux besoins familiaux</h3>
        <p class="mb-4">Les navettes aéroport sont généralement des véhicules spacieux, adaptés aux besoins des familles. Contrairement aux transports en commun souvent bondés, une navette offre :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Un espace suffisant pour tous les bagages</strong>, y compris les valises volumineuses, équipements de sport ou cadeaux pour la famille</li>
          <li><strong>La possibilité d'installer correctement les sièges auto</strong> pour les plus jeunes, garantissant leur sécurité tout au long du trajet</li>
          <li><strong>Un confort optimal</strong> avec climatisation, sièges confortables et la possibilité de faire des pauses si nécessaire</li>
        </ul>
        <p class="mt-4">Pour un trajet vers l'aéroport de Bruxelles Zaventem ou Charleroi, ce confort fait toute la différence, particulièrement avec des enfants en bas âge.</p>
      </div>
      
      <div class="advantage-card bg-purple-50 p-6 rounded-lg mb-8 border-l-4 border-purple-500">
        <h3 class="text-xl font-bold text-purple-700 mb-3">2. Économies significatives pour les familles</h3>
        <p class="mb-4">Contrairement aux idées reçues, la navette aéroport peut représenter une option économique pour les familles :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Tarifs dégressifs</strong> lorsque plusieurs personnes voyagent ensemble</li>
          <li><strong>Économies sur les frais de parking</strong> à l'aéroport, qui peuvent être très élevés pour des séjours de plusieurs jours</li>
          <li><strong>Évitement des coûts multiples</strong> de billets de transport en commun, particulièrement pour les trajets vers Paris CDG qui peuvent nécessiter plusieurs correspondances</li>
          <li><strong>Pas de frais supplémentaires pour les bagages</strong>, contrairement à certains services de transport</li>
        </ul>
        
        <div class="bg-white p-4 rounded-lg mt-4 border border-purple-200">
          <p class="font-semibold text-purple-800">💰 Exemple d'économies</p>
          <p>Une famille de quatre personnes voyageant vers l'aéroport de Paris CDG peut économiser entre 100€ et 200€ sur un aller-retour en choisissant une navette plutôt que d'autres options de transport.</p>
        </div>
      </div>
      
      <div class="advantage-card bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
        <h3 class="text-xl font-bold text-blue-700 mb-3">3. Réduction significative du stress</h3>
        <p class="mb-4">Le stress est souvent l'ennemi numéro un d'un voyage en famille réussi. La navette aéroport permet de réduire considérablement cette tension :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Service porte-à-porte</strong> qui évite les correspondances et les transferts multiples avec bagages et enfants</li>
          <li><strong>Horaires adaptés à votre vol</strong>, même pour les départs très matinaux ou les arrivées tardives</li>
          <li><strong>Chauffeur professionnel</strong> qui connaît parfaitement les routes et les conditions de circulation vers Zaventem, Charleroi ou Paris CDG</li>
          <li><strong>Assistance avec les bagages</strong>, un soulagement quand on voyage avec enfants et équipements</li>
        </ul>
        <p class="mt-4 italic text-blue-800">Ce confort mental est particulièrement précieux lors des périodes de vacances chargées comme les départs en été ou pendant les fêtes.</p>
      </div>
      
      <div class="advantage-card bg-green-50 p-6 rounded-lg mb-8 border-l-4 border-green-500">
        <h3 class="text-xl font-bold text-green-700 mb-3">4. Flexibilité et personnalisation</h3>
        <p class="mb-4">Les besoins d'une famille ne sont pas les mêmes que ceux d'un voyageur d'affaires. Les services de navette comme Spero Navette comprennent ces spécificités :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Possibilité de prévoir des sièges enfants</strong> adaptés à l'âge de vos enfants</li>
          <li><strong>Flexibilité pour les arrêts</strong> en cas de besoin (particulièrement important avec de jeunes enfants)</li>
          <li><strong>Adaptation aux horaires spécifiques</strong> de vos vols, même pendant les périodes de faible trafic</li>
          <li><strong>Prise en charge de tous les membres de la famille</strong> au même endroit, sans dispersion</li>
        </ul>
        <p class="mt-4">Cette personnalisation est particulièrement appréciable pour les trajets plus longs, comme ceux vers l'aéroport de Paris CDG.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-spero mb-4">Conseils pour maximiser votre expérience en navette aéroport</h2>
      
      <div class="bg-gray-50 p-6 rounded-lg mb-8">
        <p class="mb-4">Pour tirer le meilleur parti de votre service de navette aéroport en famille, voici quelques conseils pratiques :</p>
        <ol class="list-decimal pl-6 space-y-3">
          <li><strong>Réservez suffisamment à l'avance</strong>, particulièrement pendant les périodes de vacances scolaires où la demande est forte</li>
          <li><strong>Mentionnez l'âge et le nombre d'enfants</strong> lors de la réservation pour que le véhicule soit équipé en conséquence</li>
          <li><strong>Prévoyez une marge de temps confortable</strong> pour tenir compte d'éventuels imprévus sur la route</li>
          <li><strong>Préparez un petit sac avec des distractions</strong> pour les enfants pendant le trajet</li>
          <li><strong>Conservez le numéro du service client</strong> à portée de main en cas de besoin</li>
        </ol>
      </div>
      
      <div class="cta-box bg-spero/20 p-6 rounded-lg mb-8 text-center">
        <h3 class="text-xl font-bold text-spero mb-3">Prêt à réserver votre navette familiale?</h3>
        <p class="mb-4">Calculez votre tarif en quelques clics et réservez votre navette aéroport pour un voyage en famille sans stress.</p>
        <div class="inline-block bg-spero text-white font-bold px-6 py-3 rounded-lg hover:bg-opacity-90">
          <a href="/#calculator" class="block w-full h-full text-center">Calculer mon tarif</a>
        </div>
      </div>
    `
  }
  // Les autres articles seront ajoutés au fur et à mesure de leur rédaction
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
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-spero">Accueil</Link>
          <span className="mx-2">›</span>
          <Link to="/blog" className="hover:text-spero">Blog</Link>
          <span className="mx-2">›</span>
          <span>{post.title}</span>
        </div>
        
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-spero hover:underline mb-4">
            ← Retour au blog
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <div className="mr-6 mb-2">
              <span>📅 Publié le {formatDate(post.date)}</span>
            </div>
            <div className="mr-6 mb-2">
              <span>⏱️ Temps de lecture: {post.readTime}</span>
            </div>
            <div className="mb-2">
              <span className="inline-block bg-spero text-white text-xs px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* En-tête de l'article */}
        <div className="mb-8 bg-gradient-to-r from-spero/20 to-purple-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-spero">{post.title}</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{post.excerpt}</p>
        </div>
        
        {/* Auteur */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg flex items-center border-l-4 border-spero">
          <div className="w-12 h-12 bg-spero/20 rounded-full flex items-center justify-center text-spero font-bold text-xl mr-4">
            {post.author?.name.charAt(0) || 'S'}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.author?.name || 'Équipe Spero Navette'}</p>
            <p className="text-sm text-gray-600">{post.author?.role || 'Expert en transport'}</p>
          </div>
        </div>
        
        {/* Table des matières pour les longs articles */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Dans cet article:</h3>
          <ul className="space-y-1">
            <li>• Pourquoi choisir une navette aéroport pour voyager en famille</li>
            <li>• Confort et espace adaptés aux besoins familiaux</li>
            <li>• Économies significatives pour les familles</li>
            <li>• Réduction significative du stress</li>
            <li>• Flexibilité et personnalisation</li>
            <li>• Conseils pour maximiser votre expérience</li>
          </ul>
        </div>
        
        {/* Contenu de l'article */}
        <div 
          className="prose prose-lg max-w-none mb-8 prose-headings:text-spero prose-headings:font-bold prose-a:text-spero prose-a:font-semibold prose-strong:text-spero"
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
        
        {/* Partage et engagement */}
        <div className="border-t border-b border-gray-200 py-6 my-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <span className="font-semibold mr-3">Partagez cet article:</span>
              <button className="bg-blue-600 text-white rounded-full p-2 mx-1">f</button>
              <button className="bg-sky-500 text-white rounded-full p-2 mx-1">t</button>
              <button className="bg-blue-700 text-white rounded-full p-2 mx-1">in</button>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="font-semibold mr-2">Cet article vous a aidé?</span>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md mx-1">👍 Oui</button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md mx-1">👎 Non</button>
            </div>
          </div>
        </div>
        
        {/* Articles connexes - affichés seulement s'il y en a */}
        {relatedPosts.length > 0 && (
          <div className="my-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Articles connexes</h2>
            <div className="space-y-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-spero">
                  <Link 
                    to={`/blog/${relatedPost.id}`} 
                    className="text-xl font-semibold text-gray-800 hover:text-spero transition-colors block mb-2"
                  >
                    {relatedPost.title}
                  </Link>
                  <div className="text-sm text-gray-500 mb-3">
                    <span>📅 {formatDate(relatedPost.date)} • ⏱️ {relatedPost.readTime} de lecture</span>
                  </div>
                  <p className="text-gray-600 mb-3">{relatedPost.excerpt}</p>
                  <Link 
                    to={`/blog/${relatedPost.id}`}
                    className="inline-flex items-center text-spero hover:underline"
                  >
                    Lire l'article →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA final */}
        <div className="bg-gradient-to-r from-spero to-purple-700 text-white rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Besoin d'une navette aéroport pour votre famille?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Profitez de notre service de navette vers Bruxelles Zaventem, Charleroi ou Paris CDG. Transport confortable, tarifs familiaux avantageux et service personnalisé.
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

export default BlogPost;