import { Badge } from '@/components/Badge';

import { PosterPlaceholder } from './PosterPlaceholder';
import type { ShowPosterProps } from './ShowPoster.types';

export const ShowPoster = ({ imageUrl, title, caption, rating, isRunning }: ShowPosterProps) => {
  return (
    <div className="relative mb-1 aspect-2/3 overflow-hidden rounded-lg bg-secondary">
      {imageUrl ? (
        <img src={imageUrl} alt={title} loading="lazy" className="size-full object-cover" />
      ) : (
        <PosterPlaceholder title={title} caption={caption} />
      )}
      <div className="absolute inset-x-3 top-3 flex justify-between gap-2">
        {rating === null ? (
          <Badge variant="rating-empty" aria-label="Нет оценки">
            ★ —
          </Badge>
        ) : (
          <Badge variant="rating">★ {rating}</Badge>
        )}
        {isRunning && <Badge variant="soft">В эфире</Badge>}
      </div>
    </div>
  );
};
