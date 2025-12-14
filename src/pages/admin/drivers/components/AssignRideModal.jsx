import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Loader2, Car } from 'lucide-react';

function AssignRideModal({ booking, drivers, onRideAssigned }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDriver) {
      setError('Veuillez sélectionner un chauffeur');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${booking._id}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ driverId: selectedDriver })
      });

      if (!response.ok) throw new Error('Erreur lors de l\'attribution de la course');

      const data = await response.json();
      onRideAssigned(data.data);
      setOpen(false);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Car className="h-4 w-4 mr-2" />
          Attribuer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attribuer la course</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Détails de la course</h3>
            <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
              <p><span className="font-medium">Client:</span> {booking.client.firstName} {booking.client.lastName}</p>
              <p><span className="font-medium">Date:</span> {new Date(booking.journey.outbound.date).toLocaleDateString()}</p>
              <p><span className="font-medium">Heure:</span> {booking.journey.outbound.time}</p>
              <p><span className="font-medium">De:</span> {booking.client.address.city}</p>
              <p><span className="font-medium">Vers:</span> {booking.journey.outbound.airport}</p>
              <p><span className="font-medium">Passagers:</span> {booking.passengers}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driver">Sélectionner un chauffeur</Label>
              <select
                id="driver"
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Choisir un chauffeur</option>
                {drivers
                  .filter(driver => driver.status === 'active')
                  .map(driver => (
                    <option key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                disabled={loading || !selectedDriver}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Attribution...
                  </>
                ) : (
                  'Attribuer la course'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AssignRideModal;