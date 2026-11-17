import type { Show } from '#contract/index.ts';

export type CacheEntry<T> = {
  data: T;
  storedAt: number;
};

export type CacheBucket<T> = Record<string, CacheEntry<T>>;

export const CACHE_TTL_MS = 5 * 60 * 1000;

export const cache: { searches: CacheBucket<Show[]>; shows: CacheBucket<Show | null> } = {
  searches: {},
  shows: {},
};
