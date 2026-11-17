export type Show = {
  id: number;
  name: string;
  type: string;
  genres: string[];
  isRunning: boolean;
  premiered: string | null;
  ended: string | null;
  runtime: number | null;
  channel: string | null;
  rating: number | null;
  posterUrl: string | null;
  summary: string;
};

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
