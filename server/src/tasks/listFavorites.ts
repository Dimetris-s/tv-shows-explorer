import type { ShowListItem } from '#contract/index.ts';
import { favorite } from '#stores/favorite.ts';

export const listFavorites = (userId: string): ShowListItem[] =>
  Object.values(favorite[userId] ?? {})
    .toSorted((a, b) => b.addedAt - a.addedAt)
    .map(({ show }) => ({ ...show, isFavorite: true }));
