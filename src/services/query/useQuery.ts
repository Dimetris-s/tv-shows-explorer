import { useCallback, useEffect, useEffectEvent, useState, useSyncExternalStore } from 'react';

import { hashQueryKey, queryStore } from './queryStore';
import type { QueryResult, UseQueryOptions } from './types';

const DEFAULT_STALE_TIME = 5 * 60_000;

type LastData<T> = { hash: string; data: T } | null;

export const useQuery = <T>(options: UseQueryOptions<T>): QueryResult<T> => {
  const {
    queryKey,
    enabled = true,
    staleTime = DEFAULT_STALE_TIME,
    keepPreviousData = false,
  } = options;
  const hash = hashQueryKey(queryKey);

  const subscribe = useCallback(
    (listener: () => void) => queryStore.subscribe(hash, listener),
    [hash],
  );
  const entry = useSyncExternalStore(subscribe, () => queryStore.get<T>(hash));

  const [lastData, setLastData] = useState<LastData<T>>(null);
  if (entry.data !== undefined && (lastData?.hash !== hash || lastData.data !== entry.data)) {
    setLastData({ hash, data: entry.data });
  }

  const fetchQuery = useEffectEvent(() => queryStore.fetch(hash, options.queryFn, staleTime));

  useEffect(() => {
    if (!enabled) return undefined;
    const release = queryStore.observe(hash);
    fetchQuery();
    return release;
  }, [hash, enabled]);

  const refetch = () => {
    queryStore.invalidate(hash);
    queryStore.fetch(hash, options.queryFn, staleTime);
  };

  const data = entry.data ?? (keepPreviousData ? lastData?.data : undefined);
  const isFetching = entry.isFetching || (enabled && entry.status === 'idle');

  return {
    data,
    error: entry.error,
    isLoading: isFetching && data === undefined,
    isFetching,
    isError: entry.status === 'error',
    isSuccess: entry.status === 'success',
    isPreviousData: entry.data === undefined && data !== undefined,
    refetch,
  };
};
