import type { ShowListItem } from '#contract/index.ts';
import { favorite } from '#stores/favorite.ts';

export const listFavorites = (clientId: string): ShowListItem[] =>
  Object.values(favorite[clientId] ?? {})
    .toSorted((a, b) => b.addedAt - a.addedAt)
    .map(({ show }) => ({ ...show, isFavorite: true }));
