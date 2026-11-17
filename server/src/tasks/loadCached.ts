import { CACHE_TTL_MS } from '#/stores/cache.ts';
import type { CacheBucket } from '#/stores/cache.ts';

export const loadCached = async <T>(
  bucket: CacheBucket<T>,
  key: string,
  load: () => Promise<T>,
): Promise<T> => {
  const entry = bucket[key];
  if (entry && Date.now() - entry.storedAt < CACHE_TTL_MS) return entry.data;
  const data = await load();
  bucket[key] = { data, storedAt: Date.now() };
  return data;
};
