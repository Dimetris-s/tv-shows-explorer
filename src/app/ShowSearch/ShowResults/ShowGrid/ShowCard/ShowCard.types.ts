import type { TvmazeShow } from '@/api/tvmaze';

export type ShowCardProps = {
  show: TvmazeShow;
  highlightedGenre: string | null;
};
