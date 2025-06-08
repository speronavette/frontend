<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import RideCard from './components/RideCard';
import CompletedRideCard from './components/CompletedRideCard';
import { driverAPI } from '@/services/api';

export default function DriverRides() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rides, setRides] = useState({
    completed: [],
    cancelled: [],
    upcoming: []
  });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/drivers/rides`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('driverToken')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des courses');
      }

      const data = await response.json();
      
      if (!data.data?.upcoming && !data.data?.past) {
        throw new Error('Format de données invalide');
      }

      const sortedRides = {
        completed: [],
        cancelled: [],
        upcoming: []
      };

      // Traiter les courses à venir
      const upcomingRides = data.data.upcoming || [];
      upcomingRides.forEach(ride => {
        const date = new Date(ride.journey.outbound?.date || ride.journey.inbound?.date);
        sortedRides.upcoming.push({ ...ride, sortDate: date });
      });

      // Traiter les courses passées
      const pastRides = data.data.past || [];
      pastRides.forEach(ride => {
        const date = new Date(ride.journey.outbound?.date || ride.journey.inbound?.date);
        const rideWithDate = { ...ride, sortDate: date };
        
        if (ride.status === 'completed') {
          sortedRides.completed.push(rideWithDate);
        } else if (ride.status === 'cancelled') {
          sortedRides.cancelled.push(rideWithDate);
        }
      });

      // Tri des courses
      sortedRides.completed.sort((a, b) => b.sortDate - a.sortDate);
      sortedRides.cancelled.sort((a, b) => b.sortDate - a.sortDate);
      sortedRides.upcoming.sort((a, b) => a.sortDate - b.sortDate);

      setRides(sortedRides);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (rideId, rating, comment) => {
    try {
      await driverAPI.completeRide(rideId, { rating, comment });
      
      setRides(prev => {
        const updatedRide = prev.upcoming.find(r => r._id === rideId);
        if (updatedRide) {
          return {
            ...prev,
            upcoming: prev.upcoming.filter(r => r._id !== rideId),
            completed: [{
              ...updatedRide,
              rating,
              comment,
              status: 'completed',
              completedAt: new Date()
            }, ...prev.completed]
          };
        }
        return prev;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = async (rideId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette course ?')) return;
    
    try {
      await driverAPI.cancelRide(rideId);
      
      setRides(prev => {
        const cancelledRide = prev.upcoming.find(r => r._id === rideId);
        if (cancelledRide) {
          return {
            ...prev,
            upcoming: prev.upcoming.filter(r => r._id !== rideId),
            cancelled: [{ ...cancelledRide, status: 'cancelled' }, ...prev.cancelled]
          };
        }
        return prev;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-spero" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming" className="text-base">
            Courses à venir ({rides.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-base">
            Courses terminées ({rides.completed.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="text-base">
            Courses annulées ({rides.cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {rides.upcoming.length > 0 ? (
            rides.upcoming.map(ride => (
              <RideCard
                key={ride._id}
                ride={ride}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            ))
          ) : (
            <Card className="p-8">
              <p className="text-center text-gray-500">Aucune course à venir</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {rides.completed.length > 0 ? (
            rides.completed.map(ride => (
              <CompletedRideCard key={ride._id} ride={ride} />
            ))
          ) : (
            <Card className="p-8">
              <p className="text-center text-gray-500">Aucune course terminée</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {rides.cancelled.length > 0 ? (
            rides.cancelled.map(ride => (
              <CompletedRideCard key={ride._id} ride={ride} isCancelled />
            ))
          ) : (
            <Card className="p-8">
              <p className="text-center text-gray-500">Aucune course annulée</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
=======
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import RideCard from './components/RideCard';
import CompletedRideCard from './components/CompletedRideCard';
import { driverAPI } from '@/services/api';

export default function DriverRides() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rides, setRides] = useState({
    completed: [],
    cancelled: [],
    upcoming: []
  });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/drivers/rides`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('driverToken')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des courses');
      }

      const data = await response.json();
      
      if (!data.data?.upcoming && !data.data?.past) {
        throw new Error('Format de données invalide');
      }

      const sortedRides = {
        completed: [],
        cancelled: [],
        upcoming: []
      };

      // Traiter les courses à venir
      const upcomingRides = data.data.upcoming || [];
      upcomingRides.forEach(ride => {
        const date = new Date(ride.journey.outbound?.date || ride.journey.inbound?.date);
        sortedRides.upcoming.push({ ...ride, sortDate: date });
      });

      // Traiter les courses passées
      const pastRides = data.data.past || [];
      pastRides.forEach(ride => {
        const date = new Date(ride.journey.outbound?.date || ride.journey.inbound?.date);
        const rideWithDate = { ...ride, sortDate: date };
        
        if (ride.status === 'completed') {
          sortedRides.completed.push(rideWithDate);
        } else if (ride.status === 'cancelled') {
          sortedRides.cancelled.push(rideWithDate);
        }
      });

      // Tri des courses
      sortedRides.completed.sort((a, b) => b.sortDate - a.sortDate);
      sortedRides.cancelled.sort((a, b) => b.sortDate - a.sortDate);
      sortedRides.upcoming.sort((a, b) => a.sortDate - b.sortDate);

      setRides(sortedRides);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (rideId, rating, comment) => {
    try {
      await driverAPI.completeRide(rideId, { rating, comment });
      
      setRides(prev => {
        const updatedRide = prev.upcoming.find(r => r._id === rideId);
        if (updatedRide) {
          return {
            ...prev,
            upcoming: prev.upcoming.filter(r => r._id !== rideId),
            completed: [{
              ...updatedRide,
              rating,
              comment,
              status: 'completed',
              completedAt: new Date()
            }, ...prev.completed]
          };
        }
        return prev;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = async (rideId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette course ?')) return;
    
    try {
      await driverAPI.cancelRide(rideId);
      
      setRides(prev => {
        const cancelledRide = prev.upcoming.find(r => r._id === rideId);
        if (cancelledRide) {
          return {
            ...prev,
            upcoming: prev.upcoming.filter(r => r._id !== rideId),
            cancelled: [{ ...cancelledRide, status: 'cancelled' }, ...prev.cancelled]
          };
        }
        return prev;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-spero" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming" className="text-base">
            Courses à venir ({rides.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-base">
            Courses terminées ({rides.completed.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="text-base">
            Courses annulées ({rides.cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {rides.upcoming.length > 0 ? (
            rides.upcoming.map(ride => (
              <RideCard
                key={ride._id}
                ride={ride}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            ))
          ) : (
            <Card className="p-8">
              <p className="text-center text-gray-500">Aucune course à venir</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {rides.completed.length > 0 ? (
            rides.completed.map(ride => (
              <CompletedRideCard key={ride._id} ride={ride} />
            ))
          ) : (
            <Card className="p-8">
              <p className="text-center text-gray-500">Aucune course terminée</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {rides.cancelled.length > 0 ? (
            rides.cancelled.map(ride => (
              <CompletedRideCard key={ride._id} ride={ride} isCancelled />
            ))
          ) : (
            <Card className="p-8">
              <p className="text-center text-gray-500">Aucune course annulée</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
}