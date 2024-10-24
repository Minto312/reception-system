'use client';

import { Reception } from '@/types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useReceptions = () => {
  const { data: receptions, isLoading, error, mutate } = useSWR<Reception[]>('/api/reception', fetcher);

  const refetch = () => {
    mutate();
  };

  return { receptions, isLoading, error, refetch };
};