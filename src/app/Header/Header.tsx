import { Typography } from '@/components/Typography';

import { FavoritesButton } from './FavoritesButton';
import type { HeaderProps } from './Header.types';

export const Header = ({ onFavoritesOpen }: HeaderProps) => {
  return (
    <header className="flex min-h-18 items-center justify-between gap-4 border-b border-border">
      <Typography variant="h2" as="div">
        TV<span className="text-primary">·</span>Explorer
      </Typography>
      <FavoritesButton onClick={onFavoritesOpen} />
    </header>
  );
};
