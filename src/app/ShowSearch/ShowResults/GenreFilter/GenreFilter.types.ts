export type GenreCount = {
  name: string;
  count: number;
};

export type GenreFilterProps = {
  query: string;
  genres: GenreCount[];
  selectedGenre: string | null;
  totalCount: number;
  filteredCount: number;
  onGenreChange: (genre: string | null) => void;
};
