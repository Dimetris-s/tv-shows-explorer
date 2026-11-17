import type { ShowCardProps } from '../ShowCard.types';
import { formatMeta, formatOverline, formatYears } from './formatShow';

export const useShowCardPresenter = ({ show, highlightedGenre }: ShowCardProps) => {
  const meta = formatMeta(show);

  return {
    show,
    name: show.name,
    overline: formatOverline(show),
    summary: show.summary,
    metaPrefix:
      meta.length > 0 && show.genres.length > 0 ? `${meta.join(' · ')} · ` : meta.join(' · '),
    genres: show.genres.map((genre, index) => ({
      name: genre,
      separator: index > 0 ? ', ' : '',
      isHighlighted: genre === highlightedGenre,
    })),
    poster: {
      imageUrl: show.posterUrl,
      title: show.name,
      caption: [formatYears(show), 'нет постера'].filter(Boolean).join(' · '),
      rating: show.rating,
      isRunning: show.isRunning,
    },
  };
};
