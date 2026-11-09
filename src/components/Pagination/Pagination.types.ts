export type PaginationProps = {
  /** Current page, starting from 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};
