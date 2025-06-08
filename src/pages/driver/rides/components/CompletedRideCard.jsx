<<<<<<< HEAD
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Clock,
  MapPin,
  Users,
  Info,
  Euro,
  Phone,
  Mail,
  Plane,
  CreditCard,
  XCircle,
  CheckCircle,
  Baby,
  Luggage,
  Calendar
} from 'lucide-react';

const CompletedRideCard = ({ ride, isCancelled = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non disponible';
    try {
      if (dateString instanceof Date) {
        dateString = dateString.toISOString();
      }
      const date = parseISO(dateString);
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date non disponible';
    }
  };

  const getRideDate = () => {
    const journeyDate = 
      ride.journey?.outbound?.date || 
      ride.journey?.inbound?.date || 
      ride.completedAt ||
      ride.createdAt;
    
    return formatDate(journeyDate);
  };

  const getStatusIcon = () => {
    return isCancelled ? (
      <XCircle className="h-5 w-5 text-red-500" />
    ) : (
      <CheckCircle className="h-5 w-5 text-green-500" />
    );
  };

  return (
    <Card className="p-3 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        {/* En-tête avec statut */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`font-medium ${isCancelled ? 'text-red-600' : 'text-green-600'}`}>
              {isCancelled ? 'Course annulée' : 'Course terminée'}
            </span>
            <span className="text-gray-500">•</span>
            <span className="font-medium">
              {ride.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
            </span>
            <span className="text-gray-500">•</span>
            <span className="font-medium">
              {ride.journey?.type === 'outbound' ? 'Aller' : 'Retour'}
            </span>
          </div>
          <div className="text-lg font-bold text-green-600">
            {ride.serviceType === 'private' ? ride.price?.privatePrice : ride.price?.sharedPrice}€
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid md:grid-cols-3 gap-3">
          {/* Date et passagers */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <p className="text-sm">{getRideDate()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-600" />
              <p className="text-sm">{ride.passengers} passager{ride.passengers > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Client */}
          <div className="space-y-1">
            <p className="font-medium">
              {ride.client?.firstName} {ride.client?.lastName}
            </p>
            {ride.client?.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <p className="text-sm">{ride.client.phone}</p>
              </div>
            )}
          </div>

          {/* Trajet */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-gray-600" />
              <p className="text-sm font-medium">
                {ride.journey?.outbound?.airport || ride.journey?.inbound?.airport}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-gray-600" />
              <div>
                <p className="text-sm">{ride.client?.address?.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Paiement */}
        <div className="flex justify-between items-center pt-1 border-t">
          <div className="flex items-center gap-2 text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">
              {ride.paymentMethod === 'cash' ? 'Espèces' : 
               ride.paymentMethod === 'card' ? 'Carte' : 
               ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
            </span>
            {!isCancelled && ride.driverEarnings > 0 && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-sm font-medium text-green-600">
                  Gains : {Number(ride.driverEarnings).toFixed(2)}€
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(true)}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              Détails
            </button>
          </div>
        </div>
      </div>

      {/* Modal de détails */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-spero flex items-center gap-2">
              <span>{ride.journey?.type === 'outbound' ? 'Départ' : 'Arrivée'}</span>
              {getStatusIcon()}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Colonne de gauche */}
            <div className="space-y-6">
              {/* Informations du client */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-spero">Client</h3>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {ride.client?.firstName} {ride.client?.lastName}
                  </p>
                  {ride.client?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <p>{ride.client.phone}</p>
                    </div>
                  )}
                  {ride.client?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <p>{ride.client.email}</p>
                    </div>
                  )}
                  <div className="flex items-start gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                    <div>
                      <p>{ride.client?.address?.street} {ride.client?.address?.number}</p>
                      <p>{ride.client?.address?.postalCode} {ride.client?.address?.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations du vol */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Détails du trajet</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <p>{getRideDate()}</p>
                  </div>
                  {ride.journey?.outbound?.pickupTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <p>Pickup : {ride.journey.outbound.pickupTime}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-blue-600" />
                    <div>
                      <p>
                        {ride.journey?.outbound?.airport || ride.journey?.inbound?.airport}
                      </p>
                      {ride.journey?.outbound?.flightNumber && (
                        <p className="text-sm text-blue-600">Vol n°{ride.journey.outbound.flightNumber}</p>
                      )}
                      {ride.journey?.inbound?.flightNumber && (
                        <p className="text-sm text-blue-600">Vol n°{ride.journey.inbound.flightNumber}</p>
                      )}
                    </div>
                  </div>
                  {ride.journey?.inbound?.flightOrigin && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p>Provenance : {ride.journey.inbound.flightOrigin}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-6">
              {/* Options */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">Options</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Type de service</span>
                    <span className="font-medium">
                      {ride.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Passagers</span>
                    <span className="font-medium">{ride.passengers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages en soute</span>
                    <span className="font-medium">{ride.options?.luggageCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages à main</span>
                    <span className="font-medium">{ride.options?.handLuggageCount || 0}</span>
                  </div>
                  {(ride.options?.childSeatsCount > 0 || ride.options?.boosterSeatsCount > 0) && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Sièges enfant</span>
                        <span className="font-medium">{ride.options?.childSeatsCount || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Réhausseurs</span>
                        <span className="font-medium">{ride.options?.boosterSeatsCount || 0}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Paiement */}
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
                  {/* Gains seulement si la course n'est pas annulée */}
                  {!isCancelled && (
                    <div className="pt-3 mt-3 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Vos gains</span>
                        <span className="text-xl font-bold text-spero">
                          {ride.driverEarnings ? `${Number(ride.driverEarnings).toFixed(2)}€` : '-'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Commentaires si présents */}
              {ride.comments && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-orange-800">Commentaires</h3>
                  <p className="text-gray-700">{ride.comments}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

=======
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Clock,
  MapPin,
  Users,
  Info,
  Euro,
  Phone,
  Mail,
  Plane,
  CreditCard,
  XCircle,
  CheckCircle,
  Baby,
  Luggage,
  Calendar
} from 'lucide-react';

const CompletedRideCard = ({ ride, isCancelled = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non disponible';
    try {
      if (dateString instanceof Date) {
        dateString = dateString.toISOString();
      }
      const date = parseISO(dateString);
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date non disponible';
    }
  };

  const getRideDate = () => {
    const journeyDate = 
      ride.journey?.outbound?.date || 
      ride.journey?.inbound?.date || 
      ride.completedAt ||
      ride.createdAt;
    
    return formatDate(journeyDate);
  };

  const getStatusIcon = () => {
    return isCancelled ? (
      <XCircle className="h-5 w-5 text-red-500" />
    ) : (
      <CheckCircle className="h-5 w-5 text-green-500" />
    );
  };

  return (
    <Card className="p-3 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        {/* En-tête avec statut */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`font-medium ${isCancelled ? 'text-red-600' : 'text-green-600'}`}>
              {isCancelled ? 'Course annulée' : 'Course terminée'}
            </span>
            <span className="text-gray-500">•</span>
            <span className="font-medium">
              {ride.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
            </span>
            <span className="text-gray-500">•</span>
            <span className="font-medium">
              {ride.journey?.type === 'outbound' ? 'Aller' : 'Retour'}
            </span>
          </div>
          <div className="text-lg font-bold text-green-600">
            {ride.serviceType === 'private' ? ride.price?.privatePrice : ride.price?.sharedPrice}€
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid md:grid-cols-3 gap-3">
          {/* Date et passagers */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <p className="text-sm">{getRideDate()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-600" />
              <p className="text-sm">{ride.passengers} passager{ride.passengers > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Client */}
          <div className="space-y-1">
            <p className="font-medium">
              {ride.client?.firstName} {ride.client?.lastName}
            </p>
            {ride.client?.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <p className="text-sm">{ride.client.phone}</p>
              </div>
            )}
          </div>

          {/* Trajet */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-gray-600" />
              <p className="text-sm font-medium">
                {ride.journey?.outbound?.airport || ride.journey?.inbound?.airport}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-gray-600" />
              <div>
                <p className="text-sm">{ride.client?.address?.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Paiement */}
        <div className="flex justify-between items-center pt-1 border-t">
          <div className="flex items-center gap-2 text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">
              {ride.paymentMethod === 'cash' ? 'Espèces' : 
               ride.paymentMethod === 'card' ? 'Carte' : 
               ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
            </span>
            {!isCancelled && ride.driverEarnings > 0 && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-sm font-medium text-green-600">
                  Gains : {Number(ride.driverEarnings).toFixed(2)}€
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(true)}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              Détails
            </button>
          </div>
        </div>
      </div>

      {/* Modal de détails */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-spero flex items-center gap-2">
              <span>{ride.journey?.type === 'outbound' ? 'Départ' : 'Arrivée'}</span>
              {getStatusIcon()}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Colonne de gauche */}
            <div className="space-y-6">
              {/* Informations du client */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-spero">Client</h3>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {ride.client?.firstName} {ride.client?.lastName}
                  </p>
                  {ride.client?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <p>{ride.client.phone}</p>
                    </div>
                  )}
                  {ride.client?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <p>{ride.client.email}</p>
                    </div>
                  )}
                  <div className="flex items-start gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                    <div>
                      <p>{ride.client?.address?.street} {ride.client?.address?.number}</p>
                      <p>{ride.client?.address?.postalCode} {ride.client?.address?.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations du vol */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Détails du trajet</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <p>{getRideDate()}</p>
                  </div>
                  {ride.journey?.outbound?.pickupTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <p>Pickup : {ride.journey.outbound.pickupTime}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-blue-600" />
                    <div>
                      <p>
                        {ride.journey?.outbound?.airport || ride.journey?.inbound?.airport}
                      </p>
                      {ride.journey?.outbound?.flightNumber && (
                        <p className="text-sm text-blue-600">Vol n°{ride.journey.outbound.flightNumber}</p>
                      )}
                      {ride.journey?.inbound?.flightNumber && (
                        <p className="text-sm text-blue-600">Vol n°{ride.journey.inbound.flightNumber}</p>
                      )}
                    </div>
                  </div>
                  {ride.journey?.inbound?.flightOrigin && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p>Provenance : {ride.journey.inbound.flightOrigin}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-6">
              {/* Options */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">Options</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Type de service</span>
                    <span className="font-medium">
                      {ride.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Passagers</span>
                    <span className="font-medium">{ride.passengers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages en soute</span>
                    <span className="font-medium">{ride.options?.luggageCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bagages à main</span>
                    <span className="font-medium">{ride.options?.handLuggageCount || 0}</span>
                  </div>
                  {(ride.options?.childSeatsCount > 0 || ride.options?.boosterSeatsCount > 0) && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Sièges enfant</span>
                        <span className="font-medium">{ride.options?.childSeatsCount || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Réhausseurs</span>
                        <span className="font-medium">{ride.options?.boosterSeatsCount || 0}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Paiement */}
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
                  {/* Gains seulement si la course n'est pas annulée */}
                  {!isCancelled && (
                    <div className="pt-3 mt-3 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Vos gains</span>
                        <span className="text-xl font-bold text-spero">
                          {ride.driverEarnings ? `${Number(ride.driverEarnings).toFixed(2)}€` : '-'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Commentaires si présents */}
              {ride.comments && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-orange-800">Commentaires</h3>
                  <p className="text-gray-700">{ride.comments}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default CompletedRideCard;