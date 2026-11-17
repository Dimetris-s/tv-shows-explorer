import { Skeleton } from '@/components/Skeleton';

import { cardSkeletons } from './skeletons';

export const ShowGridSkeleton = () => {
  return (
    <div aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cardSkeletons.map((card) => (
        <div key={card.key} className="flex flex-col gap-3">
          <Skeleton className="aspect-2/3 rounded-lg" />
          <Skeleton className={card.titleClassName} />
          <Skeleton className={card.metaClassName} />
        </div>
      ))}
    </div>
  );
};
