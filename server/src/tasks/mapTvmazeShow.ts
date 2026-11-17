import type { Show } from '#/contract/index.ts';
import type { TvmazeShow } from '#/services/tvmaze/index.ts';

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

const toPlainText = (html: string | null) =>
  (html ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity] ?? entity)
    .trim();

export const mapTvmazeShow = (show: TvmazeShow): Show => ({
  id: show.id,
  name: show.name,
  type: show.type,
  genres: show.genres,
  isRunning: show.status === 'Running',
  premiered: show.premiered,
  ended: show.ended,
  runtime: show.runtime ?? show.averageRuntime,
  channel: show.network?.name ?? show.webChannel?.name ?? null,
  rating: show.rating.average,
  posterUrl: show.image?.medium ?? null,
  summary: toPlainText(show.summary),
});
