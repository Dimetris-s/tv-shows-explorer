import { HttpError } from './HttpError';

const DEFAULT_TIMEOUT_MS = 10_000;

export type QueryParams = Record<string, string | number | boolean | undefined>;

export type RequestOptions = {
  signal?: AbortSignal;
  params?: QueryParams;
  timeoutMs?: number;
};

const buildUrl = (url: string, params: QueryParams = {}) => {
  const result = new URL(url);
  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined) result.searchParams.set(name, String(value));
  }
  return result;
};

export const httpGet = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { signal, params, timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const requestSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  let response: Response;
  try {
    response = await fetch(buildUrl(url, params), {
      signal: requestSignal,
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    const kind = timeoutSignal.aborted ? 'timeout' : 'network';
    throw new HttpError({ kind, url, cause: error });
  }

  if (!response.ok) {
    throw new HttpError({ kind: 'http', url, status: response.status });
  }

  try {
    const body: T = await response.json();
    return body;
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new HttpError({ kind: 'parse', url, status: response.status, cause: error });
  }
};
