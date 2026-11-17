import type { FavoritesCount } from '#/contract/index.ts';
import { favorite } from '#/stores/favorite.ts';

export const countFavorites = (clientId: string): FavoritesCount => ({
  count: Object.keys(favorite[clientId] ?? {}).length,
});
