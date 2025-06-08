<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Star, Plane, Award, TrendingUp, Users, ChevronUp } from 'lucide-react';
import RidesHistory from "./RidesHistory";
import { Euro } from 'lucide-react';

const DriverStatsDashboard = ({ stats }) => {

  if (!stats) {
    return (
      <Alert className="animate-in fade-in-50">
        <AlertDescription>Aucune donnée disponible</AlertDescription>
      </Alert>
    );
  }

  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return <ChevronUp className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des gains</CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(stats?.totalEarnings || 0).toFixed(2)}€
          </div>
        </CardContent>
      </Card>
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500 animate-pulse" />
                Total des gains
              </div>
              {getGrowthIndicator(10)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalEarnings?.toFixed(2)}€
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Cumul de toutes vos courses
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
                Note moyenne
              </div>
              {getGrowthIndicator(5)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-yellow-500">
                {stats.averageRating?.toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">/10</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Basé sur {stats.totalRides} avis
            </p>
          </CardContent>
        </Card>

<Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-indigo-50">
  <CardHeader className="pb-2">
    <CardTitle className="text-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Plane className="h-5 w-5 text-indigo-500 animate-pulse" />
        Destinations principales
      </div>
    </CardTitle>
  </CardHeader>
  <CardContent>
    {stats.topDestinations && stats.topDestinations.length > 0 ? (
      stats.topDestinations.map((dest, index) => (
        <div 
          key={dest.airport} 
          className="flex justify-between items-center mb-1 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <span className="text-sm font-medium text-indigo-600">{dest.airport}</span>
          <span className="text-sm font-bold text-indigo-500">{dest.count} courses</span>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-500">Aucune destination disponible</p>
    )}
  </CardContent>
</Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Évolution des gains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.earnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => format(new Date(value), 'dd/MM')}
                    stroke="#6b7280"
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    formatter={(value) => `${value}€`}
                    labelFormatter={(value) => format(new Date(value), 'dd MMMM yyyy', { locale: fr })}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#1e40af' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Répartition des notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.ratings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="rating" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => `${value} avis`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#2563eb"
                    name="Nombre d'avis"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RidesHistory />
    </div>
  );
};

=======
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Star, Plane, Award, TrendingUp, Users, ChevronUp } from 'lucide-react';
import RidesHistory from "./RidesHistory";
import { Euro } from 'lucide-react';

const DriverStatsDashboard = ({ stats }) => {

  if (!stats) {
    return (
      <Alert className="animate-in fade-in-50">
        <AlertDescription>Aucune donnée disponible</AlertDescription>
      </Alert>
    );
  }

  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return <ChevronUp className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des gains</CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(stats?.totalEarnings || 0).toFixed(2)}€
          </div>
        </CardContent>
      </Card>
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500 animate-pulse" />
                Total des gains
              </div>
              {getGrowthIndicator(10)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalEarnings?.toFixed(2)}€
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Cumul de toutes vos courses
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
                Note moyenne
              </div>
              {getGrowthIndicator(5)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-yellow-500">
                {stats.averageRating?.toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">/10</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Basé sur {stats.totalRides} avis
            </p>
          </CardContent>
        </Card>

<Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-indigo-50">
  <CardHeader className="pb-2">
    <CardTitle className="text-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Plane className="h-5 w-5 text-indigo-500 animate-pulse" />
        Destinations principales
      </div>
    </CardTitle>
  </CardHeader>
  <CardContent>
    {stats.topDestinations && stats.topDestinations.length > 0 ? (
      stats.topDestinations.map((dest, index) => (
        <div 
          key={dest.airport} 
          className="flex justify-between items-center mb-1 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <span className="text-sm font-medium text-indigo-600">{dest.airport}</span>
          <span className="text-sm font-bold text-indigo-500">{dest.count} courses</span>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-500">Aucune destination disponible</p>
    )}
  </CardContent>
</Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Évolution des gains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.earnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => format(new Date(value), 'dd/MM')}
                    stroke="#6b7280"
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    formatter={(value) => `${value}€`}
                    labelFormatter={(value) => format(new Date(value), 'dd MMMM yyyy', { locale: fr })}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#1e40af' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Répartition des notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.ratings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="rating" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => `${value} avis`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#2563eb"
                    name="Nombre d'avis"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RidesHistory />
    </div>
  );
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default DriverStatsDashboard;