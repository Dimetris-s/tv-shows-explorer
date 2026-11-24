import { HttpError } from './HttpError';

const DEFAULT_TIMEOUT_MS = 10_000;

export type QueryParams = Record<string, string | number | boolean | undefined>;

export type RequestOptions = {
  signal?: AbortSignal;
  params?: QueryParams;
  body?: unknown;
  timeoutMs?: number;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const NO_CONTENT = 204;

const JSON_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' };

const buildUrl = (url: string, params: QueryParams = {}) => {
  const result = new URL(url, globalThis.location?.origin);
  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined) result.searchParams.set(name, String(value));
  }
  return result;
};

export const request = async <T>(
  method: HttpMethod,
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { signal, params, body, timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const requestSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  let response: Response;
  try {
    response = await fetch(buildUrl(url, params), {
      method,
      signal: requestSignal,
      headers: body === undefined ? { Accept: 'application/json' } : JSON_HEADERS,
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    const kind = timeoutSignal.aborted ? 'timeout' : 'network';
    throw new HttpError({ kind, url, cause: error });
  }

  if (!response.ok) {
    throw new HttpError({ kind: 'http', url, status: response.status });
  }

  if (response.status === NO_CONTENT) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return undefined as T;
  }

  try {
    const data: T = await response.json();
    return data;
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new HttpError({ kind: 'parse', url, status: response.status, cause: error });
  }
};
