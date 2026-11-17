import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import type { ApiError } from '#contract/index.ts';
import { addFavorite } from '#tasks/addFavorite.ts';
import { countFavorites } from '#tasks/countFavorites.ts';
import { listFavorites } from '#tasks/listFavorites.ts';
import { removeFavorite } from '#tasks/removeFavorite.ts';

import type { AppEnv } from './env.ts';
import { onInvalid } from './onInvalid.ts';

const showParam = z.object({ id: z.coerce.number().int().positive() });

export const favorites = new Hono<AppEnv>()
  .get('/', (c) => c.json(listFavorites(c.var.clientId)))
  .get('/count', (c) => c.json(countFavorites(c.var.clientId)))
  .put('/:id', zValidator('param', showParam, onInvalid), async (c) => {
    const result = await addFavorite(c.var.clientId, c.req.valid('param').id);
    return result ? c.json(result) : c.json<ApiError>({ error: 'Show not found' }, 404);
  })
  .delete('/:id', zValidator('param', showParam, onInvalid), (c) =>
    c.json(removeFavorite(c.var.clientId, c.req.valid('param').id)),
  );
