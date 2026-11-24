import type { FavoritesCount } from '@tv/server/contract';

import { httpGet } from '@/services/http';
import { favoritesStore } from '@/stores/favoritesStore';

import { dropSessionIfUnauthorized } from './dropSessionIfUnauthorized';

export const loadFavoritesCount = async () => {
  try {
    const { count } = await httpGet<FavoritesCount>('/api/favorites/count');
    favoritesStore.setState({ count });
  } catch (error) {
    dropSessionIfUnauthorized(error);
    throw error;
  }
};
