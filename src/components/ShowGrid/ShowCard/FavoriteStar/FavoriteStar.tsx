import { StarIcon } from 'lucide-react';

import type { FavoriteStarProps } from './FavoriteStar.types';
import { useFavoriteStarPresenter } from './logic/useFavoriteStarPresenter';

export const FavoriteStar = (props: FavoriteStarProps) => {
  const { isFavorite, label, handleToggle } = useFavoriteStarPresenter(props);

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={handleToggle}
      className="group/star absolute top-2 right-2 flex size-11 items-center justify-center rounded-full border border-transparent bg-background/80 transition-colors outline-none hover:border-primary hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <StarIcon
        aria-hidden="true"
        className={
          isFavorite
            ? 'size-5.5 fill-primary text-primary'
            : 'size-5.5 text-foreground group-hover/star:text-primary'
        }
      />
    </button>
  );
};
