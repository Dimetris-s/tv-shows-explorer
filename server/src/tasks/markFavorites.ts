import type { ShowListItem } from '#contract/index.ts';
import type { Show } from '#types/show.ts';
import { favorite } from '#stores/favorite.ts';

export const markFavorites = (shows: Show[], userId: string | null): ShowListItem[] => {
  const own = (userId && favorite[userId]) || {};
  return shows.map((show) => ({ ...show, isFavorite: show.id in own }));
};
