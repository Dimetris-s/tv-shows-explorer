import type { ShowListItem } from '@tv/server/contract';

export type ShowGridProps = {
  label: string;
  shows: ShowListItem[];
  highlightedGenre: string | null;
};
