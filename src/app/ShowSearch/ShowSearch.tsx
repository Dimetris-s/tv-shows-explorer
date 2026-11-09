import { NotFound } from './NotFound';
import { SearchError } from './SearchError';
import { SearchField } from './SearchField';
import { SearchLoading } from './SearchLoading';
import { ShowResults } from './ShowResults';
import { StartState } from './StartState';
import { useShowSearchPresenter } from './useShowSearchPresenter';

export const ShowSearch = () => {
  const { query, pendingQuery, isSearching, view, handleQueryChange, handleClear, handleRetry } =
    useShowSearchPresenter();

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
      {view.kind === 'error' && <SearchError message={view.message} onRetry={handleRetry} />}
      {view.kind === 'empty' && <NotFound query={view.query} onClear={handleClear} />}
      {view.kind === 'results' && (
        <ShowResults key={view.query} query={view.query} shows={view.shows} />
      )}
    </div>
  );
};
