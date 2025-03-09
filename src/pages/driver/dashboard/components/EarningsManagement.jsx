import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DateRangePicker } from '@/components/ui/date-picker-range';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Euro, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const EarningsManagement = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(1)), // Premier jour du mois
    to: new Date()
  });

  useEffect(() => {
    fetchEarnings();
  }, [dateRange]);

  const fetchEarnings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/earnings?startDate=${dateRange.from.toISOString()}&endDate=${dateRange.to.toISOString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('driverToken')}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }
      
      setEarnings(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Chargement...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des gains</h2>
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
        />
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gains totaux
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnings?.stats.totalEarnings.toFixed(2)}€
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nombre de courses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnings?.stats.numberOfRides}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Moyenne par course
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnings?.stats.averagePerRide.toFixed(2)}€
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique des gains */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des gains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Object.entries(earnings?.stats.dailyEarnings || {}).map(([date, amount]) => ({
                  date,
                  amount
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => format(new Date(value), 'dd/MM', { locale: fr })}
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 border rounded shadow">
                          <p className="text-sm">{format(new Date(label), 'dd MMMM yyyy', { locale: fr })}</p>
                          <p className="text-lg font-bold">{payload[0].value.toFixed(2)}€</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Liste des courses */}
      <Card>
        <CardHeader>
          <CardTitle>Détail des courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earnings?.bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
              >
                <div className="space-y-1">
                  <p className="font-medium">{booking.client}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(booking.date), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                  <p className="text-sm">
                    {booking.pickup} → {booking.destination}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {booking.earnings.toFixed(2)}€
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.serviceType === 'private' ? 'Course privée' : 'Course partagée'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsManagement;