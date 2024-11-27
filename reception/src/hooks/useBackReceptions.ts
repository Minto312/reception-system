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

      const sorted = filtered.sort((a, b) => {
        if (a.visitDateTime && b.visitDateTime) {
          return new Date(a.visitDateTime).getTime() - new Date(b.visitDateTime).getTime();
        }
        return 0;
      });

      setFilteredReceptions(sorted);
    }
  }, [receptions]);

  const refetch = () => {
    refetchReceptions();
  };

  return { receptions: filteredReceptions, isLoading, error, refetch };
};