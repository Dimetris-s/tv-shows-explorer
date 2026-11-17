import type { Show } from '../../../types/show';

export const filterShowsByGenre = (shows: Show[], genre: string | null) =>
  genre ? shows.filter((show) => show.genres.includes(genre)) : shows;
