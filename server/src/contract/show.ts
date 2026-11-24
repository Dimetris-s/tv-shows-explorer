import type { Show } from '#types/show.ts';

export type { Show };

export type ShowListItem = Show & { isFavorite: boolean };

export type GenreCount = {
  name: string;
  count: number;
};

export type ShowsPage = {
  items: ShowListItem[];
  page: number;
  pageCount: number;
  totalCount: number;
  filteredCount: number;
  genres: GenreCount[];
};
