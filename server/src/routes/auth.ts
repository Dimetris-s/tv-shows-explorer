import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import type { LoginResponse, Session } from '#contract/index.ts';
import { logIn } from '#tasks/logIn.ts';
import { logOut } from '#tasks/logOut.ts';

import type { AppEnv } from './env.ts';
import { onInvalid } from './onInvalid.ts';
import { clearSessionId, readSessionId, writeSessionId } from './sessionCookie.ts';

const loginBody = z.object({ email: z.string().trim().pipe(z.email()) });

export const auth = new Hono<AppEnv>()
  .get('/me', (c) => c.json<Session>({ user: c.var.user }))
  .post('/login', zValidator('json', loginBody, onInvalid), (c) => {
    const { sessionId, user } = logIn(c.req.valid('json').email);
    writeSessionId(c, sessionId);
    return c.json<LoginResponse>({ user });
  })
  .post('/logout', (c) => {
    const sessionId = readSessionId(c);
    if (sessionId) logOut(sessionId);
    clearSessionId(c);
    return c.body(null, 204);
  });
