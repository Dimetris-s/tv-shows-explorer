import type { GenreCount } from '../types/genreCount';

export type GenreFilterProps = {
  query: string;
  genres: GenreCount[];
  selectedGenre: string | null;
  totalCount: number;
  filteredCount: number;
  onGenreChange: (genre: string | null) => void;
};
