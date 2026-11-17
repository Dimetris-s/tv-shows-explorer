import type { ShowsPage } from '@tv/server/contract';

export type ShowResultsProps = {
  query: string;
  result: ShowsPage;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
  onPageChange: (page: number) => void;
};
