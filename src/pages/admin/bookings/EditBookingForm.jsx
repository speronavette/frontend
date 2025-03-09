import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EditBookingForm({ booking, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    client: { ...booking.client },
    journey: { ...booking.journey },
    passengers: booking.passengers,
    price: { ...booking.price },
    options: { ...booking.options }
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(formData);
    }} className="space-y-4">
      {/* Client Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Informations client</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={formData.client.firstName}
            onChange={(e) => handleChange('client', 'firstName', e.target.value)}
            placeholder="Prénom"
          />
          <Input
            value={formData.client.lastName}
            onChange={(e) => handleChange('client', 'lastName', e.target.value)}
            placeholder="Nom"
          />
          <Input
            value={formData.client.phone}
            onChange={(e) => handleChange('client', 'phone', e.target.value)}
            placeholder="Téléphone"
          />
          <Input
            value={formData.client.email}
            onChange={(e) => handleChange('client', 'email', e.target.value)}
            placeholder="Email"
          />
        </div>
      </div>

      {/* Journey Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Détails du voyage</h3>
        <div className="grid grid-cols-2 gap-2">
          {formData.journey.outbound && (
            <>
              <Input
                type="date"
                value={formData.journey.outbound.date}
                onChange={(e) => handleChange('journey', 'outbound', {
                  ...formData.journey.outbound,
                  date: e.target.value
                })}
              />
              <Input
                type="time"
                value={formData.journey.outbound.time}
                onChange={(e) => handleChange('journey', 'outbound', {
                  ...formData.journey.outbound,
                  time: e.target.value
                })}
              />
            </>
          )}
          {formData.journey.inbound && (
            <>
              <Input
                type="date"
                value={formData.journey.inbound.date}
                onChange={(e) => handleChange('journey', 'inbound', {
                  ...formData.journey.inbound,
                  date: e.target.value
                })}
              />
              <Input
                type="time"
                value={formData.journey.inbound.time}
                onChange={(e) => handleChange('journey', 'inbound', {
                  ...formData.journey.inbound,
                  time: e.target.value
                })}
              />
            </>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Options</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={formData.options.luggageCount}
            onChange={(e) => handleChange('options', 'luggageCount', parseInt(e.target.value))}
            placeholder="Bagages"
          />
          <Input
            type="number"
            value={formData.options.handLuggageCount}
            onChange={(e) => handleChange('options', 'handLuggageCount', parseInt(e.target.value))}
            placeholder="Bagages à main"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-spero text-white hover:bg-spero/90">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}