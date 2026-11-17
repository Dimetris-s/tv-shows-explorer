import type { Show } from '#contract/index.ts';
import { httpGet } from '#services/http/index.ts';
import { TVMAZE_URL } from '#services/tvmaze/index.ts';
import type { TvmazeSearchResult } from '#services/tvmaze/index.ts';
import { cache } from '#stores/cache.ts';

import { loadCached } from './loadCached.ts';
import { mapTvmazeShow } from './mapTvmazeShow.ts';

export const searchShows = (query: string): Promise<Show[]> => {
  const normalized = query.trim().toLowerCase();
  const url = `${TVMAZE_URL}/search/shows`;
  return loadCached(cache.searches, `${url}?q=${normalized}`, async () => {
    const results = await httpGet<TvmazeSearchResult[]>(url, { params: { q: normalized } });
    return results.map(({ show }) => mapTvmazeShow(show));
  });
};
