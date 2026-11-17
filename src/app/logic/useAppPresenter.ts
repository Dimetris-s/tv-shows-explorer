import { useEffect, useState } from 'react';

import { loadFavoritesCount } from './tasks/loadFavoritesCount';

export const useAppPresenter = () => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    loadFavoritesCount().catch(() => undefined);
  }, []);

  return {
    isFavoritesOpen,
    handleFavoritesOpen: () => setIsFavoritesOpen(true),
    handleFavoritesClose: () => setIsFavoritesOpen(false),
  };
};
