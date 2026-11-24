import type { Show } from '#types/show.ts';

export type FavoriteEntry = {
  show: Show;
  addedAt: number;
};

export const favorite: Record<string, Record<number, FavoriteEntry>> = {};
