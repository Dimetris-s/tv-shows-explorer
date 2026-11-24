import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { getShowsPage } from '#tasks/getShowsPage.ts';

import type { AppEnv } from './env.ts';
import { onInvalid } from './onInvalid.ts';

const showsQuery = z.object({
  q: z.string().trim().min(1),
  genre: z.string().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export const shows = new Hono<AppEnv>().get(
  '/',
  zValidator('query', showsQuery, onInvalid),
  async (c) => {
    const { q, genre, page } = c.req.valid('query');
    const result = await getShowsPage({
      query: q,
      genre: genre ?? null,
      page,
      userId: c.var.user?.email ?? null,
    });
    return c.json(result);
  },
);
