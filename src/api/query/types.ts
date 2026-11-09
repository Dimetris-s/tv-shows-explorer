export type QueryKey = readonly unknown[];

export type QueryFn<T> = (context: { signal: AbortSignal }) => Promise<T>;

export type UseQueryOptions<T> = {
  queryKey: QueryKey;
  queryFn: QueryFn<T>;
  enabled?: boolean;
  staleTime?: number;
  keepPreviousData?: boolean;
};

export type QueryResult<T> = {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isPreviousData: boolean;
  refetch: () => void;
};
