import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plane, MapPin } from 'lucide-react';

const LinkedJourneyCard = ({ isOutbound, booking }) => {
  // Si pas de groupId, on ne montre rien
  if (!booking?.bookingGroupId) {
    return null;
  }

  // Déterminer si nous affichons les informations aller ou retour
  const journeyType = isOutbound ? 'inbound' : 'outbound';
  const journey = booking.journey[journeyType];

  if (!journey) {
    console.log('Pas de trajet lié trouvé');
    return null;
  }

  // Fonction de formatage de date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date à définir';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date à définir';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {isOutbound ? "Trajet Retour Associé" : "Trajet Aller Associé"}
          </CardTitle>
          <Badge variant={isOutbound ? "secondary" : "default"}>
            {isOutbound ? 'Retour' : 'Aller'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p>{formatDate(journey.date)}</p>
            </div>
          </div>

          {/* Heures */}
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <div>
              <p>
                {journeyType === 'inbound' ? "Heure d'atterrissage" : "Heure de vol"} : {journey.time || 'À définir'}
              </p>
              {journeyType === 'outbound' && journey.pickupTime && (
                <p className="text-emerald-600">Pickup : {journey.pickupTime}</p>
              )}
            </div>
          </div>

          {/* Vol */}
          <div className="flex items-center gap-3">
            <Plane className="h-5 w-5 text-gray-500" />
            <div>
              <p>Vol n° {journey.flightNumber || 'À définir'}</p>
              {journeyType === 'inbound' && (
                <p>Provenance : {journey.flightOrigin || 'À définir'}</p>
              )}
            </div>
          </div>

          {/* Trajet */}
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              {journeyType === 'inbound' ? (
                <>
                  <p>
                    <span className="text-gray-500">De : </span>
                    {journey.airport || 'Aéroport à définir'}
                  </p>
                  <p>
                    <span className="text-gray-500">Vers : </span>
                    {booking.client.address.city}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="text-gray-500">De : </span>
                    {booking.client.address.city}
                  </p>
                  <p>
                    <span className="text-gray-500">Vers : </span>
                    {journey.airport || 'Aéroport à définir'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedJourneyCard;