import type { Show } from '../../types/show';

export type ShowGridProps = {
  shows: Show[];
  highlightedGenre: string | null;
};
