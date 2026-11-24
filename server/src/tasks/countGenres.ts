import type { GenreCount } from '#contract/index.ts';
import type { Show } from '#types/show.ts';

export const countGenres = (shows: Show[]): GenreCount[] => {
  const counts = new Map<string, number>();
  for (const genre of shows.flatMap((show) => show.genres)) {
    counts.set(genre, (counts.get(genre) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .toSorted((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};
