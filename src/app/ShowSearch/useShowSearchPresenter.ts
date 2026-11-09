import { useState } from 'react';

import { useQuery } from '@/api/query';
import { tvmazeApi } from '@/api/tvmaze';

import { toSearchView } from './searchView';
import type { SearchResult } from './searchView';
import { useDebouncedValue } from './useDebouncedValue';

const DEBOUNCE_MS = 400;

export const useShowSearchPresenter = () => {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const searchedQuery = useDebouncedValue(trimmedQuery, DEBOUNCE_MS);

  const { data, error, isFetching, refetch } = useQuery<SearchResult>({
    queryKey: ['shows', 'search', searchedQuery],
    queryFn: async ({ signal }) => ({
      query: searchedQuery,
      shows: await tvmazeApi.searchShows(searchedQuery, { signal }),
    }),
    enabled: searchedQuery.length > 0,
    keepPreviousData: true,
  });

  const handleClear = () => setQuery('');

  return {
    query,
    pendingQuery: trimmedQuery,
    isSearching: trimmedQuery.length > 0 && (isFetching || trimmedQuery !== searchedQuery),
    view: toSearchView({ query: trimmedQuery, result: data, error }),
    handleQueryChange: setQuery,
    handleClear,
    handleRetry: refetch,
  };
};
