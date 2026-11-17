import { Typography } from '@/components/Typography';

import { FavoriteStar } from './FavoriteStar';
import type { ShowCardProps } from './ShowCard.types';
import { ShowPoster } from './ShowPoster';
import { useShowCardPresenter } from './logic/useShowCardPresenter';

export const ShowCard = (props: ShowCardProps) => {
  const { show, name, overline, summary, metaPrefix, genres, poster } = useShowCardPresenter(props);

  return (
    <article className="flex flex-col gap-2.5">
      <div className="relative">
        <ShowPoster {...poster} />
        <FavoriteStar show={show} />
      </div>
      <Typography variant="overline" tone="muted" className="tracking-[0.08em]">
        {overline}
      </Typography>
      <Typography variant="title">{name}</Typography>
      <Typography variant="small" tone="muted">
        {metaPrefix}
        {genres.map((genre) => (
          <span key={genre.name}>
            {genre.separator}
            <span className={genre.isHighlighted ? 'text-primary' : undefined}>{genre.name}</span>
          </span>
        ))}
      </Typography>
      <Typography variant="small" tone="subtle" className="line-clamp-3 text-sm">
        {summary}
      </Typography>
    </article>
  );
};
