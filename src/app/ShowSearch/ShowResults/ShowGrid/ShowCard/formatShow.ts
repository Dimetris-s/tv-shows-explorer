import type { TvmazeShow } from '@/api/tvmaze';

const typeLabels: Record<string, string> = {
  Scripted: 'Сериал',
  Reality: 'Реалити',
  Animation: 'Анимация',
  Documentary: 'Документальный',
};

const yearOf = (date: string | null) => date?.slice(0, 4) ?? null;

export const formatYears = ({ premiered, ended }: TvmazeShow) => {
  const start = yearOf(premiered);
  const end = yearOf(ended);
  if (!start) return null;
  return end && end !== start ? `${start}–${end}` : start;
};

export const formatOverline = (show: TvmazeShow) =>
  [typeLabels[show.type] ?? show.type, formatYears(show)].filter(Boolean).join(' · ');

export const formatMeta = ({ network, webChannel, runtime, averageRuntime }: TvmazeShow) => {
  const minutes = runtime ?? averageRuntime;
  return [network?.name ?? webChannel?.name, minutes ? `${minutes} мин` : null].filter(Boolean);
};

export const toPlainText = (html: string | null) =>
  html ? (new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '') : '';
