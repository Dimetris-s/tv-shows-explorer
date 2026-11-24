import { createMiddleware } from 'hono/factory';

import { findSessionUser } from '#tasks/findSessionUser.ts';

import type { AppEnv } from './env.ts';
import { readSessionId } from './sessionCookie.ts';

export const session = createMiddleware<AppEnv>(async (c, next) => {
  c.set('user', findSessionUser(readSessionId(c)));
  await next();
});
