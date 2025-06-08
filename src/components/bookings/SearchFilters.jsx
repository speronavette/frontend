import React from 'react';
import { Input } from "@/components/ui/input";

export const SearchFilters = ({ searchTerm, dateFilter, onSearchChange, onDateChange }) => {
  return (
    <div className="my-6 flex gap-4">
      <Input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={onSearchChange}
        className="max-w-xs"
      />
      <Input
        type="date"
        value={dateFilter}
        onChange={onDateChange}
        className="max-w-xs"
      />
    </div>
  );
};