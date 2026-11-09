export type HttpErrorKind = 'http' | 'network' | 'timeout' | 'parse';

type HttpErrorParams = {
  kind: HttpErrorKind;
  url: string;
  status?: number;
  cause?: unknown;
};

const messages: Record<HttpErrorKind, string> = {
  http: 'Сервер вернул ошибку',
  network: 'Нет соединения с сервером',
  timeout: 'Сервер не ответил вовремя',
  parse: 'Не удалось разобрать ответ сервера',
};

/** Request failure. Cancellation by the caller is not an HttpError: it rethrows the AbortError. */
export class HttpError extends Error {
  readonly kind: HttpErrorKind;
  readonly url: string;
  readonly status: number | undefined;

  constructor({ kind, url, status, cause }: HttpErrorParams) {
    super(status ? `${messages[kind]} (${status})` : messages[kind], { cause });
    this.name = 'HttpError';
    this.kind = kind;
    this.url = url;
    this.status = status;
  }
}
