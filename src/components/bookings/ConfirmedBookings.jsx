import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Star, Car, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Composants auxiliaires
const TooltipWrapper = ({ content, children }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Fonctions utilitaires
const formatDate = (dateString) => {
  try {
    if (!dateString) return 'Date non spécifiée';
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: fr });
  } catch (error) {
    console.error('Erreur de formatage de date:', error);
    return 'Date invalide';
  }
};

const formatTime = (timeString) => {
  if (!timeString) return 'Non spécifiée';
  return timeString;
};

const formatPrice = (price) => {
  if (!price) return '0 €';
  return `${price} €`;
};

export const ConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
  
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
  
      // Fetch des réservations
      const bookingsResponse = await fetch(`${baseUrl}/api/bookings?status=confirmed`, {
        headers
      });
  
      if (!bookingsResponse.ok) {
        throw new Error(`Erreur des réservations: ${bookingsResponse.statusText}`);
      }
  
      const bookingsData = await bookingsResponse.json();
      console.log('📦 Réservations reçues:', bookingsData);
      
// Fetch des chauffeurs sans authentification
const driversResponse = await fetch(`${baseUrl}/api/drivers`);
  
if (!driversResponse.ok) {
  throw new Error(`Erreur des chauffeurs: ${driversResponse.statusText}`);
}

const driversData = await driversResponse.json();
      
      setBookings(bookingsData.data || []);
      setDrivers(driversData.data || []);
  
    } catch (error) {
      console.error('❌ Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
  fetchData();
}, []);

  const handleAssignDriver = async (bookingId, driverId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}/assign-driver`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ driverId })
      });
  
      if (!response.ok) throw new Error('Erreur lors de l\'assignation du chauffeur');
      // Au lieu d'appeler fetchBookings qui n'existe pas, appelons fetchData
      fetchData();
    } catch (err) {
      setError('Erreur lors de l\'assignation du chauffeur');
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-32">
      <Loader2 className="h-8 w-8 animate-spin text-spero" />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
  );

  return (
    <div className="space-y-4">
      {bookings.map(booking => {
        // Déterminer le trajet correct en fonction du type
        const journeyType = booking.journey.type;
        const journeyData = journeyType === 'outbound' ? booking.journey.outbound : booking.journey.inbound;

        if (!journeyData) {
          console.warn('Données de trajet manquantes:', booking);
          return null;
        }

        return (
          <Card key={booking._id} className="p-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* Date et Heure */}
              <div>
                <div className="font-medium">{formatDate(journeyData.date)}</div>
                <div className="text-sm text-gray-500">
                  <div>Vol : {formatTime(journeyData.time)}</div>
                  {journeyType === 'outbound' && (
                    <div>Pickup : {formatTime(journeyData.pickupTime)}</div>
                  )}
                  {journeyType === 'inbound' && journeyData.flightNumber && (
                    <div>Vol n° : {journeyData.flightNumber}</div>
                  )}
                </div>
              </div>

              {/* Client */}
              <div>
                <div className="font-medium">
                  {booking.client.firstName} {booking.client.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  <div>{booking.client.phone}</div>
                  <div>{booking.client.email}</div>
                </div>
              </div>

              {/* Trajet */}
              <div className="col-span-2">
                <div className="text-sm">
                  {journeyType === 'outbound' 
                    ? `${booking.client.address.city} → ${journeyData.airport}`
                    : `${journeyData.airport} → ${booking.client.address.city}`
                  }
                </div>
                <div className="text-sm text-gray-500">
                  {booking.passengers} passager{booking.passengers > 1 ? 's' : ''}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {booking.client.address.street} {booking.client.address.number},
                  {booking.client.address.postalCode} {booking.client.address.city}
                </div>
              </div>

              {/* Type de service et prix */}
              <div className="text-sm">
                <div>{booking.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}</div>
                <div className="font-medium text-spero">
                  {formatPrice(booking.serviceType === 'private' 
                    ? booking.price?.privatePrice 
                    : booking.price?.sharedPrice
                  )}
                </div>
                {booking.options && (
                  <div className="text-xs text-gray-500 mt-1">
                    {booking.options.luggageCount > 0 && 
                      `${booking.options.luggageCount} bagage${booking.options.luggageCount > 1 ? 's' : ''}`}
                    {booking.options.childSeatsCount > 0 && 
                      `, ${booking.options.childSeatsCount} siège${booking.options.childSeatsCount > 1 ? 's' : ''} enfant`}
                  </div>
                )}
              </div>

              {/* Sélecteur de chauffeur */}
              <div>
                <Select
                  value={booking.driver?._id || ''}
                  onValueChange={(value) => handleAssignDriver(booking._id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assigner un chauffeur">
                      {booking.driver ? (
                        <div className="flex items-center gap-2">
                          <span>{booking.driver.firstName} {booking.driver.lastName}</span>
                          {booking.driver.rating > 0 && (
                            <TooltipWrapper content={`Note: ${booking.driver.rating}/10`}>
                              <Star className="h-4 w-4 text-yellow-500" />
                            </TooltipWrapper>
                          )}
                        </div>
                      ) : "Assigner un chauffeur"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    {drivers.map(driver => (
  <SelectItem key={driver._id} value={driver._id}>
    <div className="flex items-center gap-2">
      <User className="h-4 w-4" />
      <span>{`${driver.firstName} ${driver.lastName}`}</span>
      {driver.vehicleInfo && (
        <TooltipWrapper content={`${driver.vehicleInfo.brand} ${driver.vehicleInfo.model} - ${driver.vehicleInfo.seats} places`}>
          <Car className="h-4 w-4" />
        </TooltipWrapper>
      )}
    </div>
  </SelectItem>
))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};