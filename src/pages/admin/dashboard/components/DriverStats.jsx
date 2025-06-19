import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fr } from 'date-fns/locale';
import {
 LineChart,
 Line,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer
} from 'recharts';

export default function DriverStats() {
 const [selectedDriver, setSelectedDriver] = useState('');
 const [dateRange, setDateRange] = useState([
   {
     startDate: new Date(),
     endDate: new Date(),
     key: 'selection'
   }
 ]);

 // Données de test
 const driverData = {
   weekly: [
     { week: 'Sem 1', navettes: 8, revenue: 800 },
     { week: 'Sem 2', navettes: 12, revenue: 1200 },
     { week: 'Sem 3', navettes: 10, revenue: 1000 },
     { week: 'Sem 4', navettes: 15, revenue: 1500 }
   ],
   postalCodes: [
     { code: '1000', count: 15, revenue: 1500 },
     { code: '1050', count: 12, revenue: 1200 },
     { code: '1150', count: 8, revenue: 800 }
   ]
 };

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

     {/* Sélecteur de chauffeur */}
     <Card>
       <CardHeader>
         <CardTitle>Sélectionner un chauffeur</CardTitle>
       </CardHeader>
       <CardContent>
         <Select 
           value={selectedDriver} 
           onValueChange={setSelectedDriver}
         >
           <SelectTrigger className="w-[280px]">
             <SelectValue placeholder="Choisir un chauffeur" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="driver1">Jean Dupont</SelectItem>
             <SelectItem value="driver2">Marie Martin</SelectItem>
             <SelectItem value="driver3">Pierre Dubois</SelectItem>
           </SelectContent>
         </Select>
       </CardContent>
     </Card>

     {selectedDriver && (
       <>
         {/* Résumé du chauffeur */}
         <Card>
           <CardHeader>
             <CardTitle>Résumé des performances</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-3 gap-4">
               <div>
                 <h3 className="font-medium text-gray-500">Total navettes</h3>
                 <p className="text-2xl font-bold">45</p>
               </div>
               <div>
                 <h3 className="font-medium text-gray-500">CA généré</h3>
                 <p className="text-2xl font-bold">4500€</p>
               </div>
               <div>
                 <h3 className="font-medium text-gray-500">Moyenne / course</h3>
                 <p className="text-2xl font-bold">100€</p>
               </div>
             </div>
           </CardContent>
         </Card>

         {/* Graphique des performances hebdomadaires */}
         <Card>
           <CardHeader>
             <CardTitle>Performance hebdomadaire</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={driverData.weekly}>
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
                     stroke="#8884d8"
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
       </>
     )}
   </div>
 );
}