import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DriverSelect from '../components/DriverSelect';
import {
  User, Phone, Calendar, Clock, MapPin, Plane, Users,
  Luggage, CreditCard, Eye, Check, X, Mail, Baby, 
  CheckCircle2, XCircle, UserCog
} from 'lucide-react';

const PAYMENT_METHODS = {
  'card': 'Carte',
  'cash': 'Cash',
  'invoice': 'Facturation',
  'paid': 'Payé'
};

export const UnifiedBookingList = ({ 
  bookings, 
  onViewDetails, 
  onStatusChange, 
  status 
}) => {
  const [showDriverSelect, setShowDriverSelect] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Date invalide';
    try {
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      return 'Date invalide';
    }
  };

  const handleChangeDriver = (bookingId) => {
    setShowDriverSelect(prev => ({
      ...prev,
      [bookingId]: true
    }));
  };

  const onAssignDriver = async (bookingId, driverId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/assign-driver`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId })
      });
      if (!response.ok) throw new Error('Erreur d\'assignation');
      
      setShowDriverSelect(prev => ({
        ...prev,
        [bookingId]: false
      }));
      
      // Rafraîchir la liste
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const renderClientInfo = (booking) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-gray-500" />
        <div className="text-sm">
          <span className="font-medium">{booking.client.lastName}</span>
          <span className="ml-1">{booking.client.firstName}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{booking.client.phone}</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{booking.client.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{booking.passengers} passager{booking.passengers > 1 ? 's' : ''}</span>
      </div>
    </div>
  );

  const renderJourneyTimes = (booking, isOutbound, journey) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium">
          {journey.date ? format(new Date(journey.date), 'dd/MM/yyyy') : 'Date non définie'}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-gray-500" />
        <div className="text-sm">
          {isOutbound ? (
            <>
              <div>Vol: {journey?.time || 'Non spécifiée'}</div>
              <div className="text-emerald-600 font-medium">
                Pickup: {journey?.pickupTime || 'Non spécifiée'}
              </div>
            </>
          ) : (
            <>
              <div>Atterrissage: {journey?.time || 'Non spécifiée'}</div>
              <div>Vol n°: {journey?.flightNumber || 'Non spécifié'}</div>
              <div>Provenance: {journey?.flightOrigin || 'Non spécifiée'}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderJourneyRoute = (booking, isOutbound, journey) => (
    <div className="space-y-1.5">
      {isOutbound ? (
        <>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
            <div className="text-sm">
              <div className="truncate">{booking.client.address.street} {booking.client.address.number}</div>
              <div className="truncate">{booking.client.address.postalCode} {booking.client.address.city}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Plane className="h-4 w-4 text-gray-500 mt-1" />
            <div className="text-sm">
              <span className="text-gray-500">Vers:</span>
              <div className="font-medium">{journey.airport}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start gap-2">
            <Plane className="h-4 w-4 text-gray-500 mt-1" />
            <div className="text-sm">
              <span className="text-gray-500">De:</span>
              <div className="font-medium">{journey.airport}</div>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-1">
            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
            <div className="text-sm">
              <div className="truncate">{booking.client.address.street} {booking.client.address.number}</div>
              <div className="truncate">{booking.client.address.postalCode} {booking.client.address.city}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderOptionsAndPrice = (booking) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Luggage className="h-4 w-4 text-gray-500" />
        <div className="text-sm">
          <span className="text-gray-500">Bagages:</span> {booking.options?.luggageCount || 0} soute
          {booking.options?.handLuggageCount > 0 && ` + ${booking.options.handLuggageCount} main`}
        </div>
      </div>
      {(booking.options?.childSeatsCount > 0 || booking.options?.boosterSeatsCount > 0) && (
        <div className="flex items-center gap-2">
          <Baby className="h-4 w-4 text-gray-500" />
          <div className="text-sm">
            {booking.options?.childSeatsCount > 0 && `${booking.options.childSeatsCount} siège(s)`}
            {booking.options?.boosterSeatsCount > 0 && ` ${booking.options.boosterSeatsCount} réhausseur(s)`}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-gray-500" />
        <div className="text-sm">
          <span className="font-medium">
            {booking.price[booking.serviceType + 'Price']} €
          </span>
          <span className="text-gray-500 ml-1">
            ({PAYMENT_METHODS[booking.paymentMethod] || 'Non spécifié'})
          </span>
        </div>
      </div>
    </div>
  );

  const renderActionButtons = (booking) => {
    if (status === 'inProgress') {
      return (
        <div className="flex flex-col gap-1">
          <Button
            onClick={() => onStatusChange(booking._id, 'completed')}
            size="sm"
            className="w-full bg-emerald-600 hover:bg-emerald-700 h-7 text-xs"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Terminée
          </Button>

          <Button
            onClick={() => onStatusChange(booking._id, 'cancelled')}
            size="sm"
            variant="destructive"
            className="w-full h-7 text-xs"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Annulée
          </Button>

          {showDriverSelect[booking._id] ? (
            <DriverSelect
              bookingId={booking._id}
              onAssign={onAssignDriver}
            />
          ) : (
            <Button
              onClick={() => handleChangeDriver(booking._id)}
              size="sm"
              variant="outline"
              className="w-full h-7 text-xs"
            >
              <UserCog className="h-3 w-3 mr-1" />
              Modifier chauffeur
            </Button>
          )}

          <Button 
            onClick={() => onViewDetails(booking)}
            size="sm"
            variant="outline"
            className="w-full h-7 text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            Détails
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1">
        {status === 'confirmed' && (
          <>
            <DriverSelect
              bookingId={booking._id}
              onAssign={onAssignDriver}
            />
            <Button
              onClick={() => onStatusChange(booking._id, 'cancelled')}
              size="sm"
              variant="destructive"
              className="w-full h-7 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Annuler
            </Button>
          </>
        )}
        {status === 'pending' && (
          <>
            <Button
              onClick={() => onStatusChange(booking._id, 'confirmed')}
              size="sm"
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-7 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Confirmer
            </Button>
            <Button
              onClick={() => onStatusChange(booking._id, 'cancelled')}
              size="sm"
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 h-7 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Refuser
            </Button>
          </>
        )}
        <Button 
          onClick={() => onViewDetails(booking)}
          size="sm"
          variant="outline"
          className="w-full h-7 text-xs"
        >
          <Eye className="h-3 w-3 mr-1" />
          Détails
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const isOutbound = booking.journey.type === 'outbound';
        const journey = isOutbound ? booking.journey.outbound : booking.journey.inbound;

        if (!journey) return null;

        return (
          <Card key={booking._id} className="p-2 hover:shadow-md transition-shadow">
            <div className="flex gap-2">
              <div className="min-w-[80px]">
                <Badge variant={isOutbound ? "default" : "secondary"} className="w-full justify-center py-1">
                  {isOutbound ? 'Départ' : 'Retour'}
                </Badge>
                {booking.driver && (
                  <div className="text-xs text-center text-gray-600">
                    {booking.driver.firstName} {booking.driver.lastName}
                  </div>
                )}
              </div>

              <div className="flex-grow grid grid-cols-4 gap-3">
                <div>{renderClientInfo(booking)}</div>
                <div>{renderJourneyTimes(booking, isOutbound, journey)}</div>
                <div>{renderJourneyRoute(booking, isOutbound, journey)}</div>
                <div>{renderOptionsAndPrice(booking)}</div>
              </div>

              <div className="flex flex-col gap-1 justify-start min-w-[100px]">
                {renderActionButtons(booking)}
              </div>
            </div>
          </Card>
        );
      })}

      {bookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucune réservation trouvée
        </div>
      )}
    </div>
  );
};

export default UnifiedBookingList;