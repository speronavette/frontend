import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Clock,
  CreditCard,
  Luggage,
  Baby,
  MessageSquare
} from 'lucide-react';

const PAYMENT_METHODS = [
  { value: 'cash', label: 'En cash' },
  { value: 'invoice', label: 'Facturation' },
  { value: 'card', label: 'Par carte' },
  { value: 'paid', label: 'Payé' }
];

export const BookingDetailView = ({ 
  booking, 
  isOpen, 
  onClose,
  onUpdatePayment,
  onCancel 
}) => {
  const [paymentMethod, setPaymentMethod] = useState(booking.paymentMethod || '');

  const handlePaymentUpdate = async () => {
    await onUpdatePayment(booking._id, paymentMethod);
  };

  const isOutbound = booking.journey.type === 'outbound';
  const journey = isOutbound ? booking.journey.outbound : booking.journey.inbound;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isOutbound ? 'Détails du départ' : 'Détails du retour'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informations personnelles</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <div>{booking.client.firstName} {booking.client.lastName}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>{booking.client.phone}</div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>{booking.client.email}</div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <div>{booking.client.address.postalCode} {booking.client.address.city}</div>
                  <div>{booking.client.address.street} {booking.client.address.number}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>{booking.passengers} personne(s)</div>
              </div>
            </div>
          </div>

          {/* Type de trajet */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Type de trajet</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>{format(new Date(journey.date), 'dd MMMM yyyy', { locale: fr })}</div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  {isOutbound ? 'Décollage' : 'Atterrissage'} : {journey.time}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                {booking.serviceType === 'private' ? 'Navette privée' : 'Navette partagée'}
              </div>
              <div className="font-semibold">
                Prix : {booking.price[booking.serviceType + 'Price']} €
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Options</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Luggage className="h-4 w-4 text-gray-500" />
                <div>
                  <div>Bagages : {booking.options?.luggageCount || 0}</div>
                  <div>Sacs à main : {booking.options?.handLuggageCount || 0}</div>
                </div>
              </div>

              {(booking.options?.childSeatsCount > 0 || booking.options?.boosterSeatsCount > 0) && (
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4 text-gray-500" />
                  <div>
                    <div>Sièges auto : {booking.options?.childSeatsCount || 0}</div>
                    <div>Réhausseurs : {booking.options?.boosterSeatsCount || 0}</div>
                  </div>
                </div>
              )}
            </div>

            {booking.options?.other && (
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-gray-500 mt-1" />
                <div>{booking.options.other}</div>
              </div>
            )}
          </div>

          {/* Paiement */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Modalités de paiement</h3>
            
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
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Confirmer le paiement
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button
            variant="destructive"
            onClick={() => onCancel(booking._id)}
          >
            Annuler la navette
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};