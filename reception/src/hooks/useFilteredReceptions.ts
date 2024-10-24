'use client';

import { useState } from 'react';
import { Reception } from '@/types';
import { useReceptions } from '@/hooks/useReceptions';

export const useFilteredReceptions = () => {
  const { receptions, isLoading, error } = useReceptions();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredReceptions = receptions?.filter((reception) =>
    reception.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    reception.visitDateTime === null
  );

  return { filteredReceptions, isLoading, error, searchTerm, handleSearchChange };
};