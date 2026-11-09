import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Typography } from '@/components/Typography';

import type { GenreFilterProps } from './GenreFilter.types';
import { useGenreFilterPresenter } from './useGenreFilterPresenter';

export const GenreFilter = (props: GenreFilterProps) => {
  const { summary, isFiltered, totalCount, genres, handleGenreClick, handleReset } =
    useGenreFilterPresenter(props);

  return (
    <section aria-label="Жанры" className="flex flex-col gap-3.5">
      <div className="flex min-h-8 flex-wrap items-center gap-3">
        <Typography variant="overline" tone="muted">
          {summary}
        </Typography>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Сбросить фильтр
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip isActive={!isFiltered} count={totalCount} onClick={handleReset}>
          Все
        </Chip>
        {genres.map((genre) => (
          <Chip
            key={genre.name}
            isActive={genre.isActive}
            count={genre.count}
            onClick={handleGenreClick(genre.name)}
          >
            {genre.name}
          </Chip>
        ))}
      </div>
    </section>
  );
};
