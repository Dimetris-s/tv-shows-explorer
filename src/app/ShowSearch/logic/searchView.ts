import type { Show } from '../types/show';

export type SearchResult = {
  query: string;
  shows: Show[];
};

export type SearchView =
  | { kind: 'start' }
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'empty'; query: string }
  | { kind: 'results'; query: string; shows: Show[] };

type SearchState = {
  query: string;
  result: SearchResult | undefined;
  error: Error | null;
};

export const toSearchView = ({ query, result, error }: SearchState): SearchView => {
  if (!query) return { kind: 'start' };
  if (error) return { kind: 'error', message: error.message };
  if (!result) return { kind: 'loading' };
  if (result.shows.length === 0) return { kind: 'empty', query: result.query };
  return { kind: 'results', query: result.query, shows: result.shows };
};
