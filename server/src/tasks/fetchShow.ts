import type { Show } from '#/contract/index.ts';
import { HttpError, httpGet } from '#/services/http/index.ts';
import { TVMAZE_URL } from '#/services/tvmaze/index.ts';
import type { TvmazeShow } from '#/services/tvmaze/index.ts';
import { cache } from '#/stores/cache.ts';

import { loadCached } from './loadCached.ts';
import { mapTvmazeShow } from './mapTvmazeShow.ts';

const isNotFound = (error: unknown) => error instanceof HttpError && error.status === 404;

export const fetchShow = (id: number): Promise<Show | null> => {
  const url = `${TVMAZE_URL}/shows/${id}`;
  return loadCached(cache.shows, url, async () => {
    try {
      return mapTvmazeShow(await httpGet<TvmazeShow>(url));
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  });
};
