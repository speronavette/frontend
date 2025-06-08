<<<<<<< HEAD
// src/contexts/StatsContext.js
import React, { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    weekCashPayments: 0,
    numberOfBookings: 0,
    monthEarnings: 0
  });

  const updateStats = async () => {
    try {
      const token = localStorage.getItem('driverToken');
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/drivers/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erreur de mise à jour des stats');
      
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erreur mise à jour stats:', error);
    }
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
}

=======
// src/contexts/StatsContext.js
import React, { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    weekCashPayments: 0,
    numberOfBookings: 0,
    monthEarnings: 0
  });

  const updateStats = async () => {
    try {
      const token = localStorage.getItem('driverToken');
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/drivers/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erreur de mise à jour des stats');
      
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erreur mise à jour stats:', error);
    }
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
}

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export const useStats = () => useContext(StatsContext);