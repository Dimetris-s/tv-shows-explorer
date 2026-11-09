import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/Button';

import type { PaginationProps } from './Pagination.types';
import { usePaginationPresenter } from './usePaginationPresenter';

export const Pagination = (props: PaginationProps) => {
  const { isHidden, pages, isFirst, isLast, handlePageClick, handlePrevious, handleNext } =
    usePaginationPresenter(props);

  if (isHidden) return null;

  return (
    <nav aria-label="Страницы результатов" className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Предыдущая страница"
        className="disabled:border-border disabled:bg-transparent"
        disabled={isFirst}
        onClick={handlePrevious}
      >
        <ChevronLeft />
      </Button>
      {pages.map((page) => (
        <Button
          key={page.number}
          variant={page.isCurrent ? 'default' : 'outline'}
          size="icon"
          aria-current={page.isCurrent ? 'page' : undefined}
          onClick={handlePageClick(page.number)}
        >
          {page.number}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        aria-label="Следующая страница"
        className="disabled:border-border disabled:bg-transparent"
        disabled={isLast}
        onClick={handleNext}
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};
