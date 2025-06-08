<<<<<<< HEAD
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardCharts = () => {
  const data = [
    { name: 'Jan', reservations: 60 },
    { name: 'Fév', reservations: 70 },
    { name: 'Mar', reservations: 85 },
    { name: 'Avr', reservations: 78 },
    { name: 'Mai', reservations: 90 },
    { name: 'Juin', reservations: 95 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution des réservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="reservations" 
                stroke="#f97316" 
                name="Réservations" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

=======
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardCharts = () => {
  const data = [
    { name: 'Jan', reservations: 60 },
    { name: 'Fév', reservations: 70 },
    { name: 'Mar', reservations: 85 },
    { name: 'Avr', reservations: 78 },
    { name: 'Mai', reservations: 90 },
    { name: 'Juin', reservations: 95 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution des réservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="reservations" 
                stroke="#f97316" 
                name="Réservations" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default DashboardCharts;