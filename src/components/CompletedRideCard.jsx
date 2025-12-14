import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { fr } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
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
  ThumbsUp
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

  const handleSendReviewRequest = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/bookings/${ride._id}/send-review-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande d\'avis');
      }

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Email envoyé",
          description: "La demande d'avis a été envoyée au client."
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer la demande d'avis."
      });
    }
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
              {ride.client?.firstName || ''} {ride.client?.lastName || ''}
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
                {ride.journey?.outbound?.airport || ride.journey?.inbound?.airport || 'N/A'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-gray-600" />
              <div>
                <p className="text-sm">{ride.client?.address?.city || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Paiement et Actions */}
        <div className="flex justify-between items-center pt-1 border-t">
          <div className="flex items-center gap-2 text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">
              {ride.paymentMethod === 'cash' ? 'Espèces' : 
               ride.paymentMethod === 'card' ? 'Carte' : 
               ride.paymentMethod === 'invoice' ? 'Facture' : 'Non spécifié'}
            </span>
            {ride.driverEarnings > 0 && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-sm font-medium text-green-600">
                  Gains : {Number(ride.driverEarnings).toFixed(2)}€
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isCancelled && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSendReviewRequest}
                className="flex items-center gap-1 text-spero hover:text-spero hover:bg-spero/10"
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="hidden sm:inline">Avis</span>
              </Button>
            )}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCancelled ? 'Course annulée' : 'Course terminée'}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {/* Contenu détaillé à ajouter si nécessaire */}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CompletedRideCard;