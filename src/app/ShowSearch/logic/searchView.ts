import type { ShowsPage } from '@tv/server/contract';

export type SearchResult = {
  query: string;
  page: ShowsPage;
};

export type SearchView =
  | { kind: 'start' }
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'empty'; query: string }
  | { kind: 'results'; query: string; result: ShowsPage };

type SearchState = {
  query: string;
  result: SearchResult | undefined;
  error: Error | null;
};

export const toSearchView = ({ query, result, error }: SearchState): SearchView => {
  if (!query) return { kind: 'start' };
  if (error) return { kind: 'error', message: error.message };
  if (!result) return { kind: 'loading' };
  if (result.page.totalCount === 0) return { kind: 'empty', query: result.query };
  return { kind: 'results', query: result.query, result: result.page };
};
