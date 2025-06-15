import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Users, MapPin, CheckCircle, Phone, Mail, Shield, Star } from 'lucide-react';

// Lazy load du composant SEO
const SEO = lazy(() => import('../components/SEO'));

// Données statiques extraites pour éviter les re-créations
const AIRPORTS = [
  { code: 'BRU', nom: 'Aéroport de Bruxelles', pays: 'Belgique' },
  { code: 'CRL', nom: 'Aéroport de Charleroi', pays: 'Belgique' },
  { code: 'CDG', nom: 'Aéroport de Paris Charles de Gaulle', pays: 'France' },
  { code: 'CGN', nom: 'Aéroport de Cologne', pays: 'Allemagne' },
  { code: 'DUS', nom: 'Aéroport de Düsseldorf', pays: 'Allemagne' },
  { code: 'AMS', nom: "Aéroport d'Amsterdam", pays: 'Pays-Bas' },
  { code: 'LIL', nom: 'Aéroport de Lille', pays: 'France' },
  { code: 'ZYR', nom: 'Gare de Bruxelles-Midi', pays: 'Belgique' },
  { code: 'ORY', nom: 'Aéroport de Paris Orly', pays: 'France' },
  { code: 'LUX', nom: 'Aéroport de Luxembourg', pays: 'Luxembourg' }
];

const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Spero Navette - Service de Navette Aéroport",
  "url": "https://www.spero-navette.be/",
  "telephone": "+32490197914",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Service disponible dans tout le Hainaut",
    "addressLocality": "Charleroi",
    "postalCode": "6000",
    "addressCountry": "BE"
  },
  "areaServed": ["Grand Charleroi", "Pont-à-Celles", "Courcelles", "Fontaine-l'Évêque"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
});

const FAQ_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Quelles zones desservez-vous pour vos navettes aéroport ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Nous desservons principalement le Grand Charleroi et tout le Hainaut."
    }
  }]
});

// Import dynamique des fonctions lourdes
const calculatePriceAsync = () => import('../data/prices').then(m => m.calculatePrice);
const postalCodesDBAsync = () => import('../data/postalCodes').then(m => m.postalCodesDB);

