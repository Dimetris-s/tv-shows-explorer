import type { QueryFn, QueryKey } from './types';

export type QueryStatus = 'idle' | 'pending' | 'success' | 'error';

export type QueryEntry<T> = {
  status: QueryStatus;
  data: T | undefined;
  error: Error | null;
  isFetching: boolean;
  updatedAt: number;
};

type QueryRecord = {
  entry: QueryEntry<unknown>;
  listeners: Set<() => void>;
  observers: number;
  controller: AbortController | null;
};

const IDLE_ENTRY: QueryEntry<never> = {
  status: 'idle',
  data: undefined,
  error: null,
  isFetching: false,
  updatedAt: 0,
};

const records = new Map<string, QueryRecord>();

const recordOf = (hash: string) => {
  let record = records.get(hash);
  if (!record) {
    record = { entry: IDLE_ENTRY, listeners: new Set(), observers: 0, controller: null };
    records.set(hash, record);
  }
  return record;
};

const update = (record: QueryRecord, patch: Partial<QueryEntry<unknown>>) => {
  record.entry = { ...record.entry, ...patch };
  for (const listener of record.listeners) listener();
};

const toError = (error: unknown) => (error instanceof Error ? error : new Error(String(error)));

export const hashQueryKey = (queryKey: QueryKey) => JSON.stringify(queryKey);

export const queryStore = {
  get: <T>(hash: string): QueryEntry<T> =>
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    (records.get(hash)?.entry ?? IDLE_ENTRY) as QueryEntry<T>,

  subscribe: (hash: string, listener: () => void) => {
    const { listeners } = recordOf(hash);
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  observe: (hash: string) => {
    const record = recordOf(hash);
    record.observers += 1;
    return () => {
      record.observers -= 1;
      if (record.observers > 0 || !record.controller) return;
      record.controller.abort();
      record.controller = null;
      const status = record.entry.data === undefined ? 'idle' : record.entry.status;
      update(record, { isFetching: false, status });
    };
  },

  fetch: <T>(hash: string, queryFn: QueryFn<T>, staleTime: number) => {
    const record = recordOf(hash);
    const { entry } = record;
    const isFresh = entry.status === 'success' && Date.now() - entry.updatedAt < staleTime;
    if (record.controller || isFresh) return;

    const controller = new AbortController();
    record.controller = controller;
    update(record, {
      isFetching: true,
      status: entry.data === undefined ? 'pending' : entry.status,
    });

    queryFn({ signal: controller.signal }).then(
      (data) => {
        if (record.controller === controller) record.controller = null;
        update(record, {
          status: 'success',
          data,
          error: null,
          isFetching: false,
          updatedAt: Date.now(),
        });
      },
      (error: unknown) => {
        if (controller.signal.aborted) return;
        record.controller = null;
        update(record, { status: 'error', error: toError(error), isFetching: false });
      },
    );
  },

  invalidate: (hash: string) => {
    const record = records.get(hash);
    if (record) update(record, { updatedAt: 0 });
  },
};
