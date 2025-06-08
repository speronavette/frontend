<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DriverSelect({ onAssign, bookingId }) {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`);
      const data = await response.json();
      setDrivers(data.data);
    };
    fetchDrivers();
  }, []);

  const handleAssign = async () => {
    if (!selectedDriver) return;
    await onAssign(bookingId, selectedDriver);
  };

  return (
    <div className="flex gap-2">
      <Select value={selectedDriver} onValueChange={setSelectedDriver}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Choisir un chauffeur" />
        </SelectTrigger>
        <SelectContent>
          {drivers.map(driver => (
            <SelectItem key={driver._id} value={driver._id}>
              {driver.firstName} {driver.lastName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAssign} disabled={!selectedDriver}>
        Assigner
      </Button>
    </div>
  );
=======
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DriverSelect({ onAssign, bookingId }) {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`);
      const data = await response.json();
      setDrivers(data.data);
    };
    fetchDrivers();
  }, []);

  const handleAssign = async () => {
    if (!selectedDriver) return;
    await onAssign(bookingId, selectedDriver);
  };

  return (
    <div className="flex gap-2">
      <Select value={selectedDriver} onValueChange={setSelectedDriver}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Choisir un chauffeur" />
        </SelectTrigger>
        <SelectContent>
          {drivers.map(driver => (
            <SelectItem key={driver._id} value={driver._id}>
              {driver.firstName} {driver.lastName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAssign} disabled={!selectedDriver}>
        Assigner
      </Button>
    </div>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
}