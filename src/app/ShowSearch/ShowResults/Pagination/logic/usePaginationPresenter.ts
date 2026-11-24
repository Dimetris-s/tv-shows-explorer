import type { PaginationProps } from '../Pagination.types';

export const usePaginationPresenter = ({ page, pageCount, onPageChange }: PaginationProps) => {
  const handlePageClick = (target: number) => () => onPageChange(target);

  return {
    isHidden: pageCount <= 1,
    pages: Array.from({ length: pageCount }, (_, index) => ({
      number: index + 1,
      isCurrent: index + 1 === page,
    })),
    isFirst: page <= 1,
    isLast: page >= pageCount,
    handlePageClick,
    handlePrevious: handlePageClick(page - 1),
    handleNext: handlePageClick(page + 1),
  };
};
