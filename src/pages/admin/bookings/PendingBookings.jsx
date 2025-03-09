import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from 'lucide-react';

export default function PendingBookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Données de test
  const bookings = [
    {
      id: 1,
      type: 'departure', // ou 'return'
      date: '2024-01-20',
      time: '10:00',
      pickupTime: '07:00',
      pickup: '1000 Bruxelles, Rue Example 123',
      destination: 'Brussels Airport',
      passengers: 2,
      flightNumber: 'SN3720',
      flightTime: '13:00',
      luggage: 2,
      handLuggage: 1,
      childSeats: 0,
      boosters: 0,
      customerName: 'John Doe',
      customerPhone: '+32 123 456 789',
      customerEmail: 'john@example.com'
    },
    // ... autres réservations
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2 mb-4">
        <Button variant="outline">Allers</Button>
        <Button variant="outline">Retours</Button>
      </div>

      {bookings.map((booking) => (
        <Card key={booking.id} className="p-4">
          <div className="grid grid-cols-5 gap-4 items-center">
            <div>
              <div className="font-medium">{booking.date}</div>
              <div className="text-sm text-gray-500">Vol: {booking.flightTime}</div>
            </div>
            <div>
              <div className="font-medium">Pickup: {booking.pickupTime}</div>
              <Input 
                type="time"
                defaultValue={booking.pickupTime}
                className="mt-1"
                onChange={(e) => {
                  // Logique pour mettre à jour l'heure de pickup
                }}
              />
            </div>
            <div>
              <div className="font-medium truncate" title={booking.pickup}>
                {booking.pickup}
              </div>
            </div>
            <div>
              <div className="font-medium truncate" title={booking.destination}>
                {booking.destination}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium">{booking.passengers} pers.</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedBooking(booking);
                  setIsDetailsOpen(true);
                }}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Informations générales</h3>
                <p>Date: {selectedBooking.date}</p>
                <p>Type: {selectedBooking.type === 'departure' ? 'Aller' : 'Retour'}</p>
                <p>Vol N°: {selectedBooking.flightNumber}</p>
                <p>Heure de vol: {selectedBooking.flightTime}</p>
                <p>Heure de pickup: {selectedBooking.pickupTime}</p>
              </div>
              <div>
                <h3 className="font-medium">Client</h3>
                <p>Nom: {selectedBooking.customerName}</p>
                <p>Téléphone: {selectedBooking.customerPhone}</p>
                <p>Email: {selectedBooking.customerEmail}</p>
              </div>
              <div>
                <h3 className="font-medium">Trajet</h3>
                <p>Départ: {selectedBooking.pickup}</p>
                <p>Destination: {selectedBooking.destination}</p>
              </div>
              <div>
                <h3 className="font-medium">Options</h3>
                <p>Bagages: {selectedBooking.luggage}</p>
                <p>Bagages à main: {selectedBooking.handLuggage}</p>
                <p>Sièges enfant: {selectedBooking.childSeats}</p>
                <p>Réhausseurs: {selectedBooking.boosters}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}