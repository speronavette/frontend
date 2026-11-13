import React from 'react';
import { Star, CheckCircle, MessageCircle, Clock } from 'lucide-react';
import {
  GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_MAPS_URL, ZAVENTEM_FROM_PRICE,
  PHONE_DISPLAY, WHATSAPP_LINK, FEATURED_REVIEWS
} from '../data/business';

const Stars = () => (
  <span className="flex" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
    ))}
  </span>
);

// Bloc de réassurance : prix de départ, prix fixe, badge Google, réservation 24h/24.
export default function TrustHighlights({ className = '' }) {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="bg-white rounded-lg border-2 border-spero/20 shadow-md p-5 text-center">
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          Zaventem dès <span className="text-spero whitespace-nowrap">{ZAVENTEM_FROM_PRICE} €</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">depuis votre domicile, navette partagée pour 1 à 2 personnes</p>

        <p className="mt-3 inline-flex items-center gap-2 text-gray-700 font-medium">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          Prix fixe, bagages et attente compris, aucun supplément
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Seules exceptions : +50 % les 24-25/12 et 31/12-01/01 (à partir de 14h) et un petit supplément à partir de la 3<sup>e</sup> personne, déjà inclus dans le prix calculé.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-3 py-1.5 rounded-full border border-gray-200 hover:border-spero transition-colors"
            aria-label={`Note Google ${GOOGLE_RATING} sur 5, ${GOOGLE_REVIEW_COUNT} avis`}
          >
            <span className="font-bold text-gray-800">{GOOGLE_RATING}/5</span>
            <Stars />
            <span className="text-gray-600">{GOOGLE_REVIEW_COUNT} avis Google</span>
          </a>
          <span className="inline-flex items-center gap-1 text-gray-600">
            <Clock className="h-4 w-4 text-spero" /> Réservation en ligne 24h/24
          </span>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-green-700 font-medium hover:underline"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp {PHONE_DISPLAY}
          </a>
        </div>
      </div>

    </div>
  );
}

// 3 extraits d'avis Google réels
export function FeaturedReviews({ className = '' }) {
  return (
    <div className={`max-w-5xl mx-auto ${className}`}>
        <div className="grid gap-4 md:grid-cols-3">
        {FEATURED_REVIEWS.map((r) => (
          <figure key={r.author} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-left">
            <Stars />
            <blockquote className="mt-2 text-sm text-gray-700">« {r.comment} »</blockquote>
            <figcaption className="mt-2 text-xs text-gray-500">{r.author}, avis Google</figcaption>
          </figure>
        ))}
        <a href="/avis" className="md:col-span-3 text-center text-sm text-spero underline">
          Lire tous les avis clients
        </a>
      </div>
    </div>
  );
}
