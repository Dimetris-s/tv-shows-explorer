import { getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

import type { AppEnv } from './env.ts';

const COOKIE = 'clientId';
const YEAR_SECONDS = 60 * 60 * 24 * 365;

export const clientId = createMiddleware<AppEnv>(async (c, next) => {
  let id = getCookie(c, COOKIE);
  if (!id) {
    id = crypto.randomUUID();
    setCookie(c, COOKIE, id, { httpOnly: true, sameSite: 'Lax', path: '/', maxAge: YEAR_SECONDS });
  }
  c.set('clientId', id);
  await next();
});
