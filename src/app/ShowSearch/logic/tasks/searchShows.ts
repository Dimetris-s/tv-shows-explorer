import { httpGet } from '@/services/http';
import { TVMAZE_URL } from '@/services/tvmaze';
import type { TvmazeSearchResult, TvmazeShow } from '@/services/tvmaze';

import type { Show } from '../../types/show';

const toPlainText = (html: string | null) =>
  html ? (new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '') : '';

const toShow = (show: TvmazeShow): Show => ({
  id: show.id,
  name: show.name,
  type: show.type,
  genres: show.genres,
  isRunning: show.status === 'Running',
  premiered: show.premiered,
  ended: show.ended,
  runtime: show.runtime ?? show.averageRuntime,
  channel: show.network?.name ?? show.webChannel?.name ?? null,
  rating: show.rating.average,
  posterUrl: show.image?.medium ?? null,
  summary: toPlainText(show.summary),
});

export const searchShows = async (query: string, signal?: AbortSignal): Promise<Show[]> => {
  const results = await httpGet<TvmazeSearchResult[]>(`${TVMAZE_URL}/search/shows`, {
    params: { q: query },
    ...(signal && { signal }),
  });
  return results.map(({ show }) => toShow(show));
};
