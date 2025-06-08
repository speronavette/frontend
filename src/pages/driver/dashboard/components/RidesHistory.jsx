<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Download } from 'lucide-react';

const RidesHistory = () => {
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setIsLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/drivers/rides`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('driverToken')}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de l\'historique');
        }
  
        const data = await response.json();
        console.log('Données reçues:', data); // Pour déboguer
  
        // Vérifier la structure des données
        if (data.data?.past) {
          setRides(data.data.past); // Si les courses sont dans data.data.past
        } else if (Array.isArray(data.data)) {
          setRides(data.data); // Si data.data est directement un tableau
        } else {
          setRides([]); // Fallback à un tableau vide
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRides();
  }, []);

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Client', 'Départ', 'Destination', 'Prix', 'Note'],
      ...rides.map(ride => [
        format(new Date(ride.date), 'dd/MM/yyyy'),
        ride.clientName,
        ride.pickup,
        ride.destination,
        `${ride.price}€`,
        ride.rating || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `courses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-lg">Chargement de l'historique...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Historique des courses</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Départ</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {Array.isArray(rides) && rides.length > 0 ? (
    rides.map((ride) => (
      <TableRow key={ride._id || ride.id}>
        <TableCell>
          {format(new Date(ride.date), 'dd/MM/yyyy', { locale: fr })}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-4">
        Aucune course disponible
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

=======
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Download } from 'lucide-react';

const RidesHistory = () => {
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setIsLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/drivers/rides`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('driverToken')}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de l\'historique');
        }
  
        const data = await response.json();
        console.log('Données reçues:', data); // Pour déboguer
  
        // Vérifier la structure des données
        if (data.data?.past) {
          setRides(data.data.past); // Si les courses sont dans data.data.past
        } else if (Array.isArray(data.data)) {
          setRides(data.data); // Si data.data est directement un tableau
        } else {
          setRides([]); // Fallback à un tableau vide
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRides();
  }, []);

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Client', 'Départ', 'Destination', 'Prix', 'Note'],
      ...rides.map(ride => [
        format(new Date(ride.date), 'dd/MM/yyyy'),
        ride.clientName,
        ride.pickup,
        ride.destination,
        `${ride.price}€`,
        ride.rating || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `courses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-lg">Chargement de l'historique...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Historique des courses</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Départ</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {Array.isArray(rides) && rides.length > 0 ? (
    rides.map((ride) => (
      <TableRow key={ride._id || ride.id}>
        <TableCell>
          {format(new Date(ride.date), 'dd/MM/yyyy', { locale: fr })}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-4">
        Aucune course disponible
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default RidesHistory;