import { ShowGrid } from '@/components/ShowGrid';

import { GenreFilter } from './GenreFilter';
import { Pagination } from './Pagination';
import type { ShowResultsProps } from './ShowResults.types';

export const ShowResults = ({
  query,
  result,
  selectedGenre,
  onGenreChange,
  onPageChange,
}: ShowResultsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <GenreFilter
        query={query}
        genres={result.genres}
        selectedGenre={selectedGenre}
        totalCount={result.totalCount}
        filteredCount={result.filteredCount}
        onGenreChange={onGenreChange}
      />
      <ShowGrid label="Результаты поиска" shows={result.items} highlightedGenre={selectedGenre} />
      <div className="flex justify-center">
        <Pagination page={result.page} pageCount={result.pageCount} onPageChange={onPageChange} />
      </div>
    </div>
  );
};
