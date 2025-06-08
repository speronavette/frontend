<<<<<<< HEAD
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DateRange } from 'react-date-range';
import { fr } from 'date-fns/locale';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DashboardStats() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // Données de test pour les graphiques
  // Données de test pour les graphiques
 const weeklyData = [
    { week: 'Sem 1', navettes: 15, revenue: 1500 },
    { week: 'Sem 2', navettes: 18, revenue: 1800 },
    { week: 'Sem 3', navettes: 22, revenue: 2200 },
    { week: 'Sem 4', navettes: 20, revenue: 2000 }
  ];
 
  // Données pour le camembert des sources de réservation
  const referralData = [
    { name: 'Agences', value: 45 },
    { name: 'Web', value: 38 },
    { name: 'Téléphone', value: 25 },
    { name: 'Email', value: 15 },
    { name: 'Autres', value: 8 }
  ];
 
  // Couleurs pour les camemberts avec des nuances de la couleur principale
  const COLORS = [
    '#e88a78',  // Couleur de base
    '#ea9789',  // Plus clair
    '#eca49a',  // Encore plus clair
    '#eeb2a9',  // ...
    '#f0bfb8',
    '#f2ccc7'
  ];

  return (
    <div className="space-y-6">
      {/* Sélecteur de dates */}
      <Card>
        <CardHeader>
          <CardTitle>Période d'analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            locale={fr}
          />
        </CardContent>
      </Card>

      {/* Résumé */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé de la période sélectionnée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Navettes réalisées</h3>
              <p className="text-2xl font-bold">75</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Chiffre d'affaires</h3>
              <p className="text-2xl font-bold">7500€</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique hebdomadaire */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution hebdomadaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone"
                  dataKey="navettes"
                  stroke="#e88a78"
                  name="Navettes"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  name="CA (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Graphiques en camembert */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Camembert des sources de réservation */}
        <Card>
  <CardHeader>
    <CardTitle>Sources de Réservation</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="h-[400px]"> {/* Hauteur augmentée pour un meilleur affichage */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={referralData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150} // Rayon augmenté
            fill="#8884d8"
            dataKey="value"
            label={({name, value, percent}) => 
              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {referralData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} navettes`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  );
=======
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DateRange } from 'react-date-range';
import { fr } from 'date-fns/locale';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DashboardStats() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // Données de test pour les graphiques
  // Données de test pour les graphiques
 const weeklyData = [
    { week: 'Sem 1', navettes: 15, revenue: 1500 },
    { week: 'Sem 2', navettes: 18, revenue: 1800 },
    { week: 'Sem 3', navettes: 22, revenue: 2200 },
    { week: 'Sem 4', navettes: 20, revenue: 2000 }
  ];
 
  // Données pour le camembert des sources de réservation
  const referralData = [
    { name: 'Agences', value: 45 },
    { name: 'Web', value: 38 },
    { name: 'Téléphone', value: 25 },
    { name: 'Email', value: 15 },
    { name: 'Autres', value: 8 }
  ];
 
  // Couleurs pour les camemberts avec des nuances de la couleur principale
  const COLORS = [
    '#e88a78',  // Couleur de base
    '#ea9789',  // Plus clair
    '#eca49a',  // Encore plus clair
    '#eeb2a9',  // ...
    '#f0bfb8',
    '#f2ccc7'
  ];

  return (
    <div className="space-y-6">
      {/* Sélecteur de dates */}
      <Card>
        <CardHeader>
          <CardTitle>Période d'analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            locale={fr}
          />
        </CardContent>
      </Card>

      {/* Résumé */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé de la période sélectionnée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Navettes réalisées</h3>
              <p className="text-2xl font-bold">75</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Chiffre d'affaires</h3>
              <p className="text-2xl font-bold">7500€</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique hebdomadaire */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution hebdomadaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone"
                  dataKey="navettes"
                  stroke="#e88a78"
                  name="Navettes"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  name="CA (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Graphiques en camembert */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Camembert des sources de réservation */}
        <Card>
  <CardHeader>
    <CardTitle>Sources de Réservation</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="h-[400px]"> {/* Hauteur augmentée pour un meilleur affichage */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={referralData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150} // Rayon augmenté
            fill="#8884d8"
            dataKey="value"
            label={({name, value, percent}) => 
              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {referralData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} navettes`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
}