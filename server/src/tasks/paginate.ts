export type PageSlice<T> = {
  items: T[];
  page: number;
  pageCount: number;
};

export const paginate = <T>(items: T[], page: number, pageSize: number): PageSlice<T> => ({
  items: items.slice((page - 1) * pageSize, page * pageSize),
  page,
  pageCount: Math.ceil(items.length / pageSize),
});
