import type { Show } from '../../../../types/show';

const typeLabels: Record<string, string> = {
  Scripted: 'Сериал',
  Reality: 'Реалити',
  Animation: 'Анимация',
  Documentary: 'Документальный',
};

const yearOf = (date: string | null) => date?.slice(0, 4) ?? null;

export const formatYears = ({ premiered, ended }: Show) => {
  const start = yearOf(premiered);
  const end = yearOf(ended);
  if (!start) return null;
  return end && end !== start ? `${start}–${end}` : start;
};

export const formatOverline = (show: Show) =>
  [typeLabels[show.type] ?? show.type, formatYears(show)].filter(Boolean).join(' · ');

export const formatMeta = ({ channel, runtime }: Show) =>
  [channel, runtime ? `${runtime} мин` : null].filter(Boolean);
