import { ShowGridSkeleton } from '@/components/ShowGridSkeleton';
import { Skeleton } from '@/components/Skeleton';
import { Typography } from '@/components/Typography';

import type { SearchLoadingProps } from './SearchLoading.types';
import { chipSkeletons } from './skeletons';

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
      <div className="pt-3">
        <ShowGridSkeleton />
      </div>
    </div>
  );
};
