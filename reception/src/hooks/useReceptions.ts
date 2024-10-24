'use client';

import { Reception } from '@/types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useReceptions = () => {
    const { data: receptions, isLoading, error } = useSWR<Reception[]>('/api/reception', fetcher);

    return { receptions, isLoading, error };
};
