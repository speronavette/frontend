<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Phone, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddDriverModal from './components/AddDriverModal';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export default function DriversManagement() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des chauffeurs');
      }

      const data = await response.json();
      setDrivers(data.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError("Impossible de charger la liste des chauffeurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDriverAdded = (newDriver) => {
    setDrivers(prev => [...prev, newDriver]);
    toast({
      title: "Succès",
      description: "Chauffeur ajouté avec succès",
      variant: "success",
    });
  };

  const handleDelete = async (driverId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce chauffeur ?')) return;
  
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Token utilisé:', token); // Pour déboguer
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/${driverId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      console.log('Réponse du serveur:', data); // Pour déboguer
  
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la suppression');
  
      setDrivers(drivers.filter(driver => driver._id !== driverId));
      toast({
        title: "Succès",
        description: "Chauffeur supprimé avec succès",
        variant: "success",
      });
    } catch (error) {
      console.error('Erreur complète:', error);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-spero" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Chauffeurs</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Chauffeur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <Card key={driver._id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div className="font-medium">{driver.firstName} {driver.lastName}</div>
                <Badge variant={driver.status === 'active' ? 'default' : 'secondary'}>
                  {driver.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {driver.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {driver.email}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(driver._id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDriverAdded={handleDriverAdded}
      />
    </div>
  );
=======
import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Phone, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddDriverModal from './components/AddDriverModal';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export default function DriversManagement() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des chauffeurs');
      }

      const data = await response.json();
      setDrivers(data.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError("Impossible de charger la liste des chauffeurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDriverAdded = (newDriver) => {
    setDrivers(prev => [...prev, newDriver]);
    toast({
      title: "Succès",
      description: "Chauffeur ajouté avec succès",
      variant: "success",
    });
  };

  const handleDelete = async (driverId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce chauffeur ?')) return;
  
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Token utilisé:', token); // Pour déboguer
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/${driverId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      console.log('Réponse du serveur:', data); // Pour déboguer
  
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la suppression');
  
      setDrivers(drivers.filter(driver => driver._id !== driverId));
      toast({
        title: "Succès",
        description: "Chauffeur supprimé avec succès",
        variant: "success",
      });
    } catch (error) {
      console.error('Erreur complète:', error);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-spero" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Chauffeurs</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Chauffeur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <Card key={driver._id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div className="font-medium">{driver.firstName} {driver.lastName}</div>
                <Badge variant={driver.status === 'active' ? 'default' : 'secondary'}>
                  {driver.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {driver.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {driver.email}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(driver._id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDriverAdded={handleDriverAdded}
      />
    </div>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
}