import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Loader2, Edit, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from 'lucide-react';

const PAYMENT_METHODS = [
  { value: 'cash', label: 'En cash' },
  { value: 'invoice', label: 'Facturation' },
  { value: 'paid', label: 'Payé' },
  { value: 'card', label: 'Par carte' }
];

export const BookingDetails = ({ booking, onClose, onBookingStatusChange, onBookingUpdate, setIsDetailsOpen }) => {
  const [linkedBooking, setLinkedBooking] = useState(null);
  const [loadingLinked, setLoadingLinked] = useState(false);
  const [linkedError, setLinkedError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(booking.paymentMethod || '');
  const [pickupTime, setPickupTime] = useState(
    booking?.journey?.outbound?.pickupTime || ''
  );
  const [editedData, setEditedData] = useState({
    client: { ...booking.client },
    journey: { ...booking.journey },
    options: { ...booking.options }
  });

  useEffect(() => {
    const fetchLinkedBooking = async () => {
      if (!booking) return;
      
      console.log('Réservation actuelle:', booking);
      console.log('GroupId:', booking.bookingGroupId);
      
      setLoadingLinked(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/bookings/linked/${booking._id}`);
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Réponse non OK:', errorData);
          throw new Error('Erreur lors de la récupération de la réservation liée');
        }
        
        const data = await response.json();
        console.log('Réponse de l\'API pour la réservation liée:', data);
        
        if (data.data) {
          setLinkedBooking(data.data);
        } else {
          console.log('Aucune réservation liée trouvée');
        }
      } catch (err) {
        console.error('Erreur complète:', err);
        setLinkedError("Erreur lors de la récupération de la réservation liée");
      } finally {
        setLoadingLinked(false);
      }
    };
  
    fetchLinkedBooking();
  }, [booking]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      
      const updatedBooking = await response.json();
      onBookingUpdate(booking._id, updatedBooking.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
      setError("Une erreur est survenue lors de la mise à jour");
    }
  };

  const handleCancel = () => {
    setEditedData({
      client: { ...booking.client },
      journey: { ...booking.journey }
    });
    setIsEditing(false);
  };

  const handlePickupTimeUpdate = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}/pickup`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickupTime })
      });
  
      if (!response.ok) throw new Error('Erreur de mise à jour');
      
      const data = await response.json();
      const updatedBooking = {
        ...booking,
        journey: {
          ...booking.journey,
          outbound: {
            ...booking.journey.outbound,
            pickupTime: pickupTime
          }
        }
      };
      onBookingUpdate(booking._id, updatedBooking);
      setIsDetailsOpen(false);
    } catch (error) {
      console.error('Erreur:', error);
      setError("Erreur lors de la mise à jour de l'heure de pickup");
    }
  };

  const handleCancelBooking = async () => {
    try {
      await onBookingStatusChange(booking._id, 'cancelled');
      setShowCancelDialog(false);
      setIsDetailsOpen(false);
    } catch (error) {
      setError("Erreur lors de l'annulation de la réservation");
    }
  };


