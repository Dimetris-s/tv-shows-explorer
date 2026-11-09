import type { TvmazeShow } from '@/api/tvmaze';

export type ShowGridProps = {
  shows: TvmazeShow[];
  highlightedGenre: string | null;
};
