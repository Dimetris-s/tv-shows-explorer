import type { TvmazeShow } from '@/api/tvmaze';

export type ShowResultsProps = {
  query: string;
  shows: TvmazeShow[];
};
