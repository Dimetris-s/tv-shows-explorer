import type { FavoriteToggle } from '#contract/index.ts';
import { favorite } from '#stores/favorite.ts';

import { countFavorites } from './countFavorites.ts';

export const removeFavorite = (userId: string, showId: number): FavoriteToggle => {
  const own = favorite[userId];
  if (own) delete own[showId];
  return { isFavorite: false, ...countFavorites(userId) };
};
