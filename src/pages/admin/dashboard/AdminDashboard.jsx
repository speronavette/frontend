// Imports relatifs plutôt que @/
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import {
  CalendarCheck,
  EuroIcon,
  Loader2
} from 'lucide-react';
import DashboardCharts from './components/DashboardCharts';

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Pour le développement, utilisons des données statiques
      setStats({
        totalBookings: 156,
        todayBookings: 12,
        revenue: 4580
      });
    } catch (err) {
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-spero" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total réservations</p>
                <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CalendarCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Réservations du jour</p>
                <h3 className="text-2xl font-bold">{stats.todayBookings}</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <CalendarCheck className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Chiffre d'affaires</p>
                <h3 className="text-2xl font-bold">{stats.revenue}€</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <EuroIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <DashboardCharts />
    </div>
  );
}

export default AdminDashboard;