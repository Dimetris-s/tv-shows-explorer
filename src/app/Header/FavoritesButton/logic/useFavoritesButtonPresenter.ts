import { useStore } from 'zustand';

import { favoritesStore } from '@/stores/favoritesStore';

import type { FavoritesButtonProps } from '../FavoritesButton.types';

export const useFavoritesButtonPresenter = ({ onClick }: FavoritesButtonProps) => {
  const count = useStore(favoritesStore, (state) => state.count);
  const hasFavorites = count !== null && count > 0;

  return {
    count,
    hasCount: count !== null,
    hasFavorites,
    label: count === null ? 'Избранное' : `Избранное, сериалов: ${count}`,
    handleClick: onClick,
  };
};
