export type QueryKey = readonly unknown[];

export type QueryFn<T> = (context: { signal: AbortSignal }) => Promise<T>;

export type UseQueryOptions<T> = {
  /** Identifies the data in the cache: serializable values only. */
  queryKey: QueryKey;
  /** Must pass `signal` to the request so that outdated requests are cancelled. */
  queryFn: QueryFn<T>;
  /** `false` skips fetching (e.g. while the search query is empty). Default `true`. */
  enabled?: boolean;
  /** How long cached data counts as fresh, ms. Default 5 minutes. */
  staleTime?: number;
  /** Keep showing the previous key's data while the new key loads. Default `false`. */
  keepPreviousData?: boolean;
};

export type QueryResult<T> = {
  data: T | undefined;
  error: Error | null;
  /** First load: fetching and no data to show yet. */
  isLoading: boolean;
  /** Any request in flight, including background refetch. */
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  /** Data belongs to a previous key (see `keepPreviousData`). */
  isPreviousData: boolean;
  refetch: () => void;
};
