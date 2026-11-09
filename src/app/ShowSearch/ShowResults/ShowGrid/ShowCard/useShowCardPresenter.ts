import type { ShowCardProps } from './ShowCard.types';
import { formatMeta, formatOverline, formatYears, toPlainText } from './formatShow';

export const useShowCardPresenter = ({ show, highlightedGenre }: ShowCardProps) => {
  const meta = formatMeta(show);

  return {
    name: show.name,
    overline: formatOverline(show),
    summary: toPlainText(show.summary),
    metaPrefix:
      meta.length > 0 && show.genres.length > 0 ? `${meta.join(' · ')} · ` : meta.join(' · '),
    genres: show.genres.map((genre, index) => ({
      name: genre,
      separator: index > 0 ? ', ' : '',
      isHighlighted: genre === highlightedGenre,
    })),
    poster: {
      imageUrl: show.image?.medium ?? null,
      title: show.name,
      caption: [formatYears(show), 'нет постера'].filter(Boolean).join(' · '),
      rating: show.rating.average,
      isRunning: show.status === 'Running',
    },
  };
};
