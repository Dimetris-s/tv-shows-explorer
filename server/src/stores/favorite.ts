import type { Show } from '#contract/index.ts';

export type FavoriteEntry = {
  show: Show;
  addedAt: number;
};

export const favorite: Record<string, Record<number, FavoriteEntry>> = {};
