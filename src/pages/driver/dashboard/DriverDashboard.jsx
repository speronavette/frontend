import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Euro, Car, CreditCard, DollarSign, Wallet, Calendar } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [stats, setStats] = useState({
   weekCash: 0,
   weekRides: 0,
   monthRevenue: 0,
   monthEarnings: 0,
   lastMonthEarnings: 0
 });

 const [dateRange, setDateRange] = useState({
   weekStart: startOfWeek(new Date(), { weekStartsOn: 1 }),
   weekEnd: endOfWeek(new Date(), { weekStartsOn: 1 }),
   monthStart: startOfMonth(new Date()),
   monthEnd: endOfMonth(new Date()),
   lastMonthStart: startOfMonth(subMonths(new Date(), 1)),
   lastMonthEnd: endOfMonth(subMonths(new Date(), 1))
 });

 const fetchStats = async () => {
   try {
     setLoading(true);
     const baseUrl = import.meta.env.VITE_API_URL;
     const response = await fetch(`${baseUrl}/api/drivers/stats`, {
       headers: {
         'Authorization': `Bearer ${localStorage.getItem('driverToken')}`
       }
     });

     if (response.status === 401) {
       localStorage.removeItem('driverToken');
       navigate('/driver/login');
       return;
     }

     if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');

     const data = await response.json();
     if (data.success) {
       setStats({
         weekCash: data.data.weekCash || 0,
         weekRides: data.data.weekRides || 0,
         monthRevenue: data.data.monthRevenue || 0,
         monthEarnings: data.data.monthEarnings || 0,
         lastMonthEarnings: data.data.lastMonthEarnings || 0
       });
     }
   } catch (err) {
     console.error('Erreur:', err);
     setError(err.message);
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   fetchStats();
 }, []);

 if (loading) {
   return (
     <div className="flex justify-center items-center h-64">
       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-spero"></div>
     </div>
   );
 }

 return (
   <div className="p-6 space-y-6">
     {error && (
       <Alert variant="destructive">
         <AlertDescription>{error}</AlertDescription>
       </Alert>
     )}

     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold text-spero">Tableau de bord</h1>
       <div className="text-sm text-gray-500 flex items-center gap-2">
         <Calendar className="h-4 w-4" />
         <span>
           {format(dateRange.weekStart, 'dd MMMM', { locale: fr })} - {format(dateRange.weekEnd, 'dd MMMM yyyy', { locale: fr })}
         </span>
       </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
       <Card className="bg-gradient-to-br from-white to-green-50 hover:shadow-lg transition-all">
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-sm font-medium">Cash semaine en cours</CardTitle>
           <CreditCard className="h-5 w-5 text-green-600" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold text-green-600">
             {stats.weekCash.toFixed(2)}€
           </div>
           <p className="text-xs text-gray-500 mt-1">
             {format(dateRange.weekStart, 'dd/MM')} - {format(dateRange.weekEnd, 'dd/MM')}
           </p>
         </CardContent>
       </Card>

       <Card className="bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-all">
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-sm font-medium">Courses semaine en cours</CardTitle>
           <Car className="h-5 w-5 text-blue-600" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold text-blue-600">
             {stats.weekRides}
           </div>
           <p className="text-xs text-gray-500 mt-1">Cette semaine</p>
         </CardContent>
       </Card>

       <Card className="bg-gradient-to-br from-white to-yellow-50 hover:shadow-lg transition-all">
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-sm font-medium">Chiffre d'affaires du mois</CardTitle>
           <DollarSign className="h-5 w-5 text-yellow-600" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold text-yellow-600">
             {stats.monthRevenue.toFixed(2)}€
           </div>
           <p className="text-xs text-gray-500 mt-1">
             {format(dateRange.monthStart, 'MMMM yyyy', { locale: fr })}
           </p>
         </CardContent>
       </Card>

       <Card className="bg-gradient-to-br from-white to-purple-50 hover:shadow-lg transition-all">
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-sm font-medium">Gains du mois en cours</CardTitle>
           <Euro className="h-5 w-5 text-purple-600" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold text-purple-600">
             {stats.monthEarnings.toFixed(2)}€
           </div>
           <p className="text-xs text-gray-500 mt-1">
             {format(dateRange.monthStart, 'MMMM yyyy', { locale: fr })}
           </p>
         </CardContent>
       </Card>

       <Card className="bg-gradient-to-br from-white to-orange-50 hover:shadow-lg transition-all">
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-sm font-medium">Gains du mois passé</CardTitle>
           <Wallet className="h-5 w-5 text-orange-600" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold text-orange-600">
             {stats.lastMonthEarnings.toFixed(2)}€
           </div>
           <p className="text-xs text-gray-500 mt-1">
             {format(dateRange.lastMonthStart, 'MMMM yyyy', { locale: fr })}
           </p>
         </CardContent>
       </Card>
     </div>
   </div>
 );
};

export default DriverDashboard;