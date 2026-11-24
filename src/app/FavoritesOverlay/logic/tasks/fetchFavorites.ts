import type { ShowListItem } from '@tv/server/contract';

import { httpGet } from '@/services/http';
import { favoritesStore } from '@/stores/favoritesStore';
import { dropSessionIfUnauthorized } from '@/tasks/dropSessionIfUnauthorized';

export const fetchFavorites = async (signal?: AbortSignal) => {
  try {
    const shows = await httpGet<ShowListItem[]>('/api/favorites', { ...(signal && { signal }) });
    favoritesStore.setState({ count: shows.length });
    return shows;
  } catch (error) {
    dropSessionIfUnauthorized(error);
    throw error;
  }
};
