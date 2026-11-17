import type { GenreCount } from '@tv/server/contract';

export type GenreFilterProps = {
  query: string;
  genres: GenreCount[];
  selectedGenre: string | null;
  totalCount: number;
  filteredCount: number;
  onGenreChange: (genre: string | null) => void;
};
