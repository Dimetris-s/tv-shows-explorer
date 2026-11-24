import { useStore } from 'zustand';

import { paths } from '@/lib/paths';
import { usePathname } from '@/services/router';
import { selectIsGuest, selectIsSignedIn, sessionStore } from '@/stores/sessionStore';

import type { HeaderProps } from '../Header.types';

export const useHeaderPresenter = ({ onFavoritesOpen }: HeaderProps) => {
  const isSignedIn = useStore(sessionStore, selectIsSignedIn);
  const isGuest = useStore(sessionStore, selectIsGuest);
  const pathname = usePathname();

  return {
    isSignedIn,
    canLogIn: isGuest && pathname !== paths.login,
    loginPath: paths.login,
    handleFavoritesOpen: onFavoritesOpen,
  };
};
