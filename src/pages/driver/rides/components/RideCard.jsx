<<<<<<< HEAD
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useStats } from '@/contexts/StatsContext.jsx';
import {
  Clock,
  MapPin,
  Users,
  Euro,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  Plane,
  Luggage,
  Baby,
  CreditCard,
  Calendar,
  Info,
  User,
  Car,
  MessageSquare,
  Package,
  ArrowRight
} from 'lucide-react';

function RideCard({ ride, onComplete, onCancel }) {
  const [showDetails, setShowDetails] = useState(false);

  const { updateStats } = useStats();
  const handleComplete = async () => {
    try {
      await driverAPI.completeRide(ride._id);
      await updateStats(); // Met à jour les stats après complétion
      navigate('/driver/rides'); // Ou toute autre action de redirection/rafraîchissement
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getValidDate = (ride) => {
    try {
      if (ride.journey.outbound?.date) {
        return new Date(ride.journey.outbound.date);
      }
      if (ride.journey.inbound?.date) {
        return new Date(ride.journey.inbound.date);
      }
      return new Date();
    } catch (error) {
      console.error('Erreur de conversion de date:', error);
      return new Date();
    }
  };

  const getPickupTime = (ride) => {
    try {
      if (ride.journey.outbound?.pickupTime) {
        return ride.journey.outbound.pickupTime;
      }
      if (ride.journey.outbound?.time) {
        return ride.journey.outbound.time;
      }
      if (ride.journey.inbound?.time) {
        return ride.journey.inbound.time;
      }
      return 'Heure non définie';
    } catch (error) {
      console.error('Erreur de récupération de l\'heure:', error);
      return 'Heure non définie';
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      inProgress: "bg-blue-100 text-blue-800 border-blue-300",
      confirmed: "bg-green-100 text-green-800 border-green-300",
      completed: "bg-gray-100 text-gray-800 border-gray-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300"
    };

    const labels = {
      inProgress: "Course assignée",
      confirmed: "Confirmée",
      completed: "Terminée",
      cancelled: "Annulée",
      pending: "En attente"
    };

    return (
      <Badge variant="outline" className={`${styles[status]} border`}>
        {labels[status]}
      </Badge>
    );
  };

  const getServiceTypeBadge = (type) => (
    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 border">
      {type === 'private' ? 'Navette privée' : 'Navette partagée'}
    </Badge>
  );

  const getPrice = () => {
    const price = ride.serviceType === 'private' ? ride.price.privatePrice : ride.price.sharedPrice;
    return price?.toFixed(2) || '0.00';
  };
  const getJourneyTypeBadge = (journey) => (
    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 border">
      {journey.type === 'outbound' ? 'Aller' : 'Retour'}
    </Badge>
  );

  return (
    <>
      <Card className="p-3 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          {/* En-tête avec statut et types */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {getStatusBadge(ride.status)}
              {getServiceTypeBadge(ride.serviceType)}
              {getJourneyTypeBadge(ride.journey)}
            </div>
            <div className="text-lg font-bold text-green-600">
              {getPrice()}€
            </div>
          </div>

          {/* Informations principales */}
          <div className="grid md:grid-cols-3 gap-3">
            {/* Date, heure et client */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <p className="text-sm font-medium">
                  {format(getValidDate(ride), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
              <div className="flex items-center gap-2 text-spero font-medium">
                <Clock className="h-4 w-4" />
                <p>{getPickupTime(ride)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-600" />
                <p className="text-sm">{ride.passengers} passager{ride.passengers > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Client et coordonnées */}
            <div className="space-y-1">
              <p className="font-medium text-spero">
                {ride.client.firstName} {ride.client.lastName}
              </p>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <p className="text-sm">{ride.client.phone}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <p className="text-sm">{ride.client.email}</p>
              </div>
            </div>

            {/* Adresse et aéroport */}
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-gray-600" />
                <div>
                  <p className="text-sm">{ride.client.address.street} {ride.client.address.number}</p>
                  <p className="text-sm">{ride.client.address.postalCode} {ride.client.address.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-spero">
                <Plane className="h-4 w-4" />
                <p className="font-medium">
                  {ride.journey.outbound?.airport || ride.journey.inbound?.airport}
                </p>
              </div>
            </div>
          </div>

          {/* Options et actions */}
          <div className="flex justify-between items-center pt-1 border-t">
            <div className="flex gap-4">
              {ride.options?.luggageCount > 0 && (
                <div className="flex items-center gap-1">
                  <Luggage className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">{ride.options.luggageCount}</span>
                </div>
              )}
              {(ride.options?.childSeatsCount > 0 || ride.options?.boosterSeatsCount > 0) && (
                <div className="flex items-center gap-1">
                  <Baby className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">
                    {ride.options.childSeatsCount + ride.options.boosterSeatsCount}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-sm">
                  {ride.paymentMethod === 'cash' ? 'Espèces' : 
                   ride.paymentMethod === 'card' ? 'Carte' : 
                   ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(ride._id)}
              >
                Annulée
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => onComplete(ride._id)}
              >
                Terminée
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                Détails complets
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal de détails */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-spero flex items-center gap-2">
              <span>{ride.journey.type === 'outbound' ? 'Départ' : 'Arrivée'}</span>
              {getStatusBadge(ride.status)}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Informations principales */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-spero">Client</h3>
                <div className="space-y-2">
                  <p className="text-lg">{ride.client.firstName} {ride.client.lastName}</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <p>{ride.client.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <p>{ride.client.email}</p>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                    <div>
                      <p>{ride.client.address.street} {ride.client.address.number}</p>
                      <p>{ride.client.address.postalCode} {ride.client.address.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Informations du vol</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <p>{format(getValidDate(ride), 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <p>Pickup : {getPickupTime(ride)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-blue-600" />
                    <p>
                      {ride.journey.outbound?.airport || ride.journey.inbound?.airport}
                      {ride.journey.outbound?.flightNumber && ` - Vol n°${ride.journey.outbound.flightNumber}`}
                      {ride.journey.inbound?.flightNumber && ` - Vol n°${ride.journey.inbound.flightNumber}`}
                    </p>
                  </div>
                  {ride.journey.inbound?.flightOrigin && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p>Provenance : {ride.journey.inbound.flightOrigin}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Options et paiement */}
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">Options</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Type de service</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Passagers</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.passengers} personne{ride.passengers > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages en soute</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.options?.luggageCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages à main</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.options?.handLuggageCount || 0}
                    </Badge>
                  </div>
                  {(ride.options?.childSeatsCount > 0 || ride.options?.boosterSeatsCount > 0) && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Sièges enfant</span>
                        <Badge variant="outline" className="bg-purple-100">
                          {ride.options?.childSeatsCount || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Réhausseurs</span>
                        <Badge variant="outline" className="bg-purple-100">
                          {ride.options?.boosterSeatsCount || 0}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-3 text-green-800">Paiement</h3>
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span>Prix de la course</span>
      <span className="font-bold text-xl text-green-600">
        {ride.serviceType === 'private' ? ride.price?.privatePrice : ride.price?.sharedPrice}€
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span>Méthode de paiement</span>
      <span className="font-medium">
        {ride.paymentMethod === 'cash' ? 'Espèces' : 
         ride.paymentMethod === 'card' ? 'Carte' : 
         ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
      </span>
    </div>
    {ride.driverEarnings !== undefined && (
      <div className="pt-3 mt-3 border-t border-green-200">
        <div className="flex justify-between items-center">
          <span className="font-medium">Vos gains</span>
          <span className="text-xl font-bold text-spero">
            {Number(ride.driverEarnings).toFixed(2)}€
          </span>
        </div>
      </div>
    )}
  </div>
</div>

              {ride.comments && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-orange-800">Commentaires</h3>
                  <p className="text-gray-700">{ride.comments}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetails(false)}
              className="w-full sm:w-auto"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

=======
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useStats } from '@/contexts/StatsContext.jsx';
import {
  Clock,
  MapPin,
  Users,
  Euro,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  Plane,
  Luggage,
  Baby,
  CreditCard,
  Calendar,
  Info,
  User,
  Car,
  MessageSquare,
  Package,
  ArrowRight
} from 'lucide-react';

function RideCard({ ride, onComplete, onCancel }) {
  const [showDetails, setShowDetails] = useState(false);

  const { updateStats } = useStats();
  const handleComplete = async () => {
    try {
      await driverAPI.completeRide(ride._id);
      await updateStats(); // Met à jour les stats après complétion
      navigate('/driver/rides'); // Ou toute autre action de redirection/rafraîchissement
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getValidDate = (ride) => {
    try {
      if (ride.journey.outbound?.date) {
        return new Date(ride.journey.outbound.date);
      }
      if (ride.journey.inbound?.date) {
        return new Date(ride.journey.inbound.date);
      }
      return new Date();
    } catch (error) {
      console.error('Erreur de conversion de date:', error);
      return new Date();
    }
  };

  const getPickupTime = (ride) => {
    try {
      if (ride.journey.outbound?.pickupTime) {
        return ride.journey.outbound.pickupTime;
      }
      if (ride.journey.outbound?.time) {
        return ride.journey.outbound.time;
      }
      if (ride.journey.inbound?.time) {
        return ride.journey.inbound.time;
      }
      return 'Heure non définie';
    } catch (error) {
      console.error('Erreur de récupération de l\'heure:', error);
      return 'Heure non définie';
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      inProgress: "bg-blue-100 text-blue-800 border-blue-300",
      confirmed: "bg-green-100 text-green-800 border-green-300",
      completed: "bg-gray-100 text-gray-800 border-gray-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300"
    };

    const labels = {
      inProgress: "Course assignée",
      confirmed: "Confirmée",
      completed: "Terminée",
      cancelled: "Annulée",
      pending: "En attente"
    };

    return (
      <Badge variant="outline" className={`${styles[status]} border`}>
        {labels[status]}
      </Badge>
    );
  };

  const getServiceTypeBadge = (type) => (
    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 border">
      {type === 'private' ? 'Navette privée' : 'Navette partagée'}
    </Badge>
  );

  const getPrice = () => {
    const price = ride.serviceType === 'private' ? ride.price.privatePrice : ride.price.sharedPrice;
    return price?.toFixed(2) || '0.00';
  };
  const getJourneyTypeBadge = (journey) => (
    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 border">
      {journey.type === 'outbound' ? 'Aller' : 'Retour'}
    </Badge>
  );

  return (
    <>
      <Card className="p-3 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          {/* En-tête avec statut et types */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {getStatusBadge(ride.status)}
              {getServiceTypeBadge(ride.serviceType)}
              {getJourneyTypeBadge(ride.journey)}
            </div>
            <div className="text-lg font-bold text-green-600">
              {getPrice()}€
            </div>
          </div>

          {/* Informations principales */}
          <div className="grid md:grid-cols-3 gap-3">
            {/* Date, heure et client */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <p className="text-sm font-medium">
                  {format(getValidDate(ride), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
              <div className="flex items-center gap-2 text-spero font-medium">
                <Clock className="h-4 w-4" />
                <p>{getPickupTime(ride)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-600" />
                <p className="text-sm">{ride.passengers} passager{ride.passengers > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Client et coordonnées */}
            <div className="space-y-1">
              <p className="font-medium text-spero">
                {ride.client.firstName} {ride.client.lastName}
              </p>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <p className="text-sm">{ride.client.phone}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <p className="text-sm">{ride.client.email}</p>
              </div>
            </div>

            {/* Adresse et aéroport */}
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-gray-600" />
                <div>
                  <p className="text-sm">{ride.client.address.street} {ride.client.address.number}</p>
                  <p className="text-sm">{ride.client.address.postalCode} {ride.client.address.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-spero">
                <Plane className="h-4 w-4" />
                <p className="font-medium">
                  {ride.journey.outbound?.airport || ride.journey.inbound?.airport}
                </p>
              </div>
            </div>
          </div>

          {/* Options et actions */}
          <div className="flex justify-between items-center pt-1 border-t">
            <div className="flex gap-4">
              {ride.options?.luggageCount > 0 && (
                <div className="flex items-center gap-1">
                  <Luggage className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">{ride.options.luggageCount}</span>
                </div>
              )}
              {(ride.options?.childSeatsCount > 0 || ride.options?.boosterSeatsCount > 0) && (
                <div className="flex items-center gap-1">
                  <Baby className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">
                    {ride.options.childSeatsCount + ride.options.boosterSeatsCount}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-sm">
                  {ride.paymentMethod === 'cash' ? 'Espèces' : 
                   ride.paymentMethod === 'card' ? 'Carte' : 
                   ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(ride._id)}
              >
                Annulée
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => onComplete(ride._id)}
              >
                Terminée
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                Détails complets
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal de détails */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-spero flex items-center gap-2">
              <span>{ride.journey.type === 'outbound' ? 'Départ' : 'Arrivée'}</span>
              {getStatusBadge(ride.status)}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Informations principales */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-spero">Client</h3>
                <div className="space-y-2">
                  <p className="text-lg">{ride.client.firstName} {ride.client.lastName}</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <p>{ride.client.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <p>{ride.client.email}</p>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                    <div>
                      <p>{ride.client.address.street} {ride.client.address.number}</p>
                      <p>{ride.client.address.postalCode} {ride.client.address.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Informations du vol</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <p>{format(getValidDate(ride), 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <p>Pickup : {getPickupTime(ride)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-blue-600" />
                    <p>
                      {ride.journey.outbound?.airport || ride.journey.inbound?.airport}
                      {ride.journey.outbound?.flightNumber && ` - Vol n°${ride.journey.outbound.flightNumber}`}
                      {ride.journey.inbound?.flightNumber && ` - Vol n°${ride.journey.inbound.flightNumber}`}
                    </p>
                  </div>
                  {ride.journey.inbound?.flightOrigin && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p>Provenance : {ride.journey.inbound.flightOrigin}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Options et paiement */}
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">Options</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Type de service</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Passagers</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.passengers} personne{ride.passengers > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages en soute</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.options?.luggageCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages à main</span>
                    <Badge variant="outline" className="bg-purple-100">
                      {ride.options?.handLuggageCount || 0}
                    </Badge>
                  </div>
                  {(ride.options?.childSeatsCount > 0 || ride.options?.boosterSeatsCount > 0) && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Sièges enfant</span>
                        <Badge variant="outline" className="bg-purple-100">
                          {ride.options?.childSeatsCount || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Réhausseurs</span>
                        <Badge variant="outline" className="bg-purple-100">
                          {ride.options?.boosterSeatsCount || 0}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-3 text-green-800">Paiement</h3>
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span>Prix de la course</span>
      <span className="font-bold text-xl text-green-600">
        {ride.serviceType === 'private' ? ride.price?.privatePrice : ride.price?.sharedPrice}€
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span>Méthode de paiement</span>
      <span className="font-medium">
        {ride.paymentMethod === 'cash' ? 'Espèces' : 
         ride.paymentMethod === 'card' ? 'Carte' : 
         ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
      </span>
    </div>
    {ride.driverEarnings !== undefined && (
      <div className="pt-3 mt-3 border-t border-green-200">
        <div className="flex justify-between items-center">
          <span className="font-medium">Vos gains</span>
          <span className="text-xl font-bold text-spero">
            {Number(ride.driverEarnings).toFixed(2)}€
          </span>
        </div>
      </div>
    )}
  </div>
</div>

              {ride.comments && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-orange-800">Commentaires</h3>
                  <p className="text-gray-700">{ride.comments}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetails(false)}
              className="w-full sm:w-auto"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default RideCard;