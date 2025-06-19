import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plane, Clock, MapPin, CreditCard, Users, Shield, Phone, Calendar } from '../components/Icons';
import SEO from '../components/SEO';

const FAQItem = ({ question, answer, id, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4" id={id}>
      <button
        className="flex justify-between items-center w-full text-left font-medium text-lg hover:text-spero transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {Icon && <Icon className="h-5 w-5 text-spero mr-3" />}
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-spero flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5 text-spero flex-shrink-0" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 text-base leading-relaxed whitespace-pre-wrap pl-8">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const reservationFAQ = [
    {
      id: "reservation-delai",
      icon: Calendar,
      question: "Combien de temps à l'avance dois-je réserver ma navette aéroport ?",
      answer: "Nous recommandons de réserver votre navette aéroport au moins 48 heures à l'avance pour garantir la disponibilité, surtout en haute saison. Cependant, nous acceptons les réservations de dernière minute selon nos disponibilités. Pour une navette dans moins de 24h, appelez-nous directement au +32 490 197 914."
    },
    {
      id: "reservation-probleme",
      icon: Phone,
      question: "Je n'arrive pas à réserver ma navette aéroport en ligne, que faire ?",
      answer: "Si votre réservation de navette en ligne pose problème, vous pouvez nous joindre directement par téléphone au +32 490 197 914 ou par email à info@spero-navette.be. Notre équipe est disponible du lundi au vendredi de 10h à 19h et le samedi de 10h à 16h pour vous aider à réserver votre transport vers l'aéroport de Bruxelles-Zaventem, Charleroi ou toute autre destination."
    },
    {
      id: "reservation-modification",
      icon: Clock,
      question: "Puis-je modifier ma réservation de navette aéroport ?",
      answer: "Oui, les modifications sont possibles selon les disponibilités. Pour modifier l'heure, la date ou la destination de votre navette, contactez-nous le plus tôt possible. Les modifications demandées moins de 24h avant le départ ne peuvent pas toujours être garanties. Appelez-nous au +32 490 197 914 pour toute modification urgente."
    },
    {
      id: "reservation-groupe",
      icon: Users,
      question: "Comment réserver une navette pour un groupe vers l'aéroport ?",
      answer: "Pour les groupes de plus de 8 personnes se rendant à l'aéroport, nous pouvons organiser plusieurs véhicules ou un minibus adapté. Contactez-nous directement par téléphone ou email pour obtenir un devis personnalisé. Nous proposons des tarifs avantageux pour les groupes, que ce soit pour des voyages d'affaires ou de loisirs."
    }
  ];

  const serviceFAQ = [
    {
      id: "navette-privee-partagee",
      icon: Users,
      question: "Quelle est la différence entre navette privée et navette partagée ?",
      answer: "La navette privée est un transport exclusif pour vous et votre groupe uniquement. Vous bénéficiez d'un trajet direct sans arrêt supplémentaire entre votre domicile et l'aéroport. Le véhicule vous est entièrement dédié.\n\nLa navette partagée permet de réduire les coûts en partageant le transport avec d'autres passagers se rendant dans la même direction. Il peut y avoir 3 à 4 arrêts maximum. C'est une option économique qui reste confortable et ponctuelle."
    },
    {
      id: "zones-desservies",
      icon: MapPin,
      question: "Quelles zones desservez-vous pour les navettes aéroport ?",
      answer: "Nous desservons principalement le Grand Charleroi et ses environs : Pont-à-Celles, Courcelles, Fontaine-l'Évêque, Fleurus, Basse Sambre, Sambreville, Gerpinnes, Ham-sur-Heure, Thuin, Beaumont, Rance, Chimay, Couvin, Philippeville, Walcourt et toutes les communes du Hainaut.\n\nNous assurons des navettes vers tous les aéroports : Bruxelles-Zaventem, Charleroi, Paris CDG, Paris Orly, Amsterdam Schiphol, Cologne, Düsseldorf, Lille, Luxembourg et bien d'autres sur demande."
    },
    {
      id: "aeroports-desservis",
      icon: Plane,
      question: "Vers quels aéroports proposez-vous des navettes ?",
      answer: "Nos principales destinations sont :\n• Aéroport de Bruxelles-Zaventem (BRU)\n• Aéroport de Charleroi Brussels South (CRL)\n• Aéroport de Paris Charles de Gaulle (CDG)\n• Aéroport de Paris Orly (ORY)\n• Aéroport d'Amsterdam Schiphol (AMS)\n• Aéroport de Cologne (CGN)\n• Aéroport de Düsseldorf (DUS)\n• Aéroport de Lille (LIL)\n• Aéroport de Luxembourg (LUX)\n• Gare de Bruxelles-Midi (Thalys/Eurostar)\n\nNous desservons également tous les autres aéroports européens sur demande."
    },
    {
      id: "horaires-service",
      icon: Clock,
      question: "Proposez-vous des navettes pour les vols très matinaux ou tardifs ?",
      answer: "Oui, notre service de navette aéroport fonctionne 24h/24 et 7j/7. Nous adaptons nos horaires à tous les vols, qu'ils soient très matinaux (départs dès 3h du matin si nécessaire) ou très tardifs (retours de nuit). C'est particulièrement pratique pour les vols low-cost de Charleroi qui ont souvent des horaires décalés."
    }
  ];

  const pratiqueFAQ = [
    {
      id: "temps-trajet",
      icon: Clock,
      question: "Combien de temps avant mon vol dois-je partir ?",
      answer: "Nous calculons automatiquement l'heure de départ optimale en tenant compte de :\n• La distance entre votre domicile et l'aéroport\n• Les conditions de circulation habituelles\n• Une marge de sécurité\n• Les recommandations des aéroports (2h pour les vols européens, 3h pour les intercontinentaux)\n\nVotre chauffeur vous indiquera l'heure exacte de départ lors de la confirmation."
    },
    {
      id: "point-rencontre-retour",
      icon: MapPin,
      question: "Où mon chauffeur m'attendra-t-il à mon retour à l'aéroport ?",
      answer: "Voici les points de rencontre dans les principaux aéroports :\n\n• Bruxelles-Zaventem : Dans le hall des arrivées, devant le café JAVA (sur votre droite en sortant)\n• Charleroi : Devant les ascenseurs au niveau du parking express\n• Paris CDG : Au dépose-minute des départs du terminal concerné\n• Paris Orly : Dans le hall des arrivées\n• Amsterdam Schiphol : Au dépose-minute des départs\n• Lille : Devant le Sheraton, sortie à gauche\n\nVotre chauffeur vous attendra avec un panneau à votre nom."
    },
    {
      id: "vol-retard",
      icon: Plane,
      question: "Que se passe-t-il si mon vol a du retard ?",
      answer: "Pas d'inquiétude ! Nos chauffeurs suivent les vols en temps réel grâce à des outils professionnels. Si votre vol a du retard, votre chauffeur adaptera automatiquement l'heure de prise en charge. Vous n'avez rien à faire.\n\nPour les retards importants (plusieurs heures) ou les annulations, nous vous conseillons de nous prévenir par téléphone pour organiser au mieux votre navette retour."
    },
    {
      id: "bagages",
      icon: Users,
      question: "Combien de bagages puis-je emporter dans la navette ?",
      answer: "Nos véhicules disposent d'un espace généreux pour les bagages. En règle générale :\n• 1 bagage en soute + 1 bagage à main par personne\n• Pour plus de bagages, prévenez-nous lors de la réservation\n• Nous adaptons le véhicule selon vos besoins\n• Pas de supplément pour les bagages standards\n\nPour les équipements spéciaux (skis, golf, etc.), merci de nous prévenir à l'avance."
    }
  ];

  const paiementFAQ = [
    {
      id: "modes-paiement",
      icon: CreditCard,
      question: "Quels sont les modes de paiement acceptés pour la navette ?",
      answer: "Nous proposons plusieurs options de paiement :\n\n• En espèces : Payez directement au chauffeur le jour de votre navette\n• Bancontact : Paiement par carte au chauffeur (dans les véhicules équipés)\n• Virement bancaire : Pour payer à l'avance (minimum 5 jours avant)\n• Facturation : Pour les entreprises et indépendants avec numéro de TVA\n\nLe mode de paiement est à choisir lors de votre réservation."
    },
    {
      id: "prix-calcul",
      icon: CreditCard,
      question: "Comment sont calculés les prix des navettes aéroport ?",
      answer: "Nos tarifs sont transparents et calculés selon :\n• La distance entre votre adresse et l'aéroport\n• Le type de service (navette privée ou partagée)\n• Le nombre de passagers\n• L'horaire (pas de supplément nuit/weekend)\n\nUtilisez notre calculateur en ligne pour obtenir un prix instantané. Les prix affichés sont définitifs, sans frais cachés. Tarifs spéciaux pour les groupes."
    },
    {
      id: "annulation-frais",
      icon: Shield,
      question: "Quels sont les frais d'annulation ?",
      answer: "Notre politique d'annulation est flexible :\n• Annulation gratuite jusqu'à 12h avant le départ\n• Moins de 12h avant : 50% du montant avec minimum 50€\n• Modification gratuite selon disponibilités\n\nEn cas de force majeure (grève, annulation de vol avec justificatif), nous étudions chaque situation individuellement."
    }
  ];

  const securiteFAQ = [
    {
      id: "enfants-sieges",
      icon: Users,
      question: "Proposez-vous des sièges enfant pour les navettes ?",
      answer: "Oui, nous fournissons gratuitement tous les équipements nécessaires :\n• Sièges bébé (0-13 kg)\n• Sièges enfant (9-18 kg)\n• Réhausseurs (15-36 kg)\n\nMerci de préciser lors de votre réservation l'âge et le nombre d'enfants. Nos chauffeurs installent les sièges selon les normes de sécurité. Service entièrement gratuit."
    },
    {
      id: "animaux",
      icon: Shield,
      question: "Puis-je emmener mon animal de compagnie dans la navette ?",
      answer: "Oui, les animaux de compagnie sont acceptés dans nos navettes selon les conditions suivantes :\n• L'animal doit voyager dans sa cage de transport\n• La cage est placée dans le coffre du véhicule\n• Mêmes conditions que pour un transport en avion\n• À signaler lors de la réservation\n\nPour les chiens d'assistance, des arrangements spéciaux peuvent être faits."
    },
    {
      id: "assurance-securite",
      icon: Shield,
      question: "Quelle assurance couvre mon transport en navette ?",
      answer: "Tous nos transports sont couverts par :\n• Une assurance responsabilité civile professionnelle\n• Une assurance passagers complète\n• Des véhicules contrôlés et entretenus régulièrement\n• Des chauffeurs professionnels formés et expérimentés\n\nVous voyagez en toute sécurité et sérénité avec Spero Navette."
    }
  ];

  // Création des données structurées FAQ
  const allFAQItems = [...reservationFAQ, ...serviceFAQ, ...pratiqueFAQ, ...paiementFAQ, ...securiteFAQ];
  
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFAQItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="FAQ Navette Aéroport Bruxelles Charleroi | Questions fréquentes"
        description="Toutes les réponses à vos questions sur notre service de navette aéroport. Réservation, tarifs, horaires, zones desservies depuis le Hainaut vers Bruxelles, Charleroi, Paris CDG."
        keywords="FAQ navette aéroport, questions transport aéroport, réservation navette Bruxelles, navette Charleroi questions, horaires navette aéroport, tarifs transport aéroport"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </SEO>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-spero mb-4 text-center">
              Questions Fréquentes - Service de Navette Aéroport
            </h1>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Retrouvez toutes les réponses concernant notre service de navette aéroport 
              depuis le Grand Charleroi et le Hainaut vers Bruxelles-Zaventem, Charleroi, 
              Paris CDG et toutes les destinations européennes.
            </p>

            {/* Réservation et Organisation */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-spero mr-3" />
                Réservation et organisation de votre navette
              </h2>
              <div className="divide-y divide-gray-200">
                {reservationFAQ.map((item) => (
                  <FAQItem
                    key={item.id}
                    id={item.id}
                    icon={item.icon}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>

            {/* Services et Destinations */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Plane className="h-6 w-6 text-spero mr-3" />
                Nos services et destinations
              </h2>
              <div className="divide-y divide-gray-200">
                {serviceFAQ.map((item) => (
                  <FAQItem
                    key={item.id}
                    id={item.id}
                    icon={item.icon}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>

            {/* Informations Pratiques */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-spero mr-3" />
                Informations pratiques pour votre voyage
              </h2>
              <div className="divide-y divide-gray-200">
                {pratiqueFAQ.map((item) => (
                  <FAQItem
                    key={item.id}
                    id={item.id}
                    icon={item.icon}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>

            {/* Paiement et Tarification */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-spero mr-3" />
                Paiement et tarification
              </h2>
              <div className="divide-y divide-gray-200">
                {paiementFAQ.map((item) => (
                  <FAQItem
                    key={item.id}
                    id={item.id}
                    icon={item.icon}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>

            {/* Sécurité et Confort */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-spero mr-3" />
                Sécurité et confort
              </h2>
              <div className="divide-y divide-gray-200">
                {securiteFAQ.map((item) => (
                  <FAQItem
                    key={item.id}
                    id={item.id}
                    icon={item.icon}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>

            {/* Contact pour autres questions */}
            <div className="mt-12 bg-spero/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-spero mb-4 text-center">
                Vous ne trouvez pas la réponse à votre question ?
              </h2>
              <p className="text-gray-700 mb-6 text-center">
                Notre équipe est à votre disposition pour répondre à toutes vos questions 
                concernant votre navette aéroport.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex-1 bg-white p-4 rounded-md shadow text-center">
                  <Phone className="h-8 w-8 text-spero mx-auto mb-2" />
                  <h3 className="font-medium mb-2">Par téléphone</h3>
                  <a href="tel:+32490197914" className="text-spero font-bold hover:underline">
                    +32 490 197 914
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Lun-Ven : 10h-19h<br />
                    Sam : 10h-16h
                  </p>
                </div>
                <div className="flex-1 bg-white p-4 rounded-md shadow text-center">
                  <CreditCard className="h-8 w-8 text-spero mx-auto mb-2" />
                  <h3 className="font-medium mb-2">Par email</h3>
                  <a href="mailto:info@spero-navette.be" className="text-spero font-bold hover:underline">
                    info@spero-navette.be
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Réponse rapide garantie<br />
                    7 jours sur 7
                  </p>
                </div>
              </div>
            </div>

            {/* CTA final */}
            <div className="mt-8 text-center">
              <p className="mb-4 text-gray-700">
                Prêt à réserver votre navette aéroport ?
              </p>
              <a href="/#calculator" className="inline-block bg-spero text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Calculer le prix de ma navette
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;