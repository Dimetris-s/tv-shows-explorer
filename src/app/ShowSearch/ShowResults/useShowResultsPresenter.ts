import { useState } from 'react';

import { countGenres } from './countGenres';
import type { ShowResultsProps } from './ShowResults.types';

const PAGE_SIZE = 3;

export const useShowResultsPresenter = ({ query, shows }: ShowResultsProps) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres.includes(selectedGenre))
    : shows;

  const handleGenreChange = (genre: string | null) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  return {
    query,
    genres: countGenres(shows),
    selectedGenre,
    totalCount: shows.length,
    filteredCount: filteredShows.length,
    visibleShows: filteredShows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    pageCount: Math.ceil(filteredShows.length / PAGE_SIZE),
    handleGenreChange,
    handlePageChange: setPage,
  };
};
