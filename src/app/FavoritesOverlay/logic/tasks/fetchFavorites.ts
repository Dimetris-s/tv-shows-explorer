import type { ShowListItem } from '@tv/server/contract';

import { httpGet } from '@/services/http';
import { favoritesStore } from '@/stores/favoritesStore';

export const fetchFavorites = async (signal?: AbortSignal) => {
  const shows = await httpGet<ShowListItem[]>('/api/favorites', { ...(signal && { signal }) });
  favoritesStore.setState({ count: shows.length });
  return shows;
};
