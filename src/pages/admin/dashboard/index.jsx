import { useState } from 'react';
import { Card } from "@/components/ui/card";
import DashboardStats from './components/DashboardStats';
import DriverStats from './components/DriverStats';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('global');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord TEST</h1>
     
      {/* Cards en haut */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="p-6">
          <h3>Total réservations</h3>
          <p className="text-2xl font-bold">156</p>
        </Card>
        <Card className="p-6">
          <h3>Réservations du jour</h3>
          <p className="text-2xl font-bold">12</p>
        </Card>
        <Card className="p-6">
          <h3>Chiffre d'affaires</h3>
          <p className="text-2xl font-bold">4580€</p>
        </Card>
      </div>

{/* Navigation des onglets */}
<div className="flex mb-4 border-b border-gray-300">
  <button
    type="button"
    onClick={() => setSelectedTab('global')}
    className="mr-4 px-4 py-2 rounded bg-[#e88a78] text-white"
  >
    Statistiques Globales
  </button>
  <button
    type="button" 
    onClick={() => setSelectedTab('drivers')}
    className="mr-4 px-4 py-2 rounded bg-[#e88a78] text-white"
  >
    Statistiques Chauffeurs
  </button>
</div>

      {/* Zone de contenu conditionnel */}
      {selectedTab === 'global' && (
  <div className="mb-6 border-2 border-[#e88a78] bg-[#e88a78] rounded-lg">
    <DashboardStats />
  </div>
)}
{selectedTab === 'drivers' && (
  <div className="mb-6 border-2 border-[#e88a78] bg-[#e88a78] rounded-lg">
    <DriverStats />
  </div>
)}

    </div>
  );
}