import type { FavoriteToggle } from '@tv/server/contract';

import { httpDelete, httpPut } from '@/services/http';
import { favoritesStore, selectIsFavorite } from '@/stores/favoritesStore';
import type { FavoriteMark } from '@/stores/favoritesStore';
import { dropSessionIfUnauthorized } from '@/tasks/dropSessionIfUnauthorized';

const setOverride = (showId: number, isFavorite: boolean) =>
  favoritesStore.setState((state) => ({
    overrides: { ...state.overrides, [showId]: isFavorite },
  }));

export const toggleFavorite = async (show: FavoriteMark): Promise<FavoriteToggle> => {
  const wasFavorite = selectIsFavorite(favoritesStore.getState(), show);
  const url = `/api/favorites/${show.id}`;
  setOverride(show.id, !wasFavorite);
  try {
    const result = wasFavorite
      ? await httpDelete<FavoriteToggle>(url)
      : await httpPut<FavoriteToggle>(url);
    setOverride(show.id, result.isFavorite);
    favoritesStore.setState({ count: result.count });
    return result;
  } catch (error) {
    setOverride(show.id, wasFavorite);
    dropSessionIfUnauthorized(error);
    throw error;
  }
};
