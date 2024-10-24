'use client';

import { useState, useEffect } from 'react';
import { Reception } from '@/types';
import { useReceptions } from '@/hooks/useReceptions';

export const useBackReceptions = () => {
  const { receptions, isLoading, error, refetch: refetchReceptions } = useReceptions();
  const [filteredReceptions, setFilteredReceptions] = useState<Reception[]>([]);

  useEffect(() => {
    if (receptions) {
      const filtered = receptions.filter(
        (reception) => reception.visitDateTime !== null && reception.attendedCA === null
      );
      setFilteredReceptions(filtered);
    }
  }, [receptions]);

  const refetch = () => {
    refetchReceptions();
  };

  return { receptions: filteredReceptions, isLoading, error, refetch };
};