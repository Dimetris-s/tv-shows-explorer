import type { ShowListItem } from '@tv/server/contract';

export type FavoriteStarProps = {
  show: Pick<ShowListItem, 'id' | 'name' | 'isFavorite'>;
};
