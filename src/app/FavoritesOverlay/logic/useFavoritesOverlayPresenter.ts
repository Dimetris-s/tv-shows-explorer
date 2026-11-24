import { useStore } from 'zustand';

import { useQuery } from '@/services/query';
import { favoritesStore, selectIsFavorite } from '@/stores/favoritesStore';

import type { FavoritesOverlayProps } from '../FavoritesOverlay.types';
import { fetchFavorites } from './tasks/fetchFavorites';

export const useFavoritesOverlayPresenter = ({ isOpen, onClose }: FavoritesOverlayProps) => {
  const favorites = useStore(favoritesStore);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: ({ signal }) => fetchFavorites(signal),
    enabled: isOpen,
    staleTime: 0,
  });

  const shows = (data ?? []).filter((show) => selectIsFavorite(favorites, show));

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return {
    isOpen,
    shows,
    count: shows.length,
    hasCount: !isLoading,
    hasShows: shows.length > 0,
    isLoading,
    isError: !data && error !== null,
    isEmpty: data !== undefined && shows.length === 0,
    handleOpenChange,
    handleClose: onClose,
    handleRetry: refetch,
  };
};
