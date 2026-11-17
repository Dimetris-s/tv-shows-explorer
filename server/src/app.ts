import { Hono } from 'hono';
import { logger } from 'hono/logger';

import type { ApiError } from '#contract/index.ts';
import { HttpError } from '#services/http/index.ts';

import { clientId } from './routes/clientId.ts';
import type { AppEnv } from './routes/env.ts';
import { favorites } from './routes/favorites.ts';
import { shows } from './routes/shows.ts';

export const app = new Hono<AppEnv>()
  .basePath('/api')
  .use(logger())
  .use(clientId)
  .route('/shows', shows)
  .route('/favorites', favorites)
  .notFound((c) => c.json<ApiError>({ error: 'Not found' }, 404))
  .onError((error, c) => {
    if (error instanceof HttpError) {
      return c.json<ApiError>({ error: `TVmaze is unavailable: ${error.message}` }, 502);
    }
    console.error(error);
    return c.json<ApiError>({ error: 'Internal server error' }, 500);
  });
