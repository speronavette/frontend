import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

function RideCard({ ride, onComplete, onCancel, onRate }) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const isOutbound = Boolean(ride.journey.outbound);
  const journey = isOutbound ? ride.journey.outbound : ride.journey.inbound;

  const handleSubmitRating = () => {
    onRate(ride._id, rating, comment);
    setShowRating(false);
  };

  return (
    <Card className="p-4 mb-4">
      <div className="grid grid-cols-4 gap-4">
        {/* Informations de base */}
        <div>
          <h3 className="font-medium">Trajet {isOutbound ? 'Aller' : 'Retour'}</h3>
          <p className="text-sm">{new Date(journey.date).toLocaleDateString()}</p>
          {isOutbound ? (
            <p className="text-sm">Pickup: {journey.pickupTime}</p>
          ) : (
            <p className="text-sm">Atterrissage: {journey.time}</p>
          )}
        </div>

        {/* Informations client */}
        <div>
          <h3 className="font-medium">Client</h3>
          <p className="text-sm">{ride.client.firstName} {ride.client.lastName}</p>
          <p className="text-sm">{ride.client.phone}</p>
        </div>

        {/* Adresse */}
        <div>
          <h3 className="font-medium">Adresse</h3>
          <p className="text-sm">{ride.client.address.street} {ride.client.address.number}</p>
          <p className="text-sm">{ride.client.address.postalCode} {ride.client.address.city}</p>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end items-start space-x-2">
          <Button 
            variant="outline" 
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={() => setShowRating(true)}
          >
            Terminée
          </Button>
          <Button 
            variant="outline" 
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => onCancel(ride._id)}
          >
            Annuler
          </Button>
        </div>
      </div>

      {/* Dialog pour la notation */}
      <Dialog open={showRating} onOpenChange={setShowRating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter la course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Note sur 10</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Commentaire</Label>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Commentaire optionnel"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRating(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitRating}>
              Valider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default function DriverRides() {
  const [showAllRides, setShowAllRides] = useState(false);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [error, setError] = useState('');

  const handleComplete = async (rideId, rating, comment) => {
    try {
      // Ici, appel API pour marquer la course comme terminée et enregistrer la notation
      // await completeRide(rideId, rating, comment);
      
      // Mise à jour locale de l'état
      const ride = upcomingRides.find(r => r._id === rideId);
      if (ride) {
        setPastRides(prev => [...prev, { ...ride, rating, comment }]);
        setUpcomingRides(prev => prev.filter(r => r._id !== rideId));
      }
    } catch (err) {
      console.error('Erreur lors de la completion:', err);
      setError('Erreur lors de la validation de la course');
    }
  };

  const handleCancel = async (rideId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette course ?')) {
      try {
        // Ici, appel API pour annuler la course
        // await cancelRide(rideId);
        
        // Mise à jour locale de l'état
        setUpcomingRides(prev => prev.filter(r => r._id !== rideId));
      } catch (err) {
        console.error('Erreur lors de l\'annulation:', err);
        setError('Erreur lors de l\'annulation de la course');
      }
    }
  };

  const handleRate = async (rideId, rating, comment) => {
    try {
      // Ici, appel API pour enregistrer la notation
      // await rateRide(rideId, rating, comment);
      handleComplete(rideId, rating, comment);
    } catch (err) {
      console.error('Erreur lors de la notation:', err);
      setError('Erreur lors de l\'enregistrement de la notation');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Courses à venir */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Courses à venir</h2>
          <Button variant="outline" onClick={() => setShowAllRides(!showAllRides)}>
            {showAllRides ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Voir moins
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Voir tout
              </>
            )}
          </Button>
        </div>
        
        <div className="space-y-4">
          {(showAllRides ? upcomingRides : upcomingRides.slice(0, 5)).map(ride => (
            <RideCard
              key={ride._id}
              ride={ride}
              onComplete={handleComplete}
              onCancel={handleCancel}
              onRate={handleRate}
            />
          ))}
          {upcomingRides.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Aucune course à venir
            </p>
          )}
        </div>
      </div>

      {/* Courses passées */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Courses terminées</h2>
        <div className="space-y-4">
          {pastRides.map(ride => (
            <Card key={ride._id} className="p-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm">{new Date(ride.journey.date).toLocaleDateString()}</p>
                  <p className="text-sm font-medium">Note: {ride.rating}/10</p>
                  {ride.comment && <p className="text-sm">{ride.comment}</p>}
                </div>
                <div>
                  <p className="text-sm">{ride.client.firstName} {ride.client.lastName}</p>
                </div>
                <div>
                  <p className="text-sm">{ride.client.address.city}</p>
                </div>
                <div>
                  <p className="text-sm">{ride.journey.airport}</p>
                </div>
              </div>
            </Card>
          ))}
          {pastRides.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Aucune course terminée
            </p>
          )}
        </div>
      </div>
    </div>
  );
}