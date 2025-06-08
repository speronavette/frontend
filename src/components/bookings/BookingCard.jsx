<<<<<<< HEAD
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const calculatePickupTime = (flightTime) => {
  if (!flightTime) return '';
  const [hours, minutes] = flightTime.split(':');
  const flightDate = new Date();
  flightDate.setHours(parseInt(hours), parseInt(minutes), 0);
  const pickupDate = new Date(flightDate.getTime() - (3 * 60 * 60 * 1000));
  return pickupDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateString) => {
  if (!dateString) return 'Date invalide';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Date invalide';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const BookingCard = ({ booking, onStatusChange, onViewDetails, status, onBookingUpdate }) => {
  const isOutbound = booking.journey.type === 'outbound';
  const journey = isOutbound ? booking.journey.outbound : booking.journey.inbound;
  const displayPickupTime = isOutbound ? (journey.pickupTime || calculatePickupTime(journey.time)) : '';

  const getPrice = () => {
    const prices = booking.price || {};
    const journeyPrices = journey.price || {};
    
    if (booking.serviceType === 'private') {
      return (journeyPrices.privatePrice || prices.privatePrice || 0);
    }
    return (journeyPrices.sharedPrice || prices.sharedPrice || 0);
  };

  const handleConfirmation = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const requestData = {
        pickupTime: isOutbound ? displayPickupTime : null
      };

      // Utiliser la route de groupe si c'est une réservation liée
      const endpoint = booking.bookingGroupId 
        ? `${baseUrl}/api/bookings/group/${booking.bookingGroupId}/confirm`
        : `${baseUrl}/api/bookings/single/${booking._id}/confirm`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur de confirmation');
      }

      onStatusChange(booking._id, 'confirmed', isOutbound ? displayPickupTime : null);
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
    }
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-7 gap-4 items-center">
        <div className="space-y-0">
          <div className="text-sm flex items-center gap-1 leading-none">
            {formatDate(journey.date)}
            <span className={`text-xs px-1.5 py-0.5 rounded-sm inline-flex items-center ${
              isOutbound ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {isOutbound ? 'Départ' : 'Retour'}
            </span>
          </div>
          <div className="text-xs text-gray-500 leading-tight mt-0.5">
            {isOutbound ? (
              <>
                Vol: {journey.time}
                {displayPickupTime && <div>Pickup: {displayPickupTime}</div>}
              </>
            ) : (
              <>
                Atterrissage: {journey.time}
                {journey.flightNumber && <div>N° vol: {journey.flightNumber}</div>}
                {journey.flightOrigin && <div>Depuis: {journey.flightOrigin}</div>}
              </>
            )}
          </div>
        </div>

        <div className="text-xs">
          {isOutbound ? (
            displayPickupTime ? `Pickup: ${displayPickupTime}` : 'Pickup à définir'
          ) : (
            journey.flightNumber ? `Vol: ${journey.flightNumber}` : 'N° vol non spécifié'
          )}
        </div>

        <div>
          <div className="text-xs font-medium">{booking.client.address.city}</div>
          <div className="text-xs text-gray-600">{booking.client.address.postalCode}</div>
        </div>

        <div className="text-xs">
          {isOutbound ? `→ ${journey.airport}` : `← ${journey.airport}`}
        </div>

        <div className="text-xs">{booking.passengers} pers.</div>
        
        <div className="text-xs font-bold">
          {getPrice() > 0 ? `${getPrice()}€` : 'Prix non défini'}
        </div>

        <div className="flex justify-end space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onViewDetails}
          >
            <Info className="h-3 w-3" />
          </Button>

          {status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleConfirmation}
                className="h-6 w-6 p-0 bg-green-500 hover:bg-green-600 text-white"
                disabled={isOutbound && !displayPickupTime}
              >
                <CheckCircle className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(booking._id, 'cancelled')}
                className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
              >
                <XCircle className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
=======
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const calculatePickupTime = (flightTime) => {
  if (!flightTime) return '';
  const [hours, minutes] = flightTime.split(':');
  const flightDate = new Date();
  flightDate.setHours(parseInt(hours), parseInt(minutes), 0);
  const pickupDate = new Date(flightDate.getTime() - (3 * 60 * 60 * 1000));
  return pickupDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateString) => {
  if (!dateString) return 'Date invalide';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Date invalide';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const BookingCard = ({ booking, onStatusChange, onViewDetails, status, onBookingUpdate }) => {
  const isOutbound = booking.journey.type === 'outbound';
  const journey = isOutbound ? booking.journey.outbound : booking.journey.inbound;
  const displayPickupTime = isOutbound ? (journey.pickupTime || calculatePickupTime(journey.time)) : '';

  const getPrice = () => {
    const prices = booking.price || {};
    const journeyPrices = journey.price || {};
    
    if (booking.serviceType === 'private') {
      return (journeyPrices.privatePrice || prices.privatePrice || 0);
    }
    return (journeyPrices.sharedPrice || prices.sharedPrice || 0);
  };

  const handleConfirmation = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const requestData = {
        pickupTime: isOutbound ? displayPickupTime : null
      };

      // Utiliser la route de groupe si c'est une réservation liée
      const endpoint = booking.bookingGroupId 
        ? `${baseUrl}/api/bookings/group/${booking.bookingGroupId}/confirm`
        : `${baseUrl}/api/bookings/single/${booking._id}/confirm`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur de confirmation');
      }

      onStatusChange(booking._id, 'confirmed', isOutbound ? displayPickupTime : null);
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
    }
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-7 gap-4 items-center">
        <div className="space-y-0">
          <div className="text-sm flex items-center gap-1 leading-none">
            {formatDate(journey.date)}
            <span className={`text-xs px-1.5 py-0.5 rounded-sm inline-flex items-center ${
              isOutbound ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {isOutbound ? 'Départ' : 'Retour'}
            </span>
          </div>
          <div className="text-xs text-gray-500 leading-tight mt-0.5">
            {isOutbound ? (
              <>
                Vol: {journey.time}
                {displayPickupTime && <div>Pickup: {displayPickupTime}</div>}
              </>
            ) : (
              <>
                Atterrissage: {journey.time}
                {journey.flightNumber && <div>N° vol: {journey.flightNumber}</div>}
                {journey.flightOrigin && <div>Depuis: {journey.flightOrigin}</div>}
              </>
            )}
          </div>
        </div>

        <div className="text-xs">
          {isOutbound ? (
            displayPickupTime ? `Pickup: ${displayPickupTime}` : 'Pickup à définir'
          ) : (
            journey.flightNumber ? `Vol: ${journey.flightNumber}` : 'N° vol non spécifié'
          )}
        </div>

        <div>
          <div className="text-xs font-medium">{booking.client.address.city}</div>
          <div className="text-xs text-gray-600">{booking.client.address.postalCode}</div>
        </div>

        <div className="text-xs">
          {isOutbound ? `→ ${journey.airport}` : `← ${journey.airport}`}
        </div>

        <div className="text-xs">{booking.passengers} pers.</div>
        
        <div className="text-xs font-bold">
          {getPrice() > 0 ? `${getPrice()}€` : 'Prix non défini'}
        </div>

        <div className="flex justify-end space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onViewDetails}
          >
            <Info className="h-3 w-3" />
          </Button>

          {status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleConfirmation}
                className="h-6 w-6 p-0 bg-green-500 hover:bg-green-600 text-white"
                disabled={isOutbound && !displayPickupTime}
              >
                <CheckCircle className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(booking._id, 'cancelled')}
                className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
              >
                <XCircle className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
};