import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { subDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DriverEarnings = () => {
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    totalRides: 0,
    averagePerRide: 0,
    recentEarnings: []
  });
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch('/api/driver/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('driverToken')}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          setEarnings(data.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des gains:', error);
      }
    };

    fetchEarnings();
  }, [selectedPeriod]);

  const formatEarningsData = (data) => {
    return data.map(earning => ({
      date: format(new Date(earning.date), 'dd MMM', { locale: fr }),
      montant: earning.amount,
      trajet: `${earning.booking.pickup} → ${earning.booking.destination}`
    }));
  };

  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gains Totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnings.totalEarnings.toFixed(2)}€
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Effectuées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnings.totalRides}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Moyenne par Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnings.averagePerRide.toFixed(2)}€
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique d'évolution */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Évolution des Gains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formatEarningsData(earnings.earnings || [])}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 border rounded shadow">
                          <p className="text-sm">{label}</p>
                          <p className="text-sm font-bold">{payload[0].payload.trajet}</p>
                          <p className="text-sm font-bold text-spero">
                            {payload[0].value.toFixed(2)}€
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="montant"
                  stroke="#2563eb"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Liste des dernières courses */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earnings.completedRides?.map((ride, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{ride.client}</p>
                  <p className="text-sm text-gray-600">{ride.route}</p>
                </div>
                <div className="text-xl font-bold text-spero">
                  {ride.earnings.toFixed(2)}€
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverEarnings;