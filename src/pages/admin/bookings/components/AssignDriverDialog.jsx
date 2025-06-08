<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export default function AssignDriverDialog({ booking, onClose, onAssign }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des chauffeurs');
      
      const data = await response.json();
      setDrivers(data.data.filter(driver => driver.status === 'active'));
    } catch (err) {
      setError("Impossible de charger la liste des chauffeurs");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedDriver) return;
    onAssign(selectedDriver);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assigner un chauffeur</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Détails de la course</h3>
            <div className="bg-gray-50 p-3 rounded-md space-y-1 text-sm">
              <p>Date: {new Date(booking.journey.outbound.date).toLocaleDateString()}</p>
              <p>Heure: {booking.journey.outbound.time}</p>
              <p>De: {booking.client.address.city}</p>
              <p>Vers: {booking.journey.outbound.airport}</p>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-spero" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Sélectionner un chauffeur
                </label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="">Choisir un chauffeur</option>
                  {drivers.map(driver => (
                    <option key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                onClick={handleAssign}
                disabled={!selectedDriver}
              >
                Assigner
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
=======
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export default function AssignDriverDialog({ booking, onClose, onAssign }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des chauffeurs');
      
      const data = await response.json();
      setDrivers(data.data.filter(driver => driver.status === 'active'));
    } catch (err) {
      setError("Impossible de charger la liste des chauffeurs");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedDriver) return;
    onAssign(selectedDriver);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assigner un chauffeur</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Détails de la course</h3>
            <div className="bg-gray-50 p-3 rounded-md space-y-1 text-sm">
              <p>Date: {new Date(booking.journey.outbound.date).toLocaleDateString()}</p>
              <p>Heure: {booking.journey.outbound.time}</p>
              <p>De: {booking.client.address.city}</p>
              <p>Vers: {booking.journey.outbound.airport}</p>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-spero" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Sélectionner un chauffeur
                </label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="">Choisir un chauffeur</option>
                  {drivers.map(driver => (
                    <option key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                onClick={handleAssign}
                disabled={!selectedDriver}
              >
                Assigner
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
}