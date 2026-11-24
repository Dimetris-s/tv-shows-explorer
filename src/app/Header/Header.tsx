import { LogIn } from 'lucide-react';

import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';

import { FavoritesButton } from './FavoritesButton';
import type { HeaderProps } from './Header.types';
import { UserMenu } from './UserMenu';
import { useHeaderPresenter } from './logic/useHeaderPresenter';

export const Header = (props: HeaderProps) => {
  const { isSignedIn, canLogIn, loginPath, handleFavoritesOpen } = useHeaderPresenter(props);

  return (
    <header className="flex min-h-18 items-center justify-between gap-4 border-b border-border">
      <Typography variant="h2" as="div">
        TV<span className="text-primary">·</span>Explorer
      </Typography>
      {isSignedIn && (
        <div className="flex min-w-0 items-center gap-2">
          <UserMenu />
          <FavoritesButton onClick={handleFavoritesOpen} />
        </div>
      )}
      {canLogIn && (
        <Link to={loginPath} variant="outline" className="px-3.5">
          <LogIn aria-hidden="true" />
          Войти
        </Link>
      )}
    </header>
  );
};