const handlePaymentUpdate = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${baseUrl}/api/bookings/${booking._id}/payment`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod })
    });

    if (!response.ok) throw new Error('Erreur de mise à jour du paiement');
    
    const updatedBooking = {
      ...booking,
      paymentMethod
    };
    onBookingUpdate(booking._id, updatedBooking);
  } catch (error) {
    console.error('Erreur:', error);
    setError("Erreur lors de la mise à jour du paiement");
  }
};

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
{/* Section Informations personnelles */}
<Card className="p-6">
  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations personnelles</h3>
  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <p className="font-medium">Contact</p>
      {isEditing ? (
        <div className="space-y-2">
          <Input
            type="text"
            value={editedData.client.firstName}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                firstName: e.target.value
              }
            }))}
            placeholder="Prénom"
            className="w-full"
          />
          <Input
            type="text"
            value={editedData.client.lastName}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                lastName: e.target.value
              }
            }))}
            placeholder="Nom"
            className="w-full"
          />
          <Input
            type="tel"
            value={editedData.client.phone}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                phone: e.target.value
              }
            }))}
            placeholder="Téléphone"
            className="w-full"
          />
          <Input
            type="email"
            value={editedData.client.email}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                email: e.target.value
              }
            }))}
            placeholder="Email"
            className="w-full"
          />
        </div>
      ) : (
        <>
          <p className="mt-2 space-y-1 text-gray-600">
            <span className="block">{booking.client.firstName} {booking.client.lastName}</span>
            <span className="block">Tél: {booking.client.phone}</span>
            <span className="block">Email: {booking.client.email}</span>
          </p>
        </>
      )}
    </div>

    <div>
      <p className="font-medium">Adresse</p>
      {isEditing ? (
        <div className="space-y-2">
          <Input
            type="text"
            value={editedData.client.address.street}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                address: {
                  ...prev.client.address,
                  street: e.target.value
                }
              }
            }))}
            placeholder="Rue"
            className="w-full"
          />
          <Input
            type="text"
            value={editedData.client.address.number}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                address: {
                  ...prev.client.address,
                  number: e.target.value
                }
              }
            }))}
            placeholder="Numéro"
            className="w-full"
          />
          <Input
            type="text"
            value={editedData.client.address.postalCode}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                address: {
                  ...prev.client.address,
                  postalCode: e.target.value
                }
              }
            }))}
            placeholder="Code postal"
            className="w-full"
          />
          <Input
            type="text"
            value={editedData.client.address.city}
            onChange={(e) => setEditedData(prev => ({
              ...prev,
              client: {
                ...prev.client,
                address: {
                  ...prev.client.address,
                  city: e.target.value
                }
              }
            }))}
            placeholder="Ville"
            className="w-full"
          />
        </div>
      ) : (
        <>
          <p className="mt-2 space-y-1 text-gray-600">
            <span className="block">{booking.client.address.street} {booking.client.address.number}</span>
            <span className="block">{booking.client.address.postalCode} {booking.client.address.city}</span>
          </p>
        </>
      )}
    </div>
  </div>
</Card>
      {/* La Card des détails de trajet */}
      <Card className="p-6">
        {/* Contenu de la première partie - les détails du trajet */}
        <Card className="p-6">
  <h3 className="text-xl font-bold text-gray-900 mb-4">Détails des Trajets</h3>
  
  {/* Trajet principal - celui sur lequel on a cliqué */}
  <div className="mb-6 border-b pb-4">
    <h4 className="font-bold text-lg text-spero">
      {booking.journey.type === 'outbound' ? 'Aller' : 'Retour'}
    </h4>
    {booking.journey.type === 'outbound' ? (
      <>
        <p className="font-semibold mt-2">
          {booking.client.address.city} → {booking.journey.outbound.airport}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <label className="font-medium">Date</label>
                  <Input
                    type="date"
                    value={editedData.journey.outbound.date.split('T')[0]}
                    onChange={(e) => setEditedData(prev => ({
                      ...prev,
                      journey: {
                        ...prev.journey,
                        outbound: {
                          ...prev.journey.outbound,
                          date: e.target.value
                        }
                      }
                    }))}
                    className="w-full"
                  />
                  <label className="font-medium">Heure de vol</label>
                  <Input
                    type="time"
                    value={editedData.journey.outbound.time}
                    onChange={(e) => setEditedData(prev => ({
                      ...prev,
                      journey: {
                        ...prev.journey,
                        outbound: {
                          ...prev.journey.outbound,
                          time: e.target.value
                        }
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="font-medium">Date: {new Date(booking.journey.outbound.date).toLocaleDateString()}</p>
                <p className="font-medium">Heure de vol: {booking.journey.outbound.time}</p>
              </>
            )}
          </div>
          <div>
            <p className="font-medium">Heure de pickup</p>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-32"
              />
              <Button 
                onClick={handlePickupTimeUpdate}
                variant="outline"
                size="sm"
              >
                Mettre à jour
              </Button>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <p className="font-semibold mt-2">
          {booking.journey.inbound.airport} → {booking.client.address.city}
        </p>
        <div className="mt-4">
          {isEditing ? (
            <div className="space-y-2">
              <label className="font-medium">Date</label>
              <Input
                type="date"
                value={editedData.journey.inbound.date.split('T')[0]}
                onChange={(e) => setEditedData(prev => ({
                  ...prev,
                  journey: {
                    ...prev.journey,
                    inbound: {
                      ...prev.journey.inbound,
                      date: e.target.value
                    }
                  }
                }))}
                className="w-full"
              />
              <label className="font-medium">Heure d'atterrissage</label>
              <Input
                type="time"
                value={editedData.journey.inbound.time}
                onChange={(e) => setEditedData(prev => ({
                  ...prev,
                  journey: {
                    ...prev.journey,
                    inbound: {
                      ...prev.journey.inbound,
                      time: e.target.value
                    }
                  }
                }))}
                className="w-full"
              />
              <label className="font-medium">N° vol</label>
              <Input
                type="text"
                value={editedData.journey.inbound.flightNumber}
                onChange={(e) => setEditedData(prev => ({
                  ...prev,
                  journey: {
                    ...prev.journey,
                    inbound: {
                      ...prev.journey.inbound,
                      flightNumber: e.target.value
                    }
                  }
                }))}
                className="w-full"
              />
            </div>
          ) : (
            <>
              <p>Date: {new Date(booking.journey.inbound.date).toLocaleDateString()}</p>
              <p>Heure d'atterrissage: {booking.journey.inbound.time}</p>
              <p>N° vol: {booking.journey.inbound.flightNumber}</p>
            </>
          )}
        </div>
      </>
    )}
</div>

{/* La partie du trajet lié peut rester identique */}
{linkedBooking && (
  <div>
    <h4 className="font-bold text-lg text-spero mb-4">
      Trajet {linkedBooking.journey.type === 'outbound' ? 'Aller' : 'Retour'} lié
    </h4>
    {linkedBooking.journey.type === 'outbound' ? (
      <>
        <p className="font-semibold mt-2">
          {linkedBooking.client.address.city} → {linkedBooking.journey.outbound.airport}
        </p>
        <div className="mt-4">
          <p>Date: {new Date(linkedBooking.journey.outbound.date).toLocaleDateString()}</p>
          <p>Heure de vol: {linkedBooking.journey.outbound.time}</p>
          {linkedBooking.journey.outbound.pickupTime && (
            <p>Heure de pickup: {linkedBooking.journey.outbound.pickupTime}</p>
          )}
        </div>
      </>
    ) : (
      <>
        <p className="font-semibold mt-2">
          {linkedBooking.client.address.city} ← {linkedBooking.journey.inbound.airport}
        </p>
        <div className="mt-4">
          <p>Date: {new Date(linkedBooking.journey.inbound.date).toLocaleDateString()}</p>
          <p>Heure d'atterrissage: {linkedBooking.journey.inbound.time}</p>
          <p>N° vol: {linkedBooking.journey.inbound.flightNumber || 'Non spécifié'}</p>
          <p>Origine: {linkedBooking.journey.inbound.flightOrigin || 'Non spécifié'}</p>
        </div>
      </>
    )}
  </div>
)}

{loadingLinked && (
    <div className="flex justify-center mt-4">
      <Loader2 className="h-6 w-6 animate-spin text-spero" />
    </div>
  )}
</Card>
      </Card>

      {/* Section Options */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Options</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <div>
                <label className="font-semibold">Bagages en soute</label>
                <Input
                  type="number"
                  value={editedData.options.luggageCount}
                  onChange={(e) => setEditedData(prev => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      luggageCount: parseInt(e.target.value)
                    }
                  }))}
                  min="0"
                  max="12"
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label className="font-semibold">Bagages à main</label>
                <Input
                  type="number"
                  value={editedData.options.handLuggageCount}
                  onChange={(e) => setEditedData(prev => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      handLuggageCount: parseInt(e.target.value)
                    }
                  }))}
                  min="0"
                  max="12"
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label className="font-semibold">Sièges enfant</label>
                <Input
                  type="number"
                  value={editedData.options.childSeatsCount}
                  onChange={(e) => setEditedData(prev => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      childSeatsCount: parseInt(e.target.value)
                    }
                  }))}
                  min="0"
                  max="2"
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label className="font-semibold">Réhausseurs</label>
                <Input
                  type="number"
                  value={editedData.options.boosterSeatsCount}
                  onChange={(e) => setEditedData(prev => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      boosterSeatsCount: parseInt(e.target.value)
                    }
                  }))}
                  min="0"
                  max="2"
                  className="w-full mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <p><span className="font-semibold">Bagages en soute:</span> {booking.options.luggageCount}</p>
              <p><span className="font-semibold">Bagages à main:</span> {booking.options.handLuggageCount}</p>
              <p><span className="font-semibold">Sièges enfant:</span> {booking.options.childSeatsCount}</p>
              <p><span className="font-semibold">Réhausseurs:</span> {booking.options.boosterSeatsCount}</p>
            </>
          )}
          {booking.options.other && (
            <p className="col-span-2"><span className="font-semibold">Autres:</span> {booking.options.other}</p>
          )}
        </div>
      </Card>

{/* Section Paiement */}
<Card className="p-6">
  <h3 className="text-xl font-bold text-gray-900 mb-4">Moyen de paiement</h3>
  <div className="flex items-center gap-4">
    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Choisir..." />
      </SelectTrigger>
      <SelectContent>
        {PAYMENT_METHODS.map(method => (
          <SelectItem key={method.value} value={method.value}>
            {method.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    
    <Button 
      onClick={handlePaymentUpdate}
      disabled={!paymentMethod || paymentMethod === booking.paymentMethod}
      variant="outline"
    >
      <CreditCard className="h-4 w-4 mr-2" />
      Mettre à jour
    </Button>
  </div>
</Card>

      {/* Actions */}
      <div className="flex justify-between">
        {isEditing ? (
          <>
            <Button onClick={handleSave} variant="outline">
              <Check className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
            <Button onClick={handleCancel} variant="ghost">
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button
              onClick={() => setShowCancelDialog(true)}
              variant="destructive"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Annuler la navette
            </Button>
          </>
        )}
      </div>

      {/* Dialog de confirmation d'annulation */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer l'annulation</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler cette navette ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelDialog(false)}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelBooking}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmer l'annulation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};