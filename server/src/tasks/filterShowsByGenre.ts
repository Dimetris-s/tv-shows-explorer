import type { Show } from '#types/show.ts';

export const filterShowsByGenre = (shows: Show[], genre: string | null) =>
  genre ? shows.filter((show) => show.genres.includes(genre)) : shows;
