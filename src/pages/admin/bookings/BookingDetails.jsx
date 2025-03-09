import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, Edit, X, Check, Star, AlertTriangle } from 'lucide-react';

export function BookingDetails({ 
  booking, 
  onSave, 
  onCancel, 
  onClose,
  onAssignmentUpdate,
  onBookingStatusChange
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [editedData, setEditedData] = useState({
    client: { ...booking.client },
    journey: { ...booking.journey }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      await onSave(editedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCancel = () => {
    setEditedData({
      client: { ...booking.client },
      journey: { ...booking.journey }
    });
    setIsEditing(false);
  };

  const handleCancelBooking = async () => {
    try {
      await onBookingStatusChange(booking._id, 'cancelled');
      onClose();
    } catch (error) {
      setError("Erreur lors de l'annulation de la réservation");
    }
  };

  const handleCompleteRide = async (isCompleted) => {
    try {
      const status = isCompleted ? 'completed' : 'cancelled';
      await onBookingStatusChange(booking._id, status);
      if (isCompleted) {
        setShowRatingDialog(true);
      }
    } catch (error) {
      setError("Erreur lors de la mise à jour du statut");
    }
  };

  const handleRatingSubmit = async () => {
    try {
      // Ajouter la notation à la réservation
      await onAssignmentUpdate(booking._id, { rating });
      setShowRatingDialog(false);
    } catch (error) {
      setError("Erreur lors de l'enregistrement de la notation");
    }
  };

  const renderRatingStars = () => {
    return [...Array(10)].map((_, index) => (
      <Star
        key={index}
        className={`cursor-pointer ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        onClick={() => setRating(index + 1)}
      />
    ));
  };

  const isOutbound = Boolean(booking.journey.outbound);
  const journey = isOutbound ? booking.journey.outbound : booking.journey.inbound;

  return (
    <>
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Informations client */}
          <div>
            <h3 className="font-medium text-sm mb-2">Informations client</h3>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editedData.client.firstName}
                  onChange={(e) => handleInputChange('client', 'firstName', e.target.value)}
                  placeholder="Prénom"
                />
                <Input
                  value={editedData.client.lastName}
                  onChange={(e) => handleInputChange('client', 'lastName', e.target.value)}
                  placeholder="Nom"
                />
                <Input
                  value={editedData.client.phone}
                  onChange={(e) => handleInputChange('client', 'phone', e.target.value)}
                  placeholder="Téléphone"
                />
                <Input
                  value={editedData.client.email}
                  onChange={(e) => handleInputChange('client', 'email', e.target.value)}
                  placeholder="Email"
                />
                <Input
                  value={editedData.client.address.street}
                  onChange={(e) => handleInputChange('client', 'address', {
                    ...editedData.client.address,
                    street: e.target.value
                  })}
                  placeholder="Rue"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm">
                  {booking.client.lastName} {booking.client.firstName}
                </p>
                <p className="text-sm">Tél: {booking.client.phone}</p>
                <p className="text-sm">Email: {booking.client.email}</p>
                <p className="text-sm">
                  {booking.client.address.street} {booking.client.address.number}
                </p>
                <p className="text-sm">
                  {booking.client.address.postalCode} {booking.client.address.city}
                </p>
              </div>
            )}
          </div>

          {/* Détails du voyage */}
          <div>
            <h3 className="font-medium text-sm mb-2">Détails du voyage</h3>
            <div className="space-y-1">
              <p className="text-sm">Type: {isOutbound ? 'Départ' : 'Retour'}</p>
              <p className="text-sm">
                Date: {new Date(journey.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                {isOutbound ? "Heure de vol" : "Heure d'atterrissage"}: {journey.time}
              </p>
              {journey.pickupTime && (
                <p className="text-sm">Pickup: {journey.pickupTime}</p>
              )}
              {journey.flightNumber && (
                <p className="text-sm">N° vol: {journey.flightNumber}</p>
              )}
              <p className="text-sm">Aéroport: {journey.airport}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <div className="space-x-2">
            {!isEditing && (
              <Button onClick={handleEdit} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            )}
            {isEditing && (
              <>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Confirmer
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              </>
            )}
          </div>
          <Button
            onClick={() => setShowCancelDialog(true)}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Annuler la navette
          </Button>
        </div>

        {booking.driver && (
          <div className="mt-4 space-y-2">
            <h3 className="font-medium text-sm">Actions chauffeur</h3>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleCompleteRide(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Course effectuée
              </Button>
              <Button
                onClick={() => handleCompleteRide(false)}
                className="bg-red-600 hover:bg-red-700"
              >
                Course non effectuée
              </Button>
            </div>
          </div>
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

      {/* Dialog de notation */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter la course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {renderRatingStars()}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRatingDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleRatingSubmit}>
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}