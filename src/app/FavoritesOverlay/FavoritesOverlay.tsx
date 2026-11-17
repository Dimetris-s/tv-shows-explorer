import { XIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { NetworkError } from '@/components/NetworkError';
import { ShowGrid } from '@/components/ShowGrid';
import { ShowGridSkeleton } from '@/components/ShowGridSkeleton';
import { Typography } from '@/components/Typography';

import { FilmGrain } from '../components/FilmGrain';
import { FavoritesEmpty } from './FavoritesEmpty';
import type { FavoritesOverlayProps } from './FavoritesOverlay.types';
import { useFavoritesOverlayPresenter } from './logic/useFavoritesOverlayPresenter';

export const FavoritesOverlay = (props: FavoritesOverlayProps) => {
  const {
    isOpen,
    shows,
    count,
    hasCount,
    hasShows,
    isLoading,
    isError,
    isEmpty,
    handleOpenChange,
    handleClose,
    handleRetry,
  } = useFavoritesOverlayPresenter(props);

  return (
    <Dialog label="Избранное" isOpen={isOpen} onOpenChange={handleOpenChange}>
      <FilmGrain />
      <div className="relative mx-auto flex max-w-[1080px] flex-col gap-8 px-6 pb-20">
        <header className="flex min-h-24 items-center justify-between gap-4 border-b border-border">
          <div className="flex flex-col gap-1.5">
            {hasShows && (
              <Typography variant="overline" tone="muted">
                Недавно добавленные сверху
              </Typography>
            )}
            <Typography variant="h1">
              Избранное {hasCount && <span className="text-muted-foreground">· {count}</span>}
            </Typography>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Закрыть избранное"
            onClick={handleClose}
          >
            <XIcon aria-hidden="true" />
          </Button>
        </header>
        {isLoading && <ShowGridSkeleton />}
        {isError && <NetworkError message="Не удалось загрузить избранное" onRetry={handleRetry} />}
        {isEmpty && <FavoritesEmpty onClose={handleClose} />}
        {hasShows && <ShowGrid label="Избранные сериалы" shows={shows} highlightedGenre={null} />}
      </div>
    </Dialog>
  );
};
