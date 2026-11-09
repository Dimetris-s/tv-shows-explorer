import type { GenreFilterProps } from './GenreFilter.types';

export const useGenreFilterPresenter = ({
  query,
  genres,
  selectedGenre,
  totalCount,
  filteredCount,
  onGenreChange,
}: GenreFilterProps) => {
  const handleGenreClick = (genre: string) => () =>
    onGenreChange(genre === selectedGenre ? null : genre);
  const handleReset = () => onGenreChange(null);

  return {
    summary: selectedGenre
      ? `${selectedGenre} · ${filteredCount} из ${totalCount}`
      : `Результатов по «${query}»: ${totalCount}`,
    isFiltered: selectedGenre !== null,
    totalCount,
    genres: genres.map((genre) => ({ ...genre, isActive: genre.name === selectedGenre })),
    handleGenreClick,
    handleReset,
  };
};
