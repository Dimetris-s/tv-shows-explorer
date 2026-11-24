import { createMiddleware } from 'hono/factory';

import type { ApiError } from '#contract/index.ts';

import type { AppEnv, UserEnv } from './env.ts';

export const requireUser = createMiddleware<AppEnv & UserEnv>(async (c, next) => {
  if (!c.var.user) return c.json<ApiError>({ error: 'Unauthorized' }, 401);
  await next();
  return undefined;
});
