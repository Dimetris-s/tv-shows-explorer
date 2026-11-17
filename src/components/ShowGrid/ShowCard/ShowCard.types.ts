import type { ShowListItem } from '@tv/server/contract';

export type ShowCardProps = {
  show: ShowListItem;
  highlightedGenre: string | null;
};
