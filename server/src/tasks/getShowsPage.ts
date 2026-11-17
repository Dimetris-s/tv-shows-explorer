import type { ShowsPage } from '#contract/index.ts';

import { countGenres } from './countGenres.ts';
import { filterShowsByGenre } from './filterShowsByGenre.ts';
import { markFavorites } from './markFavorites.ts';
import { paginate } from './paginate.ts';
import { searchShows } from './searchShows.ts';

const PAGE_SIZE = 3;

export type ShowsPageParams = {
  query: string;
  genre: string | null;
  page: number;
  clientId: string;
};

export const getShowsPage = async (params: ShowsPageParams): Promise<ShowsPage> => {
  const shows = await searchShows(params.query);
  const filtered = filterShowsByGenre(shows, params.genre);
  const { items, page, pageCount } = paginate(filtered, params.page, PAGE_SIZE);
  return {
    items: markFavorites(items, params.clientId),
    page,
    pageCount,
    totalCount: shows.length,
    filteredCount: filtered.length,
    genres: countGenres(shows),
  };
};
