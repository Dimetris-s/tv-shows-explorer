import { createStore } from 'zustand/vanilla';

export type FavoritesState = {
  count: number | null;
  overrides: Record<number, boolean>;
};

export type FavoriteMark = {
  id: number;
  isFavorite: boolean;
};

export const favoritesStore = createStore<FavoritesState>(() => ({ count: null, overrides: {} }));

export const selectIsFavorite = (state: FavoritesState, { id, isFavorite }: FavoriteMark) =>
  state.overrides[id] ?? isFavorite;
