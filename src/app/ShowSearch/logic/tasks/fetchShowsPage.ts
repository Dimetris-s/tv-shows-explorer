import type { ShowsPage } from '@tv/server/contract';

import { httpGet } from '@/services/http';

export type ShowsPageParams = {
  query: string;
  genre: string | null;
  page: number;
};

export const fetchShowsPage = ({ query, genre, page }: ShowsPageParams, signal?: AbortSignal) =>
  httpGet<ShowsPage>('/api/shows', {
    params: { q: query, genre: genre ?? undefined, page },
    ...(signal && { signal }),
  });
