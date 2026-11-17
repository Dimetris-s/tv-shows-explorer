import type { FavoritesCount } from '@tv/server/contract';

import { httpGet } from '@/services/http';
import { favoritesStore } from '@/stores/favoritesStore';

export const loadFavoritesCount = async () => {
  const { count } = await httpGet<FavoritesCount>('/api/favorites/count');
  favoritesStore.setState({ count });
};
