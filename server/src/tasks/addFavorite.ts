import type { FavoriteToggle } from '#/contract/index.ts';
import { favorite } from '#/stores/favorite.ts';

import { countFavorites } from './countFavorites.ts';
import { fetchShow } from './fetchShow.ts';

export const addFavorite = async (
  clientId: string,
  showId: number,
): Promise<FavoriteToggle | null> => {
  const own = (favorite[clientId] ??= {});
  if (!own[showId]) {
    const show = await fetchShow(showId);
    if (!show) return null;
    own[showId] = { show, addedAt: Date.now() };
  }
  return { isFavorite: true, ...countFavorites(clientId) };
};
