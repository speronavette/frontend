import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Loader2, Edit, Check, X, User, Phone, Mail, MapPin,
  Calendar, Clock, Plane, AlertTriangle, Euro, CreditCard,
  Luggage, Baby, Users
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const PAYMENT_METHODS = [
  { value: 'card', label: 'Carte' },
  { value: 'cash', label: 'Cash' },
  { value: 'invoice', label: 'Facturation' },
  { value: 'paid', label: 'Payé' }
];

const PickupTimeEditor = ({ journey, onUpdate, bookingId }) => {
  const [pickupTime, setPickupTime] = useState(journey?.pickupTime || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleTimeChange = async () => {
    if (!pickupTime) return;
    setIsUpdating(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}/pickup`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ pickupTime: pickupTime })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      const data = await response.json();
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Heure de pickup :</label>
        <div className="flex items-center gap-2">
          <Input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-32"
            disabled={isUpdating}
          />
          <Button
            size="sm"
            onClick={handleTimeChange}
            disabled={isUpdating || !pickupTime}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Valider
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export const UnifiedBookingDetails = ({
  booking,
  onClose,
  onUpdate,
  onStatusChange,
  fetchBookings,
  setIsDetailsOpen
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [editedData, setEditedData] = useState({
    client: { ...booking.client },
    journey: { ...booking.journey },
    paymentMethod: booking.paymentMethod || '',
    price: { ...booking.price },
    passengers: booking.passengers,
    serviceType: booking.serviceType,
    options: { ...booking.options }
  });

  const [driverEarnings, setDriverEarnings] = useState(booking.driverEarnings || 0);
  const [updatingEarnings, setUpdatingEarnings] = useState(false);
  const [linkedBooking, setLinkedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const isOutbound = booking.journey.type === 'outbound';
  const journey = isOutbound ? booking.journey.outbound : booking.journey.inbound;

  useEffect(() => {
    const fetchLinkedBooking = async () => {
      if (!booking.bookingGroupId) return;
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/api/bookings/linked/${booking._id}`);
        if (!response.ok) throw new Error('Erreur de récupération');
        const data = await response.json();
        if (data.data) setLinkedBooking(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinkedBooking();
  }, [booking]);

  const handleDriverEarningsUpdate = async () => {
    setUpdatingEarnings(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}/driver-earnings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ driverEarnings: Number(driverEarnings) })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des gains');
      }

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Succès",
          description: "Les gains du chauffeur ont été mis à jour"
        });
        if (fetchBookings) await fetchBookings();
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUpdatingEarnings(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('adminToken');
      
      const dataToSend = {
        ...editedData,
        driverEarnings: Number(driverEarnings)
      };

      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur de mise à jour');
      }

      if (result.success) {
        await fetchBookings();
        setIsEditing(false);
        setIsDetailsOpen(false);
        toast({
          title: "Succès",
          description: "Réservation mise à jour avec succès"
        });
      }
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'Date invalide';
    }
  };

  // Rendu du composant
  return (
    <div className="space-y-6">
      {/* Badge et Bouton Modifier */}
      <div className="flex justify-between items-center">
        <Badge variant={isOutbound ? "default" : "secondary"} className="text-lg py-1 px-4">
          {isOutbound ? "Départ" : "Retour"}
        </Badge>
        {!isEditing && booking.status === 'pending' && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        )}
      </div>

      {/* Informations Client */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1">Prénom</label>
                    <Input
                      value={editedData.client.firstName}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        client: { ...editedData.client, firstName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1">Nom</label>
                    <Input
                      value={editedData.client.lastName}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        client: { ...editedData.client, lastName: e.target.value }
                      })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={editedData.client.email}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      client: { ...editedData.client, email: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Téléphone</label>
                  <Input
                    value={editedData.client.phone}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      client: { ...editedData.client, phone: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adresse</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Input
                        placeholder="Rue"
                        value={editedData.client.address.street}
                        onChange={(e) => setEditedData({
                          ...editedData,
                          client: {
                            ...editedData.client,
                            address: { ...editedData.client.address, street: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Numéro"
                        value={editedData.client.address.number}
                        onChange={(e) => setEditedData({
                          ...editedData,
                          client: {
                            ...editedData.client,
                            address: { ...editedData.client.address, number: e.target.value }
                          }
                        })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Code postal"
                      value={editedData.client.address.postalCode}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        client: {
                          ...editedData.client,
                          address: { ...editedData.client.address, postalCode: e.target.value }
                        }
                      })}
                    />
                    <Input
                      placeholder="Ville"
                      value={editedData.client.address.city}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        client: {
                          ...editedData.client,
                          address: { ...editedData.client.address, city: e.target.value }
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {booking.client.lastName} {booking.client.firstName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <p>{booking.client.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <p>{booking.client.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p>{booking.client.address.street} {booking.client.address.number}</p>
                    <p>{booking.client.address.postalCode} {booking.client.address.city}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Détails du Vol */}
      <Card>
        <CardHeader>
          <CardTitle>Détails du Vol</CardTitle>
        </CardHeader>
        <CardContent>
          {isOutbound && (
            <PickupTimeEditor
              journey={journey}
              onUpdate={onUpdate}
              bookingId={booking._id}
            />
          )}
          <div className="space-y-4">
            {isEditing ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1">Date</label>
                    <Input
                      type="date"
                      value={new Date(journey.date).toISOString().split('T')[0]}
                      onChange={(e) => {
                        const path = isOutbound ? 'outbound' : 'inbound';
                        setEditedData({
                          ...editedData,
                          journey: {
                            ...editedData.journey,
                            [path]: { ...editedData.journey[path], date: e.target.value }
                          }
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1">
                      {isOutbound ? "Heure de vol" : "Heure d'atterrissage"}
                    </label>
                    <Input
                      type="time"
                      value={journey.time || ''}
                      onChange={(e) => {
                        const path = isOutbound ? 'outbound' : 'inbound';
                        setEditedData({
                          ...editedData,
                          journey: {
                            ...editedData.journey,
                            [path]: { ...editedData.journey[path], time: e.target.value }
                          }
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Gains du chauffeur */}
                <div>
                  <label className="text-sm font-medium mb-1">Gains du chauffeur</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={driverEarnings}
                      onChange={(e) => setDriverEarnings(Number(e.target.value))}
                      className="w-32"
                    />
                    <Button
                      size="sm"
                      onClick={handleDriverEarningsUpdate}
                      disabled={updatingEarnings}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {updatingEarnings ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Valider
                    </Button>
                  </div>
                </div>

                {isOutbound && (
                  <div>
                    <label className="text-sm font-medium mb-1">Heure de pickup</label>
                    <Input
                      type="time"
                      value={editedData.journey.outbound?.pickupTime || ''}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        journey: {
                          ...editedData.journey,
                          outbound: { ...editedData.journey.outbound, pickupTime: e.target.value }
                        }
                      })}
                    />
                  </div>
                )}

                {!isOutbound && (
                  <div>
                    <label className="font-medium">N° vol</label>
                    <Input
                      value={editedData.journey.inbound?.flightNumber || ''}
                      onChange={(e) => {
                        setEditedData(prev => ({
                          ...prev,
                          journey: {
                            ...prev.journey,
                            inbound: {
                              ...prev.journey.inbound,
                              flightNumber: e.target.value
                            }
                          }
                        }));
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-1">Aéroport</label>
                  <Input
                    value={journey.airport || ''}
                    onChange={(e) => {
                      const path = isOutbound ? 'outbound' : 'inbound';
                      setEditedData({
                        ...editedData,
                        journey: {
                          ...editedData.journey,
                          [path]: { ...editedData.journey[path], airport: e.target.value }
                        }
                      });
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Affichage des gains du chauffeur en mode lecture */}
                <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg">
                  <Euro className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Gains du chauffeur</p>
                    <p className="text-lg font-bold text-emerald-600">{driverEarnings.toFixed(2)} €</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <p>{formatDate(journey.date)}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p>{isOutbound ? "Heure de vol : " : "Heure d'atterrissage : "}{journey.time}</p>
                    {isOutbound && journey.pickupTime && (
                      <p className="text-emerald-600 font-medium">
                        Pickup : {journey.pickupTime}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-gray-500" />
                  <div>
                    <p>Vol n° {journey.flightNumber || 'Non spécifié'}</p>
                    {!isOutbound && (
                      <p>Provenance : {journey.flightOrigin || 'Non spécifiée'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    {isOutbound ? (
                      <>
                        <p><span className="text-gray-500">De :</span> {booking.client.address.city}</p>
                        <p><span className="text-gray-500">Vers :</span> {journey.airport}</p>
                      </>
                    ) : (
                      <>
                        <p><span className="text-gray-500">De :</span> {journey.airport}</p>
                        <p><span className="text-gray-500">Vers :</span> {booking.client.address.city}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
{/* Options et Paiement */}
<Card>
        <CardHeader>
          <CardTitle>Options et Paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1">Nombre de passagers</label>
                    <Input
                      type="number"
                      min="1"
                      max="8"
                      value={editedData.passengers}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        passengers: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1">Type de service</label>
                    <Select
                      value={editedData.serviceType}
                      onValueChange={(value) => setEditedData({
                        ...editedData,
                        serviceType: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shared">Partagé</SelectItem>
                        <SelectItem value="private">Privé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1">Méthode de paiement</label>
                  <Select
                    value={editedData.paymentMethod || ''}
                    onValueChange={(value) => setEditedData({
                      ...editedData,
                      paymentMethod: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map(method => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1">Bagages en soute</label>
                    <Input
                      type="number"
                      min="0"
                      max="12"
                      value={editedData.options.luggageCount || 0}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        options: {
                          ...editedData.options,
                          luggageCount: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1">Bagages à main</label>
                    <Input
                      type="number"
                      min="0"
                      max="12"
                      value={editedData.options.handLuggageCount || 0}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        options: {
                          ...editedData.options,
                          handLuggageCount: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1">Sièges enfant</label>
                    <Input
                      type="number"
                      min="0"
                      max="2"
                      value={editedData.options.childSeatsCount || 0}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        options: {
                          ...editedData.options,
                          childSeatsCount: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1">Réhausseurs</label>
                    <Input
                      type="number"
                      min="0"
                      max="2"
                      value={editedData.options.boosterSeatsCount || 0}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        options: {
                          ...editedData.options,
                          boosterSeatsCount: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p>{editedData.passengers} passager{editedData.passengers > 1 ? 's' : ''}</p>
                    <p className="text-sm text-gray-500">
                      {editedData.serviceType === 'shared' ? 'Navette partagée' : 'Navette privée'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{editedData.price[editedData.serviceType + 'Price']} €</p>
                    <p className="text-sm text-gray-500">
                      {editedData.paymentMethod ?
                        PAYMENT_METHODS.find(m => m.value === editedData.paymentMethod)?.label :
                        'Méthode de paiement non spécifiée'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Luggage className="h-5 w-5 text-gray-500" />
                  <div className="space-y-1">
                    {editedData.options?.luggageCount > 0 && (
                      <p>{editedData.options.luggageCount} bagage(s) en soute</p>
                    )}
                    {editedData.options?.handLuggageCount > 0 && (
                      <p>{editedData.options.handLuggageCount} bagage(s) à main</p>
                    )}
                    {editedData.options?.childSeatsCount > 0 && (
                      <p>{editedData.options.childSeatsCount} siège(s) enfant</p>
                    )}
                    {editedData.options?.boosterSeatsCount > 0 && (
                      <p>{editedData.options.boosterSeatsCount} réhausseur(s)</p>
                    )}
                    {!editedData.options?.luggageCount &&
                     !editedData.options?.handLuggageCount &&
                     !editedData.options?.childSeatsCount &&
                     !editedData.options?.boosterSeatsCount && (
                      <p className="text-gray-500">Aucune option sélectionnée</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Enregistrer
              </Button>
              <Button onClick={() => setIsEditing(false)} disabled={loading} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button
                onClick={() => onStatusChange(booking._id, 'cancelled')}
                variant="destructive"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Annuler la navette
              </Button>
            </>
          )}
        </div>
        <Button variant="outline" onClick={onClose}>
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default UnifiedBookingDetails;