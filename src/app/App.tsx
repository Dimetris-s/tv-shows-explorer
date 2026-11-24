import { Toaster } from '@/components/Toaster';

import { FavoritesOverlay } from './FavoritesOverlay';
import { Header } from './Header';
import { LoginPage } from './LoginPage';
import { ShowSearch } from './ShowSearch';
import { FilmGrain } from './components/FilmGrain';
import { useAppPresenter } from './logic/useAppPresenter';

export const App = () => {
  const { isLoginPage, isFavoritesOpen, handleFavoritesOpen, handleFavoritesClose } =
    useAppPresenter();

  return (
    <div className="relative min-h-svh">
      <FilmGrain />
      <main className="relative mx-auto flex max-w-[1080px] flex-col gap-8 px-6 pb-20">
        <Header onFavoritesOpen={handleFavoritesOpen} />
        {isLoginPage ? <LoginPage /> : <ShowSearch />}
      </main>
      <FavoritesOverlay isOpen={isFavoritesOpen} onClose={handleFavoritesClose} />
      <Toaster />
    </div>
  );
};
