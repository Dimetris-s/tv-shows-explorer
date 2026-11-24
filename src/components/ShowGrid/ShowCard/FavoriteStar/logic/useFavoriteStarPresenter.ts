import { toast } from 'sonner';
import { useStore } from 'zustand';

import { favoritesStore, selectIsFavorite } from '@/stores/favoritesStore';

import type { FavoriteStarProps } from '../FavoriteStar.types';
import { toggleFavorite } from './tasks/toggleFavorite';

const notifySuccess = (name: string, isFavorite: boolean) =>
  isFavorite
    ? toast.success('Добавлено в избранное', { description: name })
    : toast.info('Убрано из избранного', { description: name });

const notifyError = () =>
  toast.error('Не удалось обновить избранное', {
    description: 'Звёздочка вернулась как было. Попробуйте ещё раз.',
  });

export const useFavoriteStarPresenter = ({ show }: FavoriteStarProps) => {
  const isFavorite = useStore(favoritesStore, (state) => selectIsFavorite(state, show));

  const handleToggle = () => {
    toggleFavorite(show).then((result) => notifySuccess(show.name, result.isFavorite), notifyError);
  };

  return {
    isFavorite,
    label: isFavorite ? 'Убрать из избранного' : 'Добавить в избранное',
    handleToggle,
  };
};
