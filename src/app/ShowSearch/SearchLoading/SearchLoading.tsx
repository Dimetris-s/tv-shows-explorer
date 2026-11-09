import { Skeleton } from '@/components/Skeleton';
import { Typography } from '@/components/Typography';

import type { SearchLoadingProps } from './SearchLoading.types';
import { cardSkeletons, chipSkeletons } from './skeletons';

export const SearchLoading = ({ query }: SearchLoadingProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div aria-live="polite">
        <Typography variant="overline" tone="muted">
          Ищем «{query}»…
        </Typography>
      </div>
      <div aria-hidden="true" className="flex flex-wrap gap-2">
        {chipSkeletons.map((chip) => (
          <Skeleton key={chip.key} className={chip.className} />
        ))}
      </div>
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-3">
        {cardSkeletons.map((card) => (
          <div key={card.key} className="flex flex-col gap-3">
            <Skeleton className="aspect-2/3 rounded-lg" />
            <Skeleton className={card.titleClassName} />
            <Skeleton className={card.metaClassName} />
          </div>
        ))}
      </div>
    </div>
  );
};
