import { NetworkError } from '@/components/NetworkError';

import { NotFound } from './NotFound';
import { SearchField } from './SearchField';
import { SearchLoading } from './SearchLoading';
import { ShowResults } from './ShowResults';
import { StartState } from './StartState';
import { useShowSearchPresenter } from './logic/useShowSearchPresenter';

export const ShowSearch = () => {
  const {
    query,
    pendingQuery,
    selectedGenre,
    isSearching,
    view,
    handleQueryChange,
    handleGenreChange,
    handlePageChange,
    handleClear,
    handleRetry,
  } = useShowSearchPresenter();

  return (
    <div className="flex flex-col gap-8">
      <SearchField
        label="Название сериала"
        placeholder="Начните вводить название сериала"
        value={query}
        isLoading={isSearching}
        onValueChange={handleQueryChange}
      />
      {view.kind === 'start' && <StartState />}
      {view.kind === 'loading' && <SearchLoading query={pendingQuery} />}
      {view.kind === 'error' && <NetworkError message={view.message} onRetry={handleRetry} />}
      {view.kind === 'empty' && <NotFound query={view.query} onClear={handleClear} />}
      {view.kind === 'results' && (
        <ShowResults
          query={view.query}
          result={view.result}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
