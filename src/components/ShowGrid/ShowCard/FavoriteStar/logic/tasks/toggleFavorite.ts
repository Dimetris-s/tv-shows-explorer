import type { FavoriteToggle, ShowListItem } from '@tv/server/contract';

import { httpDelete, httpPut } from '@/services/http';
import { favoritesStore } from '@/stores/favoritesStore';

const setOverride = (showId: number, isFavorite: boolean) =>
  favoritesStore.setState((state) => ({
    overrides: { ...state.overrides, [showId]: isFavorite },
  }));

export const toggleFavorite = async (show: ShowListItem): Promise<FavoriteToggle> => {
  const wasFavorite = favoritesStore.getState().overrides[show.id] ?? show.isFavorite;
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
    throw error;
  }
};
