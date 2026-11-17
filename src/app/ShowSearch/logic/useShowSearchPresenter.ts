import { useState } from 'react';

import { useQuery } from '@/services/query';

import { toSearchView } from './searchView';
import type { SearchResult } from './searchView';
import { fetchShowsPage } from './tasks/fetchShowsPage';
import { useDebouncedValue } from './useDebouncedValue';

const DEBOUNCE_MS = 400;

export const useShowSearchPresenter = () => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const trimmedQuery = query.trim();
  const searchedQuery = useDebouncedValue(trimmedQuery, DEBOUNCE_MS);

  const { data, error, isFetching, refetch } = useQuery<SearchResult>({
    queryKey: ['shows', searchedQuery, genre, page],
    queryFn: async ({ signal }) => ({
      query: searchedQuery,
      page: await fetchShowsPage({ query: searchedQuery, genre, page }, signal),
    }),
    enabled: searchedQuery.length > 0,
    keepPreviousData: true,
  });

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setGenre(null);
    setPage(1);
  };

  const handleGenreChange = (value: string | null) => {
    setGenre(value);
    setPage(1);
  };

  return {
    query,
    pendingQuery: trimmedQuery,
    selectedGenre: genre,
    isSearching: trimmedQuery.length > 0 && (isFetching || trimmedQuery !== searchedQuery),
    view: toSearchView({ query: trimmedQuery, result: data, error }),
    handleQueryChange,
    handleGenreChange,
    handlePageChange: setPage,
    handleClear: () => handleQueryChange(''),
    handleRetry: refetch,
  };
};
