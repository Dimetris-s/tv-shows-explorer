import { httpGet } from '@/api/http';

import type { TvmazeSearchResult, TvmazeShow } from './types';

const BASE_URL = 'https://api.tvmaze.com';

type CallOptions = {
  signal?: AbortSignal;
};

export const tvmazeApi = {
  /** Full-text search. TVmaze returns at most 10 best matches. */
  searchShows: async (query: string, options: CallOptions = {}): Promise<TvmazeShow[]> => {
    const results = await httpGet<TvmazeSearchResult[]>(`${BASE_URL}/search/shows`, {
      ...options,
      params: { q: query },
    });
    return results.map(({ show }) => show);
  },

  getShow: (id: number, options: CallOptions = {}) =>
    httpGet<TvmazeShow>(`${BASE_URL}/shows/${id}`, options),
};