function Home() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [commune, setCommune] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState({});
  const [postalCodesDB, setPostalCodesDB] = useState(null);

  // Chargement asynchrone de la base de codes postaux
  React.useEffect(() => {
    postalCodesDBAsync().then(db => setPostalCodesDB(db));
  }, []);

  const handlePostalCodeChange = useCallback((e) => {
    const code = e.target.value;
    setPostalCode(code);
    
    if (code.length === 4 && postalCodesDB) {
      const foundCommune = postalCodesDB[code];
      setCommune(foundCommune || 'Code postal non trouvé');
    } else {
      setCommune('');
    }
  }, [postalCodesDB]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!passengers) newErrors.passengers = "Veuillez sélectionner le nombre de passagers";
    if (!postalCode || postalCode.length !== 4) newErrors.postalCode = "Veuillez entrer un code postal valide";
    if (!destination) newErrors.destination = "Veuillez sélectionner une destination";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [passengers, postalCode, destination]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Chargement asynchrone de calculatePrice
    const calculatePrice = await calculatePriceAsync();
    const prices = calculatePrice(postalCode, destination, passengers);
  
    navigate('/result', {
      state: {
        passengers,
        postalCode,
        commune,
        destination: {
          code: destination,
          nom: AIRPORTS.find(a => a.code === destination)?.nom
        },
        prices,
        noPriceFound: prices.sharedPrice === 0 && prices.privatePrice === 0
      }
    });
  }, [validateForm, navigate, passengers, postalCode, commune, destination]);

  // Mémoisation des options de sélection
  const passengerOptions = useMemo(() => 
    [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
      <option key={num} value={num}>{num}</option>
    )), []
  );

  return (
    <>
      <Suspense fallback={null}>
        <SEO
          title="Navette Aéroport Charleroi Bruxelles | Transport 24h/7j | Spero Navette"
          description="Service de navette aéroport depuis le Grand Charleroi et environs vers Bruxelles-Zaventem, Charleroi, Paris CDG, Cologne, Amsterdam. Réservation en ligne, prix compétitifs. ☎ 0490/19.79.14"
          keywords="navette aéroport Charleroi, navette aéroport Bruxelles, transport aéroport Zaventem"
          canonicalUrl="https://www.spero-navette.be/">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_DATA }} />
        </SEO>
      </Suspense>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Contenu critique au-dessus du pli */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-spero mb-4 text-center">
            Navette Aéroport Charleroi - Bruxelles - Paris
          </h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-4">
            Service professionnel de navette aéroport depuis le <strong>Grand Charleroi</strong> et tout le Hainaut
          </p>
        </section>

        {/* Calculateur de prix - Élément principal LCP */}
        <section id="calculator" className="max-w-md mx-auto mb-16 scroll-mt-24">
          <div className="bg-white rounded-lg border-2 border-spero/20 shadow-xl">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Calculez le prix de votre navette aéroport
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="passengers" className="block text-center mb-2 font-medium">
                    Nombre de personnes :
                  </label>
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className={`w-full p-2 border ${errors.passengers ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                    required
                  >
                    <option value="">Sélectionnez</option>
                    {passengerOptions}
                  </select>
                  {errors.passengers && (
                    <p className="mt-1 text-sm text-red-500">{errors.passengers}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-center mb-2 font-medium">
                    Code postal de départ :
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    className={`w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                    maxLength="4"
                    inputMode="numeric"
                    placeholder="Ex: 6000 pour Charleroi"
                    required
                  />
                  {commune && (
                    <p className="mt-1 text-sm text-gray-600 text-center">{commune}</p>
                  )}
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="destination" className="block text-center mb-2 font-medium">
                    Aéroport de destination :
                  </label>
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={`w-full p-2 border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-spero focus:ring-1 focus:ring-spero`}
                    required
                  >
                    <option value="">Sélectionnez votre aéroport</option>
                    <optgroup label="Aéroports principaux">
                      <option value="BRU">Bruxelles-Zaventem (BRU)</option>
                      <option value="CRL">Charleroi Brussels South (CRL)</option>
                      <option value="CDG">Paris Charles de Gaulle (CDG)</option>
                      <option value="CGN">Cologne (CGN)</option>
                      <option value="DUS">Düsseldorf (DUS)</option>
                      <option value="AMS">Amsterdam Schiphol (AMS)</option>
                      <option value="LIL">Lille (LIL)</option>
                    </optgroup>
                    <optgroup label="Autres destinations">
                      <option value="ZYR">Gare de Bruxelles-Midi</option>
                      <option value="ORY">Paris Orly (ORY)</option>
                      <option value="LUX">Luxembourg (LUX)</option>
                    </optgroup>
                  </select>
                  {errors.destination && (
                    <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-spero text-white p-3 rounded-md hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">CALCULER LE TARIF</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Lazy load du reste du contenu */}
        <LazyContent />
      </div>
    </>
  );
}

// Composant pour le contenu non-critique (chargé après)
const LazyContent = React.memo(() => {
  return (
    <>
      {/* Zones desservies */}
      <section className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Votre navette aéroport depuis votre commune
        </h2>
        <div className="text-center">
          <p className="mb-3 text-lg">
            <strong>Zones principales desservies :</strong>
          </p>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Grand Charleroi • Pont-à-Celles • Courcelles • Fontaine-l'Évêque • Fleurus • 
            Basse Sambre • Sambreville • Gerpinnes • Ham-sur-Heure • Thuin • Beaumont • 
            Rance • Chimay • Couvin • Philippeville • Walcourt • <strong>et toutes les autres communes du Hainaut</strong>
          </p>
        </div>
      </section>

      {/* Avantages clés */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
          Pourquoi choisir Spero Navette pour vos transferts aéroport ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdvantageCard icon={Clock} title="Service 24h/7j" description="Navettes disponibles à toute heure pour tous vos vols" />
          <AdvantageCard icon={MapPin} title="Prise en charge à domicile" description="Nous venons vous chercher directement chez vous" />
          <AdvantageCard icon={Shield} title="Ponctualité garantie" description="Suivi des vols en temps réel, jamais de retard" />
          <AdvantageCard icon={Users} title="Navette privée ou partagée" description="Choisissez selon vos besoins et votre budget" />
        </div>
      </section>

      {/* Services par aéroport */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
          Nos principales liaisons navette aéroport
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <ServiceCard 
            title="Navette Aéroport de Bruxelles-Zaventem"
            description="Service de navette quotidien entre le Hainaut et l'aéroport de Bruxelles. Idéal pour vos vols internationaux et européens."
            features={[
              "Trajet direct depuis votre domicile",
              "Durée moyenne: 50-70 minutes depuis Charleroi",
              "Dépose directe au terminal de départ"
            ]}
          />
          <ServiceCard 
            title="Navette Aéroport de Charleroi Brussels South"
            description="L'aéroport le plus proche pour les habitants du Hainaut. Parfait pour vos vols low-cost et destinations européennes."
            features={[
              "Service express depuis tout le Hainaut",
              "Durée: 20-45 minutes selon votre commune",
              "Idéal pour Ryanair, Wizz Air, etc."
            ]}
          />
        </div>
      </section>

      {/* Contact rapide */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-spero mb-6">
          Réservez votre navette aéroport maintenant
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Service disponible 24h/24 et 7j/7 pour tous les aéroports
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#calculator" className="bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
            <span className="mr-2">Calculer mon tarif</span>
            <ArrowRight size={18} />
          </a>
          <a href="tel:+32490197914" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center">
            <Phone size={18} className="mr-2" />
            <span>0490 19 79 14</span>
          </a>
          <a href="mailto:info@spero-navette.be" className="bg-white border-2 border-spero text-spero px-6 py-3 rounded-md hover:bg-spero/5 transition-colors flex items-center justify-center">
            <Mail size={18} className="mr-2" />
            <span>Demander un devis</span>
          </a>
        </div>
      </section>

      {/* Témoignages */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />
    </>
  );
});

// Composants optimisés
const AdvantageCard = React.memo(({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center">
    <Icon className="h-12 w-12 text-spero mx-auto mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
));

const ServiceCard = React.memo(({ title, description, features }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-xl font-semibold mb-4 text-spero">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="space-y-2 text-gray-700">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-spero mr-2 mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
));

const TestimonialsSection = React.memo(() => (
  <section className="mb-16">
    <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
      Nos clients témoignent
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      <TestimonialCard 
        text="Première expérience et nous avons été très satisfait. Départ à l'heure et il nous attendait à la sortie de l'aéroport. Que demander de mieux! Merci"
        author="Bénédicte V. de Couvin"
      />
      <TestimonialCard 
        text="Vous recherchez une navette de confiance ?? Alors n'hésitez plus... Patron plus qu'humain, d'une gentillesse et hyper arrangeant, nous vous remercions pour tout"
        author="Mélissa K. de Mettet"
      />
      <TestimonialCard 
        text="Très contents de notre prise en charge pour un transfert aller/retour sur l'aéroport de Charleroi. Les horaires étaient respectés, le trajet sympathique."
        author="Sindy D. de Fosses-la-Ville"
      />
    </div>
  </section>
));

const TestimonialCard = React.memo(({ text, author }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-4">{text}</p>
    <p className="font-medium">- {author}</p>
  </div>
));

const FAQSection = React.memo(() => (
  <section className="mb-16">
    <h2 className="text-3xl font-semibold text-spero mb-8 text-center">
      Questions fréquentes sur nos navettes aéroport
    </h2>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        <FAQItem 
          question="Combien de temps à l'avance dois-je réserver ma navette aéroport ?"
          answer="Nous recommandons de réserver au moins 48h à l'avance. Pour les réservations de dernière minute (moins de 24h), appelez-nous directement au 0490 19 79 14 pour vérifier les disponibilités."
        />
        <FAQItem 
          question="Que se passe-t-il si mon vol a du retard ?"
          answer="Nos chauffeurs suivent les vols en temps réel. En cas de retard, votre chauffeur adaptera automatiquement l'heure de prise en charge. Vous n'avez rien à faire, nous nous occupons de tout."
        />
      </div>
      <div className="mt-6 text-center">
        <a href="/#/faq" className="text-spero font-medium hover:underline">
          Voir toutes les questions fréquentes →
        </a>
      </div>
    </div>
  </section>
));

const FAQItem = React.memo(({ question, answer }) => (
  <div>
    <h3 className="text-lg font-medium mb-2">{question}</h3>
    <p className="text-gray-700">{answer}</p>
  </div>
));

export default Home;