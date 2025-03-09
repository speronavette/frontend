import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4" id={id}>
      <button
        className="flex justify-between items-center w-full text-left font-medium text-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-spero flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5 text-spero flex-shrink-0" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 text-base leading-relaxed whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  useEffect(() => {
    window.updatePageTitle("FAQ Navette Aéroport Bruxelles Charleroi | Questions fréquentes transport");
  }, []);

  const faqItems = [
    {
      id: "reservation-probleme",
      question: "Je n'arrive pas à faire ma demande de réservation de navette aéroport en ligne, quelles sont les alternatives ?",
      answer: "Si votre réservation de navette en ligne pose problème, vous pouvez nous joindre directement par téléphone au +32 490 197 914 ou par email à info@spero-navette.be entre 9h et 17h du lundi au vendredi et le samedi de 9h à 17h. Notre équipe sera ravie de vous aider à réserver votre transport entre votre domicile et l'aéroport de Bruxelles ou Charleroi."
    },
    {
      id: "chauffeur-presence",
      question: "Comment puis-je être certain(e) que mon chauffeur de navette sera bien présent lors de mon départ pour l'aéroport ?",
      answer: "Spero Navette vous envoie systématiquement un SMS la veille de votre départ vous confirmant l'heure de prise en charge pour le lendemain. Ce message précise les détails de votre navette pour l'aéroport de Bruxelles-Zaventem ou Charleroi. Vous pouvez également nous appeler au +32 490 197 914 ou nous envoyer un email à info@spero-navette.be afin d'être rassuré sur la coordination de votre transport aéroport."
    },
    {
      id: "reservation-derniere-minute",
      question: "Je pars demain, je n'ai pas de moyen de locomotion pour me rendre à l'aéroport de Bruxelles, est-il encore possible de réserver une navette ?",
      answer: "Si votre réservation de navette aéroport est faite moins de 48h avant le départ, il y a lieu de prendre contact avec notre numéro d'urgence +32 490 197 914 afin de voir si nous pouvons encore trouver un chauffeur disponible pour vous. Nous faisons notre maximum pour organiser des navettes de dernière minute vers les aéroports de Bruxelles-Zaventem et Charleroi, dans la limite des disponibilités."
    },
    {
      id: "multiples-etapes",
      question: "Je souhaite voyager avec des personnes ne vivant pas sous mon toit et j'aimerais que le chauffeur de navette fasse plusieurs étapes avant d'aller à l'aéroport de Charleroi, est-ce possible ?",
      answer: "Oui, tout à fait. Notre service de navette aéroport peut effectuer plusieurs arrêts pour récupérer différents passagers avant de vous conduire à l'aéroport de Charleroi ou Bruxelles-Zaventem. Il suffit de nous communiquer les différentes adresses lors de votre réservation, et nous organiserons l'itinéraire le plus efficace pour que tout le monde arrive à l'aéroport à temps pour son vol."
    },
    {
      id: "changement-horaire-depart",
      question: "L'horaire de mon vol départ depuis l'aéroport de Bruxelles-Zaventem a changé, que dois-je faire pour ma navette ?",
      answer: "Dès que vous avez connaissance de ce changement d'horaire, merci de communiquer les détails de ces modifications au plus vite par téléphone au +32 490 197 914 ou nous envoyer un email à info@spero-navette.be. Nous ajusterons l'horaire de votre navette aéroport en fonction de votre nouveau vol afin de garantir votre arrivée à l'aéroport dans les délais recommandés."
    },
    {
      id: "vol-retour-retard",
      question: "Mon vol retour à l'aéroport de Charleroi a du retard, que dois-je faire pour ma navette retour ?",
      answer: "A priori, rien. Nos chauffeurs de navette aéroport ont des outils leur permettant de se tenir informés quant à d'éventuels retards de vols à l'aéroport de Charleroi et Bruxelles. Par contre, si vous savez que votre vol aura plusieurs heures de retard ou que les informations reçues font état d'une situation exceptionnelle (ex. grèves, mauvais temps empêchant le décollage, etc…), l'idéal est de nous prévenir. Plus il y a de communication entre le chauffeur et vous, moins il peut y avoir de souci !"
    },
    {
      id: "animaux-compagnie",
      question: "Je souhaite emmener mon animal de compagnie avec moi dans la navette pour l'aéroport, est-ce possible ?",
      answer: "Oui, tout à fait. Cependant, l'animal sera transporté dans notre navette de la même façon que dans un avion, à savoir, dans sa cage et dans le compartiment arrière. Pour plus d'informations sur le transport d'animaux dans nos navettes vers les aéroports de Bruxelles-Zaventem et Charleroi, veuillez prendre contact avec nous par email à info@spero-navette.be"
    },
    {
      id: "point-rencontre-aeroport",
      question: "Où sommes-nous censés attendre notre chauffeur de navette à notre arrivée à l'aéroport de Bruxelles ou Charleroi ?",
      answer: "Aéroport Bruxelles National (Zaventem)\nEn arrivant dans le hall des arrivées sur votre droite, devant le café JAVA.\n\nAéroport de Charleroi (Brussels South)\nDevant les ascenseurs au niveau du parking express.\n\nGare de Bruxelles-Midi\nDevant le comptoir d'enregistrement AirFrance, côté rue de France.\n\nGare de Lille Europe\nDevant le Sheraton, à la sortie à main gauche.\n\nAéroport de Lille Lesquin\nAu dépose minute des départs.\n\nAéroport de Paris Charles de Gaulle\nAu dépose minute des départs.\n\nAéroport de Paris Orly\nDans le hall des arrivées.\n\nAéroport d'Oostende\nDans le hall des arrivées.\n\nAéroport de Liège\nDans le hall des arrivées.\n\nAéroport d'Amsterdam-Schiphol\nAu dépose minute des départs."
    },
    {
      id: "identifier-chauffeur-retour",
      question: "Comment allons-nous retrouver notre chauffeur de navette à notre retour à l'aéroport de Bruxelles-Zaventem ?",
      answer: "Le chauffeur de notre navette vous attendra devant le point de rendez-vous à l'aéroport de Bruxelles-Zaventem avec un écriteau portant votre nom. Nos chauffeurs sont facilement identifiables et seront positionnés aux points de rencontre indiqués. De nouveau, rester joignable est le maître mot pour faciliter la coordination de votre navette retour depuis l'aéroport !"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-spero mb-2 text-center">Foire Aux Questions - Navette Aéroport</h1>
          <p className="text-center text-gray-600 mb-10">
            Retrouvez ici les réponses aux questions les plus fréquentes concernant nos services de navette aéroport entre votre domicile et Bruxelles, Charleroi et autres destinations
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Réservation et organisation de votre navette aéroport</h2>
            <div className="divide-y divide-gray-200">
              {faqItems.slice(0, 4).map((item) => (
                <FAQItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pendant votre voyage et à l'aéroport</h2>
            <div className="divide-y divide-gray-200">
              {faqItems.slice(4).map((item) => (
                <FAQItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 bg-spero/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-spero mb-4">Une autre question sur notre service de navette aéroport ?</h2>
            <p className="text-gray-700 mb-4">
              N'hésitez pas à nous contacter si vous avez besoin d'informations supplémentaires sur notre service de transport entre votre domicile et les aéroports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Par téléphone</h3>
                <a href="tel:+32490197914" className="text-spero font-bold hover:underline">+32 490 197 914</a>
                <p className="text-sm text-gray-600 mt-1">Du lundi au vendredi : 10h - 19h<br />Samedi : 10h - 16h</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Par email</h3>
                <a href="mailto:info@spero-navette.be" className="text-spero font-bold hover:underline">info@spero-navette.be</a>
                <p className="text-sm text-gray-600 mt-1">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/#calculator" className="inline-block bg-spero text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
              Calculer le prix de votre navette aéroport
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;