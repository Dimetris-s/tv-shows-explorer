import { GenreFilter } from './GenreFilter';
import { Pagination } from './Pagination';
import type { ShowResultsProps } from './ShowResults.types';
import { ShowGrid } from './ShowGrid';
import { useShowResultsPresenter } from './useShowResultsPresenter';

export const ShowResults = (props: ShowResultsProps) => {
  const {
    query,
    genres,
    selectedGenre,
    totalCount,
    filteredCount,
    visibleShows,
    page,
    pageCount,
    handleGenreChange,
    handlePageChange,
  } = useShowResultsPresenter(props);

  return (
    <div className="flex flex-col gap-8">
      <GenreFilter
        query={query}
        genres={genres}
        selectedGenre={selectedGenre}
        totalCount={totalCount}
        filteredCount={filteredCount}
        onGenreChange={handleGenreChange}
      />
      <ShowGrid shows={visibleShows} highlightedGenre={selectedGenre} />
      <div className="flex justify-center">
        <Pagination page={page} pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
