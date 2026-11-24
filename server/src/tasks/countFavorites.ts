import type { FavoritesCount } from '#contract/index.ts';
import { favorite } from '#stores/favorite.ts';

export const countFavorites = (userId: string): FavoritesCount => ({
  count: Object.keys(favorite[userId] ?? {}).length,
});
