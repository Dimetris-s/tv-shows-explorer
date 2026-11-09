import { ShowCard } from './ShowCard';
import type { ShowGridProps } from './ShowGrid.types';

export const ShowGrid = ({ shows, highlightedGenre }: ShowGridProps) => {
  return (
    <ul
      aria-label="Результаты поиска"
      className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
    >
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} highlightedGenre={highlightedGenre} />
        </li>
      ))}
    </ul>
  );
};
