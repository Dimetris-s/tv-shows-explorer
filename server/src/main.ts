import { serve } from '@hono/node-server';

import { app } from './app.ts';

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  process.stdout.write(`API listening on http://localhost:${info.port}\n`);
});
