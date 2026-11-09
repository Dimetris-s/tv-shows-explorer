import type { TvmazeShow } from '@/api/tvmaze';

import type { GenreCount } from './GenreFilter';

export const countGenres = (shows: TvmazeShow[]): GenreCount[] => {
  const counts = new Map<string, number>();
  for (const genre of shows.flatMap((show) => show.genres)) {
    counts.set(genre, (counts.get(genre) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .toSorted((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};
