import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

const COOKIE = 'session';
const MONTH_SECONDS = 60 * 60 * 24 * 30;
const BASE_OPTIONS = { httpOnly: true, secure: true, sameSite: 'Lax', path: '/' } as const;

export const readSessionId = (c: Context) => getCookie(c, COOKIE);

export const writeSessionId = (c: Context, sessionId: string) =>
  setCookie(c, COOKIE, sessionId, { ...BASE_OPTIONS, maxAge: MONTH_SECONDS });

export const clearSessionId = (c: Context) => deleteCookie(c, COOKIE, BASE_OPTIONS);
