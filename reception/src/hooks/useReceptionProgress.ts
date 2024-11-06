'use client';

import { useState, useEffect } from 'react';
import { Reception } from '@/types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useReceptionProgress = () => {
  const { data: receptions, error } = useSWR<Reception[]>('/api/reception', fetcher);
  const [respondedReceptionCount, setRespondedReceptionCount] = useState(0);
  const [totalReceptionCount, setTotalReceptionCount] = useState(0);
  const [respondedRate, setRespondedRate] = useState(0);

  useEffect(() => {
    if (receptions) {
      const total = receptions.length;
      const responded = receptions.filter(reception => reception.attendedCA !== null).length;
      const rate = total > 0 ? (responded / total) * 100 : 0;

      setTotalReceptionCount(total);
      setRespondedReceptionCount(responded);
      setRespondedRate(rate);
    }
  }, [receptions]);

  return {
    respondedReceptionCount,
    totalReceptionCount,
    respondedRate,
  };
};