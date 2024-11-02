'use client';

import { useMemo } from 'react';
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

  const enhancedReceptions = useMemo(() => {
    return receptions?.map((reception) => ({
      ...reception,
      is_attended: reception.visitDateTime !== null && reception.attendedCA === '未確認',
      is_responded: reception.visitDateTime !== null && reception.attendedCA !== '未確認' && reception.attendedCA !== null,
    }));
  }, [receptions]);

  return { receptions: enhancedReceptions, isLoading, error, refetch };
};