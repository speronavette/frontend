<<<<<<< HEAD
import React from 'react';
import { Clock, CheckCircle, Calendar, XCircle, Truck } from 'lucide-react';

export const TabNavigation = ({ selectedTab, onTabChange }) => {
 const tabStyle = (tabName) => `
   flex items-center px-4 py-2 cursor-pointer rounded-lg transition-all
   ${selectedTab === tabName
     ? 'bg-white shadow-sm text-blue-600 border'
     : 'hover:bg-gray-50'}
 `;
 
 return (
   <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
     <button
       className={tabStyle('pending')}
       onClick={() => onTabChange('pending')}
     >
       <Clock className="h-4 w-4 mr-2" />
       En attente
     </button>
     <button
       className={tabStyle('confirmed')}
       onClick={() => onTabChange('confirmed')}
     >
       <CheckCircle className="h-4 w-4 mr-2" />
       Confirmées
     </button>
     <button
       className={tabStyle('inProgress')}
       onClick={() => onTabChange('inProgress')}
     >
       <Truck className="h-4 w-4 mr-2" />
       En cours
     </button>
     <button
       className={tabStyle('completed')}
       onClick={() => onTabChange('completed')}
     >
       <Calendar className="h-4 w-4 mr-2" />
       Terminées
     </button>
     <button
       className={tabStyle('cancelled')}
       onClick={() => onTabChange('cancelled')}
     >
       <XCircle className="h-4 w-4 mr-2" />
       Annulées
     </button>
   </div>
 );
=======
import React from 'react';
import { Clock, CheckCircle, Calendar, XCircle, Truck } from 'lucide-react';

export const TabNavigation = ({ selectedTab, onTabChange }) => {
 const tabStyle = (tabName) => `
   flex items-center px-4 py-2 cursor-pointer rounded-lg transition-all
   ${selectedTab === tabName
     ? 'bg-white shadow-sm text-blue-600 border'
     : 'hover:bg-gray-50'}
 `;
 
 return (
   <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
     <button
       className={tabStyle('pending')}
       onClick={() => onTabChange('pending')}
     >
       <Clock className="h-4 w-4 mr-2" />
       En attente
     </button>
     <button
       className={tabStyle('confirmed')}
       onClick={() => onTabChange('confirmed')}
     >
       <CheckCircle className="h-4 w-4 mr-2" />
       Confirmées
     </button>
     <button
       className={tabStyle('inProgress')}
       onClick={() => onTabChange('inProgress')}
     >
       <Truck className="h-4 w-4 mr-2" />
       En cours
     </button>
     <button
       className={tabStyle('completed')}
       onClick={() => onTabChange('completed')}
     >
       <Calendar className="h-4 w-4 mr-2" />
       Terminées
     </button>
     <button
       className={tabStyle('cancelled')}
       onClick={() => onTabChange('cancelled')}
     >
       <XCircle className="h-4 w-4 mr-2" />
       Annulées
     </button>
   </div>
 );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
};