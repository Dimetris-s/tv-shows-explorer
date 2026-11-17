import { createStore } from 'zustand/vanilla';

export type FavoritesState = {
  count: number | null;
  overrides: Record<number, boolean>;
};

export const favoritesStore = createStore<FavoritesState>(() => ({ count: null, overrides: {} }));
