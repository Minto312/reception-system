'use client';

import { Reception } from '@/types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useReceptions = () => {
  const { data: receptions, error, mutate } = useSWR<Reception[]>('/api/reception', fetcher, {
    refreshInterval: 5000, // 5秒ごとにデータを再取得
  });

  const isLoading = !receptions && !error;

  const refetch = () => {
    mutate();
  };

  return { receptions, isLoading, error, refetch };
};