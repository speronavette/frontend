import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, Phone, Mail, Car, Calendar, Award, Clock, Stars, 
  MapPin, Loader2, Eye 
} from 'lucide-react';

const RidesList = ({ rides, title, emptyMessage }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {rides.length === 0 ? (
        <p className="text-center text-gray-500 py-4">{emptyMessage}</p>
      ) : (
        rides.map((ride) => (
          <Card key={ride._id} className="hover:bg-gray-50">
            <CardContent className="py-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(ride.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {ride.time}
                    </span>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">
                      {ride.pickup} → {ride.destination}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {ride.passengerName}
                    </span>
                  </div>
                </div>

                <div className="col-span-1 text-right">
                  {ride.rating && (
                    <div className="flex items-center justify-end gap-1">
                      <Stars className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {ride.rating}/10
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-500">
                    {ride.price}€
                  </span>
                </div>

                <div className="col-span-1 flex justify-end items-center">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

const StatisticsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-spero">{stats.totalRides}</div>
            <p className="text-sm text-gray-500">Courses totales</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-spero">{stats.averageRating.toFixed(1)}/10</div>
            <p className="text-sm text-gray-500">Note moyenne</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-spero">{stats.completionRate}%</div>
            <p className="text-sm text-gray-500">Taux de complétion</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-spero">{stats.totalEarnings}€</div>
            <p className="text-sm text-gray-500">Gains totaux</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RatingsBreakdown = ({ ratings }) => {
  const maxRating = Math.max(...Object.values(ratings));
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Répartition des notes</h3>
      {Object.entries(ratings).map(([rating, count]) => (
        <div key={rating} className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm w-8">{rating}/10</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div
                className="bg-spero rounded-full h-2"
                style={{ width: `${(count / maxRating) * 100}%` }}
              />
            </div>
            <span className="text-sm w-8 text-right">{count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

function DriverDetails({ driver }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rides, setRides] = useState({
    upcoming: [],
    completed: []
  });
  const [stats, setStats] = useState({
    totalRides: 0,
    averageRating: 0,
    completionRate: 0,
    totalEarnings: 0
  });
  const [ratings, setRatings] = useState({
    10: 0, 9: 0, 8: 0, 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  });
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchDriverData();
  }, [driver._id]);

  const fetchDriverData = async () => {
    try {
      setLoading(true);
      
      // Appel API pour récupérer les courses du chauffeur
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/${driver._id}/rides`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des données');
      
      const data = await response.json();
      
      // Mise à jour des états avec les données reçues
      setRides({
        upcoming: data.rides.filter(ride => !ride.completed),
        completed: data.rides.filter(ride => ride.completed)
      });
      
      setStats(data.stats);
      setRatings(data.ratings);
      
    } catch (err) {
      setError('Impossible de charger les données du chauffeur');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Actif' : 'Inactif';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails du chauffeur</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-spero" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* En-tête avec informations chauffeur */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="font-medium mb-2">Informations personnelles</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">
                          {driver.firstName} {driver.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{driver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{driver.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Informations véhicule */}
                  {driver.vehicleInfo && (
                    <div>
                      <h3 className="font-medium mb-2">Véhicule</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          <span className="text-sm">
                            {driver.vehicleInfo.brand} {driver.vehicleInfo.model}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {driver.vehicleInfo.seats} places
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {driver.vehicleInfo.licensePlate}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Statut et notation */}
                  <div className="text-right">
                    <Badge className={getStatusColor(driver.status)}>
                      {getStatusText(driver.status)}
                    </Badge>
                    {stats.averageRating > 0 && (
                      <div className="mt-2 flex items-center justify-end gap-1">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <span className="text-lg font-medium">
                          {stats.averageRating.toFixed(1)}/10
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <StatisticsSection stats={stats} />

            {/* Notation détaillée */}
            {rides.completed.length > 0 && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <RatingsBreakdown ratings={ratings} />
                </CardContent>
              </Card>
            )}

            {/* Liste des courses */}
            <Card>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="upcoming">
                      À venir ({rides.upcoming.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Terminées ({rides.completed.length})
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    {activeTab === 'upcoming' ? (
                      <RidesList
                        rides={rides.upcoming}
                        title="Courses à venir"
                        emptyMessage="Aucune course à venir"
                      />
                    ) : (
                      <RidesList
                        rides={rides.completed}
                        title="Courses terminées"
                        emptyMessage="Aucune course terminée"
                      />
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DriverDetails;