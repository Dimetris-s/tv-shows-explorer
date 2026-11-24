import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { paths } from '@/lib/paths';
import { usePathname } from '@/services/router';
import { selectIsSignedIn, sessionStore } from '@/stores/sessionStore';

import { restoreSession } from './tasks/restoreSession';

export const useAppPresenter = () => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const isSignedIn = useStore(sessionStore, selectIsSignedIn);
  const pathname = usePathname();

  useEffect(() => {
    restoreSession().catch(() => undefined);
  }, []);

  return {
    isLoginPage: pathname === paths.login,
    isFavoritesOpen: isSignedIn && isFavoritesOpen,
    handleFavoritesOpen: () => setIsFavoritesOpen(true),
    handleFavoritesClose: () => setIsFavoritesOpen(false),
  };
};
