import { StarIcon } from 'lucide-react';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

import type { FavoritesButtonProps } from './FavoritesButton.types';
import { useFavoritesButtonPresenter } from './logic/useFavoritesButtonPresenter';

export const FavoritesButton = (props: FavoritesButtonProps) => {
  const { count, hasCount, hasFavorites, label, handleClick } = useFavoritesButtonPresenter(props);

  return (
    <Button variant="outline" aria-label={label} onClick={handleClick} className="px-3.5">
      <StarIcon
        aria-hidden="true"
        className={hasFavorites ? 'fill-primary text-primary' : 'text-muted-foreground'}
      />
      Избранное
      {hasCount && (
        <Badge
          variant={hasFavorites ? 'default' : 'secondary'}
          className={
            hasFavorites ? 'min-w-6 rounded-full' : 'min-w-6 rounded-full text-muted-foreground'
          }
        >
          {count}
        </Badge>
      )}
    </Button>
  );
};
